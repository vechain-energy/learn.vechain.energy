# Multi-Task atomic Transactions

Multi-Task atomic transactions allow developers to batch payments, add multiple calls to different contract functions into one transaction and determine their sequence.

## Remote Dependency control due Multi-Clause-Transactions

Multi-Clause-Transactions are an atomic compilation of multiple transactions into one. Every transaction on VeChain has at least one clause. If one clause fails, the whole transaction will revert.

Because of this dependency a bad actor can manually call contracts and add a custom clause that reverts if the outcome is not as expected.

#### A regular transaction containing one clause looks like this:

```mermaid
sequenceDiagram
    participant User
    participant Transaction
    participant Contract
    participant MaliciousContract

    User->>Transaction: Submit Transaction
    Transaction->>Contract: Clause 1
    Contract-->Contract: process
    Contract-->>Transaction: success
    Transaction-->>User: confirm
```

If someone wants to ensure the process meets expectations another clause can be added. The additional clause involves a check that reverts if the result is different. The revert will revert the whole transaction which includes potential changes from the first clause too:

```mermaid
sequenceDiagram
    participant User
    participant Transaction
    participant Contract
    participant MaliciousContract

    note over User,Contract: Regular Interaction
    User->>Transaction: Submit Transaction
    Transaction->>Contract: Clause 1
    Contract-->Contract: process
    Contract-->>Transaction: success
    Transaction-->>User: confirm

    note over User,MaliciousContract: Malicious Interaction
    User->>Transaction: Submit Transaction
    Transaction->>Contract: Clause 1
    Contract-->Contract: process
    Contract-->>Transaction: success
    Transaction->>MaliciousContract: Clause 2
    MaliciousContract-->>Contract: check status after Clause 1
    alt is wanted outcome
        MaliciousContract-->>Transaction: success
        Transaction-->>User: confirm
    else is unwanted outcome
        MaliciousContract-->>Transaction: revert
        Transaction-->>User: revert all
    end
```

## Vulnerability Scenario

Given there is a contract that accepts payments to roll a dice. The result is a random calculation within the contract. If the user guesses the correct side in advance the pool of money is sent as prize. If failed, the prize pool grows.

Given a bad actor creates a custom contract that checks if the prize pool is empty. If not, it reverts. Then the following scenario can happen:

<pre class="language-gherkin"><code class="lang-gherkin">Given a bad actor sends a transaction with two clauses
<strong>When the first clause (play) rolls the dice and loses
</strong>Then the second clause (check) reverts the whole transaction
</code></pre>

This can be repeated until it results in a win.

**Example vulnerable pseudo-contract:**

{% tabs %}
{% tab title="dice.sol" %}
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Dice {
    uint256 public lastRoll;

    function roll(uint256 guess) public payable returns (uint256) {
        uint256 rolled = randomNumber(2);
        if (rolled == guess) {
            payable(msg.sender).transfer(address(this).balance);
        }
        lastRoll = rolled;
        return lastRoll;
    }

    function randomNumber(uint256 number) internal view returns (uint256) {
        return (uint256(blockhash(block.number - 1)) % number) + 1;
    }
}
```
{% endtab %}
{% endtabs %}

## Potential Solution

#### Mitigating Dependency Risks with Multi-Block Processing

The input and the result can be split into different blocks. When an input is stored as pending, another actor is unable ensure a wanted outcome. The input is immutable.

```mermaid
sequenceDiagram
    participant User
    participant Transaction
    participant Contract
    
    User->>Transaction: Submit Transaction 1
    Transaction->>Contract: Clause 1
    Contract-->Contract: add pending action
    Contract-->>Transaction: success
    Transaction-->>User: confirm

    User->>Transaction: Submit Transaction 2
    Transaction->>Contract: Clause 1
    Contract-->Contract: execute pending action
    Contract-->>Transaction: success
    Transaction-->>User: confirm
```

The disadvantage of this are that two transactions will require:

1. Twice the VTHO costs
2. Double the processing time
3. Increased complexity to a contract due implementing a pending & processing status

### Links

{% embed url="https://docs.vechain.org/thor/learn/transaction-model.html#clauses" %}
Multi-Task Transactions
{% endembed %}


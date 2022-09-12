---
description: >-
  In certain situations transactions are required to be executed in a certain
  order. Reasons are multiple, for example acquiring permission before executing
  commands.
---

# Transaction Dependency

### Source of Dependency

A transaction id is generated when a transaction is published to a Blockchain Node. The id allows tracking of the transaction status.

The transaction id can be used as dependency for future transactions.

### Set Dependency

Dependency is set with `dependsOn` ([docs.vechain.org](https://docs.vechain.org/thor/learn/transaction-model.html#dependson)).

A single transaction id is referenced. The dependency is not required to processed yet. It can be pending or yet unknown on the network.

#### Waiting for it …

The transaction pool is checked on each new block. If a transaction dependency was fulfilled, it moves into pending status.

#### **Expiration**

Transactions will expire if their dependency stays unknown for a defined number of blocks ([docs.vechain.org#Expiration](https://docs.vechain.org/thor/learn/transaction-model.html#expiration)).

If expired, the transaction will:

1. appear as “stale” transaction
2. not cost gas

![Expired Transaction](<../.gitbook/assets/image (13).png>)

### **Unfulfilled Dependency**

If the depending transactions is reverted the dependency is unfulfilled. The transactions depending on it are not executed.

The dependent transactions will:

1. be removed from the transaction pool
2. not appear as failed transaction
3. not cost gas

### **Fulfilled Dependency**

A dependency is fulfilled if the transaction becomes known and successfully included into the blockchain.

Dependent transactions are executed in the next block.

The result is identical to:

1. a user waiting for a known transaction id to be confirmed on one block
2. and submitting a new transaction

### Example

#### Contract

To demonstrate dependencies a test contract was published on the TestNet:

```solidity
pragma solidity ^0.8.4;

contract TestDependency {
    mapping(address => bool) allowedUser;

    // reverts if user is not known
    function test() public {
        require(allowedUser[msg.sender], "Caller is not allowed");
    }

    // needs to be executed before test() works
    function addMyselfToAllowedUser() public {
        allowedUser[msg.sender] = true;
    }
}
```

Source Code:\\\
[https://gitlab.com/vechain.energy/examples/contract-transaction-dependency/-/blob/main/contracts/Test.sol](https://gitlab.com/vechain.energy/examples/contract-transaction-dependency/-/blob/main/contracts/Test.sol)

The `test()` function requires `addMyselfToAllowedUser()` to be run first. A simple example on a transaction depending on another one.

#### Client

The Sandbox demonstrates how dependency works by calling the test functions with and without dependency.

#### **With dependency**

`addMyselfToAllowedUser()` is added to the transaction pool and `test()` is called with `dependsOn` set to the first transaction. To stretch the test window additional four `test()` calls are depending on each other.

All transactions are immediately added to the transaction pool when the button is clicked.

With dependency you see that transactions are executed after each other in the next block.

#### **Without dependency**

Without dependency the same transactions are submitted immediately as well. All transactions are executed in the same block. Some of these transactions may fail because the order is not enforced to allow the user first.

#### **Sandbox**

Sandbox-Link:  \
[https://codesandbox.io/s/transaction-dependency-example-q8p5uf](https://codesandbox.io/s/transaction-dependency-example-q8p5uf)

If you check the blockchain-explorer you will see that future pending transactions are not available until their dependency is actively in processing.

To remove distractions random wallets are generated on each run and fee delegation is used.

#### **ERC20 Example**

Another example more true-to-life is this ERC20 example where an approval is required before tokens can be spent:

Sandbox-Link:  \
[https://codesandbox.io/s/transaction-dependency-example-using-erc20-fhsxlc](https://codesandbox.io/s/transaction-dependency-example-using-erc20-fhsxlc)

### Read more

Learn more about the backgrounds and details here:

* [https://docs.vechain.org/tutorials/forcible-transaction-dependency.html](https://docs.vechain.org/tutorials/forcible-transaction-dependency.html)
* [https://docs.vechain.org/thor/learn/transaction-model.html](https://docs.vechain.org/thor/learn/transaction-model.html)
* [https://docs.vechain.org/connex/api.html#transaction-signing-service](https://docs.vechain.org/connex/api.html#transaction-signing-service)

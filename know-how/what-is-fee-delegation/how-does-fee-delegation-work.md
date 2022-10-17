# How does Fee Delegation work?

Fee Delegation introduces a third party to a transaction, the gas payer.

The user submitting a transaction sends it unsigned to the gas payer and requests its signature. The user integrates the gas payers signature into the transaction, signs it and submits it to a blockchain node.

When the transaction is finalized, the gas costs are taken from the gas payers balance instead of the user submitting the transaction.​

<figure><img src="../../.gitbook/assets/image (2).png" alt=""><figcaption></figcaption></figure>

​

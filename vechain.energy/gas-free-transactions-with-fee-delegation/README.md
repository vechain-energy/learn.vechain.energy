# Gas-Free Transactions with Fee Delegation

Fee Delegation allows a third party to pay for all gas costs of a transaction.

The user or client sends the unsigned transaction to a service. The service verifies the transaction and a signature that confirms the gas-payment.

The user adds the gas-payment-signature with his own in the transaction and submits it to the blockchain node.

When the transaction is added to the blockchain, the gas costs are taken from the gas payers balance instead of the user submitting the transaction.

<figure><img src="../../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

[vechain.energy](https://vechain.energy) offers the delegation as a service. The gas-payer is managed with Sponsorships that are managed by whitelists or with smart contracts.


# Analytics & Event History

All transactions related to the wallet of a Sponsorship are logged. In addition sponsorship requests can be logged as well (see Settings > Log Sponsorship Requests).

The event history provides a filterable access to all transaction. It allows to identify missing sponsorship configuration, possible abuse detection and provides details to learn about contracts usage.

## Filters

### Timeframes

All data is available until the beginning of the sponsorship. Depending on the number of transactions, loading all historical data might be rejected if it is more than 100.000 entries.

### Sponsored-Transactions

The regular type of transaction, signed for gas-payment first and then broadcast to the blockchain. The transaction was successful as well.

### Uncommited Transaction

A transaction that was signed for gas-payment but never submitted to the blockchain.

A lot of uncommited tranasctions might signal a problem with a client.

### Rejected Sponsorships

Requests from clients that were rejected. The reason is logged.

Log entries can help to identify mistakes in the logic configuration.

### Reverted Transactions

Transactions signed for gas-payment, broadcast to the blockchain but reverted because of issues with the smart contract.

Log entries can help to identify problems with smart contracts.

## ABI

ABI definition of multiple contracts can be uploaded and is used to decode the transaction details.

Using the ABI a human readable list of function calls is shown. The function names and arguments become searchable.

## CSV

The CSV download contains all entries currently available in the browser. All transactions are in rows and for better future analytics the function parameters are grouped in columns.

# Whitelists

Every Sponsorship has its own logic for payment decisions. A whitelist supports the gas fees for a certain list of addresses.

There is no forced limit for the number of whitelist entries.

## Sender

A sender is the wallet initiating and broadcasting the transaction. Normally this is the user wallet.

If a sender is whitelisted, all transactions signed by it are paid.

## Recipient

The recipient is either the wallet receiving the transaction or the normally the smart contract interacted with.

If a recipient is whitelisted, all transactions to it are paid.


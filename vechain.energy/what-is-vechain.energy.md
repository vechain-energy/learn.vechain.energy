# What is vechain.energy?

[vechain.energy](https://vechain.energy) brings blockchain technology to veteran developers. Providing established interfaces to new blockchain technology, optionally hiding the complexity caused by blockchain and web3.

This is done by adding API-Layers to simplify blockchain relevant technology.

## Solutions

### Gas Fees

Regular blockchain users need to purchase some kind of crypto and are aware of gas fees. Even if low, regular users need to pay them

Leveraging VeChain Fee Delegation a fee delegation service is provided that can be configured in the web. Users can interact with blockchain technology without crypto contact.

If private keys are hidden away as well (for example using [web3auth.io](https://web3auth.io/)) , then users might never know about their interaction with the blockchain.

### Reading Data

With API layers put between REST compatible clients and Blockchain-Nodes reading data is simplified. With some comfort functionality the implementation is even supported for end-users.

### Transactions

Executing smart contract functions requires a wallet, transaction building and broadcasting to the network. A REST-API provides the ability to POST simple JSON-Objects and receive the transaction id back. All wallet, transaction and broadcasting is take care of.

### Push with WebHooks

When data on the blockchain changes, the change can trigger a configured HTTP-Request using WebHooks. Information flows back to other backends or services.

### WIP: Automation

Running functionality in regular intervals on the blockchain is made possible by providing a scheduler that calls transactions a configurable intervals.

### Identification

Many standard applications allow to configure OAuth or OpenID Connect providers as an identity pool. An Auth-Layer in front of user wallets allows to identify user addresses. This brings wallet authentification to the masses of applications.

## Infrastructure

All services and websites run on the biggest Cloud-Providers AWS and CloudFlare in a serverless fashion. The Blockchain data is read from multiple public nodes, including one of our own.

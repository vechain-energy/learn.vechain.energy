# Datasheet

## APIs

* [Vexchange DEX API](https://api.vexchange.io/)
* List of Tokens:
  * [TestNet](https://vechain.github.io/token-registry/test.json)
  * [MainNet](https://vechain.github.io/token-registry/main.json)

## Compatibility

* Solidity is supported with the EVM to 0.8.19
  * [Missing support for PUSH0 breaks with 0.8.20](https://medium.com/coinmonks/push0-opcode-a-significant-update-in-the-latest-solidity-version-0-8-20-ea028668028a) (`throws invalid opcode 0x5f`)

## Contracts

* [vechain/b32@github](https://github.com/vechain/b32) maintains a list of known and public signatures to be used for everyone.
* [List of known contracts & addresses from seevechain.com](https://github.com/nodatall/seevechain/blob/master/shared/knownAddresses.js)
* [Token-Registry: List of officially registered Tokens Contracts](https://github.com/vechain/token-registry)
* [NFT-Token-Registry: List of officially registered NFT Contracts](https://github.com/vechain/nft-registry)

## DEX

* [vexchange.io](https://vexchange.io)
* [app.verocket.com](https://app.verocket.com)

## Explorers

### MainNet

* [https://explore.vechain.org/](https://explore.vechain.org/)
* [https://vechainstats.com/](https://vechainstats.com/)
* [https://www.veblocks.net/explorer.html?search=latest](https://www.veblocks.net/explorer.html?search=latest)
* [https://insight.vecha.in/#/main/](https://insight.vecha.in/#/main/)
* [https://explore.veblocks.net/#/main/](https://explore.veblocks.net/#/main/)
* [https://vechain.energy/inspect](https://vechain.energy/inspect)

### TestNet

* [https://explore-testnet.vechain.org/](https://explore-testnet.vechain.org/)
* [https://insight.vecha.in/#/test/](https://insight.vecha.in/#/test/)
* [https://explore.veblocks.net/#/test/](https://explore.veblocks.net/#/test/)
* [https://testnet.vechain.energy/inspect](https://testnet.vechain.energy/inspect)

## Links

* [VSCode Extension Solidity Visual Developer](https://marketplace.visualstudio.com/items?itemName=tintinweb.solidity-visual-auditor)
* [Solidity Documentation](https://solidity.readthedocs.io/)
* [Hardhat](https://hardhat.org/)
* [OpenZeppelin Documentation](https://docs.openzeppelin.com/contracts/)
* [VeChain Website](https://www.vechain.org/)
* [VeChain Connex Documentation](https://docs.vechain.org/connex/)
* [VeChain Faucet](https://faucet.vecha.in/)
* [VTHO Calculator](https://vechain.energy/#/helper/vtho/calculator)
* [Developer Awesome List](https://github.com/vechain-community/awesome-list)
* [vechain.energy Blog with Development-Resources](https://blog.vechain.energy)
* [Web-Wallet and Token-Manager by vechainstats](https://manager.vechainstats.com/)
* [General Grant Program to support Developers](https://github.com/vechain/grant-program/blob/master/README.md)
* [VeChain Improvement Proposals](https://github.com/vechain/vips/)
* [Token-Network-Bridge by Safe Haven](https://app.safeswap.io/)

## Nodes

### TestNet

* https://testnet.vecha.in (Official)
* https://sync-testnet.vechain.org (Official)
* https://vethor-node-test.vechaindev.com (Official)
* https://testnet.veblocks.net ([by VeBlocks](https://github.com/mirei83/VeChain-PublicNodes)) (proxied by CloudFlare)
  * Alternative: https://testnet02.vechain.fi.blockorder.net
  * Alternative: https://testnet02.vechain.de.blockorder.net
* https://testnetc1.vechain.network

### MainNet

* https://mainnet.vecha.in (Official)
* https://sync-mainnet.vechain.org (Official)
* https://vethor-node.vechain.com (Official)
* https://mainnet.veblocks.net ([by VeBlocks](https://github.com/mirei83/VeChain-PublicNodes)) (proxied by CloudFlare)
  * Alternative: https://mainnet02.vechain.fi.blockorder.net
  * Alternative: https://mainnet02.vechain.de.blockorder.net
* https://node.vechain.energy (by [vechain.energy](https://vechain.energy))
  * for Europe resolves to https://de.node.vechain.energy
  * for North America and by default resolves to https://us.node.vechain.energy
* https://mainnetc1.vechain.network
* https://mainnetc2.vechain.network

### Links

* Official node source code, deployment guide: [https://github.com/vechain/thor](https://github.com/vechain/thor)
* [Example Public-Node-Setup](../how-to/node/setup-public-node.md)
* [Status-Page for availability check of Nodes](https://nodes.status.vechain.energy)

## SDKs

* [Python, thor-devkit.py](https://github.com/vechain/thor-devkit.py)
* [JavaScript, thor-devkit.js](https://github.com/vechain/thor-devkit.js)
* [C#, thor-devkit.netcore](https://github.com/vechain/thor-devkit.netcore)
* [Java, thor-devkit.java](https://github.com/vechain/thor-devkit.java)

## Wallets

* [VeWorld](https://www.veworld.net/)
  * Chrome based extension
* Sync2
  * [Desktop](https://sync.vecha.in/)
  * [iOS](https://apps.apple.com/app/vechain-sync2/id6446363029)
* [Sync2 Lite](https://lite.sync.vecha.in/#/)
  * Liteweight version of Sync2 for web-access.
* VeChainThor Mobile Wallet
  * [iOS](https://apps.apple.com/app/vechainthor/id1397679485)
  * [Android](https://play.google.com/store/apps/details?id=com.vechain.wallet\&gl=US)
* [Nufinetes](https://www.nufinetes.com/)
  * [iOS](https://apps.apple.com/us/app/nufinetes/id1609562349)
  * [Android](https://play.google.com/store/apps/details?id=com.vimworld.wallet)
  * [MacOS](https://d3va9f6jgm4z2y.cloudfront.net/nufinetes-prod/Nufinetes\_macOS\_latest.dmg)
  * [Windows](https://d3va9f6jgm4z2y.cloudfront.net/nufinetes-prod/Nufinetes\_Windows\_latest.exe)

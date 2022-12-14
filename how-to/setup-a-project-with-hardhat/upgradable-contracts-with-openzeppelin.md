# Upgradable Contracts with OpenZeppelin

### Create upgradeable contracts

Upgrading a contract to extend functionality or fix bugs is important.

The standard tools for Hardhat are linked with the ethereum-standard, for example `@openzeppelin/hardhat-upgrades` works like a charm but fails in the VeChain environment.

The magic in `@openzeppelin/hardhat-upgrades` however is deploying contracts and calling functions. The same can be done manually.

The following steps will show how to deploy a contract and upgrade it with new functionality using all the standard tools and contracts.

### Setup project from scratch using Hardhat <a href="#user-content-setup-project-from-scratch-using-hardhat" id="user-content-setup-project-from-scratch-using-hardhat"></a>

```shell
yarn init -y
yarn add --dev hardhat @nomiclabs/hardhat-waffle @nomiclabs/hardhat-ethers @vechain.energy/hardhat-thor @openzeppelin/contracts @openzeppelin/contracts-upgradeable web3-eth-abi
npx hardhat

✔ What do you want to do? · Create an empty hardhat.config.js
✨ Config file created ✨
```

### Configure to VeChain-Network <a href="#user-content-configure-to-vechain-network" id="user-content-configure-to-vechain-network"></a>

Configure the network in `hardhat.config.js`:

```javascript
require("@nomiclabs/hardhat-waffle");
require('@vechain.energy/hardhat-thor')

module.exports = {
 solidity: "0.8.4",
 defaultNetwork: "vechain",
 networks: {
    vechain: {
      url: 'https://testnet.veblocks.net',
      privateKey: "0xb79c7c145881219876d4e624f725c439f832b89cbea4e7a7b9cb1f43d8e203f9",
      delegateUrl: 'https://sponsor-testnet.vechain.energy/by/90',
      blockGasLimit: 10000000
    }
  }
};
```

### Configure first contract <a href="#user-content-configure-first-contract" id="user-content-configure-first-contract"></a>

With [OpenZeppelin](https://wizard.openzeppelin.com/#erc721) configure an upgradeable contract and put it in the project at `contracts/MyToken_v1.sol`.

This version will be unable to mint tokens:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract MyToken_v1 is Initializable, ERC721Upgradeable, OwnableUpgradeable, UUPSUpgradeable {
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize() initializer public {
        __ERC721_init("MyToken", "MTK");
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}
}
```

### Deploy with proxy <a href="#user-content-deploy-with-proxy" id="user-content-deploy-with-proxy"></a>

1. The NFT Contract is deployed first
2. The `ERC1967Proxy` from OpenZeppelin is imported and deployed 3. A reference to the previously deployed NFT Contract is given 4. And the NFT contracts `initialize()` is called thru the proxy
3. The address of both deployments is written to `status.json` for future reference

The script is put into `scripts/01-deploy.js`:

```javascript
const hre = require("hardhat")
const fs = require('fs')
const ERC1967Proxy = require('@openzeppelin/contracts/build/contracts/ERC1967Proxy.json')
const Web3EthAbi = require('web3-eth-abi')

async function main() {
  await hre.run('compile')

  // deploy initial contract  
  const MyToken = await hre.thor.getContractFactory("MyToken")
  const myToken = await MyToken.deploy()
  console.log("MyToken 1.0 deployed to:", myToken.address)

  // calculate initialize() call during deployment
  const { abi } = await hre.artifacts.readArtifact("MyToken");
  const callInitialize = Web3EthAbi.encodeFunctionCall(
    abi.find(({ name }) => name === 'initialize'), []
  )

  // deploy proxy
  const Proxy = await hre.thor.getContractFactory(ERC1967Proxy.abi, ERC1967Proxy.bytecode)
  const proxy = await Proxy.deploy(myToken.address, callInitialize)
  console.log("Proxy deployed to:", proxy.address)

  fs.writeFileSync('./status.json', JSON.stringify({ proxyAddress: proxy.address, myToken_v1Address: myToken.address }, "", 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

The result:

```shell
$ node scripts/01-deploy.js 
Compiled 17 Solidity files successfully
MyToken 1.0 deployed to: 0x03c41F547eB5A45C90208eFbb130252F7128264f
Proxy deployed to: 0x39fa815f8e3d095789E730D08D1E250cf0e002ca
```

### Configure new contract <a href="#user-content-configure-new-contract" id="user-content-configure-new-contract"></a>

To fix the missing minting-functionality the wizard is used to create a modified contract `MyToken_v2` in `contracts/MyToken_v2.sol`.

Using a different contract name is important to access the correct version in each deployment step.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract MyToken_v2 is Initializable, ERC721Upgradeable, OwnableUpgradeable, UUPSUpgradeable {
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize() initializer public {
        __ERC721_init("MyToken", "MTK");
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}
}
```

### Deploy upgrade <a href="#user-content-deploy-upgrade" id="user-content-deploy-upgrade"></a>

[EIP1967](https://docs.openzeppelin.com/contracts/4.x/api/proxy#erc1967) is the standard that defines how proxies behave and its bytecode was used during the initial deployment.

With `upgradeTo` the proxy can point to a different contract address. The ABI for this function definition is at a different location. `UUPSUpgradeable` is therefore imported and used to communicate with the deployed proxy.

In addition the first token is minted to the deploying address:

```javascript
const hre = require("hardhat")
const fs = require('fs')
const UUPSUpgradeable = require('@openzeppelin/contracts/build/contracts/UUPSUpgradeable.json')
const status = require('../status.json')

async function main() {
  await hre.run('compile')

  const MyToken_v2 = await hre.thor.getContractFactory("MyToken_v2")
  const myToken_v2 = await MyToken_v2.deploy()
  console.log("MyToken 2.0 deployed to:", myToken_v2.address)

  const proxy = await hre.thor.getContractAt(UUPSUpgradeable.abi, status.proxyAddress)
  await proxy.upgradeTo(myToken_v2.address)
  console.log("Proxy upgraded to:", myToken_v2.address)

  fs.writeFileSync('./status.json', JSON.stringify({ ...status, myToken_v2Address: myToken_v2.address }, "", 2))

  const [deployer] = await hre.thor.getSigners()
  const address = await deployer.getAddress()
  const proxiedMyToken = await hre.thor.getContractAt("MyToken_v2", status.proxyAddress)
  await proxiedMyToken.safeMint(address, 1)
  console.log(`Minted Token #1 to ${address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

This time the result looks like this:

```shell
$ node scripts/02-upgrade.js
Compiled 1 Solidity file successfully
MyToken 2.0 deployed to: 0x3697DD85Eb46f4C61323111089972Cf753910BDb
Proxy upgraded to: 0x3697DD85Eb46f4C61323111089972Cf753910BDb
Minted Token #1 to 0x1dF12f7c3c2ed2339409388Da9050c73C90Eb938
```

### Links <a href="#user-content-links" id="user-content-links"></a>

* [Example Project](https://gitlab.com/vechain.energy/examples/openzeppelin-upgrades/)
* [OpenZeppelin Proxies](https://docs.openzeppelin.com/contracts/4.x/api/proxy)
* [OpenZeppelin Wizard](https://wizard.openzeppelin.com/)
* [Hardhat](https://hardhat.org/getting-started/)
* [EIP-1967](https://eips.ethereum.org/EIPS/eip-1967)

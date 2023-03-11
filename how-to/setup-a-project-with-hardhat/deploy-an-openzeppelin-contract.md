# Deploy an OpenZeppelin-Contract

### Get started with the Contracts Wizard

OpenZeppelin is a platform with battle tested and audited contract libraries. OpenZeppelin has a contract wizard that allows to build basic contracts.

Have a look at [wizard.openzeppelin.com](https://wizard.openzeppelin.com) and let us build an example project from scratch.

### Setup project from scratch using Hardhat <a href="#user-content-setup-project-from-scratch-using-hardhat" id="user-content-setup-project-from-scratch-using-hardhat"></a>

```shell
yarn init -y
yarn add --dev hardhat @nomiclabs/hardhat-waffle @nomiclabs/hardhat-ethers @vechain.energy/hardhat-thor @openzeppelin/contracts 
npx hardhat

✔ What do you want to do? · Create an empty hardhat.config.js
✨ Config file created ✨
```

### Configure your contract <a href="#user-content-configure-your-contract" id="user-content-configure-your-contract"></a>

Visit [https://wizard.openzeppelin.com/](https://wizard.openzeppelin.com/) and configure your contract. For this test I used the default ERC20 setting minting 2 tokens to myself.

The file is saved in `contracts/MyToken.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 2 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```

### Connect to vechain network <a href="#user-content-connect-to-vechain-network" id="user-content-connect-to-vechain-network"></a>

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
      privateKey: "0x80b97e2ecfab8b1c78100c418328e8a88624e3d19928ec791a8a51cdcf01f16f",
      delegateUrl: 'https://sponsor-testnet.vechain.energy/by/90',
      blockGasLimit: 10000000
    }
  }
};
```

### Deploy your contract <a href="#user-content-deploy-your-contract" id="user-content-deploy-your-contract"></a>

Write a script to deploy with `hre.thor` and interact with your new contract.

This goes to `deploy.js`:

```javascript
const hre = require("hardhat");

async function main() {

  await hre.run('compile');
  const [deployer] = await hre.thor.getSigners()
  const deployerAddress = await deployer.getAddress()

  const MyToken = await hre.thor.getContractFactory("MyToken");
  const myToken = await MyToken.deploy();

  await myToken.deployed();
  console.log("MyToken deployed to:", myToken.address);

  const name = await myToken.name()
  const balance = await myToken.balanceOf(deployerAddress)
  console.log(`minted ${hre.ethers.utils.formatEther(balance)} of ${name} to myself at ${deployerAddress}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

And enjoy your result:

```shell
$ node deploy.js  
Compiled 6 Solidity files successfully
MyToken deployed to: 0xA103c3c0FdD137FAC67bCC2B90351731f96558b2
minted 2.0 of MyToken to myself at 0x7eF0CbaDFc0da51A6153F35a99185B59a8cbc463
```

### Links <a href="#user-content-links" id="user-content-links"></a>

* [Example Project](https://gitlab.com/vechain.energy/examples/openzeppelin-wizard/)
* [OpenZeppelin Wizard](https://wizard.openzeppelin.com/)
* [OpenZeppelin.com](https://openzeppelin.com/)
* [Hardhat](https://hardhat.org/getting-started/)

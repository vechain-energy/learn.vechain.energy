# Setup a project with Hardhat

### Setup Project

Setup example project using the Hardhat Documentation at: [https://hardhat.org/getting-started/](https://hardhat.org/getting-started/)

For testing purpose the "basic sample project" was chosen.

### Enable vechain thor <a href="#user-content-enable-vechain-thor" id="user-content-enable-vechain-thor"></a>

Install our `hardhat-thor` plugin.

```shell
yarn add @vechain.energy/hardhat-thor
```

Enable it in `hardhat.config.js` and configure network. Here is a full working config file:

```javascript
require("@nomiclabs/hardhat-waffle");
require('@vechain.energy/hardhat-thor')

module.exports = {
  solidity: "0.8.4",
  networks: {
    vechain: {
      url: 'https://testnet.veblocks.net',
      privateKey: "0x80b97e2ecfab8b1c78100c418328e8a88624e3d19928ec791a8a51cdcf01f16f",
      delegateUrl: 'https://sponsor-testnet.vechain.energy/by/90'
    }
  }
};
```

Defining `delegateUrl` enables Fee Delegation and the contract deployment will be paid by a Sponsorship from [testnet.vechain.energy](https://testnet.vechain.energy).

If undefined, the fee will be paid by the wallet defined with `privateKey`.

### Deploy & Interaction <a href="#user-content-deploy-interaction" id="user-content-deploy-interaction"></a>

Modify the `scripts/sample-script.js` to use `hre.thor` instead of `hre.ethers`. Here is a full working example:

```javascript
const hre = require("hardhat");

async function main() {
  await hre.run('compile');

  const Greeter = await hre.thor.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, VeChain!");

  await greeter.deployed();
  console.log("Greeter deployed to:", greeter.address);

  const deployedGreeter = await hre.thor.getContractAt('Greeter', greeter.address)

  const greeting = await deployedGreeter.greet()
  console.log("Greeter responded with:", greeting)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### Notes <a href="#user-content-notes" id="user-content-notes"></a>

The example project:\
[https://gitlab.com/vechain.energy/examples/hardhat-deployment](https://gitlab.com/vechain.energy/examples/hardhat-deployment)

hardhat-thor plugin:\
[https://www.npmjs.com/package/@vechain.energy/hardhat-thor](https://www.npmjs.com/package/@vechain.energy/hardhat-thor)

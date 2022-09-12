# How to deploy with Fee Delegation?

## Hardhat

For Hardhat we created a simple wrapper that uses `web3-providers-connex` and works as a replacement for `hre.ethers`.

### **Setup**

Install with `yarn add @vechain.energy/hardhat-thor` and enable it in `hardhat.config.js` and configure network. Here is a full working config file:

```javascript
require("@nomiclabs/hardhat-waffle");
require('@vechain.energy/hardhat-thor')

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "vechain",
  networks: {
    vechain: {
      url: 'https://testnet.veblocks.net',
      privateKey: "0x…",
      delegateUrl: 'https://sponsor-testnet.vechain.energy/by/#',
      blockGasLimit: 10000000
    }
  }
}
```

Defining `delegateUrl` enables Fee Delegation and the contract deployment will be paid by your Sponsorship. If undefined, the fee will be paid by the wallet defined with `privateKey`.

### **Deploy & Interaction**

Use `hre.thor` as replacement for `hre.ethers`. Example:

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

### **Links**

* [hardhat, Getting Started](https://hardhat.org/getting-started/)
* [web3-providers-connex](https://github.com/zzGHzz/web3-providers-connex)
* [@vechain.energy/hardhat-thor](https://www.npmjs.com/package/@vechain.energy/hardhat-thor)

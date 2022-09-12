---
description: How to to connect to the Blockchain using a Browser
---

# Connect with Browser

Interacting with Blockchain-data is a big unknown at first but if you think about Blockchain-Nodes as your Backend-API, you'll feel how the complexity of decentralization is slowly fading.

On one end logic layers are published on the Blockchain with contracts. On the other end the data needs to be read and manipulated. Public nodes provide a public API that can be accessed either per Web.

This example shows how to read some information from a known contract and display that information.

### Connect <a href="#user-content-connect" id="user-content-connect"></a>

[Connex](https://docs.vechain.org/connex/) is the standard interface to connect dApps with VeChain blockchain and users.

```javascript
import Connex from "@vechain/connex";

const connex = new Connex({
  node: "https://mainnet.veblocks.net",
  network: "main"
});
```

For the TestNet use `{ node: "https://testnet.veblocks.net", network: "test" }`

### Interact <a href="#user-content-interact" id="user-content-interact"></a>

#### Prepare <a href="#user-content-prepare" id="user-content-prepare"></a>

For an interaction we need to know:

1. The address of the contract we want to talk to (like an API or Hostname)
2. The ABI documentation of the function we want to call

For this example the current supply of VTHO will be read, the address for that contract is:

```
0x0000000000000000000000000000456E65726779
```

I did look it up in the official docs:\
[https://docs.vechain.org/others/miscellaneous.html#energy-sol](https://docs.vechain.org/others/miscellaneous.html#energy-sol)

The ABI definition is available in the official docs as well: [https://raw.githubusercontent.com/vechain/b32/master/ABIs/energy.json](https://raw.githubusercontent.com/vechain/b32/master/ABIs/energy.json)

For this example only the single function `totalSupply()` is relevant, it is extracted from the list of all functions defined in the ABI:

```javascript
const abiTotalSupply = abi.find(({ name }) => name === "totalSupply");
```

#### Execute <a href="#user-content-execute" id="user-content-execute"></a>

```javascript
    const result = await connex.thor
      .account(CONTRACT_ADDRESS)
      .method(abiTotalSupply)
      .call();
```

`result` contains a lot of noise. The expected information is found in `result.decoded`:

```json
{ 0: "52418836757574038600000000000" }
```

Repeating this on each new block will return the current VTHO supply on the whole network.

#### Arguments <a href="#user-content-arguments" id="user-content-arguments"></a>

The same functionality can be used with parameters. To get the balance of a single address:

```javascript
const abiBalanceOf = abi.find(({ name }) => name === "totalSupply");

 const { decoded } = await connex.thor
      .account(CONTRACT_ADDRESS)
      .method(abiBalanceOf)
      .call("0x04Ad3f13050cc766169433062BcDbB367B616986");

console.log('VTHO Balance:', decoded[0])
```

`call()` will verify against the ABI and an error is thrown if data format or number of arguments don't match. Be sure to handle errors correctly.

### Sandbox <a href="#user-content-sandbox" id="user-content-sandbox"></a>

You can play around with this in a working example here:

[https://codesandbox.io/s/connect-to-vechain-nuvho8?file=/src/App.js](https://codesandbox.io/s/connect-to-vechain-nuvho8?file=/src/App.js)

### Notes <a href="#user-content-notes" id="user-content-notes"></a>

There is an awesome list of ABI's with VeChain specific contracts:

[https://github.com/vechain/b32/tree/master/ABIs](https://github.com/vechain/b32/tree/master/ABIs)

If you happen to know more ABIs or Contract-Addresses, please feel free to share them in the comments.

### Links <a href="#user-content-links" id="user-content-links"></a>

1. [Above Example Project](https://codesandbox.io/s/connect-to-vechain-nuvho8?file=/src/App.js)
2. [Connex Docs](https://docs.vechain.org/connex/)
3. [B32 Collection of ABIs](https://github.com/vechain/b32/tree/master/ABIs)

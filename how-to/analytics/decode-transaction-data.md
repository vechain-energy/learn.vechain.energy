# Decode Transaction-Data

VeChain B32 has a collection of interface definitions that can serve as translator from computer data back to human readable version.

### Anatomy of the data

Example data from a clause on the TestNet:

```
0xa9059cbb000000000000000000000000105199a26b10e55300cb71b46c5b5e867b7df427000000000000000000000000000000000000000000000002b5e3af16b1880000
```

The first 10 characters represent a hash of the function to call: `0xa9059cbb`

These are the first 10 characters from the sha3-hash for the function name and the data types in the function signature, like this:

```
sha3( 'transfer(address,uint256)' )
```

It can be calculated  with web3-utils:\
[https://web3js.readthedocs.io/en/v1.2.0/web3-utils.html#sha3](https://web3js.readthedocs.io/en/v1.2.0/web3-utils.html#sha3)

The rest are the parameters given to that function in a hex format:

```
000000000000000000000000105199a26b10e55300cb71b46c5b5e867b7df427000000000000000000000000000000000000000000000002b5e3af16b1880000
```

### Step 1: Get the Function definition

With the first 10 bytes representing the function the ABI can be looked up at b32. Each hash has its own JSON file containing all known definitions:

[https://b32.vecha.in/q/0xa9059cbb.json](https://b32.vecha.in/q/0xa9059cbb.json)

The list can contain multiple matches from multiple contracts that have similar definitions because multiple contracts can implement the same functions.

The first one will work in most situations, it is:

```json
{
	"inputs": [
		{
			"internalType": "address",
			"name": "to",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "value",
			"type": "uint256"
		}
	],
	"name": "transfer",
	"outputs": [
		{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}
	],
	"stateMutability": "nonpayable",
	"type": "function",
	"$contractName": "abcd_test_v1"
}
```

### Step 2: Translate Data + ABI = readable parameters

[web3-eth-abi](https://www.npmjs.com/package/web3-eth-abi) offers the ability to decode parameters from the data:

```js
const decodedData = Web3EthAbi.decodeParameters(
    abi.inputs,     // ABI input for the function
    data.slice(10)  // Data following the function signature
);
```

The example data will decode to this:

```json
{
    "0": "0x105199a26b10e55300CB71B46c5B5e867b7dF427",
    "1": "50000000000000000000",
    "__length__": 2,
    "to": "0x105199a26b10e55300CB71B46c5B5e867b7dF427",
    "value": "50000000000000000000"
}
```

### Step 3: Make it readable

The inputs of the ABI have names for the parameters which makes it easy to understand what's going, once the function name is added:

```
transfer(
	address to = 0x105199a26b10e55300CB71B46c5B5e867b7dF427
	value uint256 = 50000000000000000000
)
```

### Links

* Sandbox that shows the complete flow:\
  [https://codesandbox.io/embed/decode-transaction-information-ighopw?fontsize=14\&hidenavigation=1\&theme=dark](https://codesandbox.io/s/ighopw?file=/src/App.tsx)\
  \
  _The Sandbox will list all ABI matches instead of the first one._
* [B32 Registry](https://github.com/vechain/b32)
* [web3-eth-abi](https://presearch.com/search?q=web3-eth-abi)
* [decodeParameters Documentation](https://web3js.readthedocs.io/en/v1.8.1/web3-eth-abi.html#decodeparameters)

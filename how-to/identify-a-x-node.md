# Identify a (X-)Node

Nodes, especially X-Nodes are lovingly supported by the community thru benefits sometimes. VeChain-Nodes are NFTs with all code-relevant information on their contracts and their interfaces located on GitHub: [https://github.com/vechain/ThorNode-contracts](https://github.com/vechain/ThorNode-contracts)

The contract on the MainNet is found at:

```
0xb81E9C5f9644Dec9e5e3Cac86b4461A222072302
```

An interface for Solidity can be generated using [`abi-to-sol`](https://github.com/gnidan/abi-to-sol) and the public [b32](https://github.com/vechain/b32/tree/master/ABIs) archive:

```shell
curl -s https://raw.githubusercontent.com/vechain/b32/master/ABIs/thornode-tokenauction.json | npx abi-to-sol IThorNode > src/IThorNode.sol
```

## Just a simple Yes and No <a href="#4d47" id="4d47"></a>

`isX(address)` returns a boolean about the XNode status. The function is defined here:\
[https://github.com/vechain/ThorNode-contracts/blob/b3e1765ed7b1599b301602a0e0f72587cf24be1b/contracts/ThunderFactory.sol#L101-L109](https://github.com/vechain/ThorNode-contracts/blob/b3e1765ed7b1599b301602a0e0f72587cf24be1b/contracts/ThunderFactory.sol#L101-L109)

```solidity
function isX(address _target)
    public
    view
    returns(bool)
{
    // return false if given address doesn't hold a token
    return tokens[ownerToId[_target]].level >= strengthLevel.VeThorX;
}
```

### Solidity <a href="#e233" id="e233"></a>

Calling this in solidity using the previously generated Interface:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IThorNode.sol";

contract XNode {
    address ThorAuction = 0xb81E9C5f9644Dec9e5e3Cac86b4461A222072302;

    function isXNode(address _owner) external view returns (bool isX) {
        return IThorNode(ThorAuction).isX(_owner);
    }
}
```

### Connex <a href="#66e6" id="66e6"></a>

```javascript
const abiIsX = 	{
	"constant": true,
	"inputs": [
		{
			"name": "_target",
			"type": "address"
		}
	],
	"name": "isX",
	"outputs": [
		{
			"name": "isX",
			"type": "bool"
		}
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}

const {
  decoded: { 0: isX }
} = await connex.thor
  .account(CONTRACT_ADDRESS)
  .method(abiIsX)
  .call(address);
```

### Call-API <a href="#dbd8" id="dbd8"></a>

On the [Call-API](https://vechain.energy/docs/api/call):

```
https://call.api.vechain.energy/main/0xb81e9c5f9644dec9e5e3cac86b4461a222072302/isX(address <ADDRESS>) returns (bool)
```

For example address `0xf84090b27109454feE78987ae123EC7AEe4c27aE` it returns `true`:

[https://call.api.vechain.energy/main/0xb81e9c5f9644dec9e5e3cac86b4461a222072302/isX(address%200xf84090b27109454feE78987ae123EC7AEe4c27aE)%20returns%20(bool)](https://call.api.vechain.energy/main/0xb81e9c5f9644dec9e5e3cac86b4461a222072302/isX\(address%200xf84090b27109454feE78987ae123EC7AEe4c27aE\)%20returns%20\(bool\))

## Identify Token ID by address <a href="#91d4" id="91d4"></a>

The Token ID of each Node-NFT is available with `ownerToId` explained here:\
[https://github.com/vechain/ThorNode-contracts#ownertoid](https://github.com/vechain/ThorNode-contracts#ownertoid)

```solidity
function ownerToId(address _owner) public view
        returns (uint256)
```



```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IThorNode.sol";

contract XNode {
    address ThorAuction = 0xb81E9C5f9644Dec9e5e3Cac86b4461A222072302;
    
    function getMetadataForOwner(address _owner)
        external
        view
    {
        uint256 tokenId = IThorNode(ThorAuction).ownerToId(_owner);
    }
}
```

### Connex <a href="#3976" id="3976"></a>



```javascript
const abiOwnerToId = {
  "constant": true,
  "inputs": [
  	{ "name": "", "type": "address"	}
  ],
  "name": "ownerToId",
  "outputs": [
  	{ "name": "tokenId", "type": "uint256" }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}

const {
  decoded: { 0: tokenId }
} = await connex.thor
  .account(CONTRACT_ADDRESS)
  .method(abiOwnerToId)
  .call(address);
```

### Call-API <a href="#d225" id="d225"></a>

On the [Call-API](https://vechain.energy/docs/api/call): `https://call.api.vechain.energy/main/0xb81e9c5f9644dec9e5e3cac86b4461a222072302/ownerToId(address <ADDRESS>) returns (uint256)`

For example address `0xf84090b27109454feE78987ae123EC7AEe4c27aE` gives tokenId #1:

[https://call.api.vechain.energy/main/0xb81e9c5f9644dec9e5e3cac86b4461a222072302/ownerToId(address%200xf84090b27109454feE78987ae123EC7AEe4c27aE)%20returns%20(uint256)](https://call.api.vechain.energy/main/0xb81e9c5f9644dec9e5e3cac86b4461a222072302/ownerToId\(address%200xf84090b27109454feE78987ae123EC7AEe4c27aE\)%20returns%20\(uint256\))

## Identify Token-Status using Token ID <a href="#e0db" id="e0db"></a>

The (X-Node-)Status and more is available with `getMetadata` explained here:\
[https://github.com/vechain/ThorNode-contracts#getmetadata](https://github.com/vechain/ThorNode-contracts#getmetadata)

```solidity
function getMetadata(uint256 _tokenId) public view 
    returns(
            address owner,
            uint8 level,
            bool isOnUpgrade,
            bool isOnAuction,
            uint64 lastTransferTime,
            uint64 createdAt,
            uint64 updatedAt
    )
```

### Solidity <a href="#2491" id="2491"></a>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IThorNode.sol";

contract XNode {
    address ThorAuction = 0xb81E9C5f9644Dec9e5e3Cac86b4461A222072302;

    function getMetadataForOwner(address _owner)
        external
        view
        returns (
            address owner,
            uint8 level,
            bool isOnUpgrade,
            bool isOnAuction,
            uint64 lastTransferTime,
            uint64 createdAt,
            uint64 updatedAt
        )
    {
        uint256 tokenId = IThorNode(ThorAuction).ownerToId(_owner);
        return IThorNode(ThorAuction).getMetadata(tokenId);
    }
}
```

### Connex <a href="#07db" id="07db"></a>

```javascript
const abiGetMetadata = {
	"constant": true,
	"inputs": [
		{ "name": "_tokenId", "type": "uint256" }
	],
	"name": "getMetadata",
	"outputs": [
		{ "name": "owner", "type": "address" },
		{ "name": "level", "type": "uint8" },
		{ "name": "isOnUpgrade", "type": "bool"	},
		{ "name": "isOnAuction", "type": "bool"	},
		{ "name": "lastTransferTime", "type": "uint64" },
		{ "name": "createdAt", "type": "uint64"	},
		{ "name": "updatedAt", "type": "uint64"	}
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}

const {
  decoded: metadata
} = await connex.thor
  .account(CONTRACT_ADDRESS)
  .method(abiGetMetadata)
  .call(tokenId);
```

### Call-API <a href="#0740" id="0740"></a>

On the [Call-API](https://vechain.energy/docs/api/call):\
`ttps://call.api.vechain.energy/main/0xb81e9c5f9644dec9e5e3cac86b4461a222072302/getMetadata(uint256 <TOKEN_ID>) returns (address owner, uint8 level, bool isOnUpgrade, bool isOnAuction, uint256 lastTransferTime, uint64 createdAt, uint64 updatedAt)`

For example Token Id `1` results are:

```json
{
	"owner": "0xf84090b27109454feE78987ae123EC7AEe4c27aE",
	"level": "4",
	"isOnUpgrade": false,
	"isOnAuction": false,
	"lastTransferTime": "1543977040",
	"createdAt": "1543977040",
	"updatedAt": "1543977040"
}
```

[https://call.api.vechain.energy/main/0xb81e9c5f9644dec9e5e3cac86b4461a222072302/getMetadata(uint256%201)%20returns%20(address%20owner,%20uint8%20level,%20bool%20isOnUpgrade,%20bool%20isOnAuction,%20uint256%20lastTransferTime,%20uint64%20createdAt,%20uint64%20updatedAt)](https://call.api.vechain.energy/main/0xb81e9c5f9644dec9e5e3cac86b4461a222072302/getMetadata\(uint256%201\)%20returns%20\(address%20owner,%20uint8%20level,%20bool%20isOnUpgrade,%20bool%20isOnAuction,%20uint256%20lastTransferTime,%20uint64%20createdAt,%20uint64%20updatedAt\))

## Token-Level as readable name <a href="#2cce" id="2cce"></a>

The level can be translated into a readable name to with the following table:

<table><thead><tr><th width="155">Level</th><th>Name</th></tr></thead><tbody><tr><td>1</td><td>VeChainThor Strength Node</td></tr><tr><td>2</td><td>VeChainThor Thunder Node</td></tr><tr><td>3</td><td>VeChainThor Mjolnir Node</td></tr><tr><td>4</td><td>VeChainThor X Node</td></tr><tr><td>5</td><td>VeChainThor Strength X Node</td></tr><tr><td>6</td><td>VeChainThor Thunder X Node</td></tr><tr><td>7</td><td>VeChainThor Mjolnir X Node</td></tr></tbody></table>

## Links <a href="#cdba" id="cdba"></a>

The sample contract is available on GitLab here: [https://gitlab.com/vechain.energy/examples/contract-xnode](https://gitlab.com/vechain.energy/examples/contract-xnode)

The connex example is available as Sandbox here:\
[https://codesandbox.io/s/read-node-status-of-an-address-3u1vli](https://codesandbox.io/s/read-node-status-of-an-address-3u1vli)

Details about the Call-API can be found here:\
[https://vechain.energy/docs/api/call](https://vechain.energy/docs/api/call)

\

# States & View-Functions

A state is a variable or view that can change over time. A state is always the same at the same block height.

## Example Conditions

### Source Code

The VTHO contract's source code is available on GitHub:\
[https://github.com/vechain/thor/blob/f58c17ae50f1ec8698d9daf6e05076d17dcafeaf/builtin/gen/energy.sol](https://github.com/vechain/thor/blob/f58c17ae50f1ec8698d9daf6e05076d17dcafeaf/builtin/gen/energy.sol)

### Contract address

The public VTHO contract is used. Address is identical on Test and MainNet.

```solidity
0x0000000000000000000000000000456E65726779
```

### ABI

Definition of the `balanceOf` that returns the VTHO balance for a given address.

```json
{
    "constant": true,
    "inputs": [
        {
            "name": "_owner",
            "type": "address"
        }
    ],
    "name": "balanceOf",
    "outputs": [
        {
            "name": "balance",
            "type": "uint256"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}
```

### Function definition

```solidity
function balanceOf(address _owner) public view returns(uint256 balance) {}
```

### Connex Example

```typescript
const result = await connex.thor
  .account(CONTRACT_ADDRESS)
  .method(abi)
  .call(address);
  
console.log(result.decoded.balance)
```

## Examples

1. [React, Connex, single value](https://codesandbox.io/s/read-contract-state-with-connex-q24lne)
2. [React, Connex, multiple values](https://codesandbox.io/s/read-multiple-contract-states-with-connex-0rvos0)

{% hint style="info" %}
vechain.energy offers a REST-API for simplified access.

[Learn more about it here.](../../vechain.energy/read-data-from-smart-contracts/states.md)
{% endhint %}
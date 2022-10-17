# Contract-Verification

For every sponsorship one contract-address can be configured. The contract needs to support the function `canSponsorTransactionFor`. This function is called with the transaction parameters on each sponsor request.

## Function-Definition

Add this function to your contract to support verification:

```java
function canSponsorTransactionFor (address _origin, address _to, bytes calldata _data) public view returns (bool) {
  return true; // return true to confirm sponsorship, false to reject
}
```

### Example-Snippets

#### ERC20/VIP-180 Transfers

Decode the transaction data and verify the recipient address. Owner in this example.

```solidity
function canSponsorTransactionFor(
    address _origin,
    address _to,
    bytes calldata _data
) public view returns (bool) {

  if (_data.length <= 42) { return false; }

  bytes4 functionTransferSignature = bytes4(keccak256("transfer(address,uint256)"));
  bytes4 functionSignature = abiDecodeSig(_data);

  address _dataTo;
  (_dataTo) = abi.decode(abi.encodePacked(_data[4:]), (address));
  
  // verify function signature is transfer(address,uint256)
  // and first argument to function is owner of the contract
  if (
      functionSignature == functionTransferSignature &&
      _dataTo == owner()
  ) {
      return true;
  }

  return false;
}

function abiDecodeSig(bytes memory _data) private pure returns (bytes4 sig) {
  assembly {
    sig := mload(add(_data, add(0x20, 0)))
  }
}
```

#### NFT-Token-Owner (ERC721/VIP-181)

Sponsor transactions for all token owners using `balanceOf`

```solidity
function canSponsorTransactionFor(
  address _origin,
  address _to,
  bytes calldata _data
) public view returns (bool) {

  if (balanceOf(_origin) > 0) {
    return true;
  }

  return false;
}
```

####

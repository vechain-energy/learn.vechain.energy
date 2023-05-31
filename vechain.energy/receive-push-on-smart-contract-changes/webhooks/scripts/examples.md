# Examples

## NFT Transfer + TokenURI

* When a NFT is transferred
* Then load the NFT Tokens URI
* And append it to the Payload

### Listener-Event

```solidity
Transfer (address indexed from, address indexed to, uint256 indexed tokenId)
```

### Payload

```json
{
   "contract": "{{emitter}}",
   "from": "{{from}}",
   "to": "{{to}}",
   "tokenId": "{{tokenId}}",
   "meta": {
      "txID": "{{meta.txID}}",
      "txOrigin": "{{meta.txOrigin}}",
      "blockID": "{{meta.blockID}}",
      "clauseIndex": {{meta.clauseIndex}},
      "blockNumber": {{meta.blockNumber}},
      "blockTimestamp": {{meta.blockTimestamp}}
   }
}
```

### Modifier

```javascript
async (payload, event) => {
   // use simplified signature syntax
   const tokenUri = await Energy.call({
     to: payload.contract,
     signature: `tokenURI(uint256 ${payload.tokenId}) returns (string uri)`
   })

   // result will be a string with the URI
   // an error object if something failed
   if (typeof(tokenUri) !== 'string') {
     return payload
   }

   return {
     ...payload,
     tokenUri
   }
}
```

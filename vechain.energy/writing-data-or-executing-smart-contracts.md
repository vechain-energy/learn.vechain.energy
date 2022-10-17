# Writing data or executing smart contracts

The state of a smart contract can be changed during a transaction. A transaction requires the signature of an authorized user and a gas fee paid in VTHO. The signed transaction is broadcast to a blockchain node. An authorized node updates the smart contract state and documents the transaction.

The Transact-API provides access to transactions using a REST API. Signing and broadcasting is included.\
The OpenAPI Documentation is available at [https://vechain.energy/docs/api/transact](https://vechain.energy/docs/api/transact)

The example uses a public contract and executes a function with an argument on the TestNet.

## Conditions

### Source Code

The VTHO contract's source code is available on GitHub:\
[https://github.com/vechain/thor/blob/f58c17ae50f1ec8698d9daf6e05076d17dcafeaf/builtin/gen/energy.sol](https://github.com/vechain/thor/blob/f58c17ae50f1ec8698d9daf6e05076d17dcafeaf/builtin/gen/energy.sol)

### Contract address

The public VTHO contract is used. Address is identical on Test and MainNet.

```solidity
0x0000000000000000000000000000456E65726779
```

### ABI

Definition of the `Transfer` that transfers VTHO between addresses.

```json
{
    "constant": false,
    "inputs": [
        { "name": "_to", "type": "address" },
        { "name": "_amount", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [
        { "name": "success", "type": "bool" }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}
```

### Function definition

```solidity
function transfer(address _to, uint256 _amount) public returns(bool success) {}
```

### Connex Example

```typescript
const clause = connex.thor
  .account(CONTRACT_ADDRESS)
  .method(ABI)
  .asClause(ZERO_ADDRESS, 0);
  
const result = await connex.vendor
  .sign("tx", [clause])
  .delegate(DELEGATE_URL)
  .request();  

console.log(result.txid)
```

### API-Key

To access the transaction API a Sponsorship and API-Key is required. Both can be obtained for free in the API section of every Sponsorship on [vechain.energy](https://vechain.energy). Each API-Key is associated with a private key that is used for the transaction.

API-Key:

```
b8zbx4sayq.ef0cf407fc75afcf082f3022464e14ea37e40c5b9064265e4ecb9b273be7f705
```

Sponsorship-URL:

```
https://sponsor-testnet.vechain.energy/by/115/transaction
```

### Private-Key

A custom private key:

```solidity
0x9e7d826198506e70d6566184b95e291b314969b37c9a544c00e8f5bc4e1ca835
```

## Transactions with Signature

With the function signature a transaction is readable by humans and can be manually written. Because return values are not available due the async-nature of transactions, they are not supported in the function call.

The transaction is sent as POST-Request and the API-Key:

```javascript
const ENDPOINT = 'https://sponsor-testnet.vechain.energy/by/115/transaction'
const CONTRACT_ADDRESS = '0x0000000000000000000000000000456E65726779'
const ARG1_ADDRESS = '0x0000000000000000000000000000000000000000'
const FUNCTION_CALL = `transfer(address ${ARG1_ADDRESS}, uint256 0)`
const API_KEY = 'b8zbx4sayq.ef0cf407fc75afcf082f3022464e14ea37e40c5b9064265e4ecb9b273be7f705'

const result = await window.fetch(ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
                clauses: [ `${CONTRACT_ADDRESS}.${FUNCTION_CALL}` ]
        }),
        headers: {
                'Content-Type': 'application/json',
                'X-API-Key': API_KEY
        }
    })
const transaction = await result.json()
```

**curl**

```shell
curl -X POST https://sponsor-testnet.vechain.energy/by/115/transaction -s \
  -H 'Content-Type: application/json' \
  -H 'X-API-Key: b8zbx4sayq.ef0cf407fc75afcf082f3022464e14ea37e40c5b9064265e4ecb9b273be7f705' \
  -d '
  {
    "clauses": [
      "0x0000000000000000000000000000456E65726779.transfer(address 0x0000000000000000000000000000000000000000, uint256 0)"
    ]
  }
  '
```

## Transaction with ABI

The function signature is a comfort functionality to provide a human readable version that can be manually written. With growing complexity or because automatic processes provide ABI files it is possible to use ABI as well.

The transaction is sent as POST-Request and the API-Key. The arguments are given as a list in the order of the function input definition:

```javascript
const ENDPOINT = 'https://sponsor-testnet.vechain.energy/by/115/transaction'
const CONTRACT_ADDRESS = '0x0000000000000000000000000000456E65726779'
const ARG1_ADDRESS = '0x0000000000000000000000000000000000000000'
const ABI = {
    "constant": false,
    "inputs": [
        { "name": "_to", "type": "address" },
        { "name": "_amount", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [
        { "name": "success", "type": "bool" }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}
const API_KEY = 'b8zbx4sayq.ef0cf407fc75afcf082f3022464e14ea37e40c5b9064265e4ecb9b273be7f705'

const result = await window.fetch(ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
                clauses: [
                    {
                        to: CONTRACT_ADDRESS,
                        abi: ABI,
                        args: [ARG1_ADDRESS, 0]
                    }
                ]
        }),
        headers: {
                'Content-Type': 'application/json',
                'X-API-Key': API_KEY
        }
    })
const transaction = await result.json()
```

**curl**

```shell
curl -X POST https://sponsor-testnet.vechain.energy/by/115/transaction -s \
  -H 'Content-Type: application/json' \
  -H 'X-API-Key: b8zbx4sayq.ef0cf407fc75afcf082f3022464e14ea37e40c5b9064265e4ecb9b273be7f705' \
  -d '
  {
    "clauses": [
      {
        "to": "0x0000000000000000000000000000456E65726779",
        "abi": {
            "constant": false,
            "inputs": [
                { "name": "_to", "type": "address" },
                { "name": "_amount", "type": "uint256" }
            ],
            "name": "transfer",
            "outputs": [
                { "name": "success", "type": "bool" }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        "args": ["0x0000000000000000000000000000000000000000", 0]
      } ]
  }
  '  
```

## Transaction with custom Private Key

The API-Key is associated with a private key and wallet. Another custom private key can be sent with the transaction to use it as sender and signer of the transaction.

The transaction is sent as POST-Request, the API-Key and an additional Private-Key:

```javascript
const ENDPOINT = 'https://sponsor-testnet.vechain.energy/by/115/transaction'
const CONTRACT_ADDRESS = '0x0000000000000000000000000000456E65726779'
const ARG1_ADDRESS = '0x0000000000000000000000000000000000000000'
const FUNCTION_CALL = `transfer(address ${ARG1_ADDRESS}, uint256 0)`
const API_KEY = 'b8zbx4sayq.ef0cf407fc75afcf082f3022464e14ea37e40c5b9064265e4ecb9b273be7f705'
const PRIVATE_KEY = '0x9e7d826198506e70d6566184b95e291b314969b37c9a544c00e8f5bc4e1ca835' 

const result = await window.fetch(ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
                clauses: [ `${CONTRACT_ADDRESS}.${FUNCTION_CALL}` ]
        }),
        headers: {
                'Content-Type': 'application/json',
                'X-API-Key': API_KEY,
                'X-Private-Key': PRIVATE_KEY
        }
    })
const transaction = await result.json()
```

**curl**

```shell
curl -X POST https://sponsor-testnet.vechain.energy/by/115/transaction -s \
  -H 'Content-Type: application/json' \
  -H 'X-API-Key: b8zbx4sayq.ef0cf407fc75afcf082f3022464e14ea37e40c5b9064265e4ecb9b273be7f705' \
  -d '
  {
    "clauses": [
      "0x0000000000000000000000000000456E65726779.transfer(address 0x0000000000000000000000000000000000000000, uint256 0)"
    ]
  }
  '
```

## Result

A successfully broadcasted transaction returns the transaction id, it will be pending until the next block:

```json
{
  "id": "0x62f1b2492ac6158799f80de2f418766d2d0ea8c98130d0d2138944dbc884c54f",
  "url": "https://testnet.veblocks.net/transactions/0x62f1b2492ac6158799f80de2f418766d2d0ea8c98130d0d2138944dbc884c54f?pending=true"
}
```

The status of the transaction can be verified using the returned transaction url. The transaction url links to a Blockchain-Node and provides status information about the transaction using a RESTful-JSON-Interface.

Example: [https://testnet.veblocks.net/transactions/0x62f1b2492ac6158799f80de2f418766d2d0ea8c98130d0d2138944dbc884c54f?pending=true](https://testnet.veblocks.net/transactions/0x62f1b2492ac6158799f80de2f418766d2d0ea8c98130d0d2138944dbc884c54f?pending=true)

If `meta` in the response is `null` then the transaction is still pending. If the transaction was completed, `meta` will have information about the block containing the transaction.

## VTHO Gas Fee

Each API-Key is created within the scope of a Sponsorship. The Sponsorship will pay for the transaction.

## Endpoint

{% swagger src="../.gitbook/assets/swagger-transaction.json" path="/by/{tokenId}/transaction" method="post" %}
[swagger-transaction.json](../.gitbook/assets/swagger-transaction.json)
{% endswagger %}


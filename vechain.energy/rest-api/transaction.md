# Transaction

Every Sponsorship can have multiple API-Keys. API-Keys remove the web3 and wallet management on the client side. Transactions can be generated using a RESTful API.

### Management

API-Keys can be created in the Web-Interface for each Sponsorship. An API-Key-Secret is generated locally and needs to be backed up. The API-Key-Secret is sent with each request.

|                                                                             |                                                                                       |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| <img src="../../.gitbook/assets/image (5).png" alt="" data-size="original"> | <h3><img src="../../.gitbook/assets/image (10).png" alt="" data-size="original"></h3> |

### Permissions

Each API-Key is represented by a private key. The address of the private key can be whitelisted in a Sponsorship to allow all transactions from it (sender).

If not whitelisted, then the regular Sponsorship logic applies (recipient, contract validation).

Options allow to switch between "_allow to interact with everyone_" and "_limit to Sponsorship Logic_". Allowing an interaction with everyone will add the address to the allowed senders.

### VTHO Costs

Each API-Key is created within the scope of a Sponsorship. The Sponsorship will pay for the transaction.

### Transaction Response&#x20;

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

## Executing Contract Functions

{% swagger src="https://sponsor-testnet.vechain.energy/documentation/json?" path="/by/{tokenId}/transaction" method="post" %}
[https://sponsor-testnet.vechain.energy/documentation/json?](https://sponsor-testnet.vechain.energy/documentation/json?)
{% endswagger %}

[_Swagger-Documentation_](https://sponsor-testnet.vechain.energy/documentation/static/index.html#/sign/post\_by\_\_tokenId\_\_transaction)

1. `POST /by/##/transaction`
2. `X-API-Key: <API-Key-Secret>`
3. Return value is the transaction id with link to its status `{ id, url }`
4. Multi-Clause requests are explicitly supported

### Simplified-String-Calls

To simplify calls the simplest way to call is a custom built string of `0x<ContractAddress>.<FunctionName>(<Value>: <Type>)`

```bash
curl -X POST https://sponsor-testnet.vechain.energy/by/115/transaction \
  -H "X-API-Key: gqxao258sg.65fdb6ea8d8f634080fb65322f3170fed920b7dc4adc3f805ec023de07b27282" \
  -H "Content-Type: application/json" \
  -d '{"clauses": [ "0x8384738C995D49C5b692560ae688fc8b51af1059.increment()" ]}'
```

Multiple parameters can be comma separated, for example:

```solidity
0x8384738C995D49C5b692560ae688fc8b51af1059.funcName(string stringValue, uint256 123)
```

Values with `,` can be escape with a `\,` for example: `.funcName(1\\,5: string)`.

### Raw Clause Data

Already encoded data can be sent as raw clause data.

```bash
curl -X POST https://sponsor-testnet.vechain.energy/by/115/transaction \
  -H "X-API-Key: gqxao258sg.65fdb6ea8d8f634080fb65322f3170fed920b7dc4adc3f805ec023de07b27282" \
  -H "Content-Type: application/json" \
  -d '{"clauses": [ {"to": "0x8384738C995D49C5b692560ae688fc8b51af1059", "data": "0xd09de08a"} ]}'
```

### ABI

If an ABI definition is given, the function call is encoded using the ABI definition and the list of args.

```bash
curl -X POST https://sponsor-testnet.vechain.energy/by/115/transaction \
  -H "X-API-Key: gqxao258sg.65fdb6ea8d8f634080fb65322f3170fed920b7dc4adc3f805ec023de07b27282" \
  -H "Content-Type: application/json" \
  -d '{"clauses": [ {"to": "0x8384738C995D49C5b692560ae688fc8b51af1059", "args": [], "abi": {"inputs": [], "name": "increment", "outputs": [], "stateMutability": "nonpayable", "type": "function"}} ]}'
```

### Signatures

Using a signature is simpler than an ABI, it is the function definition with data types.

```bash
curl -X POST https://sponsor-testnet.vechain.energy/by/115/transaction \
  -H "X-API-Key: gqxao258sg.65fdb6ea8d8f634080fb65322f3170fed920b7dc4adc3f805ec023de07b27282" \
  -H "Content-Type: application/json" \
  -d '{"clauses": [ {"to": "0x8384738C995D49C5b692560ae688fc8b51af1059", "args": [], "signature": "increment()"} ]}'
```


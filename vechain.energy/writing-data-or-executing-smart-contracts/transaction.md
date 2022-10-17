# API-Usage

{% swagger src="https://sponsor-testnet.vechain.energy/documentation/json?" path="/by/{tokenId}/transaction" method="post" %}
[https://sponsor-testnet.vechain.energy/documentation/json?](https://sponsor-testnet.vechain.energy/documentation/json?)
{% endswagger %}

1. `POST /by/{sponsorshipId}/transaction`
2. `X-API-Key: <API-Key-Secret>`
3. (optional) `X-Private-Key: <Private Key>`
4. Return value is the transaction id with link to its status `{ id, url }`
5. Multi-Clause requests are explicitly supported

## Simplified-String-Calls

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

## Raw Clause Data

Already encoded data can be sent as raw clause data.

```bash
curl -X POST https://sponsor-testnet.vechain.energy/by/115/transaction \
  -H "X-API-Key: gqxao258sg.65fdb6ea8d8f634080fb65322f3170fed920b7dc4adc3f805ec023de07b27282" \
  -H "Content-Type: application/json" \
  -d '{"clauses": [ {"to": "0x8384738C995D49C5b692560ae688fc8b51af1059", "data": "0xd09de08a"} ]}'
```

## ABI

If an ABI definition is given, the function call is encoded using the ABI definition and the list of args.

```bash
curl -X POST https://sponsor-testnet.vechain.energy/by/115/transaction \
  -H "X-API-Key: gqxao258sg.65fdb6ea8d8f634080fb65322f3170fed920b7dc4adc3f805ec023de07b27282" \
  -H "Content-Type: application/json" \
  -d '{"clauses": [ {"to": "0x8384738C995D49C5b692560ae688fc8b51af1059", "args": [], "abi": {"inputs": [], "name": "increment", "outputs": [], "stateMutability": "nonpayable", "type": "function"}} ]}'
```

## Signatures

Using a signature is simpler than an ABI, it is the function definition with data types.

```bash
curl -X POST https://sponsor-testnet.vechain.energy/by/115/transaction \
  -H "X-API-Key: gqxao258sg.65fdb6ea8d8f634080fb65322f3170fed920b7dc4adc3f805ec023de07b27282" \
  -H "Content-Type: application/json" \
  -d '{"clauses": [ {"to": "0x8384738C995D49C5b692560ae688fc8b51af1059", "args": [], "signature": "increment()"} ]}'
```


# Response-Handling

A successfully broadcasted transaction returns the transaction id, it will be pending until the next block:

```json
{
  "id": "0x62f1b2492ac6158799f80de2f418766d2d0ea8c98130d0d2138944dbc884c54f",
  "url": "https://testnet.veblocks.net/transactions/0x62f1b2492ac6158799f80de2f418766d2d0ea8c98130d0d2138944dbc884c54f?pending=true"
}
```

The status of the transaction can be verified using the returned transaction url. The transaction url links to a Blockchain-Node and provides status information about the transaction using a RESTful-JSON-Interface.



**Example:**

****[https://testnet.veblocks.net/transactions/0x62f1b2492ac6158799f80de2f418766d2d0ea8c98130d0d2138944dbc884c54f?pending=true](https://testnet.veblocks.net/transactions/0x62f1b2492ac6158799f80de2f418766d2d0ea8c98130d0d2138944dbc884c54f?pending=true)

If `meta` in the response is `null` then the transaction is still pending. If the transaction was completed, `meta` will have information about the block containing the transaction.

****

**Good practice would be to:**

1. extract `url` from response
2. load the `url` to verify transaction exists
3. if `meta` is `null`, sleep for 7 seconds and try again
4. if `meta` is not `null`, handled transaction result

##

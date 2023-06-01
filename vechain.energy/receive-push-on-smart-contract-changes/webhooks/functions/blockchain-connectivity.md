# Blockchain-Connectivity

Some generic functions that provide connectivity to other services for data enhancement are available. For example reading contract data or event information. Both public Vechain networks are available, allowing cross-vechain access.

### Call-API&#x20;

The [Call-API](../../../read-data-from-smart-contracts/states.md) allows you to make a POST request in the background to execute a specific function call on a smart contract. It is used to interact with smart contracts and retrieve data from them. The result of the function call is returned as the response. This API is typically used for read operations on the blockchain.

```typescript
type Network = 'main' | 'test'
type CallOptions = {
    network?: Network
    decodeBytes?: boolean
    encodeBytes?: boolean
    formatEther?: boolean
    revision?: string | number
}

Energy.call: (
    clauses: RequestClause | RequestClause[],
    options?: CallOptions
) => Promise<any>
```

#### Example

Using the balanceOf ABI from the VTHO contract the balance of the transaction origin is returned and will be passsed to the Webhook endpoint:

```typescript
async ({ event }) => {
  const originVthoBalance = await Energy.call({
      to: "0x0000000000000000000000000000456E65726779",
      abi: {"type":"function","name":"balanceOf","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"address","name":"owner"}],"outputs":[{"type":"uint256"}]},
      args: [event.meta.txOrigin]
    }, { formatEther: true })

  return { origin: event.meta.txOrigin, vtho: originVthoBalance }
}
```

### Events-API

The [Event-API](../../../read-data-from-smart-contracts/events-and-logs.md), on the other hand, allows you to make a POST request in the background to retrieve events emitted by smart contracts. Events are emitted when specific actions occur on the blockchain, such as token transfers or contract state changes. The API fetches these events based on defined criteria, such as contract address and event signature. The result of the API call is the collection of events that match the specified criteria.

```typescript
type Network = 'main' | 'test'
type EventOptions = {
    network?: Network
    unit?: 'block' | 'time'
    from?: number
    to?: number
    offset?: number
    limit?: number
    order?: 'asc' | 'desc'
}

Energy.events: (
    events: RequestEvent | RequestEvent[],
    options?: EventOptions
) => Promise<any[]>
```

#### Example

Using the Signature definition of a token transfer, the very first VTHO transfer is read and the  balance of the participants before the transfer returned.

```typescript
async ({ payload, event }) => {
  const [firstTransfer] = await Energy.events({
      address: "0x0000000000000000000000000000456E65726779",
      signature: "Transfer (address indexed _from, address indexed _to, uint256 _value)"
  }, { order: "asc", limit: 1 })

  const [senderBalance, recipientBalance] = await Energy.call([
    {
      to: "0x0000000000000000000000000000456E65726779",
      abi: {"type":"function","name":"balanceOf","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"address","name":"owner"}],"outputs":[{"type":"uint256",name:"vtho"}]},
      args: [firstTransfer._from]
    },
    {
      to: "0x0000000000000000000000000000456E65726779",
      abi: {"type":"function","name":"balanceOf","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"address","name":"owner"}],"outputs":[{"type":"uint256",name:"vtho"}]},
      args: [firstTransfer._to]
    }
    ], { formatEther: true, revision: firstTransfer._meta.blockNumber - 1 })

  return { payload, firstTransfer, senderBalance, recipientBalance }
}
```

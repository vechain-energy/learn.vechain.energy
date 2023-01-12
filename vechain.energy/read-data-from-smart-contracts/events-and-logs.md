# Events & Logs

Events are signals that are emitted from smart contracts. Every event is logged, immutable and accessable using a blockchain node only. Smart contracts can not access events themself.

Client-Applications can either listen to events and act accordingly or use logged events to access historical data.

The Event-API provides searchable & paginated access to event logs using a REST API.\
The OpenAPI Documentation is available at [https://vechain.energy/docs/api/event](https://vechain.energy/docs/api/event)

The example uses a public contract and paginates thru the results.

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

Definition of the `event Transfer` that is emitted on every VTHO Transfer.

```json
 {
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "name": "_from",
            "type": "address"
        },
        {
            "indexed": true,
            "name": "_to",
            "type": "address"
        },
        {
            "indexed": false,
            "name": "_value",
            "type": "uint256"
        }
    ],
    "name": "Transfer",
    "type": "event"
}
```

### Event definition

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value);
```

### Connex Example

```typescript
const event = connex.thor.account(CONTRACT_ADDRESS).event(ABI);
const logs = await event
  .filter([{ _to: address }])
  .order("desc")
  .apply(0, 20);
  
console.log(logs)
```

## Browse logs of a single Event with a GET-Requests

With the GET-Request a quick access is given that supports a direct integration into existing web-applications. A quick browsing and human interaction is possible [Read the OpenAPI Documentation for more details.](https://vechain.energy/docs/api/event)

The URL of the request is a combination of the network, contract address, event signature and optionally filters:

```javascript
const ENDPOINT = 'https://event.api.vechain.energy'
const NETWORK = 'main'
const CONTRACT_ADDRESS = '0x0000000000000000000000000000456E65726779'
const FILTER = {
    _to: '0x0000000000000000000000000000456E65726779',
    offset: 0,
    limit: 20
}
const EVENT_DEFINITION = `event Transfer(address indexed _from, address indexed _to, uint256 _value)`

const filterQuery = Object.keys(FILTER).map(key => key + '=' + FILTER[key]).join('&');
const url = `${ENDPOINT}/${NETWORK}/${CONTRACT_ADDRESS}/${encodeURI(EVENT_DEFINITION)}?${filterQuery}`

const result = await window.fetch(url)
const logs = await result.json()
```

**Example Link:**\
****[https://event.api.vechain.energy/main/0x0000000000000000000000000000456E65726779/event%20Transfer(address%20indexed%20\_from,%20address%20indexed%20\_to,%20uint256%20\_value)?\_to=0x0000000000000000000000000000456E65726779\&offset=0\&limit=20](https://event.api.vechain.energy/main/0x0000000000000000000000000000456E65726779/event%20Transfer\(address%20indexed%20\_from,%20address%20indexed%20\_to,%20uint256%20\_value\)?\_to=0x0000000000000000000000000000456E65726779\&offset=0\&limit=20)

**curl**

```shell
curl 'https://event.api.vechain.energy/main/0x0000000000000000000000000000456E65726779/event%20Transfer(address%20indexed%20_from,%20address%20indexed%20_to,%20uint256%20_value)?_to=0x0000000000000000000000000000456E65726779&offset=0&limit=20'
```

### Endpoint

{% swagger src="https://event.api.vechain.energy/swagger.json" path="/{networkType}/{address}/{signature}" method="get" %}
[https://event.api.vechain.energy/swagger.json](https://event.api.vechain.energy/swagger.json)
{% endswagger %}

## **Browse logs of** multiple Events in one Request

Different events or different filters are available within a POST-Request. Pagination is applied the whole list. The request is always for a single network.

```javascript
const ENDPOINT = 'https://event.api.vechain.energy'
const NETWORK = 'main'
const CONTRACT_ADDRESS = '0x0000000000000000000000000000456E65726779'
const EVENT_DEFINITION = `event Transfer(address indexed _from, address indexed _to, uint256 _value)`

const url = `${ENDPOINT}/${NETWORK}`
const body = { events:
    [
        { address: CONTRACT_ADDRESS, signature: EVENT_DEFINITION, _to: "0x0000000000000000000000000000456E65726779" },
        { address: CONTRACT_ADDRESS, signature: EVENT_DEFINITION, _from: "0x0000000000000000000000000000456E65726779" }
    ],
    offset: 0,
    limit: 20
    }

const result = await window.fetch(url, { method: 'POST', body: JSON.stringify(body) })
const logs = await result.json()
```

**curl**

```shell
curl 'https://event.api.vechain.energy/main' \
  --data-raw '{"events":[{"address":"0x0000000000000000000000000000456E65726779","signature":"event Transfer(address indexed _from, address indexed _to, uint256 _value)","_to":"0x0000000000000000000000000000456E65726779"},{"address":"0x0000000000000000000000000000456E65726779","signature":"event Transfer(address indexed _from, address indexed _to, uint256 _value)","_from":"0x0000000000000000000000000000456E65726779"}],"offset":0,"limit":20}'
```

### Signature

The function signature is a comfort functionality to provide a human readable version that can be manually written. The signature is the event definition.

### Filter

Each parameter of the event has a name. The name is the filter variable.

Because the name is flexible, possible conflicts with existing parameters of the API can be removed by renaming them (for example by prefixing them with `_)`

### Endpoint

{% swagger src="https://event.api.vechain.energy/swagger.json" path="/{networkType}" method="post" %}
[https://event.api.vechain.energy/swagger.json](https://event.api.vechain.energy/swagger.json)
{% endswagger %}

## Examples

1. [React, Connex](https://codesandbox.io/s/list-event-logs-from-contract-with-connex-3wotwr)
2. [React, API, window.fetch, single event filter](https://codesandbox.io/s/list-event-logs-from-contract-with-api-fetch-099e7i)
3. [React, API, useFetch, single event filter](https://codesandbox.io/s/list-event-logs-from-contract-with-api-usefetch-ekichj)
4. [React, API, useFetch, multiple event filters](https://codesandbox.io/s/list-event-logs-from-contract-with-multiple-filters-using-api-usefetch-cc66i6)

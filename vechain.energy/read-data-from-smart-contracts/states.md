# States

A state is a variable or view that can change over time. A state is always the same at the same block height.

The Call-API provides access to state variables using a REST API.\
The OpenAPI Documentation is available at [https://vechain.energy/docs/api/call](https://vechain.energy/docs/api/call)

The example uses a public contract and calls a function with an argument.

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

## Reading a single variable with a GET-Request

With the GET-Request a quick access is given that supports a direct integration into existing web-applications. Several comfort functions like redirects and base64 decoding is available. [Read the OpenAPI Documentation for more details](https://vechain.energy/docs/api/call).

The URL of the request is a combination of the network, contract address and function signature:

```javascript
const ENDPOINT = 'https://call.api.vechain.energy'
const NETWORK = 'main'
const CONTRACT_ADDRESS = '0x0000000000000000000000000000456E65726779'
const ARG1_ADDRESS = '0x0000000000000000000000000000000000000000'
const FUNCTION_CALL = `balanceOf(address ${ARG1_ADDRESS}) public view returns(uint256 balance)`

const url = `${ENDPOINT}/${NETWORK}/${CONTRACT_ADDRESS}/${encodeURI(FUNCTION_CALL)}`

const result = await window.fetch(url)
const balance = await result.json()
```

**Example Link:**

[https://call.api.vechain.energy/main/0x0000000000000000000000000000456E65726779/balanceOf(address%200x0000000000000000000000000000000000000000)%20public%20view%20returns(uint256%20balance)](https://call.api.vechain.energy/main/0x0000000000000000000000000000456E65726779/balanceOf\(address%200x0000000000000000000000000000000000000000\)%20public%20view%20returns\(uint256%20balance\))

**curl**

```shell
curl 'https://call.api.vechain.energy/main/0x0000000000000000000000000000456E65726779/balanceOf(address%200x0000000000000000000000000000000000000000)%20public%20view%20returns(uint256%20balance)'
```

### Endpoint

{% swagger src="https://call.api.vechain.energy/swagger.json" path="/{networkType}/{address}/{signature}" method="get" %}
[https://call.api.vechain.energy/swagger.json](https://call.api.vechain.energy/swagger.json)
{% endswagger %}

## Reading multiple variables in one Request

Multiple states from different sources can be loaded. The request is always for a single network.

<pre class="language-javascript"><code class="lang-javascript"><strong>const ENDPOINT = 'https://call.api.vechain.energy'
</strong>const NETWORK = 'main'
const CONTRACT_ADDRESS = '0x0000000000000000000000000000456E65726779'
const ARG1_ADDRESS = '0x0000000000000000000000000000000000000000'
const FUNCTION_CALL = `balanceOf(address ${ARG1_ADDRESS}) public view returns(uint256 balance)`

const url = `${ENDPOINT}/${NETWORK}`
const body = { clauses:
    [
        { to: CONTRACT_ADDRESS, signature: FUNCTION_CALL },
        { to: CONTRACT_ADDRESS, signature: FUNCTION_CALL }
    ] }

const result = await window.fetch(url, { method: 'POST', body: JSON.stringify(body) })
const balances = await result.json()</code></pre>

**curl**

```shell
curl 'https://call.api.vechain.energy/main' \
  --data-raw '{"clauses":[{"to":"0x0000000000000000000000000000456E65726779","signature":"balanceOf(address 0x0000000000000000000000000000000000000000) public view returns(uint256 balance)"},{"to":"0x0000000000000000000000000000456E65726779","signature":"balanceOf(address 0x0000000000000000000000000000000000000000) public view returns(uint256 balance)"}]}'
```

### Signature

The function signature is a comfort functionality to provide a human readable version that can be manually written. The signature is the function head with the parameters written instead of variable names.

There are some limits to this type that come especially with the complexity of lists. An alternative way of accessing data is using the ABI.

### ABI

<pre class="language-javascript"><code class="lang-javascript"><strong>const ENDPOINT = 'https://call.api.vechain.energy'
</strong>const NETWORK = 'main'
const CONTRACT_ADDRESS = '0x0000000000000000000000000000456E65726779'
const ARG1_ADDRESS = '0x0000000000000000000000000000000000000000'
const ABI = {
    "constant": true,
    "inputs": [
        { "name": "_owner", "type": "address" }
    ],
    "name": "balanceOf",
    "outputs": [
        { "name": "balance", "type": "uint256" }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}

const url = `${ENDPOINT}/${NETWORK}`
const body = { clauses:
    [
        { to: CONTRACT_ADDRESS, abi: ABI, args: [ARG1_ADDRESS] },
        { to: CONTRACT_ADDRESS, abi: ABI, args: [ARG1_ADDRESS] }
    ] }

const result = await window.fetch(url, { method: 'POST', body: JSON.stringify(body) })
const balances = await result.json()</code></pre>

**curl**

```shell
curl 'https://call.api.vechain.energy/main' \
  --data-raw '{"clauses":[{"to":"0x0000000000000000000000000000456E65726779","abi":{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},"args":["0x0000000000000000000000000000000000000000"]},{"to":"0x0000000000000000000000000000456E65726779","abi":{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},"args":["0x0000000000000000000000000000000000000000"]}]}'
```

### Endpoint

{% swagger src="https://call.api.vechain.energy/swagger.json" path="/{networkType}" method="post" %}
[https://call.api.vechain.energy/swagger.json](https://call.api.vechain.energy/swagger.json)
{% endswagger %}

## Examples

1. [React, Connex, single value](https://codesandbox.io/s/read-contract-state-with-connex-q24lne)
2. [React, API, window.fetch, single value](https://codesandbox.io/s/read-contract-state-with-call-api-fetch-22rp2q)
3. [React, API, useFetch, single value](https://codesandbox.io/s/read-contract-state-with-call-api-usefetch-uo1u6g)
4. [API, Link, base64 decoded Blockchain SVG](https://call.api.vechain.energy/main/0x5bE4dC49e862cb28571664e3e692e61E8bf25F26/createTom\(\)%20returns%20\(string\)?decodeBase64=1\&contentType=image/svg%2Bxml)
5. [React, Connex, multiple values](https://codesandbox.io/s/read-multiple-contract-states-with-connex-0rvos0)
6. [React, API, useFetch, multiple values](https://codesandbox.io/s/read-multiple-contract-states-with-call-api-usefetch-kwir33)


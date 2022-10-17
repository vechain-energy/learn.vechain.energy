# WebHooks

Events emitted by contracts can trigger an API call using WebHooks.

## Definition

### Listener

Events can be defined with the code signature from solidity.

**Example:**

```solidity
Transfer (address indexed from, address indexed to, uint256 value)
```

Multiple contract addresses can be defined to listen for the event.\
If no contract is defined, any event matching the event signature will be a trigger on all contracts.

### Executioner

The WebHook is a Web-Request that can be custom built with:

1. Request Method (i.e. `GET`/`POST`/`PUT`/etc.)
2. Endpoint URL (the URL to call)
3. Content-Type Header
4. Body that is sent with `POST` and `PUT` requests
5. Optional Headers that are sent with a request (i.e. for authorization)

Emitted variables from the event or meta information from the transaction can be used as placeholder in the Headers, URL and Body of the Web-Request.

### Logs

Each request is logged with the sent data and received response. Only the past hours are accessible.

## Notes

1. WebHooks are expected to be executed within a 30 seconds timeframe of the event
2. Changes on WebHooks require up to 15 minutes to be applied in production
3. Currently there are no restrictions, it is possible that limits are introduced at a later stage

<figure><img src="../../.gitbook/assets/image (19).png" alt=""><figcaption><p>WebHook Example</p></figcaption></figure>

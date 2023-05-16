---
description: >-
  Automatically distributes requests to a list of publicly known nodes in a
  network, ensuring high availability and resilience by redirecting requests to
  live nodes and retrying failed requests.
---

# Virtual Proxy Node

```mermaid  fullWidth="false"
sequenceDiagram
    participant Client
    participant VN as Virtual Node
    participant LAN as Last Active Node

    Client->>VN: Request
    break is Websocket connection
        VN-->>LAN: Open Websocket Connection
        VN-->Client: Proxy Communication
    end

    loop find active node
        VN-->>LAN: Forward Request
            LAN-->>VN: Reply
        alt errornous reply
            loop find synchronized node
                VN-->>VN: switch active node
            end
        else
            VN-->>Client: Foward Reply
        end
    end
```

## Addresses

| Network | URL                                 |
| ------- | ----------------------------------- |
| MainNet | https://node-mainnet.vechain.energy |
| TestNet | https://node-testnet.vechain.energy |

## Features

* Websockets are supported without error checking
* Nodes are tested to be synchronized in the past 5 minutes
* CORS headers by default
* Returns the used node url in the headers in `x-node-url`


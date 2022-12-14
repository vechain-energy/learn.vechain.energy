# ABI Lookup using raw data

## **Hashes**

The raw data of each transaction contains information about the function that is called. The first 10 characters (4 bytes) of this data represent a hash of the function's signature, known as the "method ID".

Emitted events also include this method ID, but in the form of the first topic (`topic0`) in the event's log data.

### Lookup

To decode the original arguments of a function call or event, the ABI (Application Binary Interface) for the function or event must be known. There are two ways to look up the ABI for a given method ID:

**b32:** This is a specialized collection of method and event ABIs that can be queried by method ID. The lookup is available at

```
https://b32.vecha.in/q/{{SIGNATURE}}.json
```

**sig.api.vechain.energy:** This is a more general lookup proxy that can be used for method IDs that are not found in b32. It will also query public Ethereum databases if no match is found. The lookup is available at

```
https://sig.api.vechain.energy/{{SIGNATURE}}
```

See more details on [https://sig.api.vechain.energy](https://sig.api.vechain.energy)

## Examples

### Transaction Example

{% embed url="https://vechainstats.com/transaction/0x8eab357637f65b5db6ce9abe269c7b2de1cbc7d566135cd79df8d626f50cce3c/#clauses" %}

### Function Example

The raw data of the first clause is

```
0xaecb29bf0000000000000000000000000000000000000000000000000000000000000002636e2e762a1dc36d0016729794476dc656182b44bb6ed8d1fcaf11c6098efcaab61ce1c552e7933fc6135387ab6b863d6e4eaff2c4fddec2a7d65363f64543f0
```

The first 10 characters (4 bytes) represent the method ID:

```
0xaecb29bf
```

ABI Lookup links:

* [https://b32.vecha.in/q/0xaecb29bf.json](https://b32.vecha.in/q/0xaecb29bf.json)
* [https://sig.api.vechain.energy/0xaecb29bf](https://sig.api.vechain.energy/0xaecb29bf)
* [https://sig.api.vechain.energy/0xaecb29bf0000000000000000000000000000000000000000000000000000000000000002636e2e762a1dc36d0016729794476dc656182b44bb6ed8d1fcaf11c6098efcaab61ce1c552e7933fc6135387ab6b863d6e4eaff2c4fddec2a7d65363f64543f0](https://sig.api.vechain.energy/0xaecb29bf0000000000000000000000000000000000000000000000000000000000000002636e2e762a1dc36d0016729794476dc656182b44bb6ed8d1fcaf11c6098efcaab61ce1c552e7933fc6135387ab6b863d6e4eaff2c4fddec2a7d65363f64543f0)

### Event Example

The topics of the event log are:

```
[0] 0xec7c88986ebe0008ab11b3856b7e7963a907c417a7e0362bd682d2c08cb68d69
[1] 0x0000000000000000000000000000000000000000000000000000000000000002
[2] 0x03c98026ce7bf4163ff0e6baf409a11eb84b5e0820efceca8713c1fabd7dcd64
[3] 0x636e2e762a1dc36d0016729794476dc656182b44bb6ed8d1fcaf11c6098efcaa
```

The first topic, `topic0`, is the method ID of the event:

```
0xec7c88986ebe0008ab11b3856b7e7963a907c417a7e0362bd682d2c08cb68d69
```

ABI Lookup links:

* [https://b32.vecha.in/q/0xec7c88986ebe0008ab11b3856b7e7963a907c417a7e0362bd682d2c08cb68d69.json](https://b32.vecha.in/q/0xec7c88986ebe0008ab11b3856b7e7963a907c417a7e0362bd682d2c08cb68d69.json)
* [https://sig.api.vechain.energy/0xec7c88986ebe0008ab11b3856b7e7963a907c417a7e0362bd682d2c08cb68d69?event=true](https://sig.api.vechain.energy/0xec7c88986ebe0008ab11b3856b7e7963a907c417a7e0362bd682d2c08cb68d69?event=true)


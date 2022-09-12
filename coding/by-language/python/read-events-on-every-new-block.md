# Read Events on every new Block

1. listen for new blocks using a ticker
2. filter for a specific list of events in the new block (source: github json list)

```python
#!/usr/bin/python3

from thor_requests.connect import Connect
from thor_requests.contract import Contract
from thor_devkit import abi
import requests

connector = Connect('https://node.vechain.energy')
mpv3_listings_json = requests.get('https://raw.githubusercontent.com/vechain/b32/master/ABIs/vesea_mpv3_listings.json').json()
mpv3_listings_abi = {"abi":mpv3_listings_json}
mvp3_listings_contract = Contract(mpv3_listings_abi)
mvp3_listings_address = '0xDafCA4A51eA97B3b5F21171A95DAbF540894a55A'

def decode_data(json, event):
    topics0 = json['topics'][0]
    topics1 = json['topics'][1]
    topics2 = json['topics'][2]
    topics3 = json['topics'][3]

    decode_data = abi.Event(mvp3_listings_contract.get_abi(event)).decode(
        data=bytes.fromhex(json['data'][2:]),
        topics=[
            bytes.fromhex(topics0[2:]),
            bytes.fromhex(topics1[2:]),
            bytes.fromhex(topics2[2:]),
            bytes.fromhex(topics3[2:]),
        ]
    )

    return decode_data


while True:
    for block in connector.ticker():
        block_number = block['number']

        request_data = {
            "range": {
                "unit": "block",
                "from": block_number,
                "to": block_number
            },
            "criteriaSet": [
                {
                    "address": mvp3_listings_address
                }
            ],
            "order": "asc",
        }

        print(block_number)

        response = requests.post('https://node.vechain.energy/logs/event', json=request_data)
        if response.status_code != 200:
            print('Error')
            continue

        json_response = response.json()
        for item in json_response:
            event = mvp3_listings_contract.get_event_by_signature(bytes.fromhex(item["topics"][0][2:]))
            if event is None:
                continue

            data = decode_data(item, event.get_name())

            print(event.get_name(), data)
```

Shared by: [https://twitter.com/crypto\_milos](https://twitter.com/crypto\_milos)

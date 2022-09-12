---
description: How to to connect to the Blockchain using python
---

# Connect with python

### Notes

This guide uses python 3 and the [thor-request.py](https://github.com/laalaguer/thor-requests.py) library to interface with the VeChain Thor blockchain.

### Installation

```bash
$ pip3 install -U thor-requests
```

### Connect

Open a python shell/REPL and connect to testnet using thor-request to get the latest block:

```python
$ python3

>>> from thor_requests.connect import Connect

>>> connector = Connect("https://testnet.veblocks.net")
>>> connector.get_block()
{'number': 13070024, 'id': '0x00c76ec810bce03c7e42488542b0178c478a7563553ed4635c758a5e6f5aa2eb', 'size': 681, 'parentID': '0x00c76ec7c93c896738fa95ddf3871f5578ed638d75278b126f700b92035289db', 'timestamp': 1660731590, 'gasLimit': 30000000, 'beneficiary': '0xb4094c25f86d628fdd571afc4077f0d0196afb48', 'gasUsed': 723294, 'totalScore': 77539458, 'txsRoot': '0x2392d34a16079c0bf12464a6bd3f854f15cc92b8c23302bcae68a1320a937e79', 'txsFeatures': 1, 'stateRoot': '0x1f939d16efa3db5cf5591be47c82cd1e2863c61931f7cb4c6dddff08c038c96e', 'receiptsRoot': '0x47cd3954824a0221e24509bd504d53acd3d872fcc4ab5a7df172c253c74e29ad', 'signer': '0xdef45f399bedb135cc94e91fce287226bd6cf812', 'isTrunk': True, 'transactions': ['0x62eea779eacca90332eb138b8d36dabae880bf12a266eef6bcf5b182ba499cea', '0x9c4d01ab8975379537bc27a4a472a33316cee0c4dbdfa2426f887888eaa854ba']}
```

Reference each element of this block in the [VeChain documentation](https://docs.vechain.org/thor/get-started/api.html#blocks)

Narrow `connector.get_getblock()` to the block number:

```python
>>> connector.get_block()["number"]
13070183
```

### Account Balance

VET and VTHO are 10^18 wei (18 decimal digits)

```python
>>> connector.get_account('0xBAc6d446E6A4FF76610222aeE7bBeA5F0A48F38e')
{'balance': '0x1b1ae4d6e2ef500000', 'energy': '0x2b5e3f34cfde3b000', 'hasCode': False}
```

* **balance:** VET balance in unit WEI, hex string
* **energy:** VTHO balance in unit WEI, hex string
* **hasCode:** if its a smart contract, boolean

```python
>>> get_wallet = connector.get_account('0xBAc6d446E6A4FF76610222aeE7bBeA5F0A48F38e')

# Return VET balance
>>> float(int(get_wallet['balance'], 16)) / 10 ** 18
500.0

# Return VTHO balance
>>> float(int(get_wallet['energy'], 16)) / 10 ** 18
50.000975000000004
```

### Import Wallet

Generate a [private key](https://learn.vechain.energy/how-to/create-a-wallet/shell-+-openssl) and use VeChain's [Faucet](https://learn.vechain.energy/how-to/create-a-wallet/faucet-first-tokens) to get tokens on testnet. Import this private key into thor\_requests and return the address.

```python
>>> from thor_requests.wallet import Wallet

>>> wallet = Wallet.fromPrivateKey(priv=bytes.fromhex('bd188a7974391bece7533fa73c2c2c72df677a241cbce0a56c3e97a2e736e6f3'))
>>> wallet.getAddress()
'0xbac6d446e6a4ff76610222aee7bbea5f0a48f38e'
```

### Call a Function

Make a call to the VVET (Veiled VET) contract using the VVET ABI. Tokens are listed in the [Token Registry](https://github.com/vechain/token-registry) and a collection of ABIs can be found in [B32](https://github.com/vechain/b32)

Importing requests and json allows us to retrieve a contract ABI from github and load it into thor\_requests with `Contract()` Calling `balanceOf` function with our address in the parameters will return our VVET balance.

```python
>>> from thor_requests.contract import Contract
>>> import requests
>>> import json

>>> vvet_json = requests.get('https://raw.githubusercontent.com/vechain/b32/master/ABIs/vvet.json').json()

>>> vvet_abi = {"abi":vvet_json}
>>> vvet_abi = Contract(vvet_abi)

>>> vvet_address = '0x86fb5343bbecffc86185c023a2a6ccc76fc0afd8'

>>> connector.call(caller=wallet.getAddress(), contract=vvet_abi, func_name="balanceOf", func_params=[wallet.getAddress()], to=vvet_address)
{'data': '0x0000000000000000000000000000000000000000000000000000000000000000', 'events': [], 'transfers': [], 'gasUsed': 689, 'reverted': False, 'vmError': '', 'decoded': {'0': 0}}
```

A lot of data got returned with this call! We are concerned with the value in the decoded field. Let's return just this value:

```python
>>> vvet_balance = connector.call(caller=wallet.getAddress(), contract=vvet_abi, func_name="balanceOf", func_params=[wallet.getAddress()], to=vvet_address)
>>> vvet_balance['decoded']['0']
0
```

### Execute a Function

Spend gas to commit a transaction. With the `deposit` function we can transfer 5 VET to the contract and increase our VVET balance

```python
>>> connector.transact(wallet, vvet_abi, "deposit", [], to=vvet_address, value=5 * (10 ** 18))
{'id': '0x775d2e7003b47898e7cafdee952e5f9fe646d13b1587b8e8f888c82621c893ac'}
```

This time we recieved a Transaction ID. We can use this to return the [Transaction Reciept](https://docs.vechain.org/thor/get-started/api.html#get-transactions-id-receipt) to see if our transaction got packed into the blockchain or if it was reverted.

```python
>>> connector.get_tx_receipt('0x775d2e7003b47898e7cafdee952e5f9fe646d13b1587b8e8f888c82621c893ac')['reverted']
False
```

Let's check our VVET balance again:

```python
>>> vvet_balance = connector.call(caller=wallet.getAddress(), contract=vvet_abi, func_name="balanceOf", func_params=[wallet.getAddress()], to=vvet_address)
>>> vvet_balance['decoded']['0']
5000000000000000000
```

As you can see, the balance has increased 5 VVET.

### Links

1. [thor-requests](https://github.com/laalaguer/thor-requests.py)
2. [thor-devkit.py](https://github.com/vechain/thor-devkit.py)
3. [Thorest API](https://docs.vechain.org/thor/get-started/api.html)
4. [Thorest swagger](https://vethor-node-test.vechaindev.com/doc/swagger-ui/)

# Extract private key from Wallet-Backups

## Sync2 Backup

Sync2 uses a mnemonic phrase as a backup medium. This mnemonic phrase is a string of words that is used to generate the private key. To extract the private key from a Sync2 backup, the following code snippet can be used:

```javascript
const ethers = require('@vechain/ethers')

try {
  if (!process.env.WORDS) {
    throw new Error('Call with WORDS="<memnonic words>" node memnonic-to-pk.js')
  }

  const wallet = ethers.Wallet.fromMnemonic(process.env.WORDS, "m/44'/818'/0'/0/0");
  console.log(wallet)
}
catch (err) {
  console.error(err.message)
}
```

## Sync1 Backup

Sync1 uses a keystore file that is encrypted with a password. To extract the private key from a Sync1 backup, the following code snippet can be used:

```javascript
const ethers = require('@vechain/ethers')

try {
  if (!process.env.KEYSTORE || !process.env.PASSWORD) {
    throw new Error('Call with KEYSOTRE=<file> node keystore-to-pk.js')
  }

  ethers.Wallet.fromEncryptedJson(require('fs').readFileSync(process.env.KEYSTORE), process.env.PASSWORD).then(wallet => {
    console.log(wallet)
  })
}
catch (err) {
  console.error(err.message)
}
```

The code snippets are available on GitHub at:

{% embed url="https://github.com/vechain-energy/sync-extract-private-key" %}

# Identify User Wallets

User-Identification in accomplished by signing a message with the private key of a user. The signature includes information about the signing address, making it possible to identify and verify a user address.

[Connex provides a Signing-Service](https://docs.vechain.org/connex/api.html#acquire-a-signing-service) aimed to solve this in combination with Sync(2) in a user friendly way.

For the user this is a perfect way for identification since signing does not create a transaction or any traces on the blockchain.

## Signing <a href="#b9f3" id="b9f3"></a>

### Connex <a href="#9a73" id="9a73"></a>

The signing service prompts the user to sign a payload. The payload can be anything and is presented to the user as the message to sign.

```javascript
  const certificate = await connex.vendor
    .sign("cert", {
      purpose: "identification",
      payload: {
        type: "text",
        content: "content so sign"
      }
    })
    .request();
```

The returned signed certificate anatomy is like this:

```json
{
  "annex": {
    "domain": "jp76b3.csb.app",
    "signer": "0x2f3da21ad07657ad6608d251e8f3d3fe7e57ea0e",
    "timestamp": 1665558056
  },
  "signature": "0x7fe7389f2dd15e8e4c1511539e626bd8f4d4d006a769e4b0243c6333a1d6571724126f597c212033a939ba19c212bac17b1bedc9b6f69dca547962af5a72a02901"
}
```

`annex.signer` includes the wanted user address and the `timestamp` the time of signing.

In the web this can be used instantly. For backend communication it needs to be verified on the backend side.

### thor-devkit <a href="#6bc6" id="6bc6"></a>

In none-UI environments the same can be accomplished using the wallets private key directly and [thor-devkit](https://presearch.com/search?q=thor-devkit):

<pre class="language-javascript"><code class="lang-javascript"><strong>import { Certificate, secp256k1, blake2b256 } from 'thor-devkit'
</strong>
const certificate = {
    purpose: 'identification',
    payload: {
        type: 'text',
        content: 'content to sign'
    },
    domain: 'localhost',
    timestamp: Math.floor(+(new Date())/1000),
    signer: wallet.address
}

const jsonStr = Certificate.encode(certificate)
const signature = secp256k1.sign(blake2b256(jsonStr), privateKey)

certificate.signature = `0x${signature.toString('hex')}`</code></pre>

## Verification <a href="#828f" id="828f"></a>

### thor-devkit <a href="#855b" id="855b"></a>

[thor-devkit](https://presearch.com/search?q=thor-devkit) provides the necessary functionality to verify the signed message.

The verification requires three important parts

1. The signed message (object that was passed for signing)
2. The signer information (annex)
3. And the signature

The verification will throw if it fails, otherwise it will silently work without a return value:

```javascript
  const certificate = {
    purpose: "identification",
    payload: {
      type: "text",
      content: "content so sign"
    }
  };
  const message = await connex.vendor.sign("cert", certificate).request();
  try {
    Certificate.verify({
      ...certificate,
      ...message.annex,
      signature: message.signature
    });
  }
  catch (err) {
    // signing failed, err.message contains more details
    console.error(err)
  }
```

## Notes <a href="#18ad" id="18ad"></a>

In addition to the `identification` also `agreement` is a valid purpose. It can be used to formally agree to terms and archive the result.

To prevent someone from re-using a signed certificate, using a custom payload can ensure the signature is for the right purpose.

An example project signing a message and verifying it is available as Sandbox here:

[https://codesandbox.io/s/identify-user-with-signing-service-jp76b3?from-embed](https://codesandbox.io/s/identify-user-with-signing-service-jp76b3?from-embed)


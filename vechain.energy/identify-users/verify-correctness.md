# verify correctness

Using a third party Auth-Service puts trust in it. To confirm that verification works correctly, the identity can be confirmed by any application using the [thor-devkit](https://github.com/search?q=org%3Avechain+thor-devkit) and certificate verification.

### Verification-Snippet

The access token is a base64 coded JSON-Object that contains all information to manually verify the identification with Connex:

```typescript
import { Certificate } from 'thor-devkit'

// decode access token from base64 to ascii
// and parse it into a session object
const session = JSON.parse(atob(accessToken))

// re-construct the certificate that was originally signed by the user
const certificate = {
  purpose: "identification",
  payload: {
    type: "text",
    content: session.signContent || session.code
  }
};

try {
  // use thor-devkit to verify the signature
  Certificate.verify({
    ...certificate,
    ...session.annex,
    signature: session.signature
  });
  
  console.log(`${session.annex.signer} verified`)
}
catch (err: any) {
  // verification failed, err.message contains more details
  console.log(`${session.annex.signer} verification failed: ${err.message}`)
  console.error(err)
}
```

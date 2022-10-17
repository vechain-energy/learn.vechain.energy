# Identify Users

With a generic identity provider wallet identification can be integrated into existing application frameworks.

**Supported providers are:**

1. OAuth2
2. OpenID Connect

## How it works

The identification sequence involves the user signing a random code with its private key. The signature is verified and contains the signer address. The signer address is passed to the AuthClient to provide a verified identity.

The access token is a base64 representation of the signature with the signed certificate, removing the storage need for it on the backend.

<figure><img src="../../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

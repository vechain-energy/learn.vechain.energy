# Identify Users

With a generic identity provider a wallet identification can be integrated into existing application frameworks.

**Supported providers are:**

1. OAuth2
2. OpenID Connect

An example implementation can be tested here:

[https://codesandbox.io/s/auth-service-test-page-25v0ev](https://codesandbox.io/s/auth-service-test-page-25v0ev)

## Profile

If the scope `profile` is requested during authentification, the user is prompted with a nickname select from an established source.

At a later stage users can change their profile at:\
[https://profile.vechain.energy](https://profile.vechain.energy/)

The profile page also allows to manually enter a unique name, allowing to use vechain.energy as additional profile source.

## How it works

The identification sequence involves the user signing a random code with its private key. The signature is verified and contains the signer address. The signer address is passed to the AuthClient to provide a verified identity.

The access token is a base64 representation of the signature with the signed certificate, removing the storage need for it on the backend.

<figure><img src="../../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

## Notes

1. Expiration of Tokens is set to 1 year
2. Access tokens are never stored online, they are only verified
3. Revocation is currently not implemented because access tokens are not stored on the server, only verified on-the-fly
4. `client_id` and `client_secret` are not validated
   1. if used: the `client_id` needs to stay identical during authentification and is implemented in the user info endpoint

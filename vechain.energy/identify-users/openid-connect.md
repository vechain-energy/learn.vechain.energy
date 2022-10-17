# OpenID Connect

## Configuration

| Configuration               | Value                                                            |
| --------------------------- | ---------------------------------------------------------------- |
| Discovery Document URL      | https://auth.api.vechain.energy/.well-known/openid-configuration |
| Authorization URL (MainNet) | https://auth.api.vechain.energy/oauth2/authorize                 |
| Authorization URL (TestNet) | https://auth.api.vechain.energy/oauth2/authorize?network=test    |
| Token URL                   | https://auth.api.vechain.energy/oauth2/token                     |
| Token Revocation URL        | https://auth.api.vechain.energy/oauth2/token/revoke              |
| Userinfo URL                | https://auth.api.vechain.energy/oauth2/userinf                   |
| Token Keys URL              | https://auth.api.vechain.energy/jwks                             |
| Client ID                   | none                                                             |
| Client secret               | none                                                             |

**The configuration can be tested using the OpenID Connect Playground from Auth0:**

{% embed url="https://openidconnect.net/" %}

<figure><img src="../../.gitbook/assets/image (6).png" alt=""><figcaption></figcaption></figure>

## Notes

1. Default expiration is 1 year
2. A refresh token is currently not supported, new authorization is suggested after the token expires

## Example Configuration

### Auth0

Enterprise Connections support OpenID Connect with these settings:

| Configuration | Value                                                            |
| ------------- | ---------------------------------------------------------------- |
| Issuer URL    | https://auth.api.vechain.energy/.well-known/openid-configuration |
| Type          | Back Channel                                                     |
| Client ID     | none                                                             |
| Client Secret | none                                                             |
| Scopes        | openid                                                           |

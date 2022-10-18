# OAuth2

## Configuration

| Configuration               | Value                                                         |
| --------------------------- | ------------------------------------------------------------- |
| Authorization URL (MainNet) | https://auth.api.vechain.energy/oauth2/authorize              |
| Authorization URL (TestNet) | https://auth.api.vechain.energy/oauth2/authorize?network=test |
| Token URL                   | https://auth.api.vechain.energy/oauth2/token                  |
| Userinfo URL                | https://auth.api.vechain.energy/oauth2/userinfo               |
| Client ID                   | none                                                          |
| Client secret               | none                                                          |
| Response type               | code                                                          |

## Notes

The default expiration is 1 year, it is suggested to re-authorized after that time.

## Example Configuration

### Wordpress

SSO using Plugin [https://wordpress.org/plugins/oauth-client/](https://wordpress.org/plugins/oauth-client/)

| Configuration          | Value                                            |
| ---------------------- | ------------------------------------------------ |
| Custom App Name        | VeChain                                          |
| Client ID              | none                                             |
| Client Secret          | none                                             |
| Scope                  | address                                          |
| Authorize Endpoint     | https://auth.api.vechain.energy/oauth2/authorize |
| Access Token Endpoint  | https://auth.api.vechain.energy/oauth2/token     |
| Get User Info Endpoint | https://auth.api.vechain.energy/oauth2/userinfo  |
| Username attribute     | address                                          |

<div>

<figure><img src="../../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

 

<figure><img src="../../.gitbook/assets/image (25).png" alt=""><figcaption></figcaption></figure>

</div>

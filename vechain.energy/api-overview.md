# API-Overview

## Read state data

| Key                | Value                                                                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Endpoint           | https://call.api.vechain.energy                                                                                                                                         |
| Networks           | test, main                                                                                                                                                              |
| OpenAPI Definition | [https://call.api.vechain.energy/swagger.json](https://call.api.vechain.energy/swagger.json)                                                                            |
| OpenAPI UI         | [https://vechain.energy/docs/api/call](https://vechain.energy/docs/api/call)                                                                                            |
| Examples           | [https://app.gitbook.com/s/Ozs1YBZryCiIXcvWB2o0/\~/changes/vuH0cHgMP41mO014jb8U/manual/read-data-from-smart-contracts/states](read-data-from-smart-contracts/states.md) |

## List event & log data

| Key                | Value                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| Endpoint           | https://event.api.vechain.energy                                                               |
| Networks           | test, main                                                                                     |
| OpenAPI Definition | [https://event.api.vechain.energy/swagger.json](https://event.api.vechain.energy/swagger.json) |
| OpenAPI UI         | [https://vechain.energy/docs/api/event](https://vechain.energy/docs/api/event)                 |

## Write & execute contracts

| Key                | Value                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| Endpoint MainNet   | https://sponsor.vechain.energy/by/{tokenId}/transaction                                        |
| Endpoint TestNet   | https://sponsor-testnet.vechain.energy/by/{tokenId}/transaction                                |
| OpenAPI Definition | [https://api.vechain.energy/documentation/json](https://api.vechain.energy/documentation/json) |
| OpenAPI UI         | [https://vechain.energy/docs/api/transact](https://vechain.energy/docs/api/transact)           |

## Signing Service / Fee delegation

| Key                | Value                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| Endpoint MainNet   | https://sponsor.vechain.energy/by/{tokenId}                                                    |
| Endpoint TestNet   | https://sponsor-testnet.vechain.energy/by/{tokenId}                                            |
| OpenAPI Definition | [https://api.vechain.energy/documentation/json](https://api.vechain.energy/documentation/json) |
| OpenAPI UI         | [https://vechain.energy/docs/api/sponsorship](https://vechain.energy/docs/api/sponsorship)     |

## Authentification (OAuth/OpenID)

| Key                | Value                                                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Endpoint MainNet   | https://auth.api.vechain.energy/oauth2/authorize                                                                                     |
| Endpoint TestNet   | https://auth.api.vechain.energy/oauth2/authorize?network=test                                                                        |
| Discovery Document | [https://auth.api.vechain.energy/.well-known/openid-configuration](https://auth.api.vechain.energy/.well-known/openid-configuration) |
| Documentation      | [https://learn.vechain.energy/vechain.energy/identify-users](https://learn.vechain.energy/vechain.energy/identify-users)             |
| OpenAPI Definition | [https://auth.api.vechain.energy/swagger.json](https://auth.api.vechain.energy/swagger.json)                                         |
| OpenAPI UI         | [https://testnet.vechain.energy/docs/api/auth](https://testnet.vechain.energy/docs/api/auth)                                         |

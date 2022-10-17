# API-Keys

API-Keys are bound to Sponsorships that pay for all gas fees happening for transactions executed with an API-Key.

Every Sponsorship can have multiple API-Keys. API-Keys remove the web3 and wallet management on the client side. Transactions can be generated using a RESTful API.

## Management

API-Keys are created in the Web-Interface for each Sponsorship. An API-Key-Secret is generated locally and needs to be backed up. The API-Key-Secret is sent with each request.

Within the API-Key encoded is a private key that will sign all future transactions by default.

| Menu                                                                         | Configuration                                                                            |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| <img src="../../.gitbook/assets/image (21).png" alt="" data-size="original"> | <h3><img src="../../.gitbook/assets/image (1) (1).png" alt="" data-size="original"></h3> |

## Permissions

Each API-Key is represented by a private key. The address of the private key can be whitelisted in a Sponsorship to allow all transactions from it (sender).

If not whitelisted, then the regular Sponsorship logic applies (recipient, contract validation).

Options allow to switch between "_allow to interact with everyone_" and "_limit to Sponsorship Logic_". Allowing an interaction with everyone will add the address to the allowed senders.

## VTHO Costs

Each API-Key is created within the scope of a Sponsorship. The Sponsorship will pay for the transaction.

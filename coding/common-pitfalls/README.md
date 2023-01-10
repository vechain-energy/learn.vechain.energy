# Common Pitfalls

Developers with previous experience developing on EVM compatible Blockchains may have expectations that could lead to pitfalls using unique features of VeChain:

1. Developers are able to inject their own dependency when running contracts. While this is possible by calling a contract within a contract, there is the additional dependency of Multi-Clause-Transactions that can act independent.
2. There is no private contract storage. Private variables are accessible off-chain for any EVM, it is also possible to access this data within contracts using native functionality.

The sub-sections contain more details to understand the difference to built a stable contract that does relies on the right expectations.

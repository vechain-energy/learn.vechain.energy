# Changelog

_🏗️ current work in progress_

* :gear: Analytics Performance improvements
* :gear: System stabilization / reducing technical debt

## Pending: 0.11.0

* :bug: Fix empty Tooltip on low uint256 values
* :bug: Fix BigNumber decoding for some VET transfers
* :unicorn: New implementation ability to share Fee Delegation Configuration within a team
* :gear: Minor Text/UI/UX tweaks

## 0.10.3

* :gear: Improve event handling to load faster and use less browser resources
* :gear: Improve usage stats to load faster and use less server resources
* :gear: Removing the `#` and switch to path based url routing
* :gear: Dependency updates
* :gear: Infrastructure updates to prepare for Multi-Cloud-Backends for improved robustness
* :bug: Fix an issue with `uint256` decoding in events after dependency updates
* :bug: Fix issues with Sync2 session after timeouts or reloads

## 0.10.2

* :gear: Improved error handling for quicker problem resolution
* :bug: Fix availability of public VTHO historical usage statistics

## 0.10.0

* :unicorn: Ability to submit transactions without a wallet application using API Endpoints
* :unicorn: Ability to read data from contracts without connex or web3-eth-abi
* :gear: Transaction analytics on public VTHO analyzer removed due no longer storing clause data (Sponsorship-Analytics remain unchanged)

## 0.9.3

* :bug: Fix a potential security issue with JWKs endpoint
* :gear: New option to retry Sponsorships automatically (`expiration=<BlockNumber>`)

## 0.9.2

* :gear: Switching to a list of Blockchain-Nodes that are used in case one fails

## 0.9.1

* :gear: Improved support and performance for longer logs (>100.000)

## 0.9.0

* :unicorn: Event-Logs support Transaction-Outputs
  * Contract-Deployments display the `address` of the new contract
  * emitted events are listed next to the transaction data
  * emitted events can be searched by free text entry
* :art: Dashboard-Graph improved for clarity

## 0.8.0

* :unicorn: Event-Logs have been enhanced with some small tweaks:
  * clicking on a `bytes32` field the displays it as string
  * clicking on an `address` field links to the blockchain explorer
  * strings starting with `ipfs://` are linked to an ipfs gateway
  * `uint256` show format possible human number representation on mouse over
* :gear: Minor UI Improvements
* :gear: Sponsorship-URLs opened in a Browser will redirect to their administration page
* :bug: Reloading and Deep-Linking do no longer show session-errors in certain circumstances

## 0.7.0

* :unicorn: Event-Logs improved
  * more fine grained filter options
  * recipient details in rejected sponsorships
  * copyable addresses for origin/recipients
  * extended summary stats in the footer section
  * list of all unique origins or recipients in the results (ready to copy & paste for whitelists)
* :gear: Generic Usability Improvements, especially for mobile Devices

## 0.6.0

* :unicorn: Whitelist-Management improved
  * Addresses can be sorted by address and type
  * Addresses can be filtered by type
  * All addresses can be edited at once using a new Batch-Editor

## 0.5.5

* :gear: Improve Log-/History-Performance
* :gear: VTHO Analyzer Performance Improvements

## 0.5.4

* :bug: Fix ability to use Team-Management&#x20;
* 🐛 Smashing bugs in the Analytics/Event Logs
* ⚙️ Improve VTHO Analyzer with filters and transaction display

## 0.5.0

* ⚙️ Performance and Stability-Improvement
* ⚙️ Improve Error Messages for denied Sponsorships
* 🦄 Introduce optional Rate Limits for Signing-Requests

## 0.4.0

* 🦄 Introduce the Sponsorship^2-Program
* ⚙️ UI/UX Improvements with improved stability and refactored navigation

## 0.3.0

* 🦄 Sponsorships can be transferred to other wallets
* 🦄 Team-Addresses can be given permission to administer Sponsorships
  * Withdraw and Deletion is still restricted to the owner
* 🦄 Provide Status-Page for System-Availability at [https://status.vechain.energy](https://status.vechain.energy)
* ⚙️ Improve API Performance
* 🐛 Fix an issue that ABI Uploads stored only the first entry
* 🐛 Fix that managed wallets could not complete the Test Transaction in the Setup-Wizard

## 0.2.0

* Event-Analytics improved with the ability to:
  1. search events by text input (i.e. search by origin or transaction values)
  2. filter events by time range
  3. download events as CSV, function arguments are grouped by their names to allow local analysis

## 🌈 0.1.0

* Initial Release on the TestNet
* [https://testnet.vechain.energy](https://testnet.vechain.energy)
  * Management-Website for Sponsorships that are represented by NFT Tokens
  * Access to basic event logs to analyze transaction usage or VTHO consumption
* [https://sponsor-testnet.vechain.energy](https://sponsor-testnet.vechain.energy)
  * API service to receive a signature for fee delegation

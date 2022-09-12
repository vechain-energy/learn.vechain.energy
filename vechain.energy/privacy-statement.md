# Privacy Statement

### Blockchain

Data on the Blockchain is encapsulated within an NFT and accessible by everyone. The following data is stored in a Sponsorship Token:

1. Sponsorship Token Id
2. Sponsorship Title
3. Addresses in Whitelists
   1. Origins
   2. Recipients
4. Contract-Address with external logic
5. Owner-Address
6. Address of the managed wallet
7. Toggle indicating that request logging is allowed

The data is required to provide the essential functionality of our platform. Deleting a Sponsorship will remove the data from future access. However, Blockchain data is always stored in a public ledger and once submitted data can always be recovered.

### Transactions

To provide functionality on top of the blockchain transactions, all already public transactions are logged and stored in a database for analysis (VTHO costs, transactions, etc.) and linked to signing requests.

Signing requests to our API service are logged with the following details:

1. Time of the request
2. Sponsorship Token Id
3. Transaction Origin-Address
4. Transaction Raw-Data
5. Address of the managed wallet/sponsoring Wallet
6. Signature returned to approve fee delegation
7. Flag indicating that the request was rejected
   1. If rejected, the error message that was sent to the client

Logging can be disabled in the Settings of each Sponsorship. Disable `Log Sponsorship Requests` to disable this functionality.

All this data is made available to the Owner and Team-Members of a Sponsorship for Transaction-Analytics. Deleting the Sponsorship not remove the stored data immediately. The data is removed automatically after 12 months.

### ABI

For each Sponsorship ABI definitions can be uploaded. All ABI of a Sponsorship are stored at the same place and made available to the Owner and Team-Member of a Sponsorship for Transaction-Analytics.

You have the option to delete the uploaded ABI in full. Deleting the Sponsorship will also remove the stored ABI data.

### **Sponsorship^2**

To make a decision information about your project, estimated VTHO consumption and your contact details are required. All data is stored securely and not shared with anyone. Deleting a Sponsorship will also remove the stored data.

### Cookies and Local Storage

We store the following information the browsers local storage:

1. Last auth mechanism to provide an auto-login
2. Last Addresses entered for VTHO Contract-Analytics
   1. to fill the addresses for future visits
3. A session token that contains your signed certificate, if you are using Sync2

For Social Sign Ins [web3auth.io](https://web3auth.io) is used. Please see their [Privacy Policy](https://docs.web3auth.io/legal/privacy-policy) for more details.

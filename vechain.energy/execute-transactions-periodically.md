# Execute Transactions periodically

Every Sponsorship supports so called "Schedulers". Schedulers execute transactions periodically.

The required gas fees are paid by the sponsorship and transactions will appear in the regular event logs. Each schedule is assigned its own wallet. Its public address can be used to setup appropriate permissions on the contracts.

**Note**

In the background the Sponsorships fee delegation is applied. The delegation needs to support the transaction or it will fail. Ensure that the logic is configured accordingly.

**Example use-cases**

* regular data updates
* payouts
* archiving jobs.

## Configuration

### Contract

* Caller address of the wallet (for informational purpose only) that will execute the transaction
  * can be used to implement access control management on the contract side
* Address of the contract to be called (`to` part of a transaction)
* Function definition as ABI of a transaction
  * if it requires parameters, they will be an additional required input

### Interval

Cronjob-format for the intervals. The configuration is guided with the UI and can also be entered manually.

A preview of the next runs is show as confirmation.

# Execute Transactions periodically

Every Sponsorship supports so called "Schedulers" that execute transactions periodically.

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
* Optionally a simulation can be run before transmitting a transaction.
  * If enabled and a simulation fails, no transaction will be created and no gas will be used.
  * If disabled, a transaction will always be submitted, even if it may revert.\
    Reverted transactions will also use gas.

### Interval

Cronjob-format for the intervals. The configuration is guided with the UI and can also be entered manually.

A preview of the next runs is show as confirmation.

### Notes

* New Schedulers will start nearly immediately on the next interval.
* Updating intervals will be applied immediately, a previous scheduled transaction might still be executed.
* Transactions are timed to be signed some seconds earlier than the interval to fit it the exact block of the interval. This might not work at all times, depending on network load and block size.
* If a the transaction request fails multiple times (no VTHO in Sponsorship, Sponsorship Logic rejects transaction) then the scheduler will automatically pause. Reverted transactions do not count as an error.

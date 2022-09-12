# How does Fee Delegation work?

Fee Delegation introduces a third party to a transaction, the gas payer.

The user submitting a transaction sends it unsigned to the gas payer and requests its signature. The user integrates the gas payers signature into the transaction, signs it and submits it to a blockchain node.

When the transaction is finalized, the gas costs are taken from the gas payers balance instead of the user submitting the transaction.

![](https://mermaid.ink/svg/pako:eNqFksFuwyAMhl8FcW5fIIccpk27Tpp24-KCm1oNJgMzKar67oMtTVJlUzkh\_P3\_bwwXbYND3eiEnxnZ4jNBF8EbVmUNEIUsDcCiPhLG7ekrJPUG41-lpz7Ysz0BseHfarXYt-2saVRCdipzoo7RKYnACaxQmAQzub-XfUFPDgQfKGrelFETQHJEZQMfKXriTnUFHmD0yLJqcBaCczcE48pBwjb3XlnZf5i2XeZSwHzwJFt0YRbTqfFH8Hq6-VBgKz-3sCFJMqx32mP0QK48-qUaGC0n9Gh0U7YO4tlow9fC5aHO-MWRhKibI\_QJdxqyhPeRrW4kZrxB06-ZqOs3qN7Png)

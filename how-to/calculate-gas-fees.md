# Calculate Gas Fees

## How to Calculate the Right Amount of Gas

The calculation of gas amount is typically handled within wallets, which is conveniently hidden for regular dApp developers. However, if wallets are not involved in the development process, such as in backend development, the gas calculation needs to be done manually.

The complete calculation is explained in the Vechain documentation, which can be found here: [Transaction Calculation](https://docs.vechain.org/thor/learn/transaction-calculation.html).

This article will provide a deeper understanding of the calculation process while keeping it as simple as possible.

This article will dive a little deeper into this calculation, trying to keep it as simple as possible.

## Bird's Eye View

The rough calculation consists of the following steps:

1. Every byte submitted in a transaction incurs a charge. Zero bytes are cheaper than non-zero bytes.
2. Changes made by a contract are also charged based on the number of bytes.
3. Every transaction has a base price that is multiplied by the values obtained in the previous steps.

In simplified terms, the calculation can be expressed as:

```
(bytes sent + bytes changed) * base price
```

## Intrinsic Gas / Bytes submitted

* The base fee for a transaction is 5000.
* Each clause in the transaction incurs a cost of 16000.
* Zero bytes in the transaction cost 4 each.
* Non-zero bytes in the transaction cost 68 each.

Performing this calculation for all the clauses in a transaction will give us the first number. Here's a code snippet that accomplishes that:

```ts
const TX_GAS = 5000
const CLAUSE_GAS = 16000
const CLAUSE_GAS_CONTRACT_CREATION = 48000
const ZERO_BYTES_GAS = 4
const NON_ZERO_BYTES_GAS = 68

export default function intrinsic(clauses: Connex.VM.Clause[]): number {
    return clauses.reduce((sum, c) => {
        sum += c.to === null ? CLAUSE_GAS_CONTRACT_CREATION : CLAUSE_GAS
        sum += dataGas(c.data);
        return sum;
    }, TX_GAS);
}

function dataGas(data: string | undefined): number {
    if (data === undefined) { return 0 }

    const bytes = data.slice(2).match(/.{1,2}/g);
    if (bytes === null) { return 0 }

    const amountZeroBytes = bytes.reduce((amountZeroBytes, byte) => amountZeroBytes + (byte === '00' ? 1 : 0), 0);
    const amountNonZeroBytes = bytes.length - amountZeroBytes;

    return (amountNonZeroBytes * NON_ZERO_BYTES_GAS) + (amountZeroBytes * ZERO_BYTES_GAS);
}
```

It's important to note that contract creation incurs more gas than a regular clause.

## VM Gas / Changes by the Contract

It is impossible to calculate the VM gas offline, which is why a simulation is required. This involves sending the clause data to a node, and the return will include details about the gas costs. Here's an example code snippet:

```ts
const outputs = await connex.thor.explain(clauses).execute()
const vmGas = outputs.reduce((gas, output) => gas + output.gasUsed, 0);
```

## Base Price

The base price is configured on the blockchain and is part of a [`Params` contract](https://github.com/vechain/thor/blob/master/builtin/gen/params.sol). Its value can be obtained by calling the `get` function to read the `base-gas-price` (encoded as bytes32). Here's an example code snippet:

```ts
const { decoded: { value } } = await connex.thor
    .account("0x0000000000000000000000000000506172616d73")
    .method({
        "name": "get",
        "type": "function",
        "constant": true,
        "payable": false,
        "stateMutability": "view",
        "inputs": [{ "name": "key", "type": "bytes32" }],
        "outputs": [{ "name": "value", "type": "uint256" }]
    })
    .call('0x000000000000000000000000000000000000626173652d6761732d7072696365')
```

Currently, the base price is set to `10000000000000`.

## Final Calculation

### 1 Clause with a VET Transfer

The basic calculation is as follows:

```
Base Price * (Intrinsic Gas + VM Gas)
```

For example, let's consider a transaction that doesn't have data and transfers zero VET:

1. Transaction gas: 5000
2. One clause: 1 \* 16000
3. Total: 21000

Since there is no contract involved, the VM gas will be zero.

```
10_000_000_000_000 * (21_000 + 0) = 210_000_000_000_000_000
```

The gas price has 13 decimal places and needs to be divided by 10\_000\_000\_000\_000:

```
210_000_000_000_000_000 / 10_000_000_000_000 = 21_000
```

Therefore, the exact gas required to transfer VET between wallets is 21,000.

### Contract Interaction

The basic calculation remains the same:

```
Base Price * (Intrinsic Gas + VM Gas)
```

Let's consider a transaction with two data clauses:

1. Transaction gas: 5000
2. Two clauses: 2 \* 16000
3. Clause 1 data: `0x00` (one zero byte: 1 \* 4)
4. Clause 2 data: `0x1100` (one zero byte and one non-zero byte: 1 \* 4 + 1 \* 68)
5. Total: 37076

The VM gas results in an imaginary 600 and 270, summing up to 870 in total.

```
10_000_000_000_000 * (37_076 + 870) = 379_460_000_000_000_000
```

The gas price has 13 decimal places and needs to be divided by 10\_000\_000\_000\_000:

```
379_460_000_000_000_000 / 10_000_000_000_000 = 37_946
```

Therefore, the resulting gas is 37,946. However, there is one more step involving a magic number fee.

#### VM Invocation

There is a fee used for invoking the Virtual Machine of 15000.

If a contract is involved, a base fee of 15000 is therefor added:

```
37946 + 15000 = 52946
```

Thus, the final answer is 52,946.

### Priority / gasPriceCoef

To prioritize transactions, the `gasPriceCoef` can be defined with a non-zero value (up to 255). This changes the base price as follows:

```
Base Price + ( (Base Price / 255) * gasPriceCoef )
```

The base price increases proportionally based on the priority setting.

Since the base price is multiplied by the other gas values, it substantially increases the total gas.

## Maximum Price

Accessing the latest block (for example via `/blocks/best` on the node) provides access to the `gasLimit`. Thats the maximum gas usage allowed per block and lazy developers might use it instead of calculating the price.

## Conclusion

The gas calculation can be challenging initially, but the basic concept can be simplified significantly.

While the intrinsic and VM gas costs may seem complex to calculate at first, they ultimately boil down to a simple loop and a network request.

Here are three real-life examples demonstrating how the calculation works:

1. Codepen from Vechain:\
   https://codepen.io/xjwx89/pen/zYENZGE
2. Sync2 Wallet:\
   https://github.com/vechain/sync2/blob/3ed29ec94e3614139eeafba7219f24910c8a66d3/src/pages/Sign/helper.ts#L34-L75
3. Sample Calculation built during this article:\
   https://github.com/vechain-energy/gas/blob/main/src/index.ts


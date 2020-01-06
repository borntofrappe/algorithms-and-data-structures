## [Cash Register](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/cash-register)

The project is less self-explanatory than the previous entries, so that a few lines are necessary to describe the purpose of the challenge.

Create a `checkCashRegister` function, which accepts three arguments:

- `price`, price of the good being purchased

- `cash`, the payment provided for the good

- `cid`, the available currency in the cash register

While `price` and `cash` are numbers, plain and simple, `cid` is an array of arrays, describing the available currency and precise amount.

```js
//
[
  // currency - amount
  ["PENNY", 1.01],
  ["NICKEL", 2.05]
  //
];
```

The amount describes the whole value in the specified cut. Pennies have a unit value of `1`, which means above there are `101` of them. Nickels a unit value of `5` and so forth.

Beside accepting the detailed arguments, `checkCashRegister` should always return an object with two fields:

```js
{
  status,
  change,
}
```

And with the following considerations:

- if `cid` is less than the necessary change, or there isn't an exact change

```js
{
  status: 'INSUFFICIENT_FUNDS',
  change: [],
}
```

- if `cid` is equal to the change due

```js
{
  status: 'CLOSED',
  change: cid,
}
```

- in every other instance

```js
{
  status: 'OPEN',
  change: [...],
}
```

Where `change` is an array of arrays similar to `cid`, describing the change due from highest to lowest cut.

## For Instance

The description is quite heavy, so here's a few for instance(s).

### Available

```js
checkCashRegister(19.5, 20, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]);
```

- `price`: 19.5

- `cash`: 20

- change due: 0.5

- from the `cid` array: [["QUARTER", 0.5]]

- return:

```js
{
  status: 'OPEN',
  change: [["QUARTER", 0.5]],
}
```

### Exact Change

```js
checkCashRegister(19.5, 20, [
  ["PENNY", 0],
  ["NICKEL", 0],
  ["DIME", 0.5],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
]);
```

Return:

```js
{
  status: 'CLOSED',
  change: [["PENNY", 0], ["NICKEL", 0], ["DIME", 0.5], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]],
}
```

### Unavailable

```js
checkCashRegister(19.5, 20, [
  ["PENNY", 0],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 10],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
]);
```

Return:

```js
{
  status: 'INSUFFICIENT_FUNDS',
  change: [],
}
```

## Unit Value

In order to provide the change in order, from highest to lowest, it is necessary to first know the unitary value of each cut.

| Cut         | Amount |
| ----------- | ------ |
| PENNY       | 0.01   |
| NICKEL      | 0.05   |
| DIME        | 0.1    |
| QUARTER     | 0.25   |
| DOLLAR      | 1      |
| FIVE        | 5      |
| TEN         | 10     |
| TWENTY      | 20     |
| ONE HUNDRED | 100    |

In JavaScript, this table can be converted in an array of objects, describing the cut and amount.

```js
const currency = [
  {
    name: "PENNY",
    value: 0.01
  },
  {
    name: "NICKEL",
    value: 0.05
  },
  {
    name: "DIME",
    value: 0.1
  },
  {
    name: "QUARTER",
    value: 0.25
  },
  {
    name: "DOLLAR",
    value: 1
  },
  {
    name: "FIVE",
    value: 5
  },
  {
    name: "TEN",
    value: 10
  },
  {
    name: "TWENTY",
    value: 20
  },
  {
    name: "ONE HUNDRED",
    value: 100
  }
];
```

## Solution

In `script.js`, you find the function clearing the project. It is thoroughly documented with a series of comments, but here I'd like to stress the crucial part in which the desired data structure is built from the `cid` array and from the array describing the unit value of the different cuts.

The goal is to provide an array of objects which contemplates the amount available and the unitary value in the same scope. In this manner, it becomes incredibly more convenient to retrieve the currency relative to the change left, and update the `status` and `change` variables accordingly.

## Update

Using the function on the [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/cash-register) platform clears every test but the following:

```js
checkCashRegister(3.26, 100, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]);
```

If you log this instance, you'd actually see this result:

```js
{
  status: 'OPEN',
  change: [ [ 'TWENTY', 60 ], [ 'TEN', 20 ], [ 'FIVE', 16.739999999999995 ] ]
}
```

Prompting a discussion regarding the precision of the different mathematical operations. What is happening here:

- the function subtracts `60` and `20` using the twenty and ten cuts. This leads to `16.74`

- in this situation, the function should continue and subtract `15` using cuts of 5, but instead subtracts the whole lot with a rounding error just for good measure.

This error boils down to the following line:

```js
const value = Math.min(changeDue, amount);
```

In a situation in which the amount is greater than the change, such when you have `55` in five dollars and `16.74` left in change, `value` describes the change due entirely, disregarding the fact that the sum cannot account for such a decimal. It becomes necessary to consider the value as the amount _or_ as much as possible in the described cut.

```js
const value = amount > changeDue ? Math.floor(changeDue / unit) * unit : amount;
```

Even with this fix however, the test fails for the same function call. This time around, it has to do with the rounding error. Indeed, by logging the `changeDue` variable we can see how the numbers following the decimal points are messed up after the first subtraction:

```code
96.74
36.739999999999995
16.739999999999995
1.7399999999999949
0.7399999999999949
0.23999999999999488
0.03999999999999487
```

In this situation the while loop subtracts 3 penny and is left with a `0.0099` that cannot be exchanged, giving light to the status `INSUFFICIENT_FUNDS`.

To solve this issue, it is necessary to round the number to at most two decimal points. After all, we are working with at most cents.

```js
changeDue = Math.round((changeDue - value) * 100) / 100;
availableCurrency.amount = Math.round((amount - value) * 100) / 100;
```

Here we use `Math.round` to round to the nearest integer. Using `Math.floor` causes to round toward the lowest integer, which for the specific case forces the change due to essentially skip using pennies. Looking at the change due with this rounding:

```code
96.74
36.73
16.72
1.71
0.71
0.2
```

The function would use two dimes and call it quits.

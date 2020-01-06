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

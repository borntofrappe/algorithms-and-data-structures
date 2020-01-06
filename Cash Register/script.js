function checkCashRegister(price, cash, cid) {
  // SETUP
  // array describing the unit value for the different cuts
  const currency = [
    {
      name: 'PENNY',
      value: 0.01,
    },
    {
      name: 'NICKEL',
      value: 0.05,
    },
    {
      name: 'DIME',
      value: 0.1,
    },
    {
      name: 'QUARTER',
      value: 0.25,
    },
    {
      name: 'ONE',
      value: 1,
    },
    {
      name: 'FIVE',
      value: 5,
    },
    {
      name: 'TEN',
      value: 10,
    },
    {
      name: 'TWENTY',
      value: 20,
    },
    {
      name: 'ONE HUNDRED',
      value: 100,
    },
  ];

  /* starting from the cid array, create an array of objects with the following information
  {
    name: 'PENNY',
    unit: 0.01
    amount: x,
  }
  */
  const register = cid
    .map(([name, amount]) => ({
      name,
      amount,
      unit: currency.find(cut => name === cut.name).value,
    }))
    // sort according to unit
    .sort(({ unit: unitA }, { unit: unitB }) => (unitA < unitB ? 1 : -1));

  // COMPUTATION
  // initialize status to open, change to an empty array
  // this default comes in handy when the change and the register are ultimately checked for remaining sums
  let status = 'OPEN';
  let change = [];

  // consider the change due
  let changeDue = cash - price;

  // while changeDue is positive
  while (changeDue > 0) {
    /* find a currency in the register with a unit that is
    - strictly less than the change due
    - with a positive amount
    */
    const availableCurrency = register.find(
      ({ unit, amount }) => unit <= changeDue && amount > 0
    );

    // if not available, exit the loop
    if (!availableCurrency) {
      break;
    } else {
      // else consider the available currency
      const { name, amount } = availableCurrency;
      // reduce the change due and the amount of the available currency
      const value = Math.min(changeDue, amount);
      changeDue -= value;
      availableCurrency.amount -= value;

      // add the name and amount to the change array
      change.push([name, value]);
    }
  }

  // consider the changeDue left && the amount left
  const isChangeLeft = changeDue > 0;
  const isRegisterEmpty = register.every(({ amount }) => amount === 0);
  // describe the desired status and change for the specified cases
  if (isChangeLeft) {
    status = 'INSUFFICIENT_FUNDS';
    change = [];
  } else if (isRegisterEmpty) {
    status = 'CLOSED';
    change = cid;
  }

  // return the desired object detailing the status and change
  // if both boolean are false, status is OPEN, change describes the sum being used
  return {
    status,
    change,
  };
}

// test three possible scenarios
const available = checkCashRegister(19.5, 20, [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
]);

const unavailable = checkCashRegister(19.5, 20, [
  ['PENNY', 0],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 10],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0],
]);

const closed = checkCashRegister(19.5, 20, [
  ['PENNY', 0],
  ['NICKEL', 0],
  ['DIME', 0.5],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0],
]);

console.log(available);

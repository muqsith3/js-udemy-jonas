let bill = 275;

const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

console.info(tip);
console.info(
  `the bill was ${bill}, the tips was ${tip} and the total value ${bill + tip}`
);

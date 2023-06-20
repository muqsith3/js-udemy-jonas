'use strict';

// CODING CHALLENGE #1
function calcAverage(nilaiTeam) {
  return nilaiTeam / 3;
}
const calcAverage2 = (a, b, c) => (a + b + c) / 3;

const scoreDolphine = calcAverage2(44, 23, 71);
const scoreKoalas = calcAverage2(65, 54, 49);
console.info(scoreDolphine, scoreKoalas);

const checkWinner = function (avgDolphine, avgKoalas) {
  if (avgDolphine >= 2 * avgKoalas) {
    return console.info(`dolphine win `);
  } else if (avgKoalas >= 2 * avgDolphine) {
    return console.info(`koalas win `);
  } else {
    return console.info(`no one win...`);
  }
};

checkWinner(scoreDolphine, scoreKoalas);

// CODING CHALLENGE #2
function calcTip(bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}

const bills = [125, 555, 44];
let tips = [];
let total = [];
for (let i = 0; i < bills.length; i++) {
  tips.push(calcTip(bills[i]));
  total.push(tips[i] + bills[i]);
}
console.info(tips);

// total
const totalBills = bills.reduce((result, value) => result + value);
console.info(totalBills);
const totalTips = tips.reduce((result, value) => result + value);
console.info(totalTips);
const totalPay = totalBills + totalTips;
console.info(total);
console.log();
//
const jonas = {
  firstName: 'jonas',
  lastName: 'schmedtmann',
  birthYear: 1991,
  job: 'teacher',
  friends: ['Michael', 'peter', 'Steven'],
  hasDriverLicense: true,

  calcAge: function () {
    this.age = 2023 - this.birthYear;
    return this.age;
  },

  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-year old ${
      this.job
    }. and he has ${this.hasDriverLicense ? 'a' : 'no'} driver's license`;
  },
};

console.info(jonas.getSummary());

//
// CODING CHALLENGE #3
const mark = {
  firstName: 'Mark',
  weight: 99,
  height: 1.99,
  calcBMI: function () {
    this.bmi = this.weight / this.height ** 2;
    return this.bmi;
  },
};
const jhon = {
  firstName: 'Jhon',
  weight: 92,
  height: 1.95,
  calcBMI: function () {
    this.bmi = this.weight / (this.height * this.height);
    return this.bmi;
  },
};

console.info(Math.round(mark.calcBMI()), Math.round(jhon.calcBMI()));

console.info(
  `${
    mark.calcBMI() > jhon.calcBMI()
      ? `${mark.firstName} BMI (${mark.bmi}) is higher than ${mark.firstName} (${jhon.bmi})`
      : `${jhon.firstName} BMI (${jhon.bmi}) is higher than ${jhon.firstName} (${mark.bmi})`
  }`
);

//
// CODING CHALLENGE #4
const bills2 = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
let totals2 = [];
let tips2 = [];

for (let i = 0; i < bills2.length; i++) {
  tips2.push(Math.trunc(calcTip(bills2[i])));
  totals2.push(tips2[i] + bills2[i]);
}
console.info(tips2);
console.info(totals2);

function calcAverageBill(arr) {
  let sum = 0;
  // sum = arr.reduce((result, value) => result + value, 0); //menambahkan setiap data pada totals2 (tips + bill)
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  // console.info(`total ${arr}`);
  // console.log(arr.length);
  console.log(sum);
  return sum / arr.length; //menghitung rata-rata dari total bill / data yang ada di total bill
}
const sum = calcAverageBill(totals2);
console.info(sum);
console.info(calcAverageBill(tips2));
console.info(calcAverageBill([10, 10, 10]));

for (let i = 0; i < 10; i++) {
  console.info(`halo ${i}`);
}

//
// Coding challenge #1 Develop skill
const data3 = [17, 21, 23];
const data4 = [12, 5, -5, 0, 4];
function printForecast(arr) {
  let str = '';
  for (let i = 0; i < arr.length; i++) {
    str = str + ` ${arr[i]}°C in ${Number(i) + 1} days ...`;
  }
  console.log('...' + str);
}

const day1 = printForecast(data3);
const day2 = printForecast(data4);

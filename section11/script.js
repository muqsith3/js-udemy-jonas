'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data account
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// DOM MANIPULATION
// create function
const displayMovements = function (movements, sort = false) {
  // menghapus element yang ada pada template
  containerMovements.innerHTML = '';
  // sorting array
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  // end sorting array

  // lopping dengan forEachh
  movs.forEach(function (mov, i) {
    // cek apakah deposite atau withdrawal
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    // membuat html element
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// end display

// reduce method - display balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(
    (accumulator, mov) => accumulator + mov,
    0
  );
  // membuat properti baru
  // acc.balance = balance
  labelBalance.textContent = `${acc.balance} €`;
};
// end reduce

// computing usernames
//function merubah ke lowercase, dan memisahkan di antara spasi
const createUsername = function (accs) {
  // foreach()
  accs.forEach(acc => {
    // membuat properti baru yang berisi singkatan dari properti owner
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsername(accounts);
// end create username

// the magic chaining methods
// const displayStatisticsIn = function (movements) {
//   const deposits = movements
//     .filter(mov => mov > 0)
//     .reduce((accum, mov) => accum + mov, 0);
//   return deposits;
// };
// const displayStatisticsOut = function (movements) {
//   const withdrawals = movements
//     .filter(mov => mov < 0)
//     .reduce((accum, mov) => accum + mov, 0);
//   return withdrawals;
// };
/// const displayStatisticsSum = function (movements) {
//   const sum = movements.reduce((accum, mov) => accum + mov, 0);
//   return sum;
// };
// labelSumIn.textContent = displayStatisticsIn(account1.movements);
// labelSumOut.textContent = displayStatisticsOut(account1.movements);
// labelSumInterest.textContent = displayStatisticsSum(account1.movements);

// simplyfy
const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((accum, mov) => accum + mov, 0);
  labelSumIn.textContent = `${income}€`;

  const outcome = acc.movements
    .filter(mov => mov < 0)
    .reduce((accum, mov) => accum + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcome)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposite => (deposite * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr, 'interest');
      return int >= 1;
    })
    .reduce((accum, int) => accum + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// end the magic chaining methods

// impllementing login
let currentAcount;

btnLogin.addEventListener('click', function (event) {
  event.preventDefault(); //prevent form from submiting
  // cari apakah user ada
  currentAcount = accounts.find(
    accn => accn.username === inputLoginUsername.value
  );
  console.log(currentAcount);
  // cek apakah pin sma
  if (currentAcount?.pin === Number(inputLoginPin.value)) {
    // display UI and message
    labelWelcome.textContent = `welcome back, ${currentAcount.owner.split(
      ' '
    )}`;
    containerApp.style.opacity = 100; //menampilkan UI
    // clear input field
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // update ui
    updateUI(currentAcount);
  }
});
// end impllementing login

// implementing transfers
// function update ui
const updateUI = function (acc) {
  // display movements
  displayMovements(acc.movements);
  // display balance
  calcDisplayBalance(acc);
  // display summary
  calcDisplaySummary(acc);
};

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // clean form
  inputTransferAmount.value = inputTransferTo.value = '';
  // check are current account have a enough balance
  if (
    amount > 0 &&
    receiverAcc &&
    currentAcount.balance >= amount &&
    receiverAcc?.username !== currentAcount.username
  ) {
    // add negative movement to current account
    currentAcount.movements.push(-amount);
    // add positive movement to current account
    receiverAcc.movements.push(amount);
    // updateUI
    updateUI(currentAcount);
  }
});
// end implementing transfers

// some and every method - loan method
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAcount.movements.some(mov => mov >= amount * 0.1)) {
    // add movement
    currentAcount.movements.push(amount);
    // update UI
    updateUI(currentAcount);
  }
  inputLoanAmount.value = '';
});

// end some and every method

// findindex method - close account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  // cek apakah akun yg sedang login sma dengan yang dihapus.
  if (
    inputCloseUsername.value === currentAcount.username &&
    Number(inputClosePin.value) === currentAcount.pin
  ) {
    // menghapus acount
    const index = accounts.findIndex(
      acc => acc.username === currentAcount.username
    );
    console.log(index);
    // delete account
    accounts.splice(index, 1);
    // hideUI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

// end findindex method - close account

// eventhandler btn sort
let sorted = false; //karena saat awal pada parameternya false.
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAcount.movements, !sorted);
  sorted = !sorted;
});
// end eventhandler btn sort

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// PRACTICE ARRAY METHODS
const bankDepositeSum = accounts
  // 1. mengambil data dari objek of array lalu menggabungkannya menjadi satu array
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((accum, curr) => accum + curr, 0);
console.log(
  bankDepositeSum,
  ' mengambil data dan menyatukan menjadi satu array besar'
);

// 2. cek berapa banyak deposite di atas 1000
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, curr) => (curr >= 1000 ? count + 1 : count), 0);

console.log(numDeposits1000, 'cara 2  deposit  > 1000');

// 3, advance case reduce, calc deposit & withdrawal
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (accum, curr) => {
      // membuat object
      // curr > 0 ? (accum.deposits += curr) : (accum.withdrawals += curr);
      accum[curr > 0 ? 'deposits' : 'withdrawals'] += curr;
      return accum;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals, ' ambil total deposit & withdrawal');
console.log(accounts.flatMap(acc => acc.movements));

// 4. konversi string menjadi title case
const convertTitle = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'and', 'the', 'but', 'or', 'in', 'with', 'an'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};

console.log(convertTitle('this is a nice title'), 'latihan 4');
console.log(
  convertTitle('this is a LONG title but not an too long'),
  'latihan 4'
);
console.log(
  convertTitle('and here is another title with an EXAMPLE'),
  'latihan 4'
);
console.log('-------------PRACTICE ARRAY METHODS----------');
/////////////////////////////////////////////////

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// simple method array

// const arr = ['a', 'b', 'c', 'd', 'e'];
// // slice
// console.log(arr);
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(arr.slice());
// // splice
// // console.log(arr.splice(2), 'splice methode');
// console.log(arr.splice(-1), 'splice method');
// console.log(arr);
// // reverse
// const arr2 = ['j', 'i', 'g', 'b', 'f', 'h'];
// console.log(arr2);
// console.log(arr2.reverse(), 'reverse method');
// console.log(arr2);
// // concat
// const letters = arr.concat(arr2);
// console.log(letters, 'concat method');
// console.log([...arr, ...arr2], 'spread operator');
// // join
// console.log(arr.join('-'));
// console.log(arr2.join('-'));

// end simple method array

// the new at method
// const arr = [23, 11, 25];
// console.log(arr[0]); //cara lama
// console.log(arr.at(0)); //cara baru ES 2020

// end the new at method

// foreach loop in array
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // looping dengan for of
// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`kamu menabung ${movement}`, 'for of');
//   } else {
//     console.log(`kamu menarik ${Math.abs(movement)}`, 'for of');
//   }
// }
// console.log('------ FOREACH --------');
// movements.forEach(function (movement, index) {
//   if (movement > 0) {
//     console.log(
//       `history ke-${index + 1} - kamu menabung ${movement} -- `,
//       'foreach'
//     );
//   } else {
//     console.log(
//       `histori ke-${index} - kamu menarik ${Math.abs(movement)}`,
//       'foreach'
//     );
//   }
// });
// end foreach

// foreach with map and sets
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// console.log(currencies);
// // foreach with map
// currencies.forEach(function (value, key, map) {
//   console.log(`${key} : ${value}`);
// });
// // foreach with set
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, key, map) {
//   console.log(`${key} : ${value}. foreach with set`);
// });
// end foreach with map and sets

// // coding challenge #1
// const julia = [3, 5, 2, 12, 7];
// const kate = [4, 1, 15, 8, 3];

// const checkDogs = function (juliaDog, kateDog) {
//   //   // const juliaCorrected = juliaDog.slice(1, -2); //✅
//   //   // revisi
//   const juliaCorrected = juliaDog.slice(); //copy
//   juliaCorrected.splice(0, 1); //param 1, awal splice, param 2 akhir splice
//   juliaCorrected.splice(-2); //slipce 2 data terakhir

//   const dogs = juliaCorrected.concat(kateDog); //✅

//   dogs.forEach(function (value, index) {
//     if (value >= 3) {
//       console.log(`dog number ${index + 1} age ${value} is an adult`);
//     } else {
//       console.log(`dog number ${index + 1} age ${value} is still a puppy`);
//     }
//   });

//   console.log(juliaCorrected);
//   console.log(kateDog);
//   console.log(dogs);
// };

// checkDogs(julia, kate);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// // // end coding challenge #1
// // coding challenge #2
// const calcAverageHumanAge = function (ages) {
//   // tugas 1✅
//   const humanAge = ages.map((value, i) => {
//     if (value <= 2) {
//       console.log(`under 18 ${value}`);
//       return 2 * value;
//     } else {
//       console.log(`above 18 ${value}`);
//       return 16 + value * 4;
//     }
//     // value <= 2 ? 2 * value : 16 + value * 4; menggunakan ternary operator.
//   });
//   // tugas 2
//   const checkAdult = humanAge.filter((value, i) => {
//     // if (value >= 18) {
//     //   return console.log(`your age ${value} you are an adult`);
//     // } else {
//     //   return console.log(`your age ${value} you are still a child`);
//     // }
//     // revisi tugas ✅
//     return value >= 18;
//   });
//   // tugas 3 ✅
//   const average =
//     checkAdult.reduce((accumulator, value) => accumulator + value, 0) /
//     checkAdult.length;

//   console.log(ages, 'initial value');
//   console.log(humanAge, `humanAge , map`);
//   console.log(checkAdult, 'filter');
//   console.log(average, 'reduce average');
//   return average;
// };
// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

// end coding challenge #2

// coding challenge #3
console.log(`--------coding challenge #3`);
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1. menambahkan properti baru ke object of array
dogs.forEach(dog => (dog.recomendedFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs, 'tugas 1');
// 2. filter sarah dog, console whether eating too much or to little
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah, 'tugas 2');
console.log(
  `Sarah Dog is eating ${
    dogSarah.curFood > dogSarah.recomendedFood ? 'too much' : 'too little'
  }`
);
// 3.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recomendedFood)
  .flatMap(dog => dog.owners);
const ownersEatToolittle = dogs
  .filter(dog => dog.curFood < dog.recomendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch, 'tugas 3');
console.log(ownersEatToolittle, 'tugas 3');

// 4. membuat string seperti di bawha:
// Matildaand Alice and Bob's dogs eat too much!"
// "Sarah and John and Michael's dogs eat too little!
console.log(`${ownersEatTooMuch.join(' and ')}dogs eat too much!`);
console.log(`${ownersEatToolittle.join(' and ')}dogs eat too much!`);

// 5. find apakah ada dog yang makan seperti rekomendasiFood
console.log(
  `${dogs.some(dog => dog.curFood === dog.recomendedFood, 'tugas 5')}`
);

// 6. tampilkan dog yang makan oke
// Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10)
const checkEatingOke = dog =>
  dog.curFood > dog.recomendedFood * 0.9 &&
  dog.curFood < dog.recomendedFood * 1.1;
console.log(dogs.some(checkEatingOke), ' tugas 6');

// 7. create array for dogs who eat oke
const dogOke = dogs.filter(checkEatingOke);
console.log(dogOke, 'tugas 7');

// 8. create a shallow copy of dogs, and sort by recomended food portion in ascending
const ascDogs = dogs
  .slice()
  .sort((a, b) => a.recomendedFood - b.recomendedFood);
console.log(ascDogs, 'tugas 8');

console.log(`--------end coding challenge #3`);

// map method()
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// // conversi ke USD
// const euroToUsd = 1.1;

// // menggunakan function expression
// // const movementsUsd = movements.map(function (mov) {
// //   // dalam callback function kita butuh value yang ingin dimiliki oleh array baru
// //   return mov * euroToUsd;
// // });
// // menggunakan arrow function
// const movementsUsd = movements.map(mov => mov * euroToUsd);
// console.log(movements);
// console.log(movementsUsd);

// const movementsDescription = movements.map((mov, i) => {
//   // simplify
//   return `Movement ${i + 1}: you ${
//     mov > 0 ? 'deposited' : 'withdrawal'
//   } ${Math.abs(mov)}`;

//   // if (mov > 0) {
//   //   return `movement ${i + 1} : you deposited ${mov}`;
//   // } else {
//   //   return `movement ${i + 1}: you withdrawal ${Math.abs(mov)}`;
//   // }
// });

// console.log(movementsDescription);

// // menggunakan for of
// const movementsUsdFor = [];
// for (const mov of movements) movementsUsdFor.push(mov * euroToUsd);
// console.log(movementsUsdFor);

// end map method()

// filter() method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });

// const withdrawals = movements.filter(mov => mov < 0);

// console.log(movements);
// console.log(deposits, 'deposits');
// console.log(withdrawals, 'withdrawals');

// // menggunakan for of loop
// const depositsFor = [];
// for (const mov of movements) {
//   if (mov > 0) depositsFor.push(mov);
// }
// console.log(depositsFor);
// end filter() method

// // reduce method()
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300, 4000];

// // acumulator -> snowball
// const balance = movements.reduce((accumulator, cur, i) => {
//   console.log(`iteration ${i}: ${accumulator}`);
//   return accumulator + cur;
// }, 0);
// console.log(balance);
// // simplify
// const balanceSimple = movements.reduce((acc, curr) => acc + curr, 0);
// console.log(balanceSimple, 'arrow function');

// // get maximum value of array (3000)
// const maxs = movements.reduce((acc, mov) => {
//   if (acc > mov) {
//     return acc;
//   } else {
//     return mov;
//   }
// }, movements[0]);
// console.log(maxs, 'function maxs');

// // menggunakan for loop
// let balance2 = 0;
// for (const mov of movements) {
//   balance2 += mov;
// }
// console.log(balance2);
// // end reduce method()

// // the magic chaining methods
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const euroToUsd = 1.1;

// const totalDepositeUsd = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * euroToUsd)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositeUsd);
// // end the magic chaining methods

//// find method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(firstWithdrawal, 'find method');

// console.log(accounts);
// const accountJesika = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(accountJesika);

// for (const account of Object.values(accounts)) {
//   // console.log(account);
//   console.log(
//     account.owner === 'Jessica Davis' ? console.log(account.owner) : 'no data'
//   );
// }

//// end find method

// some and every method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log(account1.movements, 'account 1');
// console.log(account1.movements.every(move => move > 0));
// console.log(account4.movements, 'account 1');
// console.log(account4.movements.every(move => move > 0));
// end some and every method

// flat & flatmap
// const arrDepp = [[[1, 2], 3], [4, [5, 6]], 7, 8];

// const accountMovements = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(accountMovements);
// end flat & flatmap

// sort method
// const owners = ['Melody', 'Buster', 'Emilie', 'Mohammed'];
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log(owners.sort());

// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });

// console.log(movements);

// console.log(movements.map((a, b) => a - b));

// end sort method

// more ways to create and fill arrays
// membuat array dengan constructor array
const arr = [1, 2, 3, 4, 5, 6, 7];
const x = new Array(7);
x.fill(1, 3);
console.log(x);
arr.fill(23, 3, 6);
console.log(arr);

// membuat array dengan from() method
const arrFrom = Array.from({ length: 7 }, () => 1);
console.log(arrFrom, 'array constructor from() method');

const z = Array.from({ length: 7 }, (_, index) =>
  Math.floor(Math.random() * 20)
);
console.log(z, 'using callback');

// menkonversi nodelis/noniterable ke array
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value')
  );
  console.log(movementsUI);

  // contoh menggunakan map
  console.log(movementsUI.map(el => el.textContent.replace('€', '')));
});
// endmore ways to create and fill arrays

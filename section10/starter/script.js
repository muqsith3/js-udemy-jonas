'use strict';

// default parameter

// const bookings = [];
// // booking function
// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };
// createBooking('LH123');
// createBooking('GA123', 2, 2000);
// createBooking('GA123', 2);
// createBooking('GA123', 10);

// end of default parameter

// how to passing arguments
// const flight = 'LH234';
// const fajar = {
//   name: 'fajar ali',
//   passport: 2323241124,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mr ' + passenger.name;
//   // cek apakah password sudah benar
//   // if (passenger.passport === 2323241124) {
//   //   alert('check in');
//   // } else {
//   //   alert('wrong passport!');
//   // }
// };

// checkIn(flight, fajar);
// console.log(flight);
// console.log(fajar);
// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 10000000);
//   console.log(person.passport);
// };
// newPassport(fajar);
// checkIn(flight, fajar);
// end of how to passing arguments

// function accepting callback function
// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...other] = str.split(' ');
//   return [first.toUpperCase(), ...other].join(' ');
// };
// // highOrder function
// const transformer = function (str, fn) {
//   console.log(`original string ${str}`);
//   console.log(`transform string: ${fn(str)}`);

//   console.log(`transformed by: ${fn.name}`);
// };

// transformer('javascript is the best', upperFirstWord);
// transformer('javascript is the best', oneWord);

// end function accepting callback function

// function returning function
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };
// const greeter = greet('hey');
// greeter('fajar');
// const greet2 = greeting => name => console.log(`${greeting}, ${name}`);

// greet2('hellow')('fajar');
// end function returning function

// the call and apply methods
const lufthansa = {
  airline: 'lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flighthNum, name) {
    console.log(
      ` ${name} booked a seat on ${this.airline} flight ${this.iataCode}${flighthNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flighthNum}`, name });
  },
};
lufthansa.book(239, 'muhammad fajar ali');
lufthansa.book(635, 'aulia');
console.log(lufthansa);

const euroWing = {
  airline: 'eruroWings',
  iataCode: 'EW',
  bookings: [],
};
const book = lufthansa.book;
book.call(euroWing, 23, 'wela anggraini');
console.log(euroWing);
// end the call and apply methods

// the bind method
const bookEW = book.bind(euroWing);
bookEW(23, 'ajis');
const bookEW23 = book.bind(euroWing, 23);
bookEW23('imam');
// dengan event listeners
lufthansa.plane = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.plane++;
  console.log(this.plane);
};
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
// partial application
const addTax = rate => value => value + value * rate;
const addTaxVAT = addTax(0.23);
console.log(addTaxVAT(100));
// end the bind method

// coding challenge #1
// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section! answers: new Array(4).fill(0),
//   answers: new Array(4).fill(0),
//   registerNewAnswer() {
//     const answer = Number(
//       prompt(
//         `${this.question}\n ${this.options.join('\n')}\n (write option number)`
//       )
//     );

//     typeof answer === 'number' &&
//       answer < this.answers.length &&
//       this.answers[answer]++;

//     console.log(answer);
//     console.log(this.answers);

//     this.displayResult();
//     this.displayResult('string');
//   },
//   displayResult(type = 'array') {},
// };

// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));
// end of coding challenge #1

// immediately invoked function expressions
// const runOnce = function () {
//   console.log(`this will never run again`);
// };
// (function () {
//   console.log('it will only run once');
// })();
// end immediately invoked function expressions

// closures
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount}`);
  };
};
const booker = secureBooking();

// contoh lain closure
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};
g();
f();
// end closures

// coding challenge #2
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.body.addEventListener('click', function () {
    header.style.color = 'skyblue';
  });
})();

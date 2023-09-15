'use strict';

// // create a constructor function
// const Person = function (firstName, birthYear) {
//   // console.log(this);
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//   // method
//   // this.calcAge = function () {};
// };

// const fajar = new Person('fajar', 1995);
// console.log(fajar);
// // apa yang terjadi ketika menggunakan new operator.
// // 1. new {object} is created
// // 2. function is called, this = {reference to empty object(1)}
// // 3. object{} linked to prototype.
// // 4. object was created in beginning, automatically return from constructor function. empty object  return {}.

// // prototype
// Person.prototype.sayHelo = function () {
//   console.log(`halo `);
// };
// console.log(Person.prototype);
// console.log(Person);

// fajar.sayHelo();
// console.log(fajar.__proto__, 'prototype');

// Person.prototype.species = 'homo sapiens';

// // prototype inherited
// console.log('---prototype inherited---');
// console.log(fajar.__proto__.__proto__);

// const arr = [3, 32, 1, 4, 5, 54, 223];
// console.log(arr.__proto__);

// // coding challenge #1 ------
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;

//   // console.log(make);
//   // console.log(speed);
// };
// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };
// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is breaking at ${this.speed} km/h`);
// };

// // create instance
// const bmw = new Car('BMW', 120);
// const honda = new Car('Honda', 95);

// bmw.accelerate();
// bmw.brake();
// honda.accelerate();
// honda.brake();

// --- end coding challenge #1 ---

// ES6 Classes
// class expressions
// const Person = class {};

// class declarations
// class PersonCl {
//   constructor(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   }

//   calcAge() {
//     console.log(2030 - this.birthYear);
//   }
// }

// const ali = new PersonCl('Ali', 1996);
// ali.calcAge();

// ----------------------------------------------------------------
// setter dan getter pada class javascript
// ----------------------------------------------------------------
// getter dan setter di object literal
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   calcAge() {
//     console.log(2030 - this.birthYear);
//   }

//   greet() {
//     console.log(`hey ${this.fullName}`);
//   }
//   // membuat gatter pada class
//   get Age() {
//     return 2030 - this.birthYear;
//   }

//   set fullName(name) {
//     console.log(name);
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not full name`);
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   // static methods class
//   static hey() {
//     console.log('hey there 👋', 'static method class');
//     console.log(this);
//   }
// }

// const aul = new PersonCl('putri aulia azzahra', 2019);
// console.log(aul.Age, 'getter di class');
// console.log(aul);
// PersonCl.hey();

// // static methods constructor
// // PersonCl.hey = function () {
// //   console.log('hey there 👋');
// // };

// PersonCl.hey();
// aul.hey();
// const account = {
//   owner: 'fajar',
//   movements: [200, 452, 120, 300],

//   get latest() {
//     return this.movements.slice(-1).pop();
//   },

//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };

// // cara menggunakan getter
// console.log(account.latest);
// // cara menggunakan setter
// account.latest = 50;
// console.log(account.movements);
// ----- end setter dan class javascript -----

// ----- Object.create -----

const PersonProto = {
  calcAge() {
    console.log(2030 - this.birthYear);
  },

  init(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  },
};

// membuat Person objek dengan PersonProto sebagai prototype
const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 1995;
steven.calcAge();
console.log(steven);
// ----- end Object.create javascript -----

const sofia = Object.create(PersonProto);
sofia.init('sofia', 2023);
sofia.calcAge();

// ----- coding challenge #2 -----
class Car {
  constructor(brand, speed) {
    this.brand = brand;
    this.speed = speed;
  }

  speedUp() {
    return console.log(
      `brand car is ${this.brand} and car speeding ${(this.speed += 10)} km/h`
    );
  }

  break() {
    return console.log(
      `brand car is ${this.brand} and car breaking ${(this.speed -= 5)} km/h`
    );
  }

  get speedUS() {
    return console.log(this.speed / 1.6);
  }

  set speedUS(speed) {
    return console.log(`${(this.speed = speed * 1.6)}`);
  }
}

const bmw = new Car('bmw', 120);
bmw.speedUS;
bmw.speedUp();
bmw.break();
bmw.speedUS = 50;

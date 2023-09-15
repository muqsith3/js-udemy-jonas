'use strict';

console.log(
  '================================ inheritance class constructor ================================='
);

const PersonIBC = function (fullName, birthYear) {
  this.fullName = fullName;
  this.birthYear = birthYear;
};

PersonIBC.prototype.calcAge = function () {
  console.log(2030 - this.birthYear);
};

const StudentIBC = function (firstName, birthYear, course) {
  //cara inheritance antar constructor
  PersonIBC.call(this, firstName, birthYear);
  this.course = course;
};
// connect manually to parent class constructor prototype
StudentIBC.prototype = Object.create(PersonIBC.prototype);
// harus koneksikan terlebih dulu sebelum menambahkan method baru ke student
// karena pada dasarnya membuat Object.create adalah membuat object baru.
// jika membuat method sebelum Object.create maka akan di override.

StudentIBC.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course} `);
};

const mike = new StudentIBC('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();
console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

// CODING CHALLENGE #3

const Car3 = function (brand, speed) {
  this.brand = brand;
  this.speed = speed;
};

Car3.prototype.speedUp = function () {
  return console.log(
    `${this.brand} is start ${this.speed} and speeding up ${(this.speed += 10)} km/h`
  );
};

Car3.prototype.break = function () {
  return console.log(`${this.brand} is breaking to ${(this.speed -= 5)} km/h`);
};

const EV = function (brand, speed, charge) {
  Car3.call(this, brand, speed);
  this.charge = charge;
};
// link the prototype
EV.prototype = Object.create(Car3.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.brand} is start ${
      this.speed
    } and speeding up ${(this.speed += 10)} km/h, with charge ${this.charge}`
  );
};

// create instance
const pajero = new Car3('Pajero', 120);
pajero.speedUp();
pajero.break();

const tesla = new EV('tesla', 100, 23);
tesla.chargeBattery(50);
tesla.speedUp();
tesla.break();
tesla.accelerate();
// Car3.prototype = Object.create(EV.prototype);
// end of code challenge #3

console.log(`+++++ code challenge #4 ++++`);
// coding challenge #4
class Car4 {
  constructor(brand, speed) {
    this.brand = brand;
    this.speed = speed;
  }

  speedUp() {
    console.log(
      `this ${this.brand} is tart at ${
        this.speed
      } and speed up to ${(this.speed += 10)} km/h`
    );
    return this;
  }

  break() {
    console.log(
      `this ${this.brand} speed is ${this.speed} and break to ${(this.speed -= 5)} km/h`
    );
    return this;
  }
}

class EV4 extends Car4 {
  #charge;
  constructor(brand, speed, charge) {
    super(brand, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    // this.speedUp();
    this.speed += 20;
    this.#charge--;
    console.log(
      `this ${this.brand}  is start ${
        this.speed
      } add speed up ${(this.speed += 10)}km/h, with charge ${this.#charge}`
    );
    return this;
  }
}
const car1 = new EV4('rivian', 120, 23);
// car1.chargeBattery();
// car1.speedUp();
// car1.break();
console.log('class ES6');
car1.chargeBattery(23);
// console.log(car1.#charge);
car1.accelerate().accelerate().accelerate().break().chargeBattery(50).accelerate();

// end coding challenge #4

// class inheritance with CLASS ES6
class PersonES6 {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // instance methods
  calcAge() {
    console.log(2030 - this.birthYear);
  }

  greet() {
    console.log(`hey i am ${this.fullName}`);
  }

  get age() {
    return 2030 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }
}
// create class student
class StudentES6 extends PersonES6 {
  constructor(fullName, birthYear, course) {
    // always needs to happen first!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`hey iam ${this.fullName} and iam student ${this.course}`);
  }
}

const martha = new StudentES6('martha jonas', 2012, 'computer science');
martha.introduce();
martha.calcAge();

// class inheritance with Object.create
const PersonProto2 = {
  calcAge() {
    console.log(2030 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const wela = Object.create(PersonProto2);

const StudentProto = Object.create(PersonProto2);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto2.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`my name is ${this.firstName} and i study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('jay', 2010, 'computer science');
jay.introduce();
jay.calcAge();

// another class Example

class Account {
  // 1) public fields / public instance fields (instance)
  locale = navigator.language;
  // 2) private fields (instance)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // procted properties
    this.#pin = pin;
    // this._movements = [];
    // this.local = navigator.language;

    console.log(`thnks for opening account ${this.owner}`);
  }

  // 3) public methods
  // public interface
  getMovements() {
    return this.#movements;
  }

  deposit(value) {
    this.#movements.push(value);
    return this;
  }

  withdraw(value) {
    this.deposit(-value);
    return this;
  }

  requestLoad(value) {
    if (this.#approveLoan(value)) {
      this.deposit(value);
      console.log('loan approved');
    }
    return this;
  }

  movementSum() {
    console.log(this.#movements.reduce((acc, cur) => acc + cur));
  }

  // 4) private methods
  #approveLoan(value) {
    return true;
  }

  static helper() {
    console.log('helper');
  }
}

const acc1 = new Account('fajar', 'RP', 1111);
console.log(acc1);

// good practice
acc1.deposit(250);
acc1.withdraw(150);
acc1.requestLoad(1000);
acc1.getMovements();
console.log(acc1.getMovements());

Account.helper();

acc1.deposit(300).deposit(20).withdraw(30).requestLoad(25000).withdraw(400);
acc1.movementSum();
// console.log(acc1.#movements);

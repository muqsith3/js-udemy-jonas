// variable hosted
console.log(me);

// not hoisted because let and const will in Temporal dead zone TDZ
// console.log(job); //error because cannot acces before intialization
// console.log(year); //error because cannot acces before intialization

var me = 'fajar';
let job = 'bussiness';
const year = 1995;

console.log(addDecl(3, 4));
console.log(this);

// console.log(addExp(3, 3)); error karena const akan masuk ke TDZ
console.log(addArrow(2, 3)); //error karena var akan di hoisted dan di set menjadi undefined

// function declaration
function addDecl(a, b) {
  console.log(this);
  return a + b;
}
// function expression
const addExp = function (a, b) {
  return a + b;
};
// function arrow
var addArrow = (a, b) => a + b;

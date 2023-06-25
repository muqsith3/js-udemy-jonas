'use strict';

function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `hi ${firstName} you are ${age}, born in ${birthYear}`;
    console.log(output);

    // membuat block scope baru, tandah block scope dengan {}
    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      // creating New Variabel with same name as outer scope's variable
      const firstName = 'ali';

      // reassigning outer scop's variable
      output = 'NEW OUTPUT ';

      const str = `oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
      // const output = 'new output';
    }

    console.log(output);

    // add(2, 3);
  }

  printAge();

  return age;
}

const firstName = 'fajar';
calcAge(1995);

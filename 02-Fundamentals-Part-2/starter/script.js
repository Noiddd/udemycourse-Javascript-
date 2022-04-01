"use strict";
// Strict mode prevents us to do certain things and allows some errors to be visible

//////////////////////////////////////////
// Functions
/*
function logger() {
  console.log(`My name is Dion`);
}
logger(); // Calling, running or invoking a function

function fruitProcessor(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0); // fruitProcessor(5, 0) returns juice, and we capture the value into applejuice
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

//////////////////////////////////////////
// Function Declarations vs Expressions

// Function Declarations
function calcAge1(birthYear) {
  return 2037 - birthYear;
}
const age1 = calcAge1(1991); // You can call the function before defining it for function declaration but not expression
console.log(age1);

// Function Expressions
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};
const age2 = calcAge2(1991);
console.log(age2);

//////////////////////////////////////////
// Arrow Function
// A special form of function expression, a faster and shorter way to write

// Function Expression
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};
const age2 = calcAge2(1991);
console.log(age2);

// Arrow Function
const calcAge3 = (birthYear) => 2037 - birthYear; // Do not need to write return if is 1 line
const age3 = calcAge3(1991);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  return `${firstName} retires in ${retirement} years`;
};

console.log(yearsUntilRetirement(1991, "Dion"));

//////////////////////////////////////////
// Functions Calling Other Functions

function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);
  const juice = `Juice with ${applePieces} apples pieces and ${orangePieces} oranges pieces`;
  return juice;
}

console.log(fruitProcessor(1, 10));
*/
//////////////////////////////////////////
// Reviewing Functions

const calcAge = function (birthYear) {
  return 2037 - birthYear;
};

const yearsUntilRetirement = function (birthYear, firstName) {
  const age = calcAge(birthYear);
  const retirement = 65 - age;

  if (retirement > 0) {
    console.log(`${firstName} retires in ${retirement} years`);
    return retirement; // return statement immediately exits the function, so to reach console.log, it needs to be above the return statement
  } else {
    console.log(`${firstName} has already retired`);
    return -1;
  }
};

console.log(yearsUntilRetirement(1991, "Dion"));
console.log(yearsUntilRetirement(1950, "John"));

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
*/
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

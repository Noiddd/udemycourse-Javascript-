"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements, sort = false) {
  // clearing all previous HTML in the movement tab
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    // creating the html text
    const html = `
    <div class="movements__row">
      <div class="movements__type
      movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;

    // inserting into the html
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);

  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * acc.interestRate) / 100)
    .filter((mov) => mov >= 1)
    .reduce((acc, curr) => acc + curr, 0);

  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// Event handler
// In HTML, a btn in a form element, the defult behavior when clicked is for the web to reload
// e.preventDefault() stops the form from submitting

let currentAccount;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  // .find will return undefined if there is no match
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // CLear input fileds
    inputLoginUsername.value = inputLoginPin.value = ""; // Clears the input field
    inputLoginPin.blur(); // takes the focus away from the input field

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentAccount.pin === Number(inputClosePin.value) &&
    currentAccount.username === inputCloseUsername.value
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
/////////////////////////////////////////////////
// Simple Array Methods

let arr = ["a", "b", "c", "d", "e"];

// .slice
// does NOT mutate original array
// .slice returns a new array
console.log(arr.slice(2)); // Prints: ["c", "d", "e"]
console.log(arr.slice(2, 4)); // Prints: ['c', 'd']
console.log(arr.slice(-2)); // Prints: ['d', 'e']
console.log(arr.slice(1, -2)); // Prints: ['b', 'c']

console.log(arr.slice()); // Prints: ["a", "b", "c", "d", "e"] // It creates a shallow copy
console.log([...arr]); // Prints: ["a", "b", "c", "d", "e"] // It creates a shallow copy

// .splice
// It mutates the original array
// console.log(arr.splice(2)); // Prints: ['c', 'd', 'e'] // It takes part of the array and returns it
// .splice(x, y)
// x is the index where it starts
// y is the number of element to take

arr.splice(-1); // Removing the last element in the array
console.log(arr);
console.log(arr.splice(1, 2));
console.log(arr);

// .reverse
// It mutates original array
// It reverses the element in the array

arr = ["a", "b", "c", "d", "e"];
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse());
console.log(arr2);

// .concat
// It does NOT mutate original array
// It joins 2 arrays together
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); // Gives the same results

// .join
// returns a string with a seperator in the ()
console.log(letters.join("-"));

/////////////////////////////////////////////////
// The new at Method

// .at()
const arr = [23, 11, 64];
console.log(arr[0]); // Prints: 23
console.log(arr.at(0)); // Prints: 23

// Getting the alst element of the array, not knowing the length of the array
console.log(arr[arr.length - 1]); // Prints: 64
console.log(arr.slice(-1)[0]); // Prints: 64
console.log(arr.at(-1)); // Prints: 64

console.log("jonas".at(0)); // Prints: 'j'
console.log("jonas".at(-1)); // Prints: 's'

/////////////////////////////////////////////////
// Looping Array: forEach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// looping with for of loop
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

// looping with forEach loop
// it has 3 parameter with the same order
// .forEach(value, index, array)
// Difference between a forEach and forof is that you cannot break a forEach loop
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
});

/////////////////////////////////////////////////
// forEach() with Maps and Sets

// Map
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
// a set does not have key or index
// Thus value and key is the same
// _ is used for throw away variables, meaning completely unnessary
const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});

/////////////////////////////////////////////////
// Coding Challenge 1
/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). 
For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀


// adult if it is at least 3 years old
// puppy if its less than 3 years old

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCopy = dogsJulia.slice(1, 3);
  console.log(dogsJuliaCopy);

  const dogsJuliaKate = [...dogsJuliaCopy, ...dogsKate];
  console.log(dogsJuliaKate);

  dogsJuliaKate.forEach(function (age, i) {
    if (age >= 3) {
      console.log(`Dog number ${i + 1} is an adult! And is ${age} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

/////////////////////////////////////////////////
// Data Transformation: map, filter, reduce

// .map
// similar to the forEach method, it loops over an array
// difference is that it returns a new array containing the results of applying an operation on all original array element

// .filter
// used to filter elements in the original array when it satisfy a condition
// it returns a new array containing tha array elements that passed a specified test condition

// .reduce
// it reduces all array elements down to one single value (e.g. adding all elements together)

/////////////////////////////////////////////////
// .map Method
// returns a new array with new elements

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUSd = 1.1;

// const movementsUSD = movements.map(function(mov){
//  return mov * eurToUSd
// })

// arrow
const movementsUSD = movements.map((mov) => mov * eurToUSd);

console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) {
  movementsUSDfor.push(mov * eurToUSd);
}
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i) =>

    // if (movement > 0) {
    //   return `Movement ${i + 1}: You deposited ${mov}`;
    // } else {
    //   return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
    // }

    `Movements ${i + 1}: You deposited ${
      mov > 0 ? "deposited" : "withdrew"
    }${Math.abs(mov)}`
);

console.log(movementsDescriptions);

/////////////////////////////////////////////////
// .filter Method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// This method is favourable over the for loop, since it allows chaining
const deposits = movements.filter(function (mov) {
  return mov > 0;
});

console.log(deposits);

// for loop example
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

// withdrawals
const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawals);

/////////////////////////////////////////////////
// .reduce method
// reducing the array into 1 single values

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Accumulator is like a snowball
// last digit at the back specifies the initial value of the acc
const balance = movements.reduce(function (acc, curr, i) {
  // With return, it allows the next loop to use the updated acc value
  console.log(`Iteration ${i}:${acc}`);

  return acc + curr;
}, 0);

console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value
const max = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements[0]
);

console.log(max);

/////////////////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀


const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map((age) => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(humanAges);

  const adultDogs = humanAges.filter((age) => age >= 18);
  console.log(adultDogs);

  const averageAge =
    adultDogs.reduce((acc, curr) => acc + curr, 0) / adultDogs.length;
  console.log(averageAge);

  // using .reduce to calculate average
  // const averageAge = adultDogs.reduce((acc, age, i, arr) => acc + age / arr.length, 0)
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

/////////////////////////////////////////////////
// The Magic of Chaining Methods

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUSd = 1.1;

// Converting all deposits to USD and adding them all up using chaining
// Since .filter and .map returns a new array, we are able to chain it
// .reduce returns a value

const totalDepositsUSD = movements
  .filter((mov) => mov > 0)
  // .map((mov => mov * eurToUSd)
  .map((mov, i, arr) => {
    // arr parameter is used to check if there is an error
    // console.log(arr);
    return mov * eurToUSd;
  })

  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);
*/
///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀


// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter(age => age >= 18);
//   console.log(humanAges);
//   console.log(adults);

//   // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;

//   const average = adults.reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   );

//   // 2 3. (2+3)/2 = 2.5 === 2/2+3/2 = 2.5

//   return average;
// };

const calcAverageHumanAge = (ages) =>
  ages
    .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter((age) => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

///////////////////////////////////////
// .find method
// Returns the first element of the array that satisfy the condition
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithdrawal = movements.find((mov) => mov < 0);
console.log(firstWithdrawal); // Prints: 200

// Retriving an object from a array
const account = accounts.find((acc) => acc.owner === "Jessica Davis");
console.log(account);

///////////////////////////////////////
// The findIndex Method
// It works the same way as .find, but it returns the index instead of the element

///////////////////////////////////////
// some and every
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);

//checks only on equality
console.log(movements.includes(-130)); // Prints: true

// check on condition
const anyDeposits = movements.some((mov) => mov > 0);
console.log(anyDeposits); // Prints: true // return boolean based on a condition

// .every
// only returns true if all the element in the array returns true

console.log(account4.movements.every((mov) => mov > 0)); // Prints: true

// Separate callback
const deposit = (mov) => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));


///////////////////////////////////////
// .flat()
// .flat() removes 1 layer of nested arrays and returns a full array with all the elements
// .flat(2) removes 2 layers of nested arrays
// .flatMap()

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];

console.log(arr.flat()); // Prints: [1, 2, 3, 4, 5, 6, 7, 8]
console.log(arrDeep.flat()); // Prints: [[1,2] 3, 4, [5, 6], 7, 8]
console.log(arrDeep.flat(2)); // Prints: [1, 2, 3, 4, 5, 6, 7, 8]

// Calculating the total balance of the bank from ALL the accounts movements

// const overalBalance = accounts
//   .map((acc) => acc.movements)
//   .flat()
//   .reduce((acc, bal) => acc + bal, 0);

// console.log(overalBalance);

// .flatMap()
// it combines .flat() and .map()
// it only removes nested arraies 1 level deep
const overalBalance = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, bal) => acc + bal, 0);
console.log(overalBalance);


///////////////////////////////////////
// Sorting Arrays

// Strings
// .sort()
// it sort an array alphabetically based on strings
// it mutates the original array

const owners = ["Jonas", "Zach", "Adam", "Martha"];
console.log(owners.sort());
console.log(owners);

// Numbers
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// a is the current number, b is the next number
// they are consecutive numbers
// if return < 0. a, b (keep order)
// if return > 0. b, a (switch order)

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });

movements.sort((a, b) => {
  a - b;
});
console.log(movements); // Prints: [-650, -400, -130, 70, 200, 450, 1300, 3000]

// Descending
movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});
console.log(movements); // Prints: [3000, 1300, 450, 200, 70, -130, -400, -650]

///////////////////////////////////////
// More Ways of Creating and Filling Arrays

// Creating arrays
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// if passing only 1 element in the new Array()
const x = new Array(7); // creating an array with 7 empty elements
console.log(x);

// .fill(a, b, c)
// it fills an array with a starting from index b to c, not including c
// it mutates the original array
x.fill(1, 3, 5);
console.log(x);

arr.fill(23, 4, 6);
console.log(arr); // Prints: [1, 2, 3, 4, 23, 23, 7]

// Array.from()
// Used tio create an array from an array-like or iterable object or a node list

const y = Array.from({ length: 7 }, () => 1);
console.log(y); // Prints: [1, 1, 1, 1, 1, 1, 1]

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); // Prints: [1, 2, 3, 4, 5, 6, 7]

// 100 random dice roll with Array.from()
const randomDice = Array.from(
  { length: 100 },
  () => Math.trunc(Math.random() * 6) + 1
);
console.log(randomDice);

labelBalance.addEventListener("click", function () {
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"), // this is a node list, therefore Array.from() is used to create an Array out of it
    (el) => Number(el.textContent.replace("€", ""))
  );

  console.log(movementsUI);
});

///////////////////////////////////////
// Array Methods Practice

// Calculating total bank deposits
const bankDepositSum = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .reduce((acc, curr) => acc + curr);

console.log(bankDepositSum);

// Counting the deposits in the bank with at least 1000
// Method 1
const numDeposits1000 = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov >= 1000).length;

console.log(numDeposits1000); // Prints: 6

// Method 2
const numDeposits10002 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((count, curr) => (curr >= 1000 ? ++count : count), 0); // ++ used infront of count if not it will not work

console.log(numDeposits10002); // Prints: 6

// Prefixed ++ operator
let a = 10;
console.log(a++); // Prints: 10
console.log(a); // Prints: 11
console.log(++a); // Prints 12

// Create object which contains the sum of the deposit and of the withdrawals
const { deposits, withdrawals } = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, curr) => {
      // curr > 0 ? (sums.deposits += curr) : (sums.withdrawals += curr); // method 1

      sums[curr > 0 ? "deposits" : "withdrawals"] += curr; // method 2
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  ); // { deposits: 0, withdrawals: 0 } is actually sums

console.log(deposits, withdrawals); // Prints: {deposits: 25180, withdrawals: -7340}

// Create a function that converts any string to a title case

const convertTitleCase = function (title) {
  const capitalise = (str) => str[0].toUpperCase() + str.slice(1);

  const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];

  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) => (exceptions.includes(word) ? word : capitalise(word)))
    .join(" ");

  return capitalise(titleCase);
};
console.log(convertTitleCase("this is a nice title"));
console.log(convertTitleCase("this is a LONG title but not too long"));
console.log(convertTitleCase("and here is another title with an EXAMPLE"));

*/
///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array.
// Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)

dogs.forEach((dog) => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little.
// HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

// My method
// dogs.forEach((dog) => {
//   if (dog.owners.includes("Sarah")) {
//     if (dog.curFood > dog.recFood) {
//       console.log("Sarah's dog is eating too much");
//     } else if (dog.curFood < dog.recFood) {
//       console.log("Sarah's dog is eating too little");
//     }
//   }
// });

// Course method
const dogSarah = dogs.find((dog) => dog.owners.includes("Sarah"));
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? "much" : "little"
  }`
);

// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

// My method
// const ownersEatTooMuch = [];
// const ownersEatTooLittle = [];

// dogs.forEach((dog) =>
//   dog.curFood > dog.recFood
//     ? ownersEatTooMuch.push(dog.owners)
//     : ownersEatTooLittle.push(dog.owners)
// );

// console.log(ownersEatTooMuch.flat());
// console.log(ownersEatTooLittle.flat());

// Course method
const ownersEatTooMuch = dogs
  .filter((dog) => dog.curFood > dog.recFood)
  .flatMap((dog) => dog.owners);

const ownersEatTooLittle = dogs
  .filter((dog) => dog.curFood < dog.recFood)
  .flatMap((dog) => dog.owners);

console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

console.log(`${ownersEatTooMuch.join(" and ")}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(" and ")}'s dogs eat too little!`);

// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)

console.log(dogs.some((dog) => dog.curFood === dog.recFood));

// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)

console.log(
  dogs.some(
    (dog) => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
  )
);

// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)

const dogsOkayFood = dogs.filter(
  (dog) => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
);
console.log(dogsOkayFood);

// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);

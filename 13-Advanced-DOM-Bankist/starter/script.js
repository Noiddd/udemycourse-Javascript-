"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/*
///////////////////////////////////////
// Selecting, Creating and Deleting Elements

// Selecting elements
console.log(document.documentElement); // Selecting the entire page for CSS styling
console.log(document.head);
console.log(document.body);

const header = document.querySelector(".header");
const allSelection = document.querySelectorAll(".section");

console.log(allSelection);

document.getElementById("section--1");

// returns a HTML collection, different from a Node list
// HTML collection is a live collection means it will update live if something is added or removed
const allButtons = document.getElementsByTagName("button");
console.log(allButtons); // return HTML collection

console.log(document.getElementsByClassName("btn")); // return HTML collection

// Creating and inserting elements
// .insertAdjacentHTML

// Creates a DOM element and stores it in message
// Not yet anywhere in the DOM, its simply a DOM object that we can do something about it
const message = document.createElement("div");

message.classList.add("cokkie-message"); // adding CSS style
// message.textContent = 'We use cookies for improved functionality and analytics.' // This inserts text
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>';

// DOM elements are unique, so message was inserted with prepend and moved by append. Thats why it ONLY shows at the bottom of header
// header.prepend(message); // preend adds message as the first child of header, this will show up at the top of header
header.append(message); // preend adds message as the last child of header, this will show up at the bottom of header

// copy element to show both top and bottom
// header.prepend(message);
// header.append(message.cloneNode(true));

// header.before(message); // insert before the header elements as a sibling
// header.after(message); // insert after the header elements as a sibling

// Delete Elements
document
  .querySelector(".btn--close--cookie")
  .addEventListener("click", function () {
    message.remove();
  });

*/

///////////////////////////////////////
// Styles, Attributes and Classes
const header = document.querySelector(".header");
const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>';
header.append(message);
header.after(message);

document
  .querySelector(".btn--close--cookie")
  .addEventListener("click", function () {
    message.remove();
  });

// Styles

// Setting inline styles
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

console.log(message.style.color);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

document.documentElement.style.setProperty("--color-primary", "orangered");

// Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = "Beautiful minimalist logo"; // Changing properties
console.log(logo.alt);

console.log(logo.designer); // Prints: undefined // Since it is not a standard property that is expected on images
console.log(logo.getAttribute("designer"));
logo.setAttribute("company", "Bankist");

console.log(logo.src); // Absolute version
console.log(logo.getAttribute("src")); // relative version

const link = document.querySelector(".twitter-link");
console.log(link.href);
console.log(link.getAttribute("href"));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add("c");
logo.classList.remove("c");
logo.classList.toggle("c");
logo.classList.contains("c"); // contains not includes

// Don't use
// It overrides all existing classes and allows only 1
logo.className = "jonas";

import { characters, numbers, symbols } from "./data.js";
const numberCheck = document.getElementById("numbers-check");
const symbolCheck = document.getElementById("symbol-check");
const passwordEl = document.getElementById("password-div");
const genPasswordBtn = document.getElementById("gen-password");

const generateRandomNumber = () => {
  const randomNum = Math.floor(Math.random() * 5 + 1);
  return randomNum;
};

const generateRandomIndex = (list) => {
  const randomIndex = Math.floor(Math.random() * list.length);
  return randomIndex;
};

const generateRandomItems = (list, numberItems) => {
  const arrayItems = [];
  for (let i = 0; i < numberItems; i++) {
    const index = generateRandomIndex(list);
    const item = list[index];
    arrayItems.push(item);
  }
  return arrayItems;
};

const generatePassword = () => {
  let numberNums = 0;
  let numberSymbols = 0;
  if (numberCheck.checked) {
    numberNums = generateRandomNumber();
  }
  if (symbolCheck.checked) {
    numberSymbols = generateRandomNumber();
  }
  const numberCharacters = 15 - numberNums - numberSymbols;
  const numberItems = generateRandomItems(numbers, numberNums);
  const SymbolItems = generateRandomItems(symbols, numberSymbols);
  const CharacterItems = generateRandomItems(characters, numberCharacters);
  const unshuffled = numberItems.concat(SymbolItems, CharacterItems);

  // from StackOverflow
  let shuffled = unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  let password = "";
  for (let i of shuffled) {
    password += i;
  }

  return password;
};

genPasswordBtn.addEventListener("click", () => {
  passwordEl.innerHTML = "";
  passwordEl.classList.remove("hidden");

  const numberPasswords = document.getElementById("quantity").value;

  for (let i = 1; i <= numberPasswords; i++) {
    const password = generatePassword();
    console.log(password);
    const text = `<div id="pass-${i}">${password}</div>`;
    passwordEl.innerHTML += text;
  }
});

passwordEl.addEventListener("click", (e) => {
  const id = e.target.id;
  console.log(id);
  const element = document.getElementById(`${id}`);
  // Create a fake `textarea` and set the contents to the text
  // you want to copy
  const storage = document.createElement("textarea");
  storage.value = element.innerHTML;
  element.appendChild(storage);

  // Copy the text in the fake `textarea` and remove the `textarea`
  storage.select();
  storage.setSelectionRange(0, 99999);
  document.execCommand("copy");
  element.removeChild(storage);
  // Alert the copied text
  alert("Password Copied");
});

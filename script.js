// Latest

// Also want to try sorting new entries as add them when sort is toggled on.

// Done
// Make currency accept decimals
// Make inputs clear after submit.

let strArray = [];
let intArray = [];
let currencyArray = [];

const alphabetize = (e) => {

  const li = e.target.parentElement.parentElement;
  // index of string
  const i = li.dataset.num;
  // span where data string is displayed
  const dataSpan = li.firstChild;
  // select the span where the user-entered string is located
  let str = strArray[i];

  if(!e.target.checked) {
    // undo alphabetizaton by pulling original string from array
    dataSpan.textContent = str;
  } else {
    // box just checked, alphabetize away!
    let abcArray = str.split("");

    // alphabetize algorithm
    for(let i = 0; i < abcArray.length - 1; i++) {
      if(abcArray[i].toLowerCase() > abcArray[i+1].toLowerCase()){
        let a = abcArray[i];
        let b = abcArray[i + 1];
        abcArray[i] = b;
        abcArray[i + 1] = a;
        // start over
        i = -1;
      }
    }

    // replace old string with new string
    dataSpan.textContent = abcArray.join("");

  }
}

const addString = (e) => {
  // keep page from reloading
  e.preventDefault();

  // prep data
  const str = document.getElementById("string-entry").elements.namedItem("entry").value;
  const stringList = document.getElementById("string-list");
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("click", alphabetize);
  const span = document.createElement("span");
  span.classList.add("alpha"); // for styling
  span.innerHTML = "\u00A0\u00A0\u00A0alphabetize ";
  span.appendChild(checkbox);
  const strNum = strArray.length;

  // restrict to between 6 and 20 characters
  if(str.length > 20 || str.length < 6){
    alert("String must be between 6 and 20 characters long.");
  } else {
    // save string in array
    strArray.push(str);
    // append new string to list
    li.setAttribute("data-num", "" + strNum);
    li.innerHTML = `<span class="data-span">${str}<span>`;
    li.appendChild(span);
    stringList.appendChild(li);
  }

  // clear input
  document.getElementById("string-entry").elements.namedItem("entry").value = "";
}

const addInteger = (e) => {
  // keep page from reloading
  e.preventDefault();

  // prep data
  const int = document.getElementById("integer-entry").elements.namedItem("entry").value;
  const integerList = document.getElementById("integer-list");
  const li = document.createElement("li");

  // push new integer to array
  intArray.push(int);

  // APPEND NEW INTEGER TO LIST
  // To ensure new items are added in order when Sort control is on, call intMinToMax
  intMinToMax(document.getElementById("int-sort-checkbox").checked);

  // clear input
  document.getElementById("integer-entry").elements.namedItem("entry").value = "";
}

const intSortCheckBoxHandler = (e) => {
  intMinToMax(e.target.checked);
}

const intMinToMax = (isChecked) => {
  let integerList = document.getElementById("integer-list");
  // empty list of integers in DOM
  while(integerList.firstChild) integerList.removeChild(integerList.firstChild);

  if(isChecked) {
    // sort toggled on, sort list and display

    // copy int array with slice(0), sort the copy by number rather than string (hence the compare function with a and b)
    let sortedArray = intArray.slice(0).sort(function(a,b){return a - b;});

    for(let i = 0; i < sortedArray.length; i++) {
      let li = document.createElement("li");
      li.innerHTML = sortedArray[i];
      integerList.appendChild(li);
    }
  } else {
    // sort toggled off, display original list
    for(let i = 0; i < intArray.length; i++) {
      let li = document.createElement("li");
      li.innerHTML = intArray[i];
      integerList.appendChild(li);
    }
  }

}

const addDate = (e) => {
  // keep page from reloading
  e.preventDefault();

  // append new date to list
  const date = document.getElementById("date-entry").elements.namedItem("entry").value;
  const dateList = document.getElementById("date-list");
  const li = document.createElement("li");

  li.innerHTML = date;
  dateList.appendChild(li);

  // clear input
  document.getElementById("date-entry").elements.namedItem("entry").value = "";
}

const addCurrency = (e) => {
  // keep page from reloading
  e.preventDefault();

  // prep data
  let currency = document.getElementById("currency-entry").elements.namedItem("entry").value;
  // turn currency into number
  currency = parseFloat(currency);
  console.log("currency: ");
  console.log(currency);
  const currencyList = document.getElementById("currency-list");
  const li = document.createElement("li");

  // check if number
  if(isNaN(currency)) {
    alert("Please only enter numbers.");
  } else {
    // append new currency to list, but as a string with two decimals
    li.innerHTML = currency.toFixed(2);
    currencyList.appendChild(li);

    // push new currency to array
    currencyArray.push(currency);
  }


  console.log(currencyArray);
  // clear input
  document.getElementById("currency-entry").elements.namedItem("entry").value = "";
}

const currMinToMax = (e) => {
  let currencyList = document.getElementById("currency-list");
  // empty list of integers in DOM
  while(currencyList.firstChild) currencyList.removeChild(currencyList.firstChild);

  if(e.target.checked) {
    // sort toggled on, sort list and display

    // copy int array with slice(0), sort the copy by number rather than string (hence the compare function with a and b)
    let sortedArray = currencyArray.slice(0).sort(function(a,b){return a - b;});

    for(let i = 0; i < sortedArray.length; i++) {
      let li = document.createElement("li");
      // append as string with two decimals
      li.innerHTML = sortedArray[i].toFixed(2);
      currencyList.appendChild(li);
    }
  } else {
    // sort toggled off, display original list
    for(let i = 0; i < currencyArray.length; i++) {
      let li = document.createElement("li");
      li.innerHTML = currencyArray[i].toFixed(2);
      currencyList.appendChild(li);
    }
  }

}

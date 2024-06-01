const body = document.body;
let addBrandInput = document.createElement("input");
let addCategoryInput = document.createElement("input");
const input = document.getElementsByTagName("input");
const header = document.getElementsByTagName("header")[0];
const head = document.getElementsByTagName("h1")[0];
let brandContainer = document.getElementsByClassName("brandContainer")[0];
let categoryContainer = document.getElementsByClassName("categoryContainer")[0];
let brandInput = document.querySelector("#brandInput");
let categoryInput = document.querySelector("#categoryInput");
const btnCover = document.getElementsByClassName("btnCover");
const switcher = document.getElementsByClassName("switcher")[0];
const plusMinusBtn = document.getElementsByClassName("fa-plus-minus");
const select = document.getElementsByTagName("select");
const textData = document.getElementsByClassName("textData")[0];
const numbersData = document.getElementsByClassName("numbersData")[0];
const total = numbersData.nextElementSibling;
const BrandModel = document.getElementById("BrandModel");
const price = document.getElementById("price");
const tax = document.getElementById("tax");
const discount = document.getElementById("discount");
let itemsNumContainer = document.getElementsByClassName("itemsNumContainer")[0];
const submit = document.getElementById("submit");
const clearBtn = document.getElementById("clearBtn");
const itemsNum = document.getElementById("itemsNum");
const th = document.getElementsByTagName("th");
let tr = document.getElementsByTagName("tr")[0];
const searchArrows = document.getElementsByClassName("fa-arrow-right-long");
const tBody = document.getElementById("tBody");
const span = document.createElement("span");
let td = document.getElementsByTagName("td");
let idNumber = document.createElement("span");
let topBtn = document.getElementById("topBtn");
let brandSearch = document.getElementById("brandSearch");
let categorySearch = document.getElementById("categorySearch");
let searchArrow1 = document.getElementById("searchArrow1");
let searchArrow2 = document.getElementById("searchArrow2");
let brandSearchArr = [];
let categorySearchArr = [];

input[5].value = null; // brandSearch.
input[6].value = null; // categorySearch.
let state = "dataCreation";
let deletedElementGlobalizer;
const tableBtn = document.getElementsByClassName("tableBtn");
submit.innerText = "add item";
let itemsStore = [];
retrieveData();
createData();
brandInput.style.display = "block";
addBrandInput.style.display = "none";
categoryInput.style.display = "block";
addCategoryInput.style.display = "none";


// Light-mode arrays.
const lightModeArr = [switcher, body, header, head, total, topBtn, submit, clearBtn];
const lightModeArrays = [
  input,
  select,
  btnCover,
  plusMinusBtn,
  textData.children,
  numbersData.children,
  searchArrows,
  th,
  td,
  tableBtn,
];

let darkMode = localStorage.getItem("dark-mode");

const enableDarkMode = () => {
  lightModeArr.forEach((indx) => {
    indx.classList.add("light-mode");
  });
  for (arr of lightModeArrays) {
    [...arr].forEach((indx) => {
      indx.classList.add("light-mode");
    });
  }
  localStorage.setItem("dark-mode", "enabled");
};

const disableDarkMode = () => {
  lightModeArr.forEach((indx) => {
    indx.classList.remove("light-mode");
  });
  for (arr of lightModeArrays) {
    [...arr].forEach((indx) => {
      indx.classList.remove("light-mode");
    });
  }
  localStorage.setItem("dark-mode", "disabled");
};

if (darkMode === "enabled") {
  enableDarkMode(); // set state of darkMode on page load
};

switcher.addEventListener("click", () => {
  darkMode = localStorage.getItem("dark-mode"); // update darkMode when clicked
  if (darkMode === "disabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

/*   _______________________  {calc total price }   5 functions    _________________________ */
//  ==>>  Get discount percent.
function discountPercent(value) {
  if (value !== null && value !== "" && value >= 0) {
    return (100 - +value) / 100;
  } else {
    return 1;
  }
}

//  ==>>  Get Tax percent.
function taxPercent(value) {
  if (value !== null && value !== "" && value >= 0) {
    return (100 + +value) / 100;
  } else {
    return 1;
  }
}

//  ==>> Should get assure that [price, tax,discount] aren't strings.
function getTotalPrice() {
  if (price.value !== null && price.value !== "" && price.value > 0) {
    let totalPrice;
    totalPrice =
      +price.value *
      taxPercent(+tax.value) *
      discountPercent(+discount.value) *
      +itemsNum.value;
    total.appendChild(span);
    // to ensure that the number is float
    Number.isInteger(totalPrice) == false
      ? (span.innerText = ` : ${parseFloat(totalPrice).toFixed(2)}$ `)
      : span.innerText`: ${totalPrice}$ `;

    //__//

    // write the price inside a span.
  } else {
    total.innerText = "$$";
  }
}

//  ==>>  get Total Price For one Item.
function getTotalPriceForAnItem() {
  if (price.value > 0) {
    let totalPrice;
    totalPrice =
      +price.value *
      taxPercent(+tax.value) *
      discountPercent(+discount.value) *
      1;
    // to ensure that the number is float
    if (Number.isInteger(totalPrice) == false) {
      return parseFloat(totalPrice).toFixed(2);
    } else {
      return totalPrice;
    }
  }
}

//  ==>>  Show the Total price depending on items number value.
itemsNum.addEventListener(
  "keyup",
  function getTotal() {
    if (tax.value === null) {
      alert(`Enter tax value please!`);
    } else if (discount.value === null) {
      alert(`Enter discount value please!`);
    } else {
      getTotalPrice();
    }
  },
  { once: true }
);

/*_________________________________  End of it   ________________________________ */

// _____________________ Update item function.  _________________________ //
function updateItem(item) {
  state = "dataUpdating";
  submit.innerText = "update item";
  input[6].style.display = "none";
  btnCover[3].style.display = "none";
  plusMinusBtn[3].style.display = "none";
  itemsNumContainer.appendChild(idNumber);
  let data = JSON.parse(localStorage.getItem("itemsData"));
  let targetedItem = data[item];
  deletedElementGlobalizer = item;
  brandInput.style.display = "none";
  addBrandInput.style.display = "block";
  categoryInput.style.display = "none";
  addCategoryInput.style.display = "block";

  // assign the selected item value into inputs.
  itemData = {
    brand: (addBrandInput.value = targetedItem.brand),
    BrandModel: (BrandModel.value = targetedItem.BrandModel),
    category: (addCategoryInput.value = targetedItem.category),
    price: (price.value = targetedItem.price),
    tax: (tax.value = targetedItem.tax),
    discount: (discount.value = targetedItem.discount),
    itemsNum: (idNumber.innerText = `item's id: ${+item + 1}`),
  };
}
// ___________________________  End of it  ____________________________ //

// Clear data from inputs after adding new items.
function clearInputs() {
  itemData = {
    brand: (brandInput.value = "none"),
    BrandModel: (BrandModel.value = null),
    category: (categoryInput.value = "none"),
    price: (price.value = null),
    tax: (tax.value = null),
    discount: (discount.value = null),
    itemsNum: (itemsNum.value = null),
  };

  // This regarding to retrieving the styles after updating an item.
  input[5].value = null; // discount input.
  input[6].value = null; // itemsNumber.
  span.innerText = null; // price
  addBrandInput.value = null; // brand input entry.
  addCategoryInput.value = null; // category input entry.
  input[6].style.display = "block";
  btnCover[3].style.display = "block"; // btnCover of itemsNum.
  plusMinusBtn[3].style.display = "block";
  idNumber.innerText = null;
  submit.innerText = "add item";

  brandInput.style.display = "block";
  addBrandInput.style.display = "none";
  categoryInput.style.display = "block";
  addCategoryInput.style.display = "none";
  return true;
}

/* __________________________ {search By brand/category}  6 functions  _________________________ */
function searchByBrand() {
  let data = JSON.parse(localStorage.getItem("itemsData"));
  data.forEach((obj) => {
    let brandVal = obj.brand.toLocaleLowerCase();
    if (brandVal.includes(brandSearch.value) == true) {
      brandSearchArr.push(obj);
    }

    // Adding items to the table.
    let row = "";
    for (let item = 0; item < brandSearchArr.length; item++) {
      row += `  <tr>
          <td > ${(brandSearchArr[item].id = item + 1)}</td>
          <td > ${brandSearchArr[item].brand}</td>
          <td > ${brandSearchArr[item].BrandModel}</td>
          <td > ${brandSearchArr[item].category}</td>
          <td > ${brandSearchArr[item].price}</td>
           <td > ${brandSearchArr[item].tax + "%"}</td>
          <td > ${itemsStore[item].discount + "%"}</td>
          <td > ${itemsStore[item].priceOfOneItem}</td>
         <td ><button class="tableBtn"  id = ${item}  onclick='updateItem(this.id)' >update</button> </td>
         <td ><button class="tableBtn"  id = ${item} onclick='deleteItem(this.id)'  >delete</button</td>
        </tr>
         `;
      tBody.innerHTML = row;
    }
  });
}

//  ==>>  fire brand search function
function brandArrow(id) {
  let focusedInput = document.getElementById(id);
  focusedInput.previousElementSibling.style.display = "block";
  focusedInput.previousElementSibling.children[0].addEventListener(
    "click",
    () => {
      searchByBrand();
    },
    { once: true }
  );
}

//  ==>> clear the search table and clean the other search arrow function.
brandSearch.addEventListener("click", () => {
  searchArrow2.style.display = "block" ? "none" : "block";
  brandSearchArr = [];
  tBody.innerHTML = "";
  categorySearch.value = null;
});

//  ==>> search for items by category name function.
function searchByCategory() {
  let data = JSON.parse(localStorage.getItem("itemsData"));
  data.forEach((obj) => {
    let categoryVal = obj.category.toLocaleLowerCase();
    if (categoryVal.includes(categorySearch.value) == true) {
      categorySearchArr.push(obj);
    }
    // Adding items to the table.
    let row = "";
    for (let item = 0; item < categorySearchArr.length; item++) {
      row += `  <tr>
          <td > ${(categorySearchArr[item].id = item + 1)}</td>
          <td > ${categorySearchArr[item].brand}</td>
          <td > ${categorySearchArr[item].BrandModel}</td>
          <td > ${categorySearchArr[item].category}</td>
          <td > ${categorySearchArr[item].price}</td>
          <td > ${categorySearchArr[item].tax + "%"}</td>
          <td > ${itemsStore[item].discount + "%"}</td>
          <td > ${itemsStore[item].priceOfOneItem}</td>
         <td ><button class="tableBtn"  id = ${item}  onclick='updateItem(this.id)' >update</button> </td>
         <td ><button class="tableBtn"  id = ${item} onclick='deleteItem(this.id)'  >delete</button</td>
        </tr>
         `;
      tBody.innerHTML = row;
    }
  });
}

// fire category search function
function categoryArrow(id) {
  let focusedInput = document.getElementById(id);
  focusedInput.previousElementSibling.style.display = "block";
  focusedInput.previousElementSibling.children[0].addEventListener(
    "click",
    () => {
      searchByCategory();
    },
    { once: true }
  );
}

// clear the search table and clean the other search arrow function.
categorySearch.addEventListener("click", () => {
  searchArrow1.style.display = "block" ? "none" : "block";
  categorySearchArr = [];
  tBody.innerHTML = "";
  brandSearch.value = null;
});

/*_________________________________  End of it   ________________________________ */

/* __________________ {enter brand/category input if they aren't available in select menu}  4 functions  _____________ */

//   ==>>     enter Brand name function.
function addNewBrandInput() {
  brandContainer.appendChild(addBrandInput);
  addBrandInput.setAttribute("placeholder", "enter brand name");
  addBrandInput.id = "brand-input";
  brandInput.style.display = "none";
  addBrandInput.style.display = "block";
  if (addBrandInput.value !== "" || null) {
    return addBrandInput.value;
  } else {
    return brandInput.value;
  }
}

//   ==>>    fire the brand input mode .
brandInput.addEventListener("change", () => {
  if (brandInput.value === "another brand") {
    return addNewBrandInput();
  }
});

//  ==>>    enter Category name function.
function addNewCategoryInput() {
  categoryInput.style.display = "none";
  categoryContainer.appendChild(addCategoryInput);
  addCategoryInput.setAttribute("placeholder", "enter category");
  addCategoryInput.id = "category-input";
  addCategoryInput.style.display = "block";
  if (addCategoryInput.value !== "" || null) {
    return addCategoryInput.value;
  } else {
    return categoryInput.value;
  }
}

//  ==>>  fire the category input mode
categoryInput.addEventListener("change", () => {
  if (categoryInput.value === "another category") {
    return addNewCategoryInput();
  }
});
/*___________________________  End of it   ____________________________ */

// ________________________  Create an object to collect the items data.  _____________________ //
function createData() {
  let itemData = {
    brand: addNewBrandInput(),
    BrandModel: BrandModel.value,
    category: addNewCategoryInput(),
    price: price.value,
    tax: tax.value,
    discount: discount.value,
    priceOfOneItem: getTotalPriceForAnItem(),
  };

  // If dataCreation state is on, Push items in the store array depending on their count input.
  if (
    (state === "dataCreation" && itemData.brand !== "none") ||
    (null && itemData.category !== "none") ||
    (null && price.value !== null && tax.value !== null) ||
    ("" && discount.value !== null)
  ) {
    for (let i = 0; i < itemsNum.value; i++) {
      itemsStore.push(itemData);
    }
    // If updating state is on, push the updated item only to its old place in the itemsStore array.
  }
  if (state !== "dataCreation") {
    itemsStore[deletedElementGlobalizer] = itemData;
    location.reload();
  }

  let row = "";
  // Adding items to the table.
  for (let item = 0; item < itemsStore.length; item++) {
    row += `  <tr>
          <td > ${(itemsStore[item].id = item + 1)}</td>
          <td > ${itemsStore[item].brand}</td>
          <td > ${itemsStore[item].BrandModel}</td>
          <td > ${itemsStore[item].category}</td>
          <td > ${itemsStore[item].price}</td>
          <td > ${itemsStore[item].tax + "%"}</td>
          <td > ${itemsStore[item].discount + "%"}</td>
          <td > ${itemsStore[item].priceOfOneItem}</td>
         <td ><button class="tableBtn"  id = ${item}  onclick='updateItem(this.id)' >update</button> </td>
         <td ><button class="tableBtn"  id = ${item} onclick='deleteItem(this.id)'  >delete</button</td>
        </tr>
         `;

    tBody.innerHTML = row;
  }

  // Show delete all Btn depending on the length of localStorage.
  if (itemsStore.length > 1) {
    clearBtn.style.display = "block";
  }

  //  Push the items array to localStorage.
  localStorage.setItem("itemsData", JSON.stringify(itemsStore));

  // clear inputs after clicking on add/update item btn.
  clearInputs();
  fixTdColor();
  
}
// ___________________________  End of it  ____________________________ //

// _______________________   On reload retrieve the data from localStorage.  _______________________ //
function retrieveData() {
  let retrievedData = JSON.parse(localStorage.getItem("itemsData"));
  if (localStorage.length > 0) {
    for (let obj of retrievedData) {
      itemsStore.push(obj);
    }
    return itemsStore;
  } else {
    return 1;
  }
}

// ___________________________  End of it  ____________________________ //

//________________________ Delete item function.  ________________________ //
function deleteItem(item) {
  let data = JSON.parse(localStorage.getItem("itemsData"));
  let removingConfirmation = confirm(
    `Are you sure you want to delete ${data[item].brand} ${data[item].BrandModel} item?`
  );
  if (removingConfirmation) {
    data.splice(item, 1);
    localStorage.setItem("itemsData", JSON.stringify(data));
    location.reload();
  }
}
// ___________________________  End of it  ____________________________ //

//____________________  Delete all items from localStorage function.   ______________________//
clearBtn.addEventListener("click", () => {
  let removingConfirmation = confirm(
    "After taking this action, all items will be deleted .. Are you sure?"
  );
  if (removingConfirmation) {
    localStorage.clear();
    location.reload();
  }
});
// ___________________________  End of it  ____________________________ //

//____________________  show scroll btn function.  ____________________________//
window.addEventListener("scroll", () => {
  // show btn if  scroll is bigger than 250
  window.scrollY > 250
    ? (topBtn.style.visibility = "visible")
    : (topBtn.style.visibility = "hidden");
});
// ___________________________  End of it  ____________________________ //

// _________________  onclick, go to top. ______________________________ //
topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
// ___________________________  End of it  ____________________________ //

// _________________  Make the number inputs accept numbers only. ______________________________ //

let numbersInputs = [price, tax, discount, itemsNum];
numbersInputs.forEach((ele) => {
  ele.addEventListener("input", function (e) {
    this.value = this.value.replace(/[^0-9]/g, "");
    if (isNaN(parseInt(this.value))) {
      alert(`${this.placeholder} value must be a number.`);
    }
  });
});

// ___________________________  End of it  ____________________________ //

// _________________  Fix the non-change td color in light mood  ______________________________ //

function fixTdColor() {
  if ( localStorage.getItem("dark-mode") == "enabled") {
    [...td].forEach(ele => {
      ele.classList.add("light-mode");
    })
  };
}

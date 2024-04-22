import { docElementsGetter, RowGenerator, GetPropertiesValue } from "./getElementsModule.js";

//  Destructuring the document elements from their module.
const {
  input,
  header,
  head,
  select,
  td,
  brandContainer,
  categoryContainer,
  btnCover,
  switcher,
  plusMinusBtn,
  textData,
  itemsNumContainer,
  searchArrows,
  th,
  BrandModel,
  price,
  tax,
  discount,
  submit,
  clearBtn,
  itemsNum,
  tBody,
  topBtn,
  brandSearch,
  categorySearch,
  searchArrow1,
  searchArrow2,
  tableButtons,
  srchTableButtons,
  categoryInput,
  brandInput,
  body,
  addBrandInput,
  addCategoryInput,
  span,
  idNumber,
  numbersData,
} = docElementsGetter;

let total = numbersData?.nextElementSibling;
let updatedElementGlobalizer;
let itemsStore = [];
let darkMode = localStorage.getItem("dark-mode");
/*   _______________________  {Update & Delete items using table Buttons }  2 functions    _________________________ */
//  using update & Delete Table buttons in Normal mode.
const fireTableBtns = () => {
  [...tableButtons]?.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      const areEqual = ele.id === e.target.id;
      if (areEqual && e.target.innerText === "Delete") {
        deleteItem(e.target.id);
      } else {
        updateItem(e.target.id);
      }
    });
  });
};

// using update & Delete Table Buttons in searching mode.
const fireSrchTableBtns = (ar) => {
  [...srchTableButtons]?.forEach((ele, ind) => {
    ele.addEventListener("click", (e) => {
      let targetedBtnId = Number(e.target.parentNode.parentNode.childNodes[1].innerText);
      let targetedElement = ar?.find((el, indx) => +el.id  === targetedBtnId);
      const areEquaal = targetedElement.id === targetedBtnId;
      if (areEquaal && e.target.innerText === "Delete") {
        deleteItem(targetedBtnId - 1);
      } else {
        updateItem(targetedBtnId - 1);
      }
    });
  });
};

// /*_________________________________  End of it   ________________________________ */


//  items Number Checking & fallBack function.
const itemsNumCheck_fallBack = function () {
  if (
    itemsNum.value === null ||
    itemsNum.value === undefined ||
    itemsNum.value === ""
  ) {
    return (itemsNum.value = 1);
  }
};

//  Retrieve the default App state.
input[5].value = null; // brandSearch.
input[6].value = null; // categorySearch.
let state = "dataCreation";
const tableBtn = document.getElementsByClassName("tableBtn");
submit.innerText = "add item";
retrieveData();
createData();
brandInput.style.display = "block";
addBrandInput.style.display = "none";
categoryInput.style.display = "block";
addCategoryInput.style.display = "none";

// Light-mode arrays.
const lightModeArr = [
  switcher,
  body,
  header,
  head,
  total,
  topBtn,
  submit,
  clearBtn,
];
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


const enableDarkMode = () => {
  lightModeArr.forEach((indx) => {
    indx.classList.add("light-mode");
  });
  for (let arr of lightModeArrays) {
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
  for (let arr of lightModeArrays) {
    [...arr].forEach((indx) => {
      indx.classList.remove("light-mode");
    });
  }
  localStorage.setItem("dark-mode", "disabled");
};

if (darkMode === "enabled") {
  enableDarkMode(); // set state of darkMode on page load
}

switcher.addEventListener("click", () => {
  let darkMode = localStorage.getItem("dark-mode"); // update darkMode when clicked
  if (darkMode === "disabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

/*   _______________________  {calc total price }   5 functions    _________________________ */
//  ==>>  Get discount percent.
function discountPercent(value) {
  if (value >= 0) {
    return (100 - +value) / 100;
  }
}

//  ==>>  Get Tax percent.
function taxPercent(value) {
  if (value >= 0) {
    return (100 + +value) / 100;
  }
}

//  ==>> Should get assure that [price, tax,discount] aren't strings.
function getTotalPrice() {
  if (getTotalPriceForAnItem() !== undefined) {
    let totalPrice;
    totalPrice =
      +price.value *
      +taxPercent(tax.value) *
      +discountPercent(discount.value) *
      +itemsNum.value;
    total.appendChild(span);
    // to ensure that the number is float
    Number.isInteger(totalPrice) === false
      ? (span.innerText = ` : ${parseFloat(totalPrice)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}$ `)
      : (span.innerText = `: ${totalPrice} $ `);
    //__//
    // write the price inside a span.
  } else {
    return (total.innerText = "$$");
  }
}

//  ==>>  get Total Price For one Item.
function getTotalPriceForAnItem() {
  let totalPrice =
    price.value * discountPercent(discount.value) * taxPercent(tax.value) * 1;
  // to ensure that the number is float
  if (Number.isInteger(totalPrice) == false) {
    return parseFloat(totalPrice)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return totalPrice;
  }
}

// /*_________________________________  End of it   ________________________________ */

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
  updatedElementGlobalizer = item;
  brandInput.style.display = "none";
  addBrandInput.style.display = "block";
  categoryInput.style.display = "none";
  addCategoryInput.style.display = "block";

  // assign the selected item value into inputs.
  let itemData = {
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
  let itemData = {
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
  let brandSearchArr = [];
  let data = JSON.parse(localStorage.getItem("itemsData"));
  data.forEach((obj) => {
    let brandVal = obj.brand.toLocaleLowerCase();
    if (brandVal.includes(brandSearch.value) === true) brandSearchArr.push(obj);
    // Adding items to the table.

    let brandRow = new RowGenerator(brandSearchArr);
    brandRow.createTableItems('srch-tableBtn');
    fireSrchTableBtns(brandSearchArr);
    fixTdColor();
  });
}

//  ==>>  fire brand search function
function brandArrow() {
  searchArrow1.addEventListener(
    "click",
    () => {
      searchByBrand();
    },
    { once: true }
  );
}

brandSearch.addEventListener("click", () => {
  searchArrow1.style.display = "block";
  brandArrow();
});

//  ==>> clear the search table and clean the other search arrow function.
brandSearch.addEventListener("click", () => {
  searchArrow2.style.display = "block" ? "none" : "block";
  let brandSearchArr = [];
  tBody.innerHTML = "";
  categorySearch.value = null;
});

//  ==>> search for items by category name function.
function searchByCategory() {
  let categorySearchArr = [];
  let data = JSON.parse(localStorage.getItem("itemsData"));
  data.forEach((obj) => {
    let categoryVal = obj.category.toLocaleLowerCase();
    if (categoryVal.includes(categorySearch.value) == true) {
      categorySearchArr.push(obj);
    }
    // Adding items to the table.
       let categoryRow = new RowGenerator(categorySearchArr);
    categoryRow.createTableItems('srch-tableBtn');
    fireSrchTableBtns(categorySearchArr);
    fixTdColor();
  });
}

// fire category search function
function categoryArrow() {
  searchArrow2.addEventListener(
    "click",
    () => {
      searchByCategory();
    },
    { once: true }
  );
}

categorySearch.addEventListener("click", () => {
  searchArrow2.style.display = "block";
  categoryArrow();
});

// clear the search table and clean the other search arrow function.
categorySearch.addEventListener("click", () => {
  searchArrow1.style.display = "block" ? "none" : "block";
  let categorySearchArr = [];
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
    state === "dataCreation" &&
    itemData.brand !== "none" &&
    price.value !== undefined &&
    price.value !== null &&
    itemData.category !== "none" &&
    tax.value !== null &&
    discount.value !== null
  ) {
    itemsNumCheck_fallBack();
    for (let i = 0; i < itemsNum.value; i++) {
      itemsStore.push(itemData);
    }
  }
  // If updating state is on, push the updated item only to its old place in the itemsStore array.
  if (state !== "dataCreation") {
    itemsStore[updatedElementGlobalizer] = itemData;
    location.reload();
  }
  //  Call Row Generator class to push items inside the table.
    let itemsRows = new RowGenerator(itemsStore);
    itemsRows.createTableItems('tableBtn');

  // Show delete all Btn depending on the length of localStorage.
  if (itemsStore?.length > 1) {
    clearBtn.style.display = "block";
  }

  //  Push the items array to localStorage.
  localStorage.setItem("itemsData", JSON.stringify(itemsStore));

  // clear inputs after clicking on add/update item btn.
  clearInputs();
  fixTdColor();
  fireTableBtns();
}

// ___________________________  End of it  ____________________________ //

// _______________________   On reload retrieve the data from localStorage.  _______________________ //
function retrieveData() {
  let retrievedData = JSON.parse(localStorage.getItem("itemsData"));
  if (localStorage.itemsData?.length > 0) {
    for (let obj of retrievedData) {
      itemsStore.push(obj);
    }
    return itemsStore;
  } else {
    return 1;
  }
}


// ___________________________  End of it  ____________________________ //

//  Capitalize the first letter when U show its name in the confirmation message.
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

//________________________ Delete item function.  ________________________ //
function deleteItem(item) {
  const data = JSON.parse(localStorage.getItem("itemsData"));
  const removingConfirmation = confirm(
    `Are you sure you want to delete "${capitalizeFirstLetter(data[item].brand)}  ${capitalizeFirstLetter(data[item].BrandModel)}" item?`
  );
  if (removingConfirmation) {
    data.splice(item, 1);
    localStorage.setItem("itemsData", JSON.stringify(data));
    location.reload();
  }
};
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

let numbersInputs = [price, tax, discount];
numbersInputs.forEach((ele) => {
  ele.addEventListener("input", function (e) {
    this.value = this.value.replace(/[^0-9]/g, "");
    if (isNaN(parseInt(this.value))) {
      this.value = null;
      alert(`${this.placeholder} value must be a number.`);
    }
  });
});

// ___________________________  End of it  ____________________________ //

// _________________  Fix the non-change td color in light mood  ______________________________ //

function fixTdColor() {
  if (localStorage.getItem("dark-mode") == "enabled") {
    [...td].forEach((ele) => {
      ele.classList.add("light-mode");
    });
  }
}

const validateInputs = function () {
  if (
    brandInput.value !== null &&
    brandInput.value !== undefined &&
    brandInput.value !== "" &&
    BrandModel.value !== null &&
    BrandModel.value !== undefined &&
    BrandModel.value !== "" &&
    categoryInput.value !== null &&
    categoryInput.value !== undefined &&
    categoryInput.value !== "" &&
    price.value !== null &&
    price.value !== undefined &&
    price.value !== "" &&
    tax.value !== null &&
    tax.value !== undefined &&
    tax.value !== "" &&
    discount.value !== null &&
    discount.value !== undefined &&
    discount.value !== "" &&
    itemsNum.value !== null &&
    itemsNum.value !== undefined
  ) {
    return true;
  }
};

submit.addEventListener("click", () => {
  validateInputs()
    ? createData()
    : alert(
        "Plaese check if you've filled all the fields with their right value"
      );
});

itemsNum.addEventListener("input", () => {
  itemsNum.value = itemsNum.value.replace(/[^0-9]/g, "");
  if (
    isNaN(parseInt(itemsNum.value)) ||
    itemsNum.value == undefined ||
    itemsNum.value == null
  ) {
    alert(` Items number value must be a number.`);
  } else if (itemsNum.value < 1 || itemsNum.value > 100) {
    itemsNum.value = null;
    alert(
      "Items number should be greater than 0 and shouldn't be exceeding 100"
    );
    itemsNum.value = itemsNum.value.replace(/[^0-9]/g, "");
  } else {
    getTotalPrice();
  }
});



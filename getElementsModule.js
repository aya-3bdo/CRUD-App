const getElement = () => {
  return {
    qSelect(selector) {
      return document.querySelector(selector);
    },
    qSelectAll(selector) {
      return document.querySelectorAll(selector);
    },
    getByCls: (selector) => {
      return document.getElementsByClassName(selector);
    },
    getById: (selector) => {
      return document.getElementById(selector);
    },
    getByTag: (selector) => {
      return document.getElementsByTagName(selector);
    },
  };
};

export const selectEle = getElement();

const { getById, getByCls, getByTag } = selectEle;

export const docElementsGetter = (() => {
  return {
    input: getByTag("input"),
    header: getByTag("header")[0],
    head: getByTag("h1")[0],
    select: getByTag("select"),
    td: getByTag("td"),
    brandContainer: getByCls("brandContainer")[0],
    categoryContainer: getByCls("categoryContainer")[0],
    btnCover: getByCls("btnCover"),
    switcher: getByCls("switcher")[0],
    plusMinusBtn: getByCls("fa-plus-minus"),
    textData: getByCls("textData")[0],
    numbersData: getByCls("numbersData")[0],
    itemsNumContainer: getByCls("itemsNumContainer")[0],
    searchArrows: getByCls("fa-arrow-right-long"),
    th: getByTag("th"),
    BrandModel: getById("BrandModel"),
    price: getById("price"),
    tax: getById("tax"),
    discount: getById("discount"),
    submit: getById("submit"),
    clearBtn: getById("clearBtn"),
    itemsNum: getById("itemsNum"),
    tBody: getById("tBody"),
    topBtn: getById("topBtn"),
    brandSearch: getById("brandSearch"),
    categorySearch: getById("categorySearch"),
    searchArrow1: getById("searchArrow1"),
    searchArrow2: getById("searchArrow2"),
    tableButtons: getByCls("tableBtn"),
    srchTableButtons: getByCls("srch-tableBtn"),
    categoryInput: document.querySelector("#categoryInput"),
    brandInput: document.querySelector("#brandInput"),
    body: document.body,
    addBrandInput: document.createElement("input"),
    addCategoryInput: document.createElement("input"),
    span: document.createElement("span"),
    idNumber: document.createElement("span"),
  };
})();

export class RowGenerator {
  constructor(array) {
    this.array = array;
  }
  createTableItems(className) {
    let dataRow = "";
    this.array?.forEach((item, indx) => {
      let targetedArrayItem = this.array[indx];
      dataRow += `  <tr>
          <td > ${
            className === "tableBtn"
              ? (targetedArrayItem.id = indx + 1)
              : (targetedArrayItem.id = targetedArrayItem?.id)
          }</td>
          <td > ${targetedArrayItem.brand}</td>
          <td > ${targetedArrayItem.BrandModel}</td>
          <td > ${targetedArrayItem.category}</td>
          <td > ${targetedArrayItem.price}</td>
           <td > ${targetedArrayItem.tax + "%"}</td>
          <td > ${targetedArrayItem.discount + "%"}</td>
          <td > ${targetedArrayItem.priceOfOneItem}</td>
          <td ><button  class = ${className} id = ${
        indx
      }>update</button></td>
         <td ><button   class = ${className} id = ${
        indx
      }>delete</button></td>
        </tr>
         `;
      tBody.innerHTML = dataRow;
    });
  }
}

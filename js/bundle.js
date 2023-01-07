/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/addToBag.js":
/*!********************************!*\
  !*** ./js/modules/addToBag.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addOneBook": () => (/* binding */ addOneBook),
/* harmony export */   "addToBag": () => (/* binding */ addToBag),
/* harmony export */   "countTotal": () => (/* binding */ countTotal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openBag": () => (/* binding */ openBag)
/* harmony export */ });
/* harmony import */ var _closeModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./closeModal */ "./js/modules/closeModal.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./localStorage */ "./js/modules/localStorage.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
/* harmony import */ var _openModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./openModal */ "./js/modules/openModal.js");
/* harmony import */ var _orderForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./orderForm */ "./js/modules/orderForm.js");
/* harmony import */ var _loading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./loading */ "./js/modules/loading.js");








// return array of all prices in bag 
function findAllPrices() {
    let pricesSelectors = document.querySelectorAll('.bag-price');
    let pricesArr = [];
    pricesSelectors.forEach((item) => {
        pricesArr.push(item.textContent);
    });

    return pricesArr;
}

//Count total price
function countTotal(delThisPrice) {

    let priceArr = findAllPrices();
    const total = document.querySelector('.bag__total');

    let counter = true;
    priceArr = priceArr.map((num) => {
        
        num = Number.parseFloat(num).toFixed(2);
        if (delThisPrice && num == delThisPrice && counter === 'true') {
            counter = false;
            return 0
        } else {
            return num            
        }
    });
    let totalPrice = Number(priceArr.reduce(
        (previousValue, currentValue) => +previousValue + +currentValue, 0));
    totalPrice = totalPrice.toFixed(2);

    total.innerHTML = `Total: ${'' + totalPrice}$`;
    (0,_orderForm__WEBPACK_IMPORTED_MODULE_4__["default"])(totalPrice);
    return totalPrice;
}

//click TRASH icon 
function delFromBag(items, parentSelector) {
    items.forEach(i => {
        i.addEventListener('click', () => {

            const parent = i.closest(parentSelector);
            let delThisPrice = localStorage.getItem(parent.querySelector('.book__name').textContent);
            localStorage.removeItem(parent.querySelector('.book__name').textContent);
            parent.remove();

            
            delThisPrice = Number.parseFloat(delThisPrice).toFixed(2);
            
            countTotal(delThisPrice);
        })
    })  
}
function addToBag(parent) {
    
    let bookName = parent.querySelector('.book__name').textContent;
    let price = parent.querySelector('.book__price').textContent;

    (0,_localStorage__WEBPACK_IMPORTED_MODULE_1__["default"])(bookName, price);
}
//click ADD-TO-BAG button
function clickAddToBag(bag, shoppingBag) {

    const addToBagBtns = document.querySelectorAll('.add-to-bag');
    addToBagBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            let parent = e.target.closest('.book__info'); 

            addToBag(parent);
            openBag(bag);
        })
    })
    shoppingBag.addEventListener('click', () => {
        openBag(bag);
    })
}

//form ur bag
function formBag() {  
    const bagWindow = document.querySelector('.bag__window');

    (0,_loading__WEBPACK_IMPORTED_MODULE_5__.createLoading)(bagWindow);
    (0,_services_services__WEBPACK_IMPORTED_MODULE_2__.getResource)()
    .then(data => {
        data.forEach((item) => {
            if ((0,_localStorage__WEBPACK_IMPORTED_MODULE_1__.isItInLocal)(item.bookName)) {
                
                const elem = document.createElement('div');
                elem.classList.add('bag__item');
                elem.innerHTML = `
                        <div>
                            <div class='book__name bag-name'>${item.bookName}</div>
                            <div>${item.author}</div>
                        </div>
                        <div class='bag__info'>
                            <div class="book__price bag-price">${item.price}$</div>
                            <div class='bag__delete'>Delete</div>
                        </div>
                `;
                

                bagWindow.append(elem);
                (0,_closeModal__WEBPACK_IMPORTED_MODULE_0__["default"])('.bag');
            }
        })
    })
    .then(() => {
        countTotal(0);
        (0,_loading__WEBPACK_IMPORTED_MODULE_5__.hideLoading)(bagWindow);
        delFromBag(bagWindow.querySelectorAll('.bag__delete'), '.bag__item');
    })
}

//form modal window, 'close' btn, total
function openBag(bag) {
    (0,_openModal__WEBPACK_IMPORTED_MODULE_3__["default"])(bag);

        bag.innerHTML = `
            <div class='bag__window'>
                <div class='bag__menu'>
                    <div class='close'>&#10006;</div>
                    <div class='bag__total'>Total: </div>
                    <button class='bag__order'>Confirm </button>
                </div>
            </div>
        `;
        formBag();
}
function addOneBook(itemId) {

    let parent = document.getElementById(itemId);
    let bagWindow = document.querySelector(".bag__window");

    let bookName = parent.querySelector('.book__name').textContent;
    let price = parent.querySelector('.book__price').textContent;
    let author = parent.querySelector(".book__author").textContent;

    if (!(0,_localStorage__WEBPACK_IMPORTED_MODULE_1__.isItInLocal)(bookName)) {

        const elem = document.createElement('div');
        elem.classList.add('bag__item');
        elem.innerHTML = `
                <div>
                    <div class='book__name bag-name'>${bookName}</div>
                    <div>${author}</div>
                </div>
                <div class='bag__info'>
                    <div class="book__price bag-price">${price}</div>
                    <div class='bag__delete'>Delete</div>
                </div>
        `;
        bagWindow.append(elem);
        let del = elem.querySelector(".bag__delete");
        del.addEventListener('click', () => {
            localStorage.removeItem(bookName);
            elem.remove();
            countTotal(price);
        })
    }
    else {
        const elem = document.createElement('div');
        elem.classList.add('bag__item');
        elem.innerHTML = `
            <div class='book__name bag-name warning'>This book is already in your cart</div>
        `;
        bagWindow.append(elem);

        setTimeout(() => {
            elem.remove();
        }, 1000)
    }
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clickAddToBag);

/***/ }),

/***/ "./js/modules/book-tabs.js":
/*!*********************************!*\
  !*** ./js/modules/book-tabs.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class BookTab {
    constructor(src, alt, author, bookName, price, descr, id, parent) {
        this.src = src;
        this.alt = alt;
        this.author = author;
        this.bookName = bookName;
        this.price = price;
        this.parent = document.querySelector(parent);
        this.descr = descr;
        this.id = id;
    }
    render() {
        const element = document.createElement('li');
        element.classList.add('book-tab');
        element.setAttribute("id", this.id);
        element.setAttribute("draggable", "true");
        element.innerHTML = `
                <img src='${this.src}' alt=${this.alt} class="book__img" draggable="false">
                <div class='book__info'>
                    <div class="book__author">${this.author}</div>
                    <div class="book__name">${this.bookName}</div>
                    <div class="book__price">${this.price}$</div>
                    <a href="#" class="show-more">Show more</a>
                    <button class="add-to-bag">Add to bag</button>
                    <div class='book__descr hide'>
                        ${this.descr}
                    </div>
                </div>
            `;
        this.parent.append(element);

    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BookTab);

/***/ }),

/***/ "./js/modules/closeModal.js":
/*!**********************************!*\
  !*** ./js/modules/closeModal.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function closeModal(modal) {

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style = "";

    const shoppingBag = document.querySelector('.shopping-bag__icon');
    if (shoppingBag.classList.contains('hide')){
        shoppingBag.classList.add('show');
        shoppingBag.classList.remove('hide');
    }
}

function pressCloseModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            if (modalSelector === ".popUp-back" || modalSelector === ".order-bg") {
                closeWithReload(modal);
            } else {
                closeWithoutReload(modal, modalSelector);
            }
        }
    })

    modal.addEventListener('click', (e) => {
        if (modal.classList.contains('show')) {

            if (e.target.classList.contains('close') &&  modalSelector === ".order-bg") {
                closeWithReload(modal);
            }
            else {
                if ((e.target.classList.contains('close') || e.target == modal) && modalSelector !== ".order-bg") {
                    if (modalSelector === ".popUp-back") {
                        closeWithReload(modal);
                    } else {
                        closeWithoutReload(modal, modalSelector);
                    }
                }
            }
        }
    })
}
const closeWithoutReload = (modal, modalSelector) => {
    closeModal(modal);
    if (modalSelector === '.order-bg') {
        const inputs = document.querySelectorAll("input");
        inputs.forEach(i => {
            if (i.type === 'checkbox' || i.type === 'radio') {
                i.checked = false;
            }
        }) 
    }
}
const closeWithReload = (modal) => {
    closeModal(modal);
    modal.remove();
    location.reload();
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pressCloseModal);

/***/ }),

/***/ "./js/modules/dragDrop.js":
/*!********************************!*\
  !*** ./js/modules/dragDrop.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _addToBag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addToBag */ "./js/modules/addToBag.js");


function dragDrop() {
    const bookItems = document.querySelectorAll(".book-tab");

    bookItems.forEach(item => {
        item.ondragstart = drag;
    })

    const bagIcon = document.querySelector(".shopping-bag");
    const bag = document.querySelector(".bag");
    bag

    bagIcon.ondragover = allowOpenBag;
    bag.ondragover = allowDrop;
    bag.ondrop = drop;

    function allowOpenBag(e) {
        e.preventDefault();
        (0,_addToBag__WEBPACK_IMPORTED_MODULE_0__.openBag)(bag);
    }
    function allowDrop(e) {
        e.preventDefault();
    }

    function drag(e) {
        e.dataTransfer.setData("id", e.target.id);
    }

    function drop(e) {
        let itemId = e.dataTransfer.getData("id");

        let parent = document.getElementById(itemId);
        (0,_addToBag__WEBPACK_IMPORTED_MODULE_0__.addOneBook)(itemId);
        (0,_addToBag__WEBPACK_IMPORTED_MODULE_0__.countTotal)(0);
        (0,_addToBag__WEBPACK_IMPORTED_MODULE_0__.addToBag)(parent);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dragDrop);


/***/ }),

/***/ "./js/modules/finishedOrder.js":
/*!*************************************!*\
  !*** ./js/modules/finishedOrder.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _closeModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./closeModal */ "./js/modules/closeModal.js");
/* harmony import */ var _openModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./openModal */ "./js/modules/openModal.js");



const finishedOrder = (data) => {
    let finishedForm = document.createElement("div");
    finishedForm.classList.add("popUp-back");
    (0,_openModal__WEBPACK_IMPORTED_MODULE_1__["default"])(finishedForm);
    finishedForm.innerHTML = `
        <div class='popUp__window_small'>
            <div class='close'>&#10006;</div>
            <div class='popUp__name'>The order created. The delivery address is ${data.street} street house ${data.house} flat ${data.flat}. Customer ${data.name} ${data.surname}. <br>${data.deliveryData}</div>
        </div>
    `;
    const main = document.querySelector('main');

    main.append(finishedForm);

    (0,_closeModal__WEBPACK_IMPORTED_MODULE_0__["default"])(".popUp-back");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (finishedOrder);

/***/ }),

/***/ "./js/modules/loading.js":
/*!*******************************!*\
  !*** ./js/modules/loading.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createLoading": () => (/* binding */ createLoading),
/* harmony export */   "hideLoading": () => (/* binding */ hideLoading)
/* harmony export */ });
function createLoading (parent) {
    let loading = document.createElement("h2");
    loading.classList.add("loading");
    loading.textContent = "Loading..."

    parent.append(loading);
}

function hideLoading (parent) {
    parent.querySelector('.loading').remove();
}



/***/ }),

/***/ "./js/modules/localStorage.js":
/*!************************************!*\
  !*** ./js/modules/localStorage.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "isItInLocal": () => (/* binding */ isItInLocal)
/* harmony export */ });
//add book to bag
function dataToLocalStorage(arg, val) {
    if (localStorage.getItem(arg)) {
        return localStorage.getItem(arg);
    } else {
        localStorage.setItem(arg, val);
        return val;
    }
}

//checks book is already in bag
function isItInLocal(book) {
    if (localStorage.getItem(book)) {
        return true
    } else {
        return false
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dataToLocalStorage);



/***/ }),

/***/ "./js/modules/modalHelp.js":
/*!*********************************!*\
  !*** ./js/modules/modalHelp.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _closeModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./closeModal */ "./js/modules/closeModal.js");


function delHelper(helper) {
    helper.remove();
}

function modalHelper(parentSelector, descr) {
    const helper = document.createElement('div');
    helper.classList.add('helper');
    helper.innerHTML = `
        <div class='helper__descr'>${descr}</div>
    `;
    parentSelector.append(helper);

    setTimeout(() => {
        delHelper(helper);
    }, 3000)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalHelper);

/***/ }),

/***/ "./js/modules/moveMouse.js":
/*!*********************************!*\
  !*** ./js/modules/moveMouse.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function moveMouse() {
    const imgArr = document.querySelectorAll('book__img');

    imgArr.forEach(item => {
        item.onmousedown = function(e) { // 1. отследить нажатие
            // подготовить к перемещению
            // 2. разместить на том же месте, но в абсолютных координатах
            item.style.position = 'absolute';
            moveAt(e);
            // переместим в body, чтобы мяч был точно не внутри position:relative
            document.body.appendChild(item);
        
            item.style.zIndex = 1000; // показывать мяч над другими элементами
        
            // передвинуть мяч под координаты курсора
            // и сдвинуть на половину ширины/высоты для центрирования
            function moveAt(e) {
                item.style.left = e.pageX - item.offsetWidth / 2 + 'px';
                item.style.top = e.pageY - item.offsetHeight / 2 + 'px';
            }
        
            // 3, перемещать по экрану
            document.onmousemove = function(e) {
                moveAt(e);
            }
        
            // 4. отследить окончание переноса
            item.onmouseup = function() {
                document.onmousemove = null;
                item.onmouseup = null;
        
                
            }
        }
    })
}



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (moveMouse);

/***/ }),

/***/ "./js/modules/openModal.js":
/*!*********************************!*\
  !*** ./js/modules/openModal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function showModal(modal) {
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style = "overflow: hidden";

    const shoppingBag = document.querySelector('.shopping-bag__icon');
    if (shoppingBag.classList.contains('show')) {
        shoppingBag.classList.add('hide');
        shoppingBag.classList.remove('show');
    }
    
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showModal);

/***/ }),

/***/ "./js/modules/openPopUp.js":
/*!*********************************!*\
  !*** ./js/modules/openPopUp.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _closeModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./closeModal */ "./js/modules/closeModal.js");
/* harmony import */ var _openModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./openModal */ "./js/modules/openModal.js");



function openPopUp(popUp) {

    const showMoreButtons = document.querySelectorAll('.show-more');

    showMoreButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            (0,_openModal__WEBPACK_IMPORTED_MODULE_1__["default"])(popUp);

            const info = e.target.closest('.book__info');
            const boxAuthor = info.querySelector('.book__author');
            const boxBookName = info.querySelector('.book__name');
            const boxDescr = info.querySelector('.book__descr');

            const author = boxAuthor.textContent;
            const bookName = boxBookName.textContent;
            const descr = boxDescr.textContent;

            
            popUp.innerHTML = `
                <div class='popUp__window'>
                    <div class='close'>&#10006;</div>
                    <div class='popUp__name'>${bookName}</div>
                    <div class='popUp__author'>${author}</div>
                    <div class='popUp__descr'>${descr}</div>
                </div>
            `;
            
            (0,_closeModal__WEBPACK_IMPORTED_MODULE_0__["default"])('.popUp');
        })
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (openPopUp);

/***/ }),

/***/ "./js/modules/orderForm.js":
/*!*********************************!*\
  !*** ./js/modules/orderForm.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _openModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./openModal */ "./js/modules/openModal.js");
/* harmony import */ var _closeModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./closeModal */ "./js/modules/closeModal.js");
/* harmony import */ var _modalHelp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modalHelp */ "./js/modules/modalHelp.js");
/* harmony import */ var _finishedOrder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./finishedOrder */ "./js/modules/finishedOrder.js");

 




function createOrderForm () {

    const makeOrder = document.querySelector('.bag__order');
    let todayData = new Date();
    let day = todayData.getDate();
    let mouth = todayData.getMonth() + 1;


    makeOrder.addEventListener('click', () => {

        const orderBG = document.querySelector('.order-bg');
        const inputs = orderBG.querySelectorAll('input');
        const orderBtn = orderBG.querySelector('.order-btn');
        const orderForm = orderBG.querySelector('.order-form');
        const inputData = document.querySelector('.order-data');
        const cash = document.querySelector("#radio1");
        const card = document.querySelector("#radio2");

        let gifts = [];
        let payment = "cash";

        cash.checked = true;
        orderBtn.setAttribute("disabled", "true");


        const allChecks = [];
        inputs.forEach(item => {
            if (item.type === "checkbox") {
                allChecks.push(item);
                item.checked = false;
            }
        })

        allChecks.forEach(i => {
            i.addEventListener('click', () => {      
                if (i.checked === true) {
                    if (gifts.length < 2) {
                        i.checked = true;
                        gifts.push(i.name);
                    } else {
                        i.checked = false;
                        (0,_modalHelp__WEBPACK_IMPORTED_MODULE_2__["default"])(orderForm, '2 gifts already selected');
                    }
                }
                if (i.checked === false) {
                    gifts = gifts.filter(h => h !== i.name)
                }
            })
        })

        cash.addEventListener('click', () => {
            cash.checked = true;
            card.checked = false;
            payment = "cash";
        }) 
        card.addEventListener('click', () => {
            cash.checked = false;
            card.checked = true;
            payment = "card";
        })
        inputs.forEach(item => {
            item.addEventListener("change", () => {
                if (orderForm.checkValidity() && orderBtn.getAttribute("disabled")) {
                    orderBtn.removeAttribute("disabled");
                } 
                if (!orderForm.checkValidity() && !orderBtn.getAttribute("disabled")) {
                    orderBtn.setAttribute("disabled", "true");
                } 
            })
        })
 

        let bag = document.querySelector('.bag');
        (0,_closeModal__WEBPACK_IMPORTED_MODULE_1__.closeModal)(bag);
        (0,_openModal__WEBPACK_IMPORTED_MODULE_0__["default"])(orderBG); 
        (0,_closeModal__WEBPACK_IMPORTED_MODULE_1__["default"])('.order-bg');

        inputData.addEventListener('click', () => {
            (0,_modalHelp__WEBPACK_IMPORTED_MODULE_2__["default"])(orderForm, 'Дата в формате XX/XX/XXXX');
        })

        orderBtn.addEventListener('click', (e) => {

            e.preventDefault();

            const data = new FormData(orderForm);
            data.gifts = gifts;
            data.payment = payment;

            data.name = document.querySelector('.order-name').value;
            data.surname = document.querySelector('.order-surname').value;
            data.deliveryData = document.querySelector('.order-data').value;
            data.street = document.querySelector('.order-street').value;
            data.house = document.querySelector('.order-house').value;
            data.flat = document.querySelector('.order-flat').value;

            if (!orderBtn.getAttribute("disabled")) {
                (0,_closeModal__WEBPACK_IMPORTED_MODULE_1__.closeModal)(orderBG);
                (0,_finishedOrder__WEBPACK_IMPORTED_MODULE_3__["default"])(data);
                orderBtn.setAttribute("disabled", "true");
                console.log("Your order - ",data)
            }
        })
    })
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createOrderForm);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
const getResource = async() => {
  const res = await fetch('https://irmakdak.github.io/BooksShop/booksDB.json', {
    method: "GET"
  }) 
  if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`);
  } else {
    return await res.json();
  }
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_book_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/book-tabs */ "./js/modules/book-tabs.js");
/* harmony import */ var _modules_openPopUp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/openPopUp */ "./js/modules/openPopUp.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/services */ "./js/services/services.js");
/* harmony import */ var _modules_addToBag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/addToBag */ "./js/modules/addToBag.js");
/* harmony import */ var _modules_moveMouse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/moveMouse */ "./js/modules/moveMouse.js");
/* harmony import */ var _modules_loading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/loading */ "./js/modules/loading.js");
/* harmony import */ var _modules_dragDrop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/dragDrop */ "./js/modules/dragDrop.js");









window.addEventListener('DOMContentLoaded', function() {

    const popUp = document.createElement('div');
    popUp.classList.add('popUp', 'popUp-bg','hide');

    const main = document.querySelector('main');
    (0,_modules_loading__WEBPACK_IMPORTED_MODULE_5__.createLoading)(main);

    const header = document.createElement('header');

    const headerOne = document.createElement('h1');
    headerOne.classList.add('header__title');
    headerOne.textContent= 'Book shop';

    const ul = document.createElement('ul');
    ul.classList.add('book-list-tabs');

    const bag = document.createElement('div');
    bag.classList.add('bag', 'hide');

    const shoppingBag = document.createElement('div');
    shoppingBag.classList.add('shopping-bag', 'show');
    shoppingBag.innerHTML = `
        <img src='icons/shopping-bag.svg' class='shopping-bag__icon show'></img>
    `;

    document.body.prepend(header);
    document.body.prepend(popUp);
    header.append(headerOne);
    main.append(ul);
    main.append(bag);
    main.append(shoppingBag);

    const inputs = document.querySelectorAll("input");
    inputs.forEach(i => {
        i.value = "";
        if (i.type === 'checkbox') {
            i.checked = false;
        }
    }) 

    ;(0,_services_services__WEBPACK_IMPORTED_MODULE_2__.getResource)()
    .then(data => {
        console.log(data);
        data.forEach(({src, alt, author, bookName, price, descr, id}) => {
            new _modules_book_tabs__WEBPACK_IMPORTED_MODULE_0__["default"](src, alt, author, bookName, price, descr, id, 'ul').render();
        })
    })
    .then(() => {
        (0,_modules_loading__WEBPACK_IMPORTED_MODULE_5__.hideLoading)(main);
        (0,_modules_openPopUp__WEBPACK_IMPORTED_MODULE_1__["default"])(popUp);
        (0,_modules_addToBag__WEBPACK_IMPORTED_MODULE_3__["default"])(bag, shoppingBag);
        (0,_modules_moveMouse__WEBPACK_IMPORTED_MODULE_4__["default"])();

        (0,_modules_dragDrop__WEBPACK_IMPORTED_MODULE_6__["default"])();
    })
    
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
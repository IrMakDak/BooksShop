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
/* harmony export */   "countTotal": () => (/* binding */ countTotal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _closeModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./closeModal */ "./js/modules/closeModal.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./localStorage */ "./js/modules/localStorage.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
/* harmony import */ var _openModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./openModal */ "./js/modules/openModal.js");
/* harmony import */ var _orderForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./orderForm */ "./js/modules/orderForm.js");







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
    let total = document.querySelector('.bag__total');

    let counter = true;
    priceArr = priceArr.map((num) => {
        
        num = Number.parseFloat(num).toFixed(2);

        if (num == delThisPrice && counter === 'true') {
            counter = false;
            return 0
        } else {
            return num            
        }
    });

    let totalPrice = Number(priceArr.reduce(
        (previousValue, currentValue) => +previousValue + +currentValue, 0));
    
    totalPrice = totalPrice.toFixed(2);

    total.innerHTML = `
        Итого: ${totalPrice}$
    `;
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

//click ADD-TO-BAG button
function clickAddToBag(bag, shoppingBag) {

    const addToBagBtns = document.querySelectorAll('.add-to-bag');
    addToBagBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            let parent = e.target.closest('.book__info'); 
            let bookName = parent.querySelector('.book__name').textContent;
            let price = parent.querySelector('.book__price').textContent;

            (0,_localStorage__WEBPACK_IMPORTED_MODULE_1__["default"])(bookName, price);

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

    (0,_services_services__WEBPACK_IMPORTED_MODULE_2__.getResource)('http://localhost:3000/booksDB')
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
            delFromBag(bagWindow.querySelectorAll('.bag__delete'), '.bag__item');
            countTotal();
        })
    
}

//form modal window, 'close' btn, total
function openBag(bag) {
    (0,_openModal__WEBPACK_IMPORTED_MODULE_3__["default"])(bag);

        bag.innerHTML = `
            <div class='bag__window'>
                <div class='bag__menu'>
                    <div class='close'>&#10006;</div>
                    <div class='bag__total'>Итого: </div>
                    <button class='bag__order'>Оформить</button>
                </div>
            </div>
        `;
        formBag();
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
    constructor(src, alt, author, bookName, price, descr, parent) {
        this.src = src;
        this.alt = alt;
        this.author = author;
        this.bookName = bookName;
        this.price = price;
        this.parent = document.querySelector(parent);
        this.descr = descr;
    }
    render() {
        const element = document.createElement('li');
        element.classList.add('book-tab')
        element.innerHTML = `
                <img src='${this.src}' alt=${this.alt} class="book__img">
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
/* harmony import */ var _openModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./openModal */ "./js/modules/openModal.js");


function closeModal(modal) {

    modal.classList.add('hide');
    modal.classList.remove('show');

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
            closeModal(modal);
            if (modalSelector === '.order-bg') {
                (0,_openModal__WEBPACK_IMPORTED_MODULE_0__["default"])(document.querySelector('.bag'));
            }   
        }
    })

    modal.addEventListener('click', (e) => {
        if ((e.target.classList.contains('close') || e.target == modal) && modal.classList.contains('show')) {
            closeModal(modal);
            if (modalSelector === '.order-bg') {
                (0,_openModal__WEBPACK_IMPORTED_MODULE_0__["default"])(document.querySelector('.bag'));
            }
        }
    })
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pressCloseModal);

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

 



function createOrderForm (totalPrice) {
    const makeOrder = document.querySelector('.bag__order');

    makeOrder.addEventListener('click', () => {
        const price = totalPrice;
        console.log('price = ', price);

        const orderBG = document.querySelector('.order-bg');
        let bag = document.querySelector('.bag');
        (0,_closeModal__WEBPACK_IMPORTED_MODULE_1__.closeModal)(bag);
        (0,_openModal__WEBPACK_IMPORTED_MODULE_0__["default"])(orderBG); 
        (0,_closeModal__WEBPACK_IMPORTED_MODULE_1__["default"])('.order-bg');


        orderBG.innerHTML = `
            <form class="order-form">
                <div class='close'>&#10006;</div>
                <h3>Оформить заказ</h3>
                <input placeholder="Ваше имя: " class='order-name order-input' required type="text" pattern="^[a-zA-Z]+$" minlength="4">

                <input placeholder="Ваша фамилия: " class='order-surname order-input' required type="text" pattern="^[a-zA-Z]+$" minlength="5">

                <input placeholder="Дата доставки: " class='order-data order-input' required type="text" pattern="(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](202[2-3])">

                <input placeholder="Улица: " class='order-street order-input' required type="text" pattern="^[а-яА-ЯёЁa-zA-Z0-9]+$" minlength="5">

                <input placeholder="Номер дома: " class='order-house order-input' required type="text" pattern="^[0-9]+$">

                <input placeholder="Номер телефона: " class='order-phone order-input' required pattern="([^\-]{1})+((([0-9]|[\-]){9,}))">
                <div class='small__title'>Оплата</div>
                <div class='input'>
                    <input type='radio' id='radio1' name='pay' value='cash'>
                    <label for='radio1'>Наличные</label>
                </div>
                <div class='input'>
                    <input type='radio' id='ratio2' name='pay' value='card'>
                    <label for='ratio2'>Карта</label>
                </div>
                <div class='small__title'>Выбери 2 подарка</div>
                <div class='input'>
                    <input type="checkbox" id="check1" name="gift" value="wrapper">
                    <label for="check1">упаковка в подарок</label>
                </div>
                <div class='input'>
                    <input type="checkbox" id="check2" name="gift" value="postcard">
                    <label for="check2">добавить открытку</label>
                </div>
                <div class='input'>
                    <input type="checkbox" id="check3" name="gift" value="sale">
                    <label for="check3">предоставить скидку 2% на следующий раз</label>
                </div>
                <div class='input'>
                    <input type="checkbox" id="check4" name="gift" value="pen">
                    <label for="check4">фирменная ручка или карандаш </label>
                </div>
                
                <div class='bag__total'>${price}$</div>
                <button type='submit' class='order-btn'>Завершить</button>
            </form>
        `;
        const orderBtn = orderBG.querySelector('.order-btn');
        const orderForm = orderBG.querySelector('.order-form');
        const inputs = orderBG.querySelectorAll('input');
        // let selected = {};

        const inputData = document.querySelector('.order-data');

        inputData.addEventListener('click', () => {
            (0,_modalHelp__WEBPACK_IMPORTED_MODULE_2__["default"])(orderForm, 'Дата в формате XX/XX/XXXX');
        })

        orderBtn.addEventListener('click', (e) => {

            e.preventDefault();

            const data = new FormData(orderForm);
            data.gifts = [];
            let pres = 0;

            data.name = document.querySelector('.order-name').value;
            data.surname = document.querySelector('.order-surname').value;
            data.deliveryData = document.querySelector('.order-data').value;
            data.street = document.querySelector('.order-street').value;
            data.house = document.querySelector('.order-house').value;
            data.phone = document.querySelector('.order-phone').value;


            inputs.forEach(item => {
                if (item.name === 'pay' && item.type === 'radio') {
                    data.pay = item.value;
                }
                if (item.name === 'gift' && item.type === 'checkbox' && item.checked == true) {
                    data.gifts[pres] = item.value;
                    pres++;
                    if (pres >= 3) {
                        item.checked = false;
                        (0,_modalHelp__WEBPACK_IMPORTED_MODULE_2__["default"])(document.querySelector('.order-btn'), 'Вы можете выбрать только 2 подарка')
                    } 
                }
            })    
            console.log(data);
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
const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }
    return await res.json();
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






window.addEventListener('DOMContentLoaded', function() {

    const popUp = document.createElement('div');
    popUp.classList.add('popUp', 'popUp-bg','hide');

    const main = document.querySelector('main');

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

    const orderBG = this.document.createElement('div');
    orderBG.classList.add('popUp-bg', 'hide', 'order-bg');

    document.body.prepend(header);
    document.body.prepend(popUp);
    document.body.prepend(orderBG);
    header.append(headerOne);
    main.append(ul);
    main.append(bag);
    main.append(shoppingBag);

    (0,_services_services__WEBPACK_IMPORTED_MODULE_2__.getResource)('http://localhost:3000/booksDB')
        .then(data => {
            data.forEach(({src, alt, author, bookName, price, descr}) => {
                new _modules_book_tabs__WEBPACK_IMPORTED_MODULE_0__["default"](src, alt, author, bookName, price, descr, 'ul').render();
            });
        })
        .then(() => {
            (0,_modules_openPopUp__WEBPACK_IMPORTED_MODULE_1__["default"])(popUp);
            (0,_modules_addToBag__WEBPACK_IMPORTED_MODULE_3__["default"])(bag, shoppingBag);
            (0,_modules_moveMouse__WEBPACK_IMPORTED_MODULE_4__["default"])();
        }) 
});
// const myAwesomeObject = { 
//     name : "Bill", 
console.log(typeof(10n));
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
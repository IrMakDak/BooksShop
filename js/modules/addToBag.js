import pressCloseModal from "./closeModal";
import dataToLocalStorage from "./localStorage";
import { isItInLocal } from "./localStorage";
import {getResource} from '../services/services';
import showModal from "./openModal";
import createOrderForm from "./orderForm";
import { createLoading, hideLoading } from "./loading";

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
    console.log(total);

    let counter = true;
    priceArr = priceArr.map((num) => {
        
        num = Number.parseFloat(num).toFixed(2);
        console.log(num);
        console.log(delThisPrice)
        if (delThisPrice && num == delThisPrice && counter === 'true') {
            counter = false;
            return 0
        } else {
            return num            
        }
    });
    console.log(priceArr)
    let totalPrice = Number(priceArr.reduce(
        (previousValue, currentValue) => +previousValue + +currentValue, 0));
    console.log('total',totalPrice)
    totalPrice = totalPrice.toFixed(2);

    total.innerHTML = `Total: ${'' + totalPrice}$`;
    createOrderForm(totalPrice);
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

            dataToLocalStorage(bookName, price);

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

    createLoading(bagWindow);
    getResource('https://github.com/IrMakDak/BooksShop/blob/8550da76d711214d5194ae5070a10475635ddc74/booksDB.json/')
        .then(data => {
            data.booksDB.forEach((item) => {
                if (isItInLocal(item.bookName)) {
                   
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
                    pressCloseModal('.bag');
                }
            })
        })
        .then(() => {
            countTotal(0);
            hideLoading(bagWindow);
            delFromBag(bagWindow.querySelectorAll('.bag__delete'), '.bag__item');
            
        })
    
}

//form modal window, 'close' btn, total
function openBag(bag) {
    showModal(bag);

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

export {countTotal};
export default clickAddToBag;
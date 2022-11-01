import BookTab from "./modules/book-tabs";
import openPopUp from "./modules/openPopUp";
import {getResource} from './services/services';
import clickAddToBag from './modules/addToBag';
import moveMouse from './modules/moveMouse';

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

    getResource('http://localhost:3000/booksDB')
        .then(data => {
            data.forEach(({src, alt, author, bookName, price, descr}) => {
                new BookTab(src, alt, author, bookName, price, descr, 'ul').render();
            });
        })
        .then(() => {
            openPopUp(popUp);
            clickAddToBag(bag, shoppingBag);
            moveMouse();
        }) 
});
// const myAwesomeObject = { 
//     name : "Bill", 
console.log(typeof(10n));
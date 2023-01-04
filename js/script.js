import BookTab from "./modules/book-tabs";
import openPopUp from "./modules/openPopUp";
import {getResource} from './services/services';
import clickAddToBag from './modules/addToBag';
import moveMouse from './modules/moveMouse';
import { createLoading, hideLoading } from "./modules/loading";

window.addEventListener('DOMContentLoaded', function() {

    const popUp = document.createElement('div');
    popUp.classList.add('popUp', 'popUp-bg','hide');

    const main = document.querySelector('main');
    createLoading(main);

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

    getResource('https://github.com/IrMakDak/BooksShop/blob/8550da76d711214d5194ae5070a10475635ddc74/booksDB.json/')
        .then(data => {
            data.booksDB.forEach(({src, alt, author, bookName, price, descr, id}) => {
                new BookTab(src, alt, author, bookName, price, descr, id, 'ul').render();
            });
        })
        .then(() => {
            hideLoading(main);
        })
        .then(() => {

            openPopUp(popUp);
            clickAddToBag(bag, shoppingBag);
            moveMouse();
        }) 
});

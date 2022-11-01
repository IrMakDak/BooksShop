import showModal from "./openModal";
import {closeModal} from "./closeModal"; 
import pressCloseModal from "./closeModal";
import modalHelper from "./modalHelp";

function createOrderForm (totalPrice) {
    const makeOrder = document.querySelector('.bag__order');

    makeOrder.addEventListener('click', () => {
        const price = totalPrice;
        console.log('price = ', price);

        const orderBG = document.querySelector('.order-bg');
        let bag = document.querySelector('.bag');
        closeModal(bag);
        showModal(orderBG); 
        pressCloseModal('.order-bg');


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
            modalHelper(orderForm, 'Дата в формате XX/XX/XXXX');
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
                        modalHelper(document.querySelector('.order-btn'), 'Вы можете выбрать только 2 подарка')
                    } 
                }
            })    
            console.log(data);
        })
    })
}
export default createOrderForm;
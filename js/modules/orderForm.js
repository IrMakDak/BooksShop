import showModal from "./openModal";
import {closeModal} from "./closeModal"; 
import pressCloseModal from "./closeModal";
import modalHelper from "./modalHelp";

function createOrderForm (totalPrice) {

    const makeOrder = document.querySelector('.bag__order');

    makeOrder.addEventListener('click', () => {
        const price = totalPrice;

        const orderBG = document.querySelector('.order-bg');
        const inputs = orderBG.querySelectorAll('input');
        const orderBtn = orderBG.querySelector('.order-btn');
        const orderForm = orderBG.querySelector('.order-form');
        const inputData = document.querySelector('.order-data');

        const data = new FormData(orderForm);
        data.gifts = [];
        console.log(orderBtn)
        orderBtn.setAttribute("disabled", "true");

        inputs.forEach(item => {
            item.addEventListener("change", () => {
                if (item.type === 'radio') {
                    data.pay = item.value;
                }
                if (item.type === 'checkbox') {

                    if (item.checked === false) {
                        data.gifts = data.gifts.filter(i => i !== item.value)
                    }
                    if (item.checked === true) {
                        if (data.gifts.length >= 2) {
                            item.checked = false;
                            modalHelper(document.querySelector('.order-btn'), "Choose 2 gifts")
                        } else {
                            console.log("added", item)
                            data.gifts.push(item.value);
                        }
                    } 
                }
                if (orderForm.checkValidity() && orderBtn.getAttribute("disabled")) {
                    orderBtn.removeAttribute("disabled");
                } 
                if (!orderForm.checkValidity() && !orderBtn.getAttribute("disabled")) {
                    orderBtn.setAttribute("disabled", "true");
                } 
            })
        })
 

        let bag = document.querySelector('.bag');
        closeModal(bag);
        showModal(orderBG); 
        pressCloseModal('.order-bg');

        inputData.addEventListener('click', () => {
            modalHelper(orderForm, 'Дата в формате XX/XX/XXXX');
        })

        orderBtn.addEventListener('click', (e) => {

            e.preventDefault();

            if (!data.pay) {
                data.pay = "cash";
            }

            data.name = document.querySelector('.order-name').value;
            data.surname = document.querySelector('.order-surname').value;
            data.deliveryData = document.querySelector('.order-data').value;
            data.street = document.querySelector('.order-street').value;
            data.house = document.querySelector('.order-house').value;
            data.flat = document.querySelector('.order-flat').value;

            console.log(data)
        })
    })
}
export default createOrderForm;
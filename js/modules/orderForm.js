import showModal from "./openModal";
import {closeModal} from "./closeModal"; 
import pressCloseModal from "./closeModal";
import modalHelper from "./modalHelp";
import finishedOrder from './finishedOrder';

function createOrderForm () {

    function checkDateValidation(target) {
        const currentDate = Date.now();
        const deliveryDate = target.valueAsNumber;
      
        if (deliveryDate > currentDate) {
            target.setCustomValidity("");
        } else {
            target.setCustomValidity("Delivery time: one day from the current date")
        }
        target.reportValidity();
      }

    const makeOrder = document.querySelector('.bag__order');
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
                        modalHelper(orderForm, '2 gifts already selected');
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
            item.addEventListener("change", (e) => {
                if (item.type === "date") {
                    checkDateValidation(e.target)  
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

        // inputData.addEventListener('click', () => {
        //     modalHelper(orderForm, 'Срок доставки: один день от текущей даты');
        // })

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
                closeModal(orderBG);
                finishedOrder(data);
                orderBtn.setAttribute("disabled", "true");
                console.log("Your order - ",data)
            }
        })
    })
}
export default createOrderForm;
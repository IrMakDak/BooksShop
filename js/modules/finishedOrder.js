import pressCloseModal from "./closeModal";
import showModal from "./openModal";

const finishedOrder = (data) => {
    let finishedForm = document.createElement("div");
    finishedForm.classList.add("popUp-back");
    showModal(finishedForm);
    finishedForm.innerHTML = `
        <div class='popUp__window_small'>
            <div class='close'>&#10006;</div>
            <div class='popUp__name'>The order created. The delivery address is ${data.street} street house ${data.house} flat ${data.flat}. Customer ${data.name} ${data.surname}. <br>${data.deliveryData}</div>
        </div>
    `;
    const main = document.querySelector('main');

    main.append(finishedForm);

    pressCloseModal(".popUp-back");
}

export default finishedOrder;
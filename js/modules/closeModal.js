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

export {closeModal};
export default pressCloseModal;
import showModal from "./openModal";

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
            closeModal(modal);
            if (modalSelector === '.order-bg') {
                showModal(document.querySelector('.bag'));
                const inputs = document.querySelectorAll("input");
                inputs.forEach(i => {
                    i.value = "";
                    if (i.type === 'checkbox') {
                        i.checked = false;
                    }
                }) 
            }   
        }
    })

    modal.addEventListener('click', (e) => {
        if ((e.target.classList.contains('close') || e.target == modal) && modal.classList.contains('show')) {
            closeModal(modal);
            if (modalSelector === '.order-bg') {
                showModal(document.querySelector('.bag'));
                const inputs = document.querySelectorAll("input");
                inputs.forEach(i => {
                    i.value = "";
                    if (i.type === 'checkbox') {
                        i.checked = false;
                    }
                }) 
            }
        }
    })
}

export {closeModal};
export default pressCloseModal;
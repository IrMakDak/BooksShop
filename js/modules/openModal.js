function showModal(modal) {
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style = "overflow: hidden";

    const shoppingBag = document.querySelector('.shopping-bag__icon');
    if (shoppingBag.classList.contains('show')) {
        shoppingBag.classList.add('hide');
        shoppingBag.classList.remove('show');
    }
    
}

export default showModal;
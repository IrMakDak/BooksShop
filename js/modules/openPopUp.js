import pressCloseModal from "./closeModal";
import showModal from "./openModal";

function openPopUp(popUp) {

    const showMoreButtons = document.querySelectorAll('.show-more');

    showMoreButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            showModal(popUp);

            const info = e.target.closest('.book__info');
            const boxAuthor = info.querySelector('.book__author');
            const boxBookName = info.querySelector('.book__name');
            const boxDescr = info.querySelector('.book__descr');

            const author = boxAuthor.textContent;
            const bookName = boxBookName.textContent;
            const descr = boxDescr.textContent;

            
            popUp.innerHTML = `
                <div class='popUp__window'>
                    <div class='close'>&#10006;</div>
                    <div class='popUp__name'>${bookName}</div>
                    <div class='popUp__author'>${author}</div>
                    <div class='popUp__descr'>${descr}</div>
                </div>
            `;
            
            pressCloseModal('.popUp');
        })
    })
}

export default openPopUp;
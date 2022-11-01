import {closeModal} from './closeModal';

function delHelper(helper) {
    helper.remove();
}

function modalHelper(parentSelector, descr) {
    const helper = document.createElement('div');
    helper.classList.add('helper');
    helper.innerHTML = `
        <div class='helper__descr'>${descr}</div>
    `;
    parentSelector.append(helper);

    setTimeout(() => {
        delHelper(helper);
    }, 3000)
}

export default modalHelper;
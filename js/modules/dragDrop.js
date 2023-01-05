import { openBag, addToBag, addOneBook } from "./addToBag";

function dragDrop() {
    const bookItems = document.querySelectorAll(".book-tab");

    bookItems.forEach(item => {
        item.ondragstart = drag;
    })

    const bagIcon = document.querySelector(".shopping-bag");
    const bag = document.querySelector(".bag");
    bag

    bagIcon.ondragover = allowOpenBag;
    bag.ondragover = allowDrop;
    bag.ondrop = drop;

    function allowOpenBag(e) {
        e.preventDefault();
        openBag(bag);
    }
    function allowDrop(e) {
        e.preventDefault();
    }

    function drag(e) {
        e.dataTransfer.setData("id", e.target.id);
    }

    function drop(e) {
        let itemId = e.dataTransfer.getData("id");

        let parent = document.getElementById(itemId);
        addOneBook(itemId);
        addToBag(parent);
    }
}

export default dragDrop;

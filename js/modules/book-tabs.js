class BookTab {
    constructor(src, alt, author, bookName, price, descr, id, parent) {
        this.src = src;
        this.alt = alt;
        this.author = author;
        this.bookName = bookName;
        this.price = price;
        this.parent = document.querySelector(parent);
        this.descr = descr;
        this.id = id;
    }
    render() {
        const element = document.createElement('li');
        element.classList.add('book-tab');
        element.setAttribute("id", this.id);
        element.setAttribute("draggable", "true");
        element.innerHTML = `
                <img src='${this.src}' alt=${this.alt} class="book__img">
                <div class='book__info'>
                    <div class="book__author">${this.author}</div>
                    <div class="book__name">${this.bookName}</div>
                    <div class="book__price">${this.price}$</div>
                    <a href="#" class="show-more">Show more</a>
                    <button class="add-to-bag">Add to bag</button>
                    <div class='book__descr hide'>
                        ${this.descr}
                    </div>
                </div>
            `;
        this.parent.append(element);

    }
}

export default BookTab;
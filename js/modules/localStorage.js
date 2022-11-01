//add book to bag
function dataToLocalStorage(arg, val) {
    if (localStorage.getItem(arg)) {
        return localStorage.getItem(arg);
    } else {
        localStorage.setItem(arg, val);
        return val;
    }
}

//checks book is already in bag
function isItInLocal(book) {
    if (localStorage.getItem(book)) {
        return true
    } else {
        return false
    }
}
export default dataToLocalStorage;
export {isItInLocal};

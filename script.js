//global variables/constants/constructors
let myLibrary = [];
let readBtns = [];
let Book = function() {
    this.title;
    this.author;
    this.pages;
    this.read;
}
Book.prototype.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read}`;
}
Book.prototype.title = "N/A";
Book.prototype.author = "N/A";
Book.prototype.pages = "N/A";
Book.prototype.read = "not read";
const head = document.querySelector("#headDiv");
const body = document.querySelector("#bodyDiv");
const addBook = document.querySelector("#addBook");
const modal = document.querySelector("#modal");
const form = document.querySelector("form");
const formTitle = document.querySelector("#ftitle");
const formAuthor = document.querySelector("#fauthor");
const formPages = document.querySelector("#fpages");
const readArr = document.getElementsByName("readOption");
const submit = document.querySelector("#submit");
const cancelForm = document.querySelector("#cancel");
const notRead = document.querySelector("#notread");
//local storage
if(localStorage.length > 0) {
    const localLibrary = localStorage.getItem('library');
    myLibrary = JSON.parse(localLibrary);
} else {
    myLibrary = [];
}
//event listeners
addBook.addEventListener("click", toggleModal);
submit.addEventListener("click", addBookBtn);
//functions
function toggleModal() {
    if (modal.style.display === "none" && form.style.display === "none") {
            modal.style.display = "grid";
            form.style.display = "grid";
    } else {
        modal.style.display = "none";
        form.style.display = "none";
    }
}
// need to add validation so you can't submit a book with missing stuff
function addBookBtn() {
    if (formAuthor.value && formTitle.value && formPages.value) {
        let newBook = new Book();
            newBook.author = formAuthor.value;
            newBook.title = formTitle.value;
            newBook.pages = formPages.value;
            newBook.read = returnReadOption();
        myLibrary.push(newBook);
        formTitle.value = "";
        formAuthor.value = "";
        formPages.value = "";
        notRead.checked = true;
        toggleModal();
        loadLibrary();
    } else {
        alert("Please fill out the form")
    }
}
function returnReadOption() {
    let readArr = document.getElementsByName("readOption");
    readArr = Array.from(readArr);
    for (i=0;i<readArr.length;i++) {
        if (readArr[i].checked) {
            return readArr[i].value;
        }
    }  
}
function loadLibrary() {
    body.textContent = "";
    renderBooks();
    storage();
}
function renderBooks() {
    body.textContent = "";
    myLibrary.forEach((book,i) => {
        
        const author = book.author;
        const title = book.title;
        const pages = book.pages;
        const readStatus = book.read;
        let titleDOM = document.createElement("h1");
        let authorDOM = document.createElement("p");
        let pagesDOM = document.createElement("p");
        let readDOM = document.createElement("div");
        let delBtn = document.createElement("div");
        titleDOM.textContent = title;
        pagesDOM.textContent = pages;
        authorDOM.textContent = author;
        readDOM.textContent = readStatus;
        delBtn.textContent = "delete";
        delBtn.className = "delBtn";
        let bookDiv = document.createElement("div");
            bookDiv.className = "bookDiv";
            bookDiv.dataset.indexValue = i;
            bookDiv.appendChild(titleDOM);
            bookDiv.appendChild(pagesDOM);
            bookDiv.appendChild(authorDOM);
            bookDiv.appendChild(readDOM);
            bookDiv.appendChild(delBtn);
        body.appendChild(bookDiv);
        readDOM.addEventListener("click",toggleRead);
        delBtn.addEventListener("click",deleteBook)
        cancelForm.addEventListener("click", cancelFunc);
    })
}
function toggleRead(e) {
    const readBtn = e.target;
    const index = e.target.parentNode.dataset.indexValue;
    if (readBtn.textContent === "not read") {
        readBtn.textContent = "read";
        myLibrary[index].read = "read";
    } else {
        readBtn.textContent = "not read";
        myLibrary[index].read = "not read";
    }
    storage();
}
function deleteBook(e) {
    let bookDiv = e.target.parentNode;
    let index = bookDiv.dataset.indexValue;
    myLibrary.splice(index,1);
    loadLibrary();
}
function cancelFunc() {
    formTitle.value = "";
    formAuthor.value = "";
    formPages.value = "";
    notRead.checked = true;
    toggleModal();
}
function storage() {
    localStorage.clear();
    localStorage.setItem('library',JSON.stringify(myLibrary));
}
loadLibrary();
const books = document.querySelector('.books');
const template = document.querySelector('#card-template');
const formDialog = document.getElementById('my-dialog');
const formTitle = formDialog.querySelector('#title');
const formAuthor = formDialog.querySelector('#author');
const formGenre = formDialog.querySelector('#genre');
const formBookProgress = formDialog.querySelector('input[name="book-progress"]:checked');
const formBookCover = formDialog.querySelector('#book-cover');
const form = formDialog.querySelector('form');




const myLibrary = [];

function Book(title, author, genre, readStatus, bookCover) {


    this.title = title;
    this.author = author;
    this.genre = genre;
    this.readStatus = readStatus;
    this.bookCover = bookCover;
    this.id = crypto.randomUUID();
}

function removeBook (bookId) {

    const index = myLibrary.findIndex(book => book.id === bookId);
    myLibrary.splice(index, 1);
    displayBooks();
}


function changeStatus (bookId) {

    const index = myLibrary.findIndex(book => book.id === bookId);
    switch(myLibrary[index].readStatus) {
        case "Reading":
            myLibrary[index].readStatus = 'Unread';
            break;
        case "Unread":
            myLibrary[index].readStatus = "Finish";
            break;
        case "Finish":
            myLibrary[index].readStatus = "Reading";
            break;
    }

    displayBooks();
}


function addBookToLibrary(title, author, genre, readStatus, bookCover) {


    let newBook = new Book(title, author, genre, readStatus, bookCover);
    myLibrary.push(newBook);
}



addBookToLibrary('Dune', 'Frank Herbert','Science Fiction','Reading', 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg' );
addBookToLibrary('To Kill A Mockingbird', 'Harper Lee','Fiction','Unread', 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1553383690i/2657.jpg' );
addBookToLibrary('American Gods', 'Neil Gaiman','Science Fiction','Finish', 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1462924585i/30165203.jpg' );
addBookToLibrary('The Catcher in the Rye', 'J. D. Salinger','Fiction','Reading', 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1398034300i/5107.jpg' );
addBookToLibrary('Backfire', 'Neville Giuseppi','Fiction','Reading', 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1189612083i/1875986.jpg' );





function displayBooks() {

    books.innerHTML = '';
    for (let book of myLibrary) {

        const cardClone = template.content.cloneNode(true);
        cardClone.querySelector('.title').textContent = book.title;
        cardClone.querySelector('.author').textContent = book.author;
        cardClone.querySelector('.genre').textContent = book.genre;

        statusBtn = cardClone.querySelector('#card-btn-left');
        removeBtn = cardClone.querySelector('#card-btn-right');

        statusBtn.textContent = book.readStatus;

        statusBtn.addEventListener('click', () => {
            changeStatus(book.id)
        })

        removeBtn.addEventListener( 'click', () => {

            removeBook(book.id);
        
        } );



        cardClone.querySelector('img').src = book.bookCover;

        console.log(book)
        books.appendChild(cardClone)

    }
}


form.addEventListener("submit", (event) => {

    event.preventDefault();
    addBookToLibrary(formTitle.value, formAuthor.value, formGenre.value, formBookProgress.value, formBookCover.value);
    displayBooks();
    formDialog.close();
})




displayBooks();

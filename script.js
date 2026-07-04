const books = document.querySelector('.books');
const template = document.querySelector('#card-template');





const myLibrary = [];

function Book(title, author, genre, isRead, bookCover) {


    this.title = title;
    this.author = author;
    this.genre = genre;
    this.isRead = isRead;
    this.bookCover = bookCover;
}


function addBookToLibrary(title, author, genre, isRead, bookCover) {


    let newBook = new Book(title, author, genre, isRead, bookCover);
    myLibrary.push(newBook);
}



addBookToLibrary('Dune', 'Frank Herbert','Science Fiction',true, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg' );
addBookToLibrary('To Kill A Mockingbird', 'Harper Lee','Fiction',true, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1553383690i/2657.jpg' );
addBookToLibrary('American Gods', 'Neil Gaiman','Science Fiction',true, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1462924585i/30165203.jpg' );
addBookToLibrary('The Catcher in the Rye', 'J. D. Salinger','Fiction', true, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1398034300i/5107.jpg' );
addBookToLibrary('Backfire', 'Neville Giuseppi','Fiction',true, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1189612083i/1875986.jpg' );





function displayBooks() {
    for (let book of myLibrary) {

        const cardClone = template.content.cloneNode(true);
        cardClone.querySelector('.title').textContent = book.title;
        cardClone.querySelector('.author').textContent = book.author;
        cardClone.querySelector('.genre').textContent = book.genre;
        cardClone.querySelector('#card-btn-left').textContent = 'Read';
        cardClone.querySelector('img').src = book.bookCover;

        console.log(book)
        books.appendChild(cardClone)

    }
}




displayBooks();

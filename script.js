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


Book.prototype.updateStatus = function() {
    
    switch(this.readStatus) {
        case "Reading":
            this.readStatus = "Finish";
            break;
        case "Finish":
            this.readStatus = "Unread";
            break;
        case "Unread":
            this.readStatus = "Reading";
            break;
    }

    displayBooks();
}


function addBookToLibrary(title, author, genre, readStatus, bookCover) {

    if (bookCover == "") {
        let newBook = new Book(title, author, genre, readStatus, "./images/Blank_Book_Cover.webp");
        
        myLibrary.push(newBook);
    }
    else {
        let newBook = new Book(title, author, genre, readStatus, bookCover);
        myLibrary.push(newBook);
    }

    
    
}


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
        statusButtonColor(statusBtn);

        statusBtn.addEventListener('click', () => {
            
            book.updateStatus();
        })

        removeBtn.addEventListener( 'click', () => {

            removeBook(book.id);
        
        } );



        cardClone.querySelector('img').src = book.bookCover;

        console.log(book)
        books.appendChild(cardClone)

    }
}


function removeBook (bookId) {

    const index = myLibrary.findIndex(book => book.id === bookId);
    myLibrary.splice(index, 1);
    displayBooks();
}


// Function for changing the color of the background color based on the current read status by looking on the current textcontent  and selecting the appropriate color based on the text
function statusButtonColor(statusBtn) {
    switch(statusBtn.textContent) {

        case "Reading":
            statusBtn.style.backgroundColor = 'rgba(57, 141, 48, 0.91)';
            break;
        case "Unread":
            statusBtn.style.backgroundColor = 'rgba(190, 60, 60, 0.97)';
            break;
        case "Finish":
            statusBtn.style.backgroundColor = 'rgba(127, 47, 165, 0.9)';
            break;
        
    }
}


// Loading the Library array with intial book objects 

addBookToLibrary('Dune', 'Frank Herbert','Science Fiction','Reading', './images/Dune.webp' );
addBookToLibrary('To Kill A Mockingbird', 'Harper Lee','Literary Fiction','Unread', './images/To_Kill_A_Mocking_Bird.webp' );
addBookToLibrary('American Gods', 'Neil Gaiman','Science Fiction','Finish', './images/American_Gods.webp' );
addBookToLibrary('The Catcher in the Rye', 'J. D. Salinger','Literary Fiction','Reading', './images/The_Catcher_In_The_Rye.webp' );
addBookToLibrary('Backfire', 'Neville Giuseppi','Literary Fiction','Reading', './images/Backfire.webp' );




// Submits form data to mylibrary array

form.addEventListener("submit", (event) => {

    const formBookProgressNew = formDialog.querySelector('input[name="book-progress"]:checked'); // need to get the current radio input value selection else it would stick on the first rendered value
    event.preventDefault();
    addBookToLibrary(formTitle.value, formAuthor.value, formGenre.value, formBookProgressNew.value, formBookCover.value);
    displayBooks();
    event.target.reset(); //Clears the data in the form after it is submited
    formDialog.close();

})



// Initial Rendering of Books
displayBooks();

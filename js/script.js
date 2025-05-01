// array to store book objects
const myLibrary = [];

// Constructor function for Book
function Book(title, author, pages, read) {
    this.id = generateUniqueId();  // Generate a unique ID for each book
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Function to generate a unique ID for each book
function generateUniqueId() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();   // Use crypto API if available
    } else {
        const part1 = Math.random().toString(16).slice(2, 10);  // Take 8 characters
        const part2 = Math.random().toString(16).slice(2, 6);   // Take 4 characters
        const part3 = '4' + Math.random().toString(16).slice(3, 7); // Ensure it starts with '4' for UUID version 4
        const part4 = Math.random().toString(16).slice(2, 6);  // Take 4 characters
        const part5 = Math.random().toString(16).slice(2, 12); // Take 12 characters
        return `${part1}-${part2}-${part3}-${part4}-${part5}`; // Concatenate parts to form a UUID
    }
    
}

// Function to create a new Book object and add it to the myLibrary array
function addBookToLibrary(title, author, pages, readStatus) {
    const book = new Book(title, author, pages, readStatus);
    myLibrary.push(book);      // Add the new book to the library array
    displayBooks();            // Refresh the display of books
}

// Manually add a few initial book objects to the myLibrary array for testing
// addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
// addBookToLibrary('1984', 'George Orwell', 328, false);
// addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
// addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);

// Function to display each book on the page
function displayBooks() {
    // getting the container element where the books will be displayed
    const bookDisplay = document.querySelector('#bookDisplay');
    bookDisplay.innerHTML = '';    // Clear the container before displaying books

    // Loop through each book in the myLibrary array
    myLibrary.forEach((book) => {
        //create a new div element for each book
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card')        // Add a class to the book card for styling

        // displaying the book details
        const titleElement = document.createElement('h3');
        titleElement.textContent = book.title;  // Set the title of the book
        bookCard.appendChild(titleElement);    // Append the title to the book card

        const authorElement = document.createElement('p');
        authorElement.textContent = `Author: ${book.author}`;  // Set the author of the book
        bookCard.appendChild(authorElement);    // Append the author to the book card

        const pagesElement = document.createElement('p');
        pagesElement.textContent = `Pages: ${book.pages}`;
        bookCard.appendChild(pagesElement);      // Append the pages to the book card

        const readStatusElement = document.createElement('p');
        readStatusElement.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;
        bookCard.appendChild(readStatusElement);     // Append the read status to the book card

        // Create a button to remove the book from the library
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove Book';    // Set the button text
        removeBtn.dataset.bookId = book.id;       // Store the book ID in the button's dataset for later use
        removeBtn.addEventListener('click', function () {
            const bookIdToRemove = this.dataset.bookId;    // Get the book ID from the button's dataset
            removeBook(bookIdToRemove);
            displayBooks();  // Refresh the display of books after removal
        });
        bookCard.appendChild(removeBtn);

        // Add a "Toggle Read" button for each book
        const toggleReadBtn = document.createElement('button');
        toggleReadBtn.textContent = 'Toggle Read';    // Set the button text
        toggleReadBtn.dataset.bookId = book.id;       // Store the book ID in the button's dataset for later use
        toggleReadBtn.addEventListener('click', function () {
            const bookIdToToggle = this.dataset.bookId;    // Get the book ID from the button's dataset
            toggleReadStatus(bookIdToToggle);             // Toggle the read status of the book
            displayBooks();
        });
        bookCard.appendChild(toggleReadBtn);
        //    append the bookCard to the bookDisplay container
        bookDisplay.appendChild(bookCard);
    });
}
displayBooks();    // Call the displayBooks function to show the initial books

// Get the "New Book" button from the DOM
const newBookBtn = document.querySelector('#newBookBtn');

// Get the dialog element from the DOM
const newBookDialog = document.querySelector('#newBookDialog');

// Get the form element from the DOM
const form = document.querySelector('#newBookForm');
// set the form display to none initially
// form.style.display = 'none';
// Add an event listener to the "New Book" button to show the form when clicked
newBookBtn.addEventListener('click', function () {
    newBookDialog.showModal();       // Show the dialog when the button is clicked
    form.style.display = 'block';    // Show the form when the button is clicked
    newBookBtn.style.display = 'none';   // Hide the button after clicking
})

const cancelBtn = document.querySelector('#cancelBtn');    // Get the cancel button from the DOM
// Add an event listener to the cancel button to close the form when clicked
cancelBtn.addEventListener('click', function () {
    newBookDialog.close();      // Close the dialog when the cancel button is clicked
    newBookBtn.style.display = 'block';   // Show the "New Book" button again
    form.reset();    // Reset the form fields
})

const submitBtn = document.querySelector('#submitBtn');  // Get the submit button from the DOM
// Add an event listener to the submit button to add a new book when clicked
submitBtn.addEventListener('click', function (event) {
    event.preventDefault();     // Prevent the default form submission behavior
    const title = document.querySelector('#title').value;   // Get the title from the input field
    const author = document.querySelector('#author').value; // Get the author from the input field
    const pages = document.querySelector('#pages').value;   // Get the number of pages from the input field
    const readStatus = document.querySelector('#read').checked; // Get the read status from the checkbox
    addBookToLibrary(title, author, parseInt(pages), readStatus);   // Add the new book to the library
    newBookDialog.close();      // Close the dialog after submission
    form.reset();    // Reset the form fields after submission
    form.style.display = 'none';        // Hide the form after submission
    newBookBtn.style.display = 'block'; // Show the "New Book" button again
    displayBooks();    // Refresh the display of books
})

// Function to remove a book from the myLibrary array by its ID
function removeBook(bookId) {
    const bookIndex = myLibrary.findIndex((book) => book.id === bookId);   // Find the index of the book with the given ID
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);    // Remove the book from the array if found
    } else {
        console.error(`Book with ID ${bookId} not found in the library.`);  // Log an error if the book is not found
    }
}

// Extend the Book prototype with a function to toggle the read status
Book.prototype.toggleReadStatus = function () {
    this.read = !this.read;   // Toggle the read status of the book
}

// Function to find a book in the myLibrary array by its ID
function findBookById(bookId) {
    return myLibrary.find((book) => book.id === bookId) || null; // Return the book if found, otherwise return null
}

// Function to toggle the read status of a book in the myLibrary array by its ID
function toggleReadStatus(bookId) {
    const bookToToggle = findBookById(bookId);
    if (bookToToggle) {
        bookToToggle.toggleReadStatus();    // Call the toggleReadStatus method to change the read status
        displayBooks();  // Refresh the display of books after toggling
    }
}
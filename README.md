This project provides a basic illustration of the CRUD (Create, Read, Update, Delete) operations applied to data within a web browser using JavaScript and the Document Object Model (DOM). 
It showcases how to take user input, store and manage data, and dynamically present that data to the user in an interactive way.

Here's a breakdown:

1. Data Representation (Objects): The Book constructor function shows how to create objects to represent real-world entities (books) with their associated properties (title, author, pages, read status, and a unique ID).

2. Data Storage (Arrays): The myLibrary array acts as a simple in-memory database to store multiple Book objects. This allows you to manage a collection of books.

3. Unique Identification (UUID): Generating unique IDs for each book using crypto.randomUUID() (or a fallback) is crucial for reliably identifying and manipulating individual items in the collection, especially when performing actions like removing or updating.

4. Adding Data (Functions): The addBookToLibrary function encapsulates the process of creating a new Book object based on user input and adding it to the myLibrary array. This separates the logic of data creation and storage.

5. Displaying Data (DOM Manipulation): The displayBooks function demonstrates how to dynamically update the HTML content of a webpage based on the data in the myLibrary array. This involves:

▶ Selecting HTML elements using querySelector.
▶ Clearing existing content (innerHTML = '').
▶ Iterating through the data (forEach).
▶ Creating new HTML elements (createElement).
▶ Setting their content (textContent, checked).
▶ Adding CSS classes for styling (classList.add).
▶ Appending elements to the DOM (appendChild).

6. User Interaction (Event Handling): The project uses event listeners (addEventListener) to respond to user actions, such as:

▶ Clicking the "New Book" button to show the input form.
▶ Clicking the "Submit" button to add a new book.
▶ Clicking the "Cancel" button to close the form.
▶ Clicking the "Remove Book" and "Toggle Read" buttons associated with each book.

7. Form Handling (event.preventDefault()): Preventing the default form submission behavior (event.preventDefault()) allows JavaScript to handle the form data instead of the browser trying to send it to a server.

8. Updating Data (Functions): The removeBook and toggleReadStatus functions demonstrate how to modify the data within the myLibrary array based on user interactions.

9. Dynamic Updates: The project ties these concepts together to create a dynamic user experience. When the data in myLibrary changes, the displayBooks function is called to update the webpage in real-time without requiring a full page reload.


// Declare an empty array to store book objects
myLibrary: array

// Constructor function for Book
FUNCTION Book(title, author, pages, read)
  SET this.id = generateUniqueId() // Function to be defined
  SET this.title = title
  SET this.author = author
  SET this.pages = pages
  SET this.read = read
END FUNCTION

// Function to generate a unique ID
FUNCTION generateUniqueId()
  RETURN a randomly generated UUID string
END FUNCTION

// Function to create a new Book object and add it to the myLibrary array
FUNCTION addBookToLibrary(title, author, pages, readStatus)
  CREATE newBook = new Book(title, author, pages, readStatus)
  ADD newBook TO myLibrary
END FUNCTION

// Manually add a few initial book objects to the myLibrary array for testing
CALL addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false)
CALL addBookToLibrary("1984", "George Orwell", 328, true)

// Function to display each book on the page
FUNCTION displayBooks()
  CLEAR the current display area on the page

  FOR EACH book IN myLibrary
    CREATE a display element (e.g., a div or table row)
    DISPLAY book.title
    DISPLAY book.author
    DISPLAY book.pages
    DISPLAY book.read (e.g., "Read" or "Not Read")

    // Add a "Remove" button for each book
    CREATE removeButton
    SET the button's text to "Remove"
    SET a data-attribute on the button to book.id (e.g., data-book-id = book.id)
    ADD an event listener to the removeButton:
      ON CLICK:
        GET the book ID from the data-attribute of the clicked button
        CALL removeBook(bookId)
        CALL displayBooks() // Re-render the book list

    // Add a "Toggle Read" button for each book
    CREATE toggleReadButton
    SET the button's text to "Toggle Read"
    SET a data-attribute on the button to book.id (e.g., data-book-id = book.id)
    ADD an event listener to the toggleReadButton:
      ON CLICK:
        GET the book ID from the data-attribute of the clicked button
        CALL toggleBookReadStatus(bookId)
        CALL displayBooks() // Re-render the book list

    ADD the display element (including buttons) to the display area on the page
  END FOR EACH
END FUNCTION

// Call displayBooks initially to show the initial books
displayBooks()

// Get the "New Book" button from the DOM
newBookButton = GET the DOM element with the ID or selector for the "New Book" button

// Get the form element from the DOM (initially hidden)
newBookForm = GET the DOM element with the ID or selector for the new book form
SET the form's display to "none" initially (or however you're hiding it)

// Add an event listener to the "New Book" button
ON CLICK on newBookButton:
  DISPLAY the newBookForm (e.g., set display to "block" or show the modal/dialog)

// Get the submit button from the form
submitButton = GET the DOM element for the submit button in the form

// Add an event listener to the submit button of the form
ON CLICK on submitButton:
  PREVENT the default form submission behavior (event.preventDefault())

  // Get the values from the form inputs
  titleInput = GET the value from the input field for title
  authorInput = GET the value from the input field for author
  pagesInput = GET the value from the input field for pages
  readInput = GET the value from the input field for the "read" status (e.g., checkbox value)

  // Call the addBookToLibrary function with the form values
  CALL addBookToLibrary(titleInput, authorInput, parseInt(pagesInput), readInput)

  // Hide the form again after submission (optional)
  SET the newBookForm's display to "none"

  // Re-render the book list to show the new book
  CALL displayBooks()
END FUNCTION

// Function to remove a book from the myLibrary array by its ID
FUNCTION removeBook(bookId)
  CREATE a new empty array: updatedLibrary
  FOR EACH book IN myLibrary
    IF book.id is NOT equal to bookId
      ADD book to updatedLibrary
    END IF
  END FOR EACH
  SET myLibrary to updatedLibrary
END FUNCTION

// Extend the Book prototype with a function to toggle the read status
Book.prototype.toggleReadStatus = FUNCTION()
  SET this.read to NOT this.read
END FUNCTION

// Function to find a book in the myLibrary array by its ID
FUNCTION findBook(bookId)
  FOR EACH book IN myLibrary
    IF book.id is equal to bookId
      RETURN book
    END IF
  END FOR EACH
  RETURN null // Or handle the case where the book is not found
END FUNCTION

// Function to toggle the read status of a book in the myLibrary array by its ID
FUNCTION toggleBookReadStatus(bookId)
  bookToToggle = findBook(bookId)
  IF bookToToggle is not null
    CALL bookToToggle.toggleReadStatus()
  END IF
END FUNCTION

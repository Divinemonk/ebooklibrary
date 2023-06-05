// Create an XMLHttpRequest object
var xhr = new XMLHttpRequest();


// Define the path to the JSON file
var jsonFile = 'database.json';


// Declare global variables
var books = []; // Array to store all books
var currentPage = 1; // Current page number
var booksPerPage = 9; // Number of books to display per page
var tagList = []; // Array to store unique tags


// Send a GET request to fetch the JSON data
xhr.open('GET', jsonFile, true);
xhr.onload = function () {
if (xhr.status === 200) {
    var data = JSON.parse(xhr.responseText);
    books = data.books; // Assign the fetched book data to the books variable

    // Extract tags from the books data
    extractTags();

    // Display books and render pagination
    displayBooks(currentPage, books);
    renderTags();
    renderPagination(filteredBooks);
    handleTagClick('All');
    
} else {
    console.log('Error fetching book data | Status code:', xhr.status);
}
};
xhr.onerror = function () {
console.log('Error fetching book data | Status code:', xhr.status);
};
xhr.send();


// Function to extract unique tags from the books data
function extractTags() {
    var allTags = ['All']; // Include 'All' tag to show all books initially

    books.forEach(function (book) {
        book.tags.forEach(function (tag) {
            if (!allTags.includes(tag)) {
                allTags.push(tag);
            }
        });
    });

    tagList = allTags;
    renderTags(); // Call the renderTags function to display the tags
}

// Function to render the tags
function renderTags() {
    var tagContainer = document.querySelector('.tag-container');
    tagContainer.innerHTML = ''; // Clear the existing tags

    tagList.forEach(function (tag) {
        var tagElement = document.createElement('div');
        tagElement.innerText = tag;
        tagElement.className = 'tag';
        tagElement.addEventListener('click', function () {
            handleTagClick(tag);
        });

        tagContainer.appendChild(tagElement);
    });
}

// Function to handle tag click event
function handleTagClick(tag) {
    // Toggle active class on the clicked tag
    var clickedTag = document.querySelector('.tag.active');
    if (clickedTag) {
        clickedTag.classList.remove('active');
    }

    var tagElements = document.getElementsByClassName('tag');
    for (var i = 0; i < tagElements.length; i++) {
        if (tagElements[i].innerText === tag) {
            tagElements[i].classList.add('active');
            break;
        }
    }

    // Filter books based on the selected tag
    var filteredBooks = [];
    if (tag !== 'All') {
        filteredBooks = books.filter(function (book) {
            return book.tags.includes(tag);
        });
    } else {
        filteredBooks = books;
    }

    // Display the filtered books
    displayBooks(currentPage, filteredBooks);
    renderPagination(filteredBooks);
}

// Display books based on the current page and filtered book array
function displayBooks(page, booksArray) {
    var bookListContainer = document.getElementById('bookList');
    bookListContainer.innerHTML = '';

    var startIndex = (page - 1) * booksPerPage;
    var endIndex = Math.min(startIndex + booksPerPage, booksArray.length);

    for (var i = startIndex; i < endIndex; i++) {
        var book = booksArray[i];

        var bookItem = document.createElement('div');
        bookItem.className = 'book';

        var bookCover = document.createElement('img');
        bookCover.src = book.cover;

        var bookDetails = document.createElement('div');
        bookDetails.className = 'book-details';

        var bookTitle = document.createElement('h2');
        bookTitle.className = 'book-title';
        bookTitle.innerText = book.title;
        bookTitle.setAttribute('alt', book.title);

        var bookAuthor = document.createElement('p');
        bookAuthor.className = 'book-author';
        bookAuthor.innerText = 'By ' + book.author;

        var downloadButton = document.createElement('a');
        downloadButton.href = book.downloadLink;
        downloadButton.innerText = 'Download';
        downloadButton.target = '_blank';

        bookDetails.appendChild(bookTitle);
        bookDetails.appendChild(bookAuthor);
        bookDetails.appendChild(downloadButton);

        bookItem.appendChild(bookCover);
        bookItem.appendChild(bookDetails);

        bookListContainer.appendChild(bookItem);
    }
}

// Render pagination
function renderPagination(filteredBooks) {
    if (!(typeof filteredBooks !== "undefined")) {
        filteredBooks = books;
    }

    var totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    var paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    if (totalPages > 1) {
        var previousPageLink = document.createElement('div');
        previousPageLink.className = 'pagination-item';
        previousPageLink.innerHTML = '<<';
        previousPageLink.addEventListener('click', function () {
            if (currentPage > 1) {
                currentPage -= 1;
                displayBooks(currentPage, filteredBooks);
                renderPagination(filteredBooks);
            }
        });

        if (currentPage === 1) {
            previousPageLink.classList.add('disabled');
        }

        paginationContainer.appendChild(previousPageLink);
    }

    for (var i = 1; i <= totalPages; i++) {
        var paginationItem = document.createElement('div');
        paginationItem.className = 'pagination-item';
        paginationItem.innerText = i;

        if (i === currentPage) {
            paginationItem.classList.add('active');
        }

        paginationItem.addEventListener('click', function () {
            var clickedPage = parseInt(this.innerText);
            currentPage = clickedPage;
            displayBooks(clickedPage, filteredBooks);
            renderPagination(filteredBooks);
        });

        paginationContainer.appendChild(paginationItem);
    }

    if (totalPages > 1) {
        var nextPageLink = document.createElement('div');
        nextPageLink.className = 'pagination-item';
        nextPageLink.innerHTML = '>>';
        nextPageLink.addEventListener('click', function () {
            if (currentPage < totalPages) {
                currentPage += 1;
                displayBooks(currentPage, filteredBooks);
                renderPagination(filteredBooks);
            }
        });

        if (currentPage === totalPages) {
            nextPageLink.classList.add('disabled');
        }

        paginationContainer.appendChild(nextPageLink);
    }
}

// Function to handle search input event
function handleSearchInput() {
    var input = document.getElementById("searchInput").value.toLowerCase();
    var selectedTag = document.querySelector('.tag.active').innerText;
    var filteredBooks = [];

    if (input !== "") {
        // Filter books based on the selected tag
        var tagFilteredBooks = (selectedTag !== 'All') ? books.filter(function (book) {
            return book.tags.includes(selectedTag);
        }) : books;

        // Filter books based on the input text
        filteredBooks = tagFilteredBooks.filter(function (book) {
            return book.title.toLowerCase().includes(input);
        });
    } else {
        // If the input is empty, display all books based on the selected tag
        filteredBooks = (selectedTag !== 'All') ? books.filter(function (book) {
            return book.tags.includes(selectedTag);
        }) : books;
    }

    // Display the filtered books
    displayBooks(currentPage, filteredBooks);
    renderPagination(filteredBooks);
}

function getRandomQuote() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.quotable.io/quotes/random", true);
    xhr.onload = function () {
        if (this.status == 200) {
            var quote = JSON.parse(this.responseText);
            document.getElementById("random-quote").innerHTML = quote[0].content;
        }
    }
    xhr.send();
}

// Call the function to show a random quote initially
getRandomQuote();
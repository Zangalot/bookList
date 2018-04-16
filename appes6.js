class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    //Create tr
    const row = document.createElement('tr');
  
    // Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" data-isbn="${book.isbn}" class="delete">X</a></td>
    `;
    list.appendChild(row);
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  showAlert(message, className) {
    // Create a div
    const div = document.createElement('div');
    // Add Classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);
    // Hide afeter 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if(target.classList.contains('delete')) {
      target.parentElement.parentElement.remove();
    }
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if( localStorage.getItem('books') === null){
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    const ui = new UI;
    books.forEach(function(book) {
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach(function(book, index) {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks)
// Event Listener Add Book
document.getElementById('book-form').addEventListener('submit', function(e) {
  // Get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if(title === '' ||author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add to LS
    Store.addBook(book);
  
    // Show success
    ui.showAlert('Book Added', 'success');
    
    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
  const ui = new UI();
  // Delete Book
  ui.deleteBook(e.target);
  // Remove from LS
  Store.removeBook(e.target.isbn);
  ui.showAlert('Book Removed!', 'success');
  e.preventDefault();
})
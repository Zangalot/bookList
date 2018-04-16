// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;

}

// UI Constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  //Create tr
  const row = document.createElement('tr');

  // Insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);
}

// Clear fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Show alert
UI.prototype.showAlert = function(message, className) {
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

UI.prototype.deleteBook = function(target) {
  if(target.classList.contains('delete')) {
    target.parentElement.parentElement.remove();
  }
}

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
  ui.deleteBook(e.target)
  ui.showAlert('Book Removed!', 'success');
  e.preventDefault();
})
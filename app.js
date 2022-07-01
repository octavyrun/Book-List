// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
// UI constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");

  // Create element (tr)
  const row = document.createElement("tr");

  // Insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#"><i class="delete fa-regular fa-trash-can"></i></a></td>
  `;

  list.appendChild(row);
};

// Show alert

UI.prototype.showAlert = function (message, className) {
  // Avoid multiple errors
  if (document.querySelector(".error")) {
    return;
  } else {
    // Create div
    const div = document.createElement("div");
    // Add classes
    div.className = `alert ${className}`;

    // Add text
    div.appendChild(document.createTextNode(message));

    //  Get parent

    const container = document.querySelector(".container");

    // Get form
    const form = document.querySelector("#book-form");

    // Insert alert
    container.insertBefore(div, form);

    // Timeout after 3s

    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }
};

// Delete book
UI.prototype.deleteBook = function (target) {
  if (target.className.includes("delete")) {
    target.parentElement.parentElement.parentElement.remove();
  }
};

// Clear fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Event Listener for adding a book

// Form Values
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validation
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event listener for delete

document.getElementById("book-list").addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteBook(e.target);

  // Show alert
  if (document.querySelector(".success")) {
    return;
  } else {
    if (e.target.className.includes("delete")) {
      ui.showAlert("Book removed", "success");
      e.preventDefault();
    } else {
      ui.showAlert(
        "For delete, please press on the Trash Bin button!",
        "error"
      );
    }
  }
});

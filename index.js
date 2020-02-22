// Elements
const bookForm = document.getElementById("add-book-form");
const tableBody = document.getElementById("table-body");

function deleteBook(el) {
  const ID = el.id;
  el.parentElement.parentElement.remove();
  let allBooks = JSON.parse(localStorage.getItem("books"));
  let updatedList = allBooks.filter(book => {
    if (ID != book.id) {
      return book;
    }
  });
  localStorage.setItem("books", JSON.stringify(updatedList));
}
// Event Handlers
function handelForm(e) {
  e.preventDefault();
  const ID = Date.now();
  let isbn = document.getElementById("isbn");
  let bookName = document.getElementById("bookname");
  let authorName = document.getElementById("authorname");

  //   DOM
  const tableRow = document.createElement("tr");
  const isbnTag = document.createElement("td");
  const bookNameTag = document.createElement("td");
  const authorNameTag = document.createElement("td");
  const actionTag = document.createElement("td");

  isbnTag.appendChild(document.createTextNode(isbn.value));
  bookNameTag.appendChild(document.createTextNode(bookName.value));
  authorNameTag.appendChild(document.createTextNode(authorName.value));
  actionTag.innerHTML = `<i onclick="deleteBook(this)" id=${ID}  class="text-danger ml-2 fas fa-trash"></i>`;

  tableRow.appendChild(isbnTag);
  tableRow.appendChild(bookNameTag);
  tableRow.appendChild(authorNameTag);
  tableRow.appendChild(actionTag);

  tableBody.appendChild(tableRow);

  //   Local Storage
  let allBooks = [];
  if (localStorage.getItem("books")) {
    allBooks = JSON.parse(localStorage.getItem("books"));
  }
  let book = {
    id: ID,
    book: {
      isbn: isbn.value,
      name: bookName.value,
      author: authorName.value
    }
  };
  allBooks.push(book);
  localStorage.setItem("books", JSON.stringify(allBooks));
}

// Event Listners
bookForm.addEventListener("submit", handelForm);

// On Load
window.onload = function() {
  if (this.localStorage.getItem("books")) {
    let allBooks = this.JSON.parse(this.localStorage.getItem("books"));
    allBooks.forEach(book => {
      const tableRow = document.createElement("tr");
      const isbnTag = document.createElement("td");
      const bookNameTag = document.createElement("td");
      const authorNameTag = document.createElement("td");
      const actionTag = document.createElement("td");

      isbnTag.appendChild(document.createTextNode(book.book.isbn));
      bookNameTag.appendChild(document.createTextNode(book.book.name));
      authorNameTag.appendChild(document.createTextNode(book.book.author));
      actionTag.innerHTML = `<i onclick="deleteBook(this)" id=${book.id}  class="text-danger ml-2 fas fa-trash"></i>`;

      tableRow.appendChild(isbnTag);
      tableRow.appendChild(bookNameTag);
      tableRow.appendChild(authorNameTag);
      tableRow.appendChild(actionTag);

      tableBody.appendChild(tableRow);
    });
  }
};

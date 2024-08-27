// JS Задача 1. Реализовать переключение между состоянием формы и состоянием списка книг
// function btn() {
//   window.location.href = "project_JS_2page.html";
// }
// function btn2() {
//   window.location.href = "project_JS_2.html";
// }
// JS Задача 2. Реализовать заполнение и сохранение формы
// 1. Надо сделать прослушивание заполнения формы, и при её отправке сохранять всё в локалсторедж
// 2.1. Прослушать форму с помощью чего?
// 2.2. Сохранить в локалстордеж как?
// 2.3 Как из локалсторедж достать данные для формы?
const BOOKS_KEY = 'books'
const books = localStorage.getItem(BOOKS_KEY)
  ? JSON.parse(localStorage.getItem("books"))
  : [];
window.addEventListener('beforeunload', function(){
  localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
})
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  if (! form) return;
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const book = {
      imgSave: document.querySelector("#imgBook").value,
      nameSave: document.querySelector("#name").value,
      descSave: document.querySelector("#description").value,
      markSave: document.querySelector("#mark").value,
    };
    books.push(book);
    window.location = "project_JS_2.html";
  });
});
// Задача 3 - реализовать открытие описания книги
// 1. как добавить данные со страницы с формой
// на страницу с общим списом книг?
// 2. передать данные через локал сторедж
// 3. вытащить данные из локал сторедж
// 4. добавить данные в список книг
// 5. сделала ul и li на странице со списокм книг html
/* 1. сделать массив при заполнении
  2. складывать в массив данные
  3. посмотреть параметры innerHTML
  4. чтобы стили были такими же, нужно навесить класс*/
function addBooksToList() {
  // преобразую строку из локалстореджа в массив
  /* мне нужно найти свойство nameSave в объекте book,
  который находится в массиве storedBooks*/
  const ul = document.querySelector("#list");
  const bookNodes = books.map((book) => {
    const bookNode = document.createElement("div");
    bookNode.innerHTML = `
    <li id="bookItem" class="list-books__item bookItem1">
            <img
              id="bookImg"
              class="book__image"
              src="${book.imgSave}"
              width="150"
              height="210"
            />
            <div id="textItem" class="list-books__item-text">
              <p id="textName" class="text__name">${book.nameSave}</p>
              <p id="textDescription" class="text__description">
                ${book.descSave}
              </p>
              <p id="textMark" class="item-text__mark">${book.markSave}</p>
              <button
                id="button"
                class="list-books__item-button"
                data-target="elementsDiv0"
              >
                Open
              </button>
            </div>
          </li>
    `;
    const liNode = bookNode.querySelector("#bookItem");
    ul.appendChild(liNode);
  });
}
function openBook(element) {
  // получем необходимые элементы
  const book = element.parentElement.parentElement;
  const clonedBook = book.cloneNode(true);
  // параметр (true) указывает, что клонирую не только сам элемент,
  // но и его дочерние элементы
  const bookShowDiv = document.querySelector("#showBook");
  const bookShowItem = document.querySelector("#showBook-item");
  bookShowDiv.removeChild(bookShowItem);
  bookShowDiv.appendChild(clonedBook);
  clonedBook.className = "showBook-item";
  clonedBook.setAttribute('id', 'showBook-item')
}

document.addEventListener("DOMContentLoaded", function () {
  addBooksToList();
  const ulList = document.querySelector('#list');
  ulList.addEventListener('click', function(e) {
    if (e.target.tagName === "BUTTON") {
      openBook(e.target);
    }
    console.log(e.target.tagName)
  })
});

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

document.addEventListener("DOMContentLoaded", function () {
  let books = localStorage.getItem("books")
    ? JSON.parse(localStorage.getItem("books"))
    : [];
  // пустой объект нужен, чтобы сохранять информацию из инпута
  const form = document.querySelector("form");
  // это сама форма, с которой работаю
  // создала переменную, чтобы сохранить данные в локалсторедж
  // прослушивать input - доставать данные из инпута
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const imgSave = document.querySelector("#imgBook").value;
    const nameSave = document.querySelector("#name").value;
    const descSave = document.querySelector("#description").value;
    const markSave = document.querySelector("#mark").value;
    // Создаем объект книги
    let book = {
      imgSave,
      nameSave,
      descSave,
      markSave,
    };
    // Добавляем книгу в массив
    books.push(book);
    // Сохраняем массив книг в localStorage
    localStorage.setItem("books", JSON.stringify(books));
  });
  // получить данные из локалсторедж - и
  // проверяю, что в локалсторедж есть данные, которые можно получить
  // if (localStorage.getItem("books")) {
  //   books = JSON.parse(localStorage.getItem("books"));
  //   // console.log(form.elements);
  //   // form.elements [name];
  //   for (let key in books) {
  //     form.elements[key].value = books[key];
  //     // данные должны были автоматически занестись в инпут
  //   }
  // }
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
  4. чтобы стили были такими же, нужно навесить класс
*/
function newBook() {
  // преобразую строку из локалстореджа в массив
  let storedBooks = JSON.parse(localStorage.getItem("books"));
  console.log(storedBooks);
  /* мне нужно найти свойство nameSave в объекте book, 
  который находится в массиве storedBooks*/
  let ul = document.querySelector("#list");
  let bookNodes = storedBooks.map((book) => {
    let bookNode = document.createElement("div");
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
                onclick="openBook(this)"
                id="button"
                class="list-books__item-button"
                data-target="elementsDiv0"
              >
                <p id="textButton" class="button__text">Open</p>
              </button>
            </div>
          </li>
    `;
    let liNode = bookNode.querySelector("#bookItem");
    ul.appendChild(liNode);
    console.log(book);
  });
  console.log(ul);

  /* отобразить книги
  1. получить набор книг
  2. пробежаться по массиву методом map() - пробежаться по каждому элементу
  получаем сам элемент
  3. преобразовать объект в дом-ноду
  innerHTML
  создать див, 
  */
}
// 1. Получить элемент книжки
// 2. Скопировать книжку
// 3. Заменить HTML внутри отображалки книги
// Чтобы получить элемент книжки тебе надо от кнопки получить родителя
// скопировать уже скопировала через cloneNode
// HTML заменяется либо с помощью innerHTML, либо с помощью removeChild и appendChild
function openBook(element) {
  // получем необходимые элементы
  let book = element.parentElement.parentElement;
  let bookClone = book.cloneNode(true);
  // параметр (true) указывает, что клонирую не только сам элемент,
  // но и его дочерние элементы
  let bookShowDiv = document.querySelector("#showBook");
  let bookShowItem = document.querySelector("#showBook-item");
  bookShowDiv.removeChild(bookShowItem);
  bookShowDiv.appendChild(bookClone);
  bookClone.setAttribute("id", "showBook-item");
  bookClone.className = "showBook-item";
}

/* Реализовать сохранение списка книг 
после перезагрузки или закрытия страницы */

/* 1. Сохранять список книг при закрытии страницы
1.1. Взять список книг
1.2. Взять каждую книжку из списка
1.3. Получить заголовок из книги
1.4. Получить оценку из книги
1.5. Получить ссылку на картинку из книги
1.6. Получить описание из книги
1.7. Сохранить объект книги в массиве с книгами
1.8. Записать массив в localStorage */

/* чтобы загрузить данные в локалсторедж:
 1. получаем набор из книжек
2. преобразовать псевдомассив в массив
3. отфильтровать книжки методами filter(), map()
4. загрузить данные в localStorage

на закрытие страницы "beforeunload" - сохранять данные;
на открытие страницы "DOMContentLoaded" - добавлять данные
*/
document.addEventListener("beforeunload", function () {
  newBook();
  // селектим набор книжек внутри документа
  let ulBookItems = document.querySelector(".list-books");
  console.log(ulBookItems);
  // преобразуем псевдомассив в массив
  let bookNodes = Array.from(ulBookItems.querySelectorAll("li"));
  console.log(bookNodes);
  // получаем данные книжек с помощью метода map()
  let liBooks = bookNodes.map((liBookItem) => {
    return {
      img: liBookItem.querySelector(".book__image").src,
      name: liBookItem.querySelector(".text__name").innerText,
      desc: liBookItem.querySelector(".text__description").innerText,
      mark: liBookItem.querySelector(".item-text__mark").innerText,
    };
  });
  console.log(liBooks);
  // кладем массив с объектами в локалсторедж
  localStorage.setItem("liBooks", JSON.stringify(liBooks));
});

/*2. Загружать список книг при открытии страницы
2.1. Взять из localStorage массив с книгами
2.2. Пробежаться по каждой книге из массива книг
2.3. Взять данные из каждого объекта книги
2.4. Сформировать вёрстку для каждого элемента отображающего книгу*/

// чтобы выгрузить данные из localStorage:
// 1. проверить есть ли в сторедже данные
// 2. выгрузить данные на страницу

document.addEventListener("DOMContentLoaded", function () {
  let getLiBooks = JSON.parse(localStorage.getItem("liBooks"));
  let list = document.querySelector(".list-books");
  let item = list.querySelector(".list-books__item");
  let getElements = getLiBooks.forEach((item) => {
    let li = document.createElement("li");
    list.appendChild(li);
    li.setAttribute("id", "bookItem");
    li.className = "list-books__item";

    let getImg = item["img"];
    let img = document.createElement("img");
    img.src = getImg;
    li.appendChild(img);
    img.setAttribute("id", "boookImg");
    img.className = "book__image";

    const divText = document.createElement("div");
    divText.setAttribute("id", "textItem");
    divText.className = "list-books__item-text";
    li.appendChild(divText);

    const getName = item["name"];
    const name = document.createElement("p");
    const nameText = document.createTextNode(getName);
    name.appendChild(nameText);
    divText.appendChild(name);
    name.setAttribute("id", "textName");
    name.className = "text__name";

    const getDesc = item["desc"];
    const desc = document.createElement("p");
    const descText = document.createTextNode(getDesc);
    desc.appendChild(descText);
    divText.appendChild(desc);
    desc.setAttribute("id", "textDescription");
    desc.className = "text__description";

    const getMark = item["mark"];
    const mark = document.createElement("p");
    const markText = document.createTextNode(getMark);
    mark.appendChild(markText);
    divText.appendChild(mark);
    mark.setAttribute("id", "textMark");
    mark.className = "item-text__mark";
  });
});

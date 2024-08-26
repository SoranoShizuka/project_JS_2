// JS Задача 1. Реализовать переключение между состоянием формы и состоянием списка книг
function btn2() {
  window.location.href = "project_JS_2.html";
}

// JS Задача 2. Реализовать заполнение и сохранение формы

// 1. Надо сделать прослушивание заполнения формы, и при её отправке сохранять всё в локалсторедж
// 2.1. Прослушать форму с помощью чего?
// 2.2. Сохранить в локалстордеж как?
// 2.3 Как из локалсторедж достать данные для формы?

document.addEventListener("DOMContentLoaded", function () {
  let formData = {};
  // пустой объект нужен, чтобы сохранять информацию из инпута
  const form = document.querySelector("form");
  // это сама форма, с которой работаю
  const storage = localStorage;
  // создала переменную, чтобы сохранить данные в локалсторедж

  // прослушивать input - доставать данные из инпута

  form.addEventListener("input", function (event) {
    // console.log("work");
    //   console.log(event.target);
    // получаю данные, с которыми работаю
    //   console.log(event.target.value);
    // получаю данные, с которыми работаю

    formData[event.target.name] = event.target.value;
    // добавляю данные в объект formData
    // console.log(event.target.name);
    // console.log(event.target);
    // console.log(event);
    // сохранить данные в локалсторедж
    storage.setItem("formData", JSON.stringify(formData));
    // преобразовала объект в строку с помощью JSON.stringify,
    // потому что локалсторедж работает только со строками
  });

  // получить данные из локалсторедж - и
  // проверяю, что в локалсторедж есть данные, которые можно получить
  if (storage.getItem("formData")) {
    formData = JSON.parse(storage.getItem("formData"));
    // console.log(form.elements);
    // form.elements [name];
    for (let key in formData) {
      form.elements[key].value = formData[key];
      // данные должны были автоматически занестись в инпут
    }
  }
});

// JS Задача 3. Реализовать открытие описания книги
// 1. Как данные со страницы с формой добавить на страницы с общим списком книг?
// 2. как передать данные из формы в список?
// чтобы отображать данные в списке книг, нужно создать массив для сохранения данных

// Задача 1 - Реализовать переключение между страницами
function btn() {
  window.location.href = "project_JS_2page.html";
}

// Задача 3 - реализовать открытие описания книги
// 1. как добавить данные со страницы с формой
// на страницу с общим списом книг?
// 2. передать данные через локал сторедж
// 3. вытащить данные из локал сторедж
// 4. добавить данные в список книг
// 5. сделала ul и li на странице со списокм книг

// чтобы отображать данные в списке книг,
// нужно создать массив для сохранения данных

/* 1. сделать массив при заполнении
  2. складывать в массив данные
  3. посмотреть параметры innerHTML
  4. чтобы стили были такими же, нужно навесить класс
*/
let nameBook = "nameBook";
let descriptionBook = "descriptionBook";
let mark = "mark";
const $arr = {
  nameBook: nameBook,
  descriptionBook: descriptionBook,
  mark: mark,
};
const form = document.querySelector("#book_page");
const storage = localStorage;

window.localStorage.setItem("arr", JSON.stringify($arr));
const array = JSON.parse(window.localStorage.getItem("arr"));
// console.log(array[nameBook]);
console.log($arr);

let newBook;
function myArray() {
  newBook = document.getElementsByTagName("input")[0].value;
  /*находим и записываем в переменную значение
  /первого элемента input в документе*/
  array.push(newBook);
  // добавляю значение переменной в конец массива
  document.getElementById("bookItem").innerHTML = $arr;
  /*добавляю новое содержимое переменой в элемент с глобальным
  атрибутом listBooks
  */
}

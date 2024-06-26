// Реализовать переключение между состоянием формы и состоянием списка книг
function btn() {
  window.location.href = "project_JS_2page.html";
}
function btn2() {
  window.location.href = "project_JS_2.html";
}

// Реализовать заполнение и сохранение формы

document.addEventListener("DOMContentLoaded", function () {
  let formData = {};
  // пустой объект нужен, чтобы сохранять информацию из инпута
  const form = document.querySelector("form");
  // это сама форма, с которой работаю
  const storage = localStorage;
  // создала переменную, чтобы сохранить данные в локалсторедж

  // получить данные из input

  form.addEventListener("input", function (event) {
    // console.log("work");
    //   console.log(event.target);
    // получаю данные, с которыми работаю
    //   console.log(event.target.value);
    // получаю данные, с которыми работаю

    formData[event.target.name] = event.target.value;
    // добавляю данные в объект formData

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
      if (key != "") {
      }
      // данные должны были автоматически занестись в инпут
    }
  }
});

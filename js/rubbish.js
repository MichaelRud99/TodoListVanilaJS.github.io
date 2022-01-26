/* var body = document.querySelector("body"); */
var ul = document.querySelector("ul");
var parentUl = document.querySelector("parentUl");
var footer = document.querySelector("footer");
var btn = footer.querySelectorAll("input");
var countDone = 0;
var todoList = [];
var count = 0;
var c = 0;
var allDiv = document.querySelectorAll("div");
var newTodo = allDiv[2].querySelectorAll("input");
var innerInput = allDiv[2].querySelector("input");
var innerLabel = allDiv[2].querySelector("label");

/* localStorage.clear();
/*
почему индексы берём через (label.length-1)-key
так как мы создаём элементы и вставляем их в начало, то получаем, то получаем инвертированный список, то есть первый элемент внизу, но позиция у него 0 
(поэтому мы от длины и отнимаем один)
длина всегда больше текущего индекса.
*/

if (JSON.parse(localStorage.getItem("todo")) != undefined) {
  var todoList = JSON.parse(localStorage.getItem("todo"));
  outPatternList(todoList);
  main();
}
else {
  footer.style.display = "none";
  innerInput.style.display = "none";
  innerLabel.style.display = "none";
}

document.addEventListener('keydown', enterKey);

function addTodo() {
  var todoList = JSON.parse(localStorage.getItem("todo"));
  /*   console.log(todoList); */
  document.addEventListener('keydown', enterKey);
  window.setTimeout(main, 0);
}

function main() {
  /*   console.log("hi"); */
  var label = convertListLabel();
  var span = convertListSpan();
  var lenTodoList = todoList.length;

  countItems();
  countItemsDone(label);
  editList(label);
  destroyOneLi(todoList);
  for (var i = 0; i < lenTodoList; i++) {if (todoList[i]["check"] === true) { addListMod(label, span, i); }}

  for (let i = 0; i < 3; i++) { btn[i].style.display = "inline"; }
  if (todoList.length === 0) {
    footer.style.display = "none";
    innerInput.style.display = "none";
    innerLabel.style.display = "none";
  }
  /* window.location.reload(); */
}

function editList(label) {

  for (let i = 0; i < todoList.length; i++) {

    label[i].addEventListener('dblclick', function (e) {

      console.log("click" + i);

      var div = ul.querySelectorAll("div");
      var li = ul.querySelectorAll("li");
      var todo = todoList[(todoList.length - 1) - i].todo;
      var input = document.createElement("input");

      div[i].style.display = "none";
      input.classList.add("edit");
      input.type = "text";
      input.value = todo;
      li[i].appendChild(input).focus();
      document.removeEventListener('keydown', enterKey);
      document.addEventListener("keydown", () => editEnter(input, i, event));

      input.onblur = function () {
        editMade(input, i)
      };

    });

  }

}
function editEnter(input, i, event) {
  if (event.code == 'Enter') {
    editMade(input, i);
  }
}

function editMade(input, i) {
  var label = ul.querySelectorAll("label");
  var div = ul.querySelectorAll("div");

  var edit = document.createTextNode(input.value);
  /*  console.log(edit); */

  todoList[(todoList.length - 1) - i].todo = input.value;
  localStorage.setItem('todo', JSON.stringify(todoList));

  input.style.display = "none";
  div[i].style.display = "flex";

  var newLabel = document.createElement("label");
  newLabel.style.width = "100%";
  newLabel.appendChild(edit);
  label[i].replaceWith(newLabel);

 /*  window.setTimeout(addTodo, 1000); */
  window.location.reload();
}

function enterKey(event) {
  if (event.code == 'Enter') {
    var text = document.getElementsByTagName("input")[1];

    if (text.value) {
      var input = text.value;
      text = document.getElementsByTagName("input")[1].value = "";
      var tmp = {};

      if (JSON.parse(localStorage.getItem("todo")) != undefined) {
        todoList = JSON.parse(localStorage.getItem("todo"));
      }

      tmp.todo = input;
      tmp.check = false;
      lenTodoList = todoList.length;
      todoList[lenTodoList] = tmp
      localStorage.setItem('todo', JSON.stringify(todoList));
      localStorage.setItem('lenTodolist', lenTodoList + 1);

      footer.style.display = "flex";
      innerInput.style.display = "flex";
      innerLabel.style.display = "inline-block";

      patternList(tmp.todo);
      countItems();
    }

    window.setTimeout(addTodo, 0);
    /* window.location.reload(); */
  }
}

function patternList(out) {
  var parentUl = document.getElementById('list');
  var firstUl = parentUl.firstChild;
  var div = document.createElement("div");
  var li = document.createElement("li");
  var checkbox = document.createElement("input");
  var span = document.createElement("span");
  var label = document.createElement("label");
  var btn = document.createElement("button");
  checkbox.type = 'checkbox';
  checkbox.classList.add("list__li_checkbox");
  li.classList.add("list__li")
  div.classList.add("flex");
  div.style.margin = "5px";
  label.style.width = "100%";
  checkbox.setAttribute('id', 'count');
  btn.classList.add("list__destroy");
  parentUl.insertBefore(li, firstUl);
  li.appendChild(div);
  div.appendChild(checkbox);
  div.appendChild(span);
  span.classList.add("list__li_btn");
  div.appendChild(label);
  label.appendChild(document.createTextNode(out));
  div.appendChild(btn);
}

function outPatternList(todoList) {
  for (var key in todoList) {
    out = todoList[key].todo;
    patternList(out);
  }
}

function countItems() {
  var getLenTodoList = localStorage.getItem("lenTodolist");
  var countDone = localStorage.getItem("counntDone");
  document.querySelector(".strong").innerHTML = (getLenTodoList - countDone) + ' item left';
}

function countItemsDone(label) {
  /*  var todoList =JSON.parse(localStorage.getItem("todo")); */
  var input = ul.querySelectorAll("#count");
  input = Array.prototype.slice.call(input);
  /* var label = convertListLabel(); */
  /* console.log(todoList); */
  /*   console.log("todoList +countItemsDone"); */
  var span = convertListSpan();
  var getLenTodoList = 0;
  var lenTodoList = todoList.length;
  /*   console.log(todoList); */

  for (let i = 0; i < lenTodoList; i++) {
    /*       console.log(input[i]);
          console.log(label[i]); */
    input[i].addEventListener('click', function () {
      console.log("click" + i);

      if (label[i].classList.contains('list__label_mod')) {
        console.log(countDone--);
        getLenTodoList = label.length - countDone;
        todoList[lenTodoList - 1 - i].check = false;
        localStorage.setItem('todo', JSON.stringify(todoList));
      } else {
        console.log(countDone++);
        getLenTodoList = label.length - countDone;
        todoList[lenTodoList - 1 - i].check = true;
        localStorage.setItem('todo', JSON.stringify(todoList));
      }

      footer.querySelector(".strong").innerHTML = getLenTodoList + ' item left';
      label[i].classList.toggle("list__label_mod");
      span[i].classList.toggle("list__span_mod");
      localStorage.setItem("countDone", Math.abs(countDone));
    });

  }

}

function visibilityClearCompleted() {

  if (localStorage.getItem("countDone", countDone) > 0) {
    btn[3].style.visibility = "visible";
  }
  else {
    btn[3].style.visibility = "hidden";
  }
}

function createCompletedStorage() {
  todoList = JSON.parse(localStorage.getItem('todo'));
  var tmp = {};
  var compl = [];
  for (let btnKey = 0; btnKey < todoList.length;) {
    if (todoList[btnKey].check === true) {
      tmp = todoList[btnKey];
      compl[compl.length] = tmp;
      btnKey++;
      /*       todoList.splice(btnKey, 1); */
    } else { btnKey++; }
  }
  /*   localStorage.setItem("todo", JSON.stringify(todoList)); */

  localStorage.setItem("completed", JSON.stringify(compl));
  /*   return todoList; */
}

function convertListLabel() {
  var label = ul.querySelectorAll("label");
  label = Array.prototype.slice.call(label);
  return label;
}

function convertListSpan() {
  var span = ul.querySelectorAll("span");
  span = Array.prototype.slice.call(span);
  return span;
}

function convertLi() {
  var li = document.querySelectorAll("li");
  li = Array.prototype.slice.call(li);
  return li;
}

function deleteLi() {
  var li = convertLi();
  var len = li.length;
  for (var i = 0; i < len; i++) {
    li.shift().remove();
  }
}

/* пофиксить */

function destroyOneLi(todoList) {
/*   console.log("hi112");
  console.log(todoList); */
  var li = convertLi();
  var btn = ul.querySelectorAll(".list__destroy");
  btn = Array.prototype.slice.call(btn);
  for (let i = 0; i < todoList.length; i++) {
    btn[i].addEventListener('click', function () {
      li[i].remove();
      console.log(li[i]);
      console.log(todoList.length-1-i);
      /* remove(todoList); */
      todoList.splice(todoList.length-1-i, 1);
      localStorage.setItem('todo', JSON.stringify(todoList));
      window.location.reload();
  });
}
/* todoList.reverse(); */
}

function addListMod(label, span, i) {
  label[(label.length - 1) - i].classList.add("list__label_mod");
  span[(label.length - 1) - i].classList.add("list__span_mod");
}

function removeListMod(label, span, i) {
  label[(label.length - 1) - i].classList.remove("list__label_mod");
  span[(label.length - 1) - i].classList.remove("list__span_mod");
}

/* стрелочка для выделения всех элементов */
function selectAll() {
  var label = convertListLabel();
  var span = convertListSpan();
  var todoList = JSON.parse(localStorage.getItem("todo"));
  var lenLabel = label.length;

  if (count % 2 === 0) {
    btn[3].style.visibility = "visible";
    count++;
    for (var i = 0; i < lenLabel; i++) {
      todoList[(lenLabel - 1) - i].check = true;
      localStorage.setItem('todo', JSON.stringify(todoList));
      addListMod(label, span, i);
    }

  } else {
    btn[3].style.visibility = "hidden";
    count++;
    for (var i = 0; i < lenLabel; i++) {
      removeListMod(label, span, i);
      todoList[(lenLabel - 1) - i].check = false;
      localStorage.setItem('todo', JSON.stringify(todoList));
      removeListMod(label, span, i);
    }

  }
}

select_all.onclick = function () {
  selectAll();
}

all.onclick = function () {
  var todoList = JSON.parse(localStorage.getItem("todo"));
  deleteLi();
  console.log(todoList);
  outPatternList(todoList);
  var label = convertListLabel();
  var span = convertListSpan();
  for (var i = 0; i < todoList.length; i++) {
    if (todoList[i]["check"] === true) {
      addListMod(label, span, i);
    }
  }

  select_all.onclick = function () {
    selectAll();
  }

}

active.onclick = function () {
  deleteLi();
  outPatternList(todoList);
  /*   var lenTodoList=localStorage.getItem("lenTodoList");
    var countDone=localStorage.getItem("countDone"); */
  /*   var label = convertListLabel();
    var span = convertListSpan(); */
  var li = convertLi();
  var lenLi = li.length;
  for (var i = 0; i < todoList.length; i++) {
    if (todoList[i]["check"] === true) {
      li[(lenLi - 1) - i].remove();
    }

    select_all.onclick = function () {
      deleteLi();
      if (count % 2 === 0) {
        btn[3].style.visibility = "visible";
        for (var i = 0; i < todoList.length; i++) {
          todoList[(lenLi - 1) - i].check = true;
        }
        count++;
        localStorage.setItem('todo', JSON.stringify(todoList));
      } else {
        btn[3].style.visibility = "hidden";
        count++;
        for (var i = 0; i < todoList.length; i++) { todoList[(lenLi - 1) - i].check = false; }
        outPatternList(todoList);
        localStorage.setItem('todo', JSON.stringify(todoList));
      }
    }

  }
}

completed.onclick = function () {
  createCompletedStorage();
  var completed = JSON.parse(localStorage.getItem("completed"));
  deleteLi();
  outPatternList(completed);
  var label = convertListLabel();
  var span = convertListSpan();
  for (var i = 0; i < label.length; i++) {
    addListMod(label, span, i);
  }

  select_all.onclick = function () {
    deleteLi();
    outPatternList(todoList);
    var label = convertListLabel();
    var span = convertListSpan();
    if (count % 2 === 0) {
      btn[3].style.visibility = "visible";
      for (var i = 0; i < todoList.length; i++) {
        todoList[(todoList.length - 1) - i].check = true;
        addListMod(label, span, i);
      }
      count++;
      localStorage.setItem('todo', JSON.stringify(todoList));
    } else {
      btn[3].style.visibility = "hidden";
      count++;
      deleteLi();
      for (var i = 0; i < label.length; i++) { todoList[(todoList.length - 1) - i].check = false; }
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  }

}

clear_completed.onclick = function () {
  createCompletedStorage();
  var lenTodoList = todoList.length;
  for (var i = 0; i < lenTodoList; i++) {
    if (todoList[(lenTodoList - 1) - i].check === true) {
      todoList.splice((lenTodoList - 1) - i, 1);
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  }

  footer.style.display = "none";
  innerInput.style.display = "none";
  innerLabel.style.display = "none";

  localStorage.clear();
  deleteLi();
}
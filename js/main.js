var ul = document.querySelector("ul");
var parentUl = document.querySelector("parentUl");
var footer = document.querySelector("footer");
var btn = footer.querySelectorAll("input");
var todoList = [];
var count = 0;
let countDone = 0;
var allDiv = document.querySelectorAll("div");
var innerInput = allDiv[2].querySelector("input");
var innerLabel = allDiv[2].querySelector("label");

document.addEventListener('keydown', enterKey);
if (JSON.parse(localStorage.getItem("todo")) != undefined) {
  var todoList = JSON.parse(localStorage.getItem("todo"));
}

if (JSON.parse(localStorage.getItem("todo")) === undefined || todoList.length === 0) {
  footer.style.display = "none";
  innerInput.style.display = "none";
  innerLabel.style.display = "none";
}

class workList {
  constructor(elem) {

    this._elem = elem;
    elem.onclick = this.onClick.bind(this);
    outPatternList(todoList);
    chekDoneTodo(todoList);

    countDone = localStorage.getItem('countDone', countDone);
  }

  checkbox() {
    let todoList = JSON.parse(localStorage.getItem("todo"));
    todoList.reverse();

    let div = event.target.closest("div");
    let label = div.querySelector("label");
    let span = div.querySelector("span");

    let inputCount = ul.querySelectorAll("input");
    inputCount = Array.prototype.slice.call(inputCount)
    inputCount = inputCount.indexOf(event.target)

    label.classList.toggle("list__label_mod");
    span.classList.toggle("list__span_mod");

    if (label.classList.contains('list__label_mod')) {

      btn[3].style.visibility = "visible";

      countDone++;
      todoList[inputCount].check = true;
      todoList.reverse();

    } else {

      countDone--;
      todoList[inputCount].check = false;
      todoList.reverse();

    }
    localStorage.setItem('todo', JSON.stringify(todoList));

    count = chekDoneTodo(todoList);
    footer.querySelector(".strong").innerHTML = count + ' item left';

    if (countDone === 0) { btn[3].style.visibility = "hidden"; }
  }

  btn() {
    let todoList = JSON.parse(localStorage.getItem("todo"));
    todoList.reverse();

    let buttonCount = ul.querySelectorAll("button");
    buttonCount = Array.prototype.slice.call(buttonCount)
    buttonCount = buttonCount.indexOf(event.target)

    let li = ul.querySelectorAll("li");
    li[buttonCount].remove();

    todoList.splice(buttonCount, 1);
    todoList.reverse();
    localStorage.setItem('todo', JSON.stringify(todoList));

    count = chekDoneTodo(todoList);
    footer.querySelector(".strong").innerHTML = count + ' item left';

    if (todoList.length === 0) {
      footer.style.display = "none";
      innerInput.style.display = "none";
      innerLabel.style.display = "none";
    }
  }

  onClick(event) {
    let action = event.target.dataset.action;
    if (action) {
      this[action]();
      todoList = JSON.parse(localStorage.getItem("todo"));
    }
  }
}

new workList(ul);

ul.ondblclick = function (event) {

  let todoList = JSON.parse(localStorage.getItem("todo"));
  todoList.reverse();

  let label = event.target.closest("label");
  let labelCount = ul.querySelectorAll("label");
  labelCount = Array.prototype.slice.call(labelCount)
  labelCount = labelCount.indexOf(event.target);

  if (labelCount === -1) return;

  let todo = todoList[labelCount].todo;
  let div = event.target.closest("div");

  editList(label, labelCount, todo, div);

};

function editList(label, labelCount, todo, div) {

  let li = ul.querySelectorAll("li");

  div.style.display = "none";

  let input = document.createElement("input");
  input.classList.add("edit");
  input.type = "text";
  input.value = todo;
  li[labelCount].appendChild(input).focus();

  document.removeEventListener('keydown', enterKey);
  document.addEventListener("keydown", () => editKeyCode(input, label, labelCount, div, event));


  input.onblur = function () {
    editMade(input, label, labelCount, div);
  };

}

function editMade(input, label, labelCount, div) {

  todoList.reverse();
  todoList[labelCount].todo = input.value;
  localStorage.setItem('todo', JSON.stringify(todoList.reverse()));

  input.remove();
  div.style.display = "flex";

  label.innerHTML = input.value;

  document.addEventListener('keydown', enterKey);
}

function editKeyCode(input, label, labelCount, div, event) {
  if (event.code == 'Enter' || event.code == "Escape") {
    editMade(input, label, labelCount, div);
  }
}

function enterKey(event) {
  if (event.code == 'Enter') {
    var text = document.getElementsByTagName("input")[1];
    var input = text.value;

    const re = /[0-9,a-z,A-Z]{1}[0-9,a-z,A-Z]*[\s]*$/;
    var valid = re.test(input);

    if (valid === true) {

      text = document.getElementsByTagName("input")[1].value = "";

      var tmp = {};
      tmp.todo = input;
      tmp.check = false;
      todoList[todoList.length] = tmp
      localStorage.setItem('todo', JSON.stringify(todoList));

      footer.style.display = "flex";
      innerInput.style.display = "flex";
      innerLabel.style.display = "inline-block";

      count = chekDoneTodo(todoList);
      footer.querySelector(".strong").innerHTML = count + ' item left';

      patternList(tmp.todo);
    }
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
  checkbox.setAttribute("data-action", "checkbox");
  li.classList.add("list__li")
  div.classList.add("flex");
  label.classList.add("list__label");
  /*   checkbox.setAttribute('id', 'count'); */
  btn.classList.add("list__destroy");
  btn.setAttribute("data-action", "btn");
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

function chekDoneTodo(todoList) {
  var c = 0;
  var label = convertListLabel();
  var span = convertListSpan();
  for (var i = 0; i < todoList.length; i++) {
    if (todoList[i].check === true) {
      addListMod(label, span, i)
      c++
    }
  }
  footer.querySelector(".strong").innerHTML = (todoList.length - c) + ' item left';

  return todoList.length - c;
}

function createCompletedStorage() {
  var tmp = {};
  var compl = [];

  for (let btnKey = 0; btnKey < todoList.length;) {
    if (todoList[btnKey].check === true) {
      tmp = todoList[btnKey];
      compl[compl.length] = tmp;
      btnKey++;
    } else {
      btnKey++;
    }
  }

  localStorage.setItem("completed", JSON.stringify(compl));
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

function addListMod(label, span, i) {
  label[(label.length - 1) - i].classList.add("list__label_mod");
  span[(label.length - 1) - i].classList.add("list__span_mod");
}

function removeListMod(label, span, i) {
  label[(label.length - 1) - i].classList.remove("list__label_mod");
  span[(label.length - 1) - i].classList.remove("list__span_mod");
}

function selectAll() {
  var label = convertListLabel();
  var span = convertListSpan();
  var lenLabel = label.length;

  if (count % 2 === 0) {
    count++;
    btn[3].style.visibility = "visible";
    for (var i = 0; i < lenLabel; i++) {
      todoList[(lenLabel - 1) - i].check = true;
      localStorage.setItem('todo', JSON.stringify(todoList));
      addListMod(label, span, i);
    }
    footer.querySelector(".strong").innerHTML = "0 item left";

  } else {
    count++;
    btn[3].style.visibility = "hidden";
    for (var i = 0; i < lenLabel; i++) {
      removeListMod(label, span, i);
      todoList[(lenLabel - 1) - i].check = false;
      localStorage.setItem('todo', JSON.stringify(todoList));
      removeListMod(label, span, i);
    }
    footer.querySelector(".strong").innerHTML = todoList.length + " item left";
  }
}

select_all.onclick = function () {
  selectAll();

}

all.onclick = function () {
  deleteLi();
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
  createCompletedStorage();

  var li = convertLi();
  var lenLi = li.length;

  for (var i = 0; i < todoList.length; i++) {
    if (todoList[i]["check"] === true) {
      li[(lenLi - 1) - i].remove();
    }

    select_all.onclick = function () {
      deleteLi();
      if (count % 2 === 0) {
        btn[3].style.visibility = "hidden";
        count++;
        for (var i = 0; i < todoList.length; i++) {
          todoList[(lenLi - 1) - i].check = false;
        }
        outPatternList(todoList);
        localStorage.setItem('todo', JSON.stringify(todoList));
        footer.querySelector(".strong").innerHTML = todoList.length + " item left";
      } else {
        btn[3].style.visibility = "visible";
        for (var i = 0; i < todoList.length; i++) {
          todoList[(lenLi - 1) - i].check = true;
        }
        count++;
        localStorage.setItem('todo', JSON.stringify(todoList));

        footer.querySelector(".strong").innerHTML = "0 item left";
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
      footer.querySelector(".strong").innerHTML = "0 item left";
    } else {
      btn[3].style.visibility = "hidden";
      count++;
      deleteLi();
      for (var i = 0; i < label.length; i++) {
        todoList[(todoList.length - 1) - i].check = false;
      }
      localStorage.setItem('todo', JSON.stringify(todoList));
      footer.querySelector(".strong").innerHTML = todoList.length + " item left";
    }
  }

}

clear_completed.onclick = function () {
  
  var lenTodoList = todoList.length;
  var li = convertLi();

  for (var i = 0; i < lenTodoList; i++) {
    if (todoList[(lenTodoList - 1) - i].check === true) {
      todoList.splice((lenTodoList - 1) - i, 1);
      localStorage.setItem('todo', JSON.stringify(todoList));
      li[i].remove();
    }
  }

  if (todoList.length === 0) {
    footer.style.display = "none";
    innerInput.style.display = "none";
    innerLabel.style.display = "none";
  }

}
var ul = document.querySelector("ul");
var parentUl = document.querySelector("parentUl");
var footer = document.querySelector("footer");
var btn = footer.querySelectorAll("input");
var todoList = [];
var count = 0;
let c=0;
let countDone;
var allDiv = document.querySelectorAll("div");
var innerInput = allDiv[2].querySelector("input");
var innerLabel = allDiv[2].querySelector("label");

document.addEventListener('keydown', enterKey);
if (JSON.parse(localStorage.getItem("todo")) != undefined) {
  var todoList = JSON.parse(localStorage.getItem("todo"));

  for (var key in todoList){
    if(todoList[key].check === true){
      btn[3].style.visibility="visible";
      break;
    }
  }

}

if (JSON.parse(localStorage.getItem("todo")) === undefined || todoList.length === 0) {
  footer.style.display = "none";
  innerInput.style.display = "none";
  innerLabel.style.display = "none";
}

class workList {
  constructor(elem) {
    outPatternList(todoList);
    chekDoneTodo(todoList);
    this._elem = elem;
    elem.onclick = this.onClick.bind(this);
    countDone = localStorage.getItem('countDone', countDone);
  }

  checkbox() {
    checkb();
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

workList = new workList(ul);

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

function checkb() {
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

  for (var key in todoList) {
    if (todoList[key].check === true) {
      c++;
    }
  }
  if (c === 0) { btn[3].style.visibility = "hidden"; }
  c=0;
}

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
    const re = /[\s]{1}[\s]*$/;
    var valid = re.test(input);
    if (input) {
      if (valid === false) {

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
  for (var i = 0; i < todoList.length; i++) {
    if (todoList[i].check === true) {
      addListMod(i);
      c++;
    }
  }
  footer.querySelector(".strong").innerHTML = (todoList.length - c) + ' item left';

  return todoList.length - c;
}

function createNewdStorage(check, name) {
  var tmp = {};
  var compl = [];

  for (let btnKey = 0; btnKey < todoList.length;) {
    if (todoList[btnKey].check === check) {
      tmp = todoList[btnKey];
      compl[compl.length] = tmp;
      btnKey++;
    } else {
      btnKey++;
    }
  }

  localStorage.setItem(name, JSON.stringify(compl));
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

function addListMod(i) {
  var label = convertListLabel();
  var span = convertListSpan();
  label.reverse();
  span.reverse();
  if (label[i] != undefined && span[i] != undefined) {
    label[i].classList.add("list__label_mod");
    label[i].classList.add("transition_color");
    span[i].classList.add("list__span_mod");
  }
}

function removeListMod(i) {
  var label = convertListLabel();
  var span = convertListSpan();
  label.reverse();
  span.reverse();
  label[i].classList.remove("list__label_mod");
  span[i].classList.remove("list__span_mod");
}

function selectAll() {

  for (var key in todoList) {
    if (todoList[key].check === true) {
      c++;
    }
  }

  if (c === todoList.length) {

    for (var key in todoList) {
      todoList[key].check = false;
      removeListMod(key);
    }
    localStorage.setItem('todo', JSON.stringify(todoList));
    footer.querySelector(".strong").innerHTML = todoList.length + " item left";
    btn[3].style.visibility = "hidden";

  } else {

    for (var key in todoList) {
      todoList[key].check = true;
      addListMod(key);
    }
    localStorage.setItem('todo', JSON.stringify(todoList));
    footer.querySelector(".strong").innerHTML = "0 item left";
    btn[3].style.visibility = "visible";
  }
  
  c=0;
}

function activeCompleted(bool, bool2, name) {

  var li = convertLi();
  li = li.reverse();

  for (var key in todoList) {
    if (todoList[key]["check"] === bool) {
      li[key].remove();
    }
  }

  if (bool2 === true) {
    for (var key in todoList) {
      addListMod(key);
    }
  }

  workList.checkbox = function () {

    createNewdStorage(bool2, name);
    let notComStorage = JSON.parse(localStorage.getItem(name));
    let todoList = JSON.parse(localStorage.getItem("todo"));
    var li = convertLi();

    notComStorage.reverse();
    todoList = todoList.reverse();

    let inputCount = ul.querySelectorAll("input");
    inputCount = Array.prototype.slice.call(inputCount);
    inputCount = inputCount.indexOf(event.target);

    li[inputCount].remove();

    for (var key in todoList) {
      if (notComStorage[inputCount].todo === todoList[key].todo) {
        todoList[key].check = bool;
      }
    }

    btn[3].style.visibility = "visible";

    todoList.reverse();
    localStorage.setItem('todo', JSON.stringify(todoList));

    let countDone = notComStorage.length;
    countDone--;

    footer.querySelector(".strong").innerHTML = countDone + ' item left';
    if (countDone === 0) { btn[3].style.visibility = "hidden"; }
  }

}

select_all.onclick = function () {
  selectAll();

}

all.onclick = function () {
  deleteLi();
  outPatternList(todoList);

  for (var i = 0; i < todoList.length; i++) {
    if (todoList[i]["check"] === true) {
      addListMod(i);
    }
  }

  workList.checkbox = function () { checkb(); }

  select_all.onclick = function () {
    selectAll();
  }

  btn[0].classList.add("todoapp__btn_mod");
  btn[1].classList.remove("todoapp__btn_mod");
  btn[2].classList.remove("todoapp__btn_mod");
}

active.onclick = function () {

  deleteLi();
  outPatternList(todoList);

  activeCompleted(true, false, "not-completed")

  select_all.onclick = function () {


    for (var key in todoList) {
      if (todoList[key].check === true) {
        c++;
      }
    }

    if (c === todoList.length) {
      for (var key in todoList) {
        todoList[key].check = false;
      }
      outPatternList(todoList);
      localStorage.setItem('todo', JSON.stringify(todoList));

      footer.querySelector(".strong").innerHTML = todoList.length + " item left";
      btn[3].style.visibility = "hidden";

    } else {

      for (var key in todoList) {
        todoList[key].check = true;
      }

      deleteLi();
      localStorage.setItem('todo', JSON.stringify(todoList));

      footer.querySelector(".strong").innerHTML = "0 item left";
      btn[3].style.visibility = "visible";
    }
    c = 0;

  }

  btn[0].classList.remove("todoapp__btn_mod");
  btn[1].classList.add("todoapp__btn_mod");
  btn[2].classList.remove("todoapp__btn_mod");

}

completed.onclick = function () {

  deleteLi();
  outPatternList(todoList);

  activeCompleted(false, true, "completed");

  select_all.onclick = function () {

    for (var key in todoList) {
      if (todoList[key].check === true) {
        c++;
      }
    }

    if (c === todoList.length) {
      for (var key in todoList) {
        todoList[key].check = false;
      }
      deleteLi();
      localStorage.setItem('todo', JSON.stringify(todoList));

      footer.querySelector(".strong").innerHTML = todoList.length + " item left";
      btn[3].style.visibility = "hidden";

    } else {
      outPatternList(todoList);
      for (var key in todoList) {
        todoList[key].check = true;
        addListMod(key);
      }
      localStorage.setItem('todo', JSON.stringify(todoList));

      footer.querySelector(".strong").innerHTML = "0 item left";
      btn[3].style.visibility = "visible";
    }
    c = 0;
  }

  btn[0].classList.remove("todoapp__btn_mod");
  btn[1].classList.remove("todoapp__btn_mod");
  btn[2].classList.add("todoapp__btn_mod");
}

clear_completed.onclick = function () {

  var lenTodoList = todoList.length;
  var li = convertLi();

  for (var i = 0; i < lenTodoList; i++) {
    if (todoList[(lenTodoList - 1) - i].check === true) {
      todoList.splice((lenTodoList - 1) - i, 1);
      localStorage.setItem('todo', JSON.stringify(todoList));
      if (li[i] != undefined) {
        li[i].remove();
      }
    }
  }

  if (todoList.length === 0) {
    footer.style.display = "none";
    innerInput.style.display = "none";
    innerLabel.style.display = "none";
  }

}
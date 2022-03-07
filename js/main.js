let ul = document.querySelector("ul");
let parentUl = document.querySelector("parentUl");
let footer = document.querySelector("footer");
let btn = footer.querySelectorAll("input");

let allDiv = document.querySelectorAll("div");
let inputSelectAll = allDiv[2].querySelector("input");

let todoList = [];
let count = 0;
let c = 0;
let countDone;
let input;
let valid;

if (JSON.parse(localStorage.getItem("todo")) != undefined) {
  todoList = JSON.parse(localStorage.getItem("todo"));
}

if (JSON.parse(localStorage.getItem("todo")) === undefined || todoList.length === 0) {
  footer.style.display = "none";
  inputSelectAll.style.display = "none";
}

let changeCheckbox = () => {

  todoList = JSON.parse(localStorage.getItem("todo"));
  todoList.reverse();

  div = event.target.closest("div");
  label = div.querySelector("label");
  span = div.querySelector("span");

  let inputCount = ul.querySelectorAll("input");
  inputCount = Array.prototype.slice.call(inputCount);
  inputCount = inputCount.indexOf(event.target);

  label.classList.toggle("list__label_mod");
  span.classList.toggle("list__span_mod");

  if (label.classList.contains('list__label_mod')) {

    btn[3].style.visibility = "visible";

    countDone++;
    todoList[inputCount].check = true;

  } else {

    countDone--;
    todoList[inputCount].check = false;
  }

  todoList.reverse();
  localStorage.setItem('todo', JSON.stringify(todoList));

  count = checkDoneTodo(todoList);
  footer.querySelector(".strong").innerHTML = count + ' item left';

  c = (todoList.filter(todoList => todoList.check === true)).length;

  if (c === 0) { btn[3].style.visibility = "hidden"; }
  c = 0;
}

let editList = (label, labelCount, todo, div) => {
  li = ul.querySelectorAll("li");
  div.style.display = "none";
  todoList.reverse();

  let inputField = document.createElement("input");
  inputField.classList.add("edit");
  inputField.type = "text";
  inputField.value = todo;
  li[labelCount].appendChild(inputField).focus();

  document.removeEventListener('keydown', enterKey);
  document.removeEventListener("keydown", outNewList);
  document.addEventListener("keydown", () => editKeyCode(inputField, label, labelCount, div, event), { once: true });

  inputField.onblur = function () {
    editMade(inputField, label, labelCount, div);
  };

}

let editKeyCode = (inputField, label, labelCount, div, event) => {
  if (event.code == 'Enter' || event.code == "Escape") {
    editMade(inputField, label, labelCount, div);
  }
}

let editMade = (inputField, label, labelCount, div) => {

  todoList.reverse();
  todoList[labelCount].todo = inputField.value;
  console.log(inputField.value);
  localStorage.setItem('todo', JSON.stringify(todoList.reverse()));

  inputField.remove();
  div.style.display = "flex";

  label.innerHTML = inputField.value;

  document.addEventListener('keydown', enterKey);
  document.addEventListener("keydown", outNewList);

  document.removeEventListener("keydown", () => editKeyCode(inputField, label, labelCount, div, event));
}

let enterKey = () => {

  document.removeEventListener("keydown", () => editKeyCode(inputField, label, labelCount, div, event));

  if (event.code == 'Enter') {

    let text = document.getElementsByTagName("input")[1];
    input = text.value;
    const re = /[\s]{1}[\s]*$/;
    valid = re.test(input);
    if (input) {
      if (valid === false) {

        text = document.getElementsByTagName("input")[1].value = "";

        let tmp = {};
        tmp.todo = input;
        tmp.check = false;
        todoList[todoList.length] = tmp
        localStorage.setItem('todo', JSON.stringify(todoList));

        footer.style.display = "flex";
        inputSelectAll.style.display = "block";

        count = checkDoneTodo(todoList);
        footer.querySelector(".strong").innerHTML = count + ' item left';
      }
    }
  }
}

let outNewList = () => {
  if (event.code == 'Enter') {
    if (input) { if (valid === false) { patternList(input); } }
  }
}

let patternList = (out) => {
  let parentUl = document.getElementById('list');
  let firstUl = parentUl.firstChild;
  let div = document.createElement("div");
  let li = document.createElement("li");
  let checkbox = document.createElement("input");
  let span = document.createElement("span");
  let label = document.createElement("label");
  let btn = document.createElement("button");
  checkbox.type = 'checkbox';
  checkbox.classList.add("list__li_checkbox");
  checkbox.setAttribute("data-action", "checkbox");
  li.classList.add("list__li");
  div.classList.add("flex");
  span.classList.add("list__li_btn");
  span.classList.add("transition-position");
  label.classList.add("list__label");
  label.classList.add("transition-color");
  btn.classList.add("list__destroy");
  btn.setAttribute("data-action", "btn");
  parentUl.insertBefore(li, firstUl);
  li.appendChild(div);
  div.appendChild(checkbox);
  div.appendChild(span);
  div.appendChild(label);
  label.appendChild(document.createTextNode(out));
  div.appendChild(btn);
}

let outPatternList = (todoList) => {
  let indexTodo = todoList.map(todoList => todoList.todo);
  indexTodo.forEach((value, c) => {
    patternList(value);
  })
}

let checkDoneTodo = (todoList) => {
  c = 0;
  c = (todoList.filter(todoList => todoList.check === true)).length;
  footer.querySelector(".strong").innerHTML = (todoList.length - c) + ' item left';
  return todoList.length - c;
}

let createNewStorage = (check, name) => {
  tmp = {};
  completed = [];
  c = 0;

  todoList.forEach((value) => {
    if (value.check === check) {
      tmp = todoList[c];
      completed[completed.length] = tmp;
      c++;
    }
    else { c++; }
  })

  localStorage.setItem(name, JSON.stringify(completed));
}

let convertListLabel = () => {
  label = ul.querySelectorAll("label");
  label = Array.prototype.slice.call(label);
  return label;
}

let convertListSpan = () => {
  span = ul.querySelectorAll("span");
  span = Array.prototype.slice.call(span);
  return span;
}

let convertLi = () => {
  li = ul.querySelectorAll("li");
  li = Array.prototype.slice.call(li);
  return li;
}

let deleteLi = () => {
  li = convertLi();
  todoList.forEach(() => {
    if (li.length != 0) { li.shift().remove(); }
  })
}

let addListMod = (i) => {
  label = convertListLabel();
  span = convertListSpan();
  label.reverse();
  span.reverse();

  if (label[i] != undefined && span[i] != undefined) {
    label[i].classList.add("list__label_mod");
    span[i].classList.add("list__span_mod");
  }
}

let removeListMod = (i) => {
  label = convertListLabel();
  span = convertListSpan();
  label.reverse();
  span.reverse();

  if (label[i] != undefined && span[i] != undefined) {
    label[i].classList.remove("list__label_mod");
    span[i].classList.remove("list__span_mod");
  }
}

let activeCompleted = (bool, bool2, name) => {
  let indexCheck = todoList.map(todoList => todoList.check);
  li = convertLi();
  li = li.reverse();

  indexCheck.forEach((value, c) => { if (value === true) { li[c].remove(); } })
  if (bool2 === true) { indexCheck.forEach((value, c) => { addListMod(c); }) }

  workList.checkbox = function () {

    createNewStorage(bool2, name);
    let notCompletedStorage = JSON.parse(localStorage.getItem(name));
    let todoList = JSON.parse(localStorage.getItem("todo"));
    let li = convertLi();

    notCompletedStorage.reverse();
    todoList.reverse();

    let inputCount = ul.querySelectorAll("input");
    inputCount = Array.prototype.slice.call(inputCount);
    inputCount = inputCount.indexOf(event.target);

    li[inputCount].remove();

    let indexTodo = todoList.map(todoList => todoList.todo);
    indexTodo.forEach((value, c) => {
      if (notCompletedStorage[inputCount].todo === value) {
        todoList[c].check = bool;
      }
    })

    btn[3].style.visibility = "visible";

    todoList.reverse();
    localStorage.setItem('todo', JSON.stringify(todoList));

    let countDone = notCompletedStorage.length;
    countDone--;

    footer.querySelector(".strong").innerHTML = countDone + ' item left';
    if (countDone === 0) { btn[3].style.visibility = "hidden"; }
  }
}

let chooseBtnMod = (a, b, c) => {

  btn[a].classList.add("todoapp__btn_mod");
  btn[b].classList.remove("todoapp__btn_mod");
  btn[c].classList.remove("todoapp__btn_mod");

  btn[a].classList.remove("todoapp__btn_hover");
  btn[b].classList.add("todoapp__btn_hover");
  btn[c].classList.add("todoapp__btn_hover");

}

let selectAll = () => {

  c = (todoList.filter(todoList => todoList.check === true)).length;

  if (c === todoList.length) {

    changeAllCheck(true, false);
    localStorage.setItem('todo', JSON.stringify(todoList));
    footer.querySelector(".strong").innerHTML = todoList.length + " item left";
    btn[3].style.visibility = "hidden";

  } else {

    changeAllCheck(false, true);
    localStorage.setItem('todo', JSON.stringify(todoList));
    footer.querySelector(".strong").innerHTML = "0 item left";
    btn[3].style.visibility = "visible";
  }

  c = 0;
}

let deleteCompletedTodo = () => {

  cloneTodList = JSON.parse(localStorage.getItem("todo"));
  cloneTodList.forEach(() => {
    let indexCheck = todoList.findIndex(todoList => todoList.check === true);
    if (indexCheck === -1) return;
    todoList.splice(indexCheck, 1);
  })

  localStorage.setItem('todo', JSON.stringify(todoList));
}

let changeAllCheck = (bool1, bool2) => {
  let indexCheck = todoList.map(todoList => todoList.check);
  indexCheck.forEach((value, c) => {
    todoList[c].check = bool2;
    if (bool1 != true) { addListMod(c); }
    else { removeListMod(c); }
  })
}

document.addEventListener("keydown", enterKey);
document.addEventListener("keydown", outNewList);

class workList {
  constructor(elem) {
    outPatternList(todoList);
    checkDoneTodo(todoList);
    this._elem = elem;
    elem.onclick = this.onClick.bind(this);
    countDone = localStorage.getItem('countDone', countDone);

    let indexCheck = todoList.map(todoList => todoList.check);
    indexCheck.forEach((value, c) => {
      if (value === true) {
        btn[3].style.visibility = "visible";
        addListMod(c);
      }
    })

  }

  checkbox() {
    changeCheckbox();
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

    count = checkDoneTodo(todoList);
    footer.querySelector(".strong").innerHTML = count + ' item left';

    if (todoList.length === 0) {
      footer.style.display = "none";
      inputSelectAll.style.display = "none";
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

  todoList = JSON.parse(localStorage.getItem("todo"));
  todoList.reverse();

  label = event.target.closest("label");
  let labelCount = ul.querySelectorAll("label");
  labelCount = Array.prototype.slice.call(labelCount)
  labelCount = labelCount.indexOf(event.target);

  if (labelCount === -1) return;

  let todo = todoList[labelCount].todo;
  let div = event.target.closest("div");

  editList(label, labelCount, todo, div);
  console.log("qwa");
};

btnSelectAll.onclick = function () {
  selectAll();

}

btnAll.onclick = function () {
  document.addEventListener('keydown', outNewList);
  deleteLi();
  outPatternList(todoList);

  let indexCheck = todoList.map(todoList => todoList.check);
  indexCheck.forEach((value, c) => {
    if (value === true) { addListMod(c); }

  })
  workList.checkbox = function () { changeCheckbox(); }

  btnSelectAll.onclick = function () {
    selectAll();
  }
  chooseBtnMod(0, 1, 2);
}

btnActive.onclick = function () {
  document.addEventListener('keydown', outNewList);
  deleteLi();
  outPatternList(todoList);

  activeCompleted(true, false, "not-completed")

  btnSelectAll.onclick = function () {

    c = (todoList.filter(todoList => todoList.check === true)).length;

    if (c === todoList.length) {
      changeAllCheck(true, false);
      outPatternList(todoList);
      localStorage.setItem('todo', JSON.stringify(todoList));

      footer.querySelector(".strong").innerHTML = todoList.length + " item left";
      btn[3].style.visibility = "hidden";

    } else {

      changeAllCheck(false, true);
      deleteLi();
      localStorage.setItem('todo', JSON.stringify(todoList));

      footer.querySelector(".strong").innerHTML = "0 item left";
      btn[3].style.visibility = "visible";
    }
    c = 0;

  }
  chooseBtnMod(1, 0, 2);
}

btnCompleted.onclick = function () {
  document.removeEventListener('keydown', outNewList);

  deleteLi();
  outPatternList(todoList);

  activeCompleted(false, true, "completed");

  btnSelectAll.onclick = function () {

    c = (todoList.filter(todoList => todoList.check === true)).length;

    if (c === todoList.length) {
      deleteLi();
      changeAllCheck(true, false);
      localStorage.setItem('todo', JSON.stringify(todoList));
      footer.querySelector(".strong").innerHTML = todoList.length + " item left";
      btn[3].style.visibility = "hidden";

    } else {
      deleteLi();
      outPatternList(todoList);
      changeAllCheck(false, true);
      localStorage.setItem('todo', JSON.stringify(todoList));
      footer.querySelector(".strong").innerHTML = "0 item left";
      btn[3].style.visibility = "visible";
    }
    c = 0;
  }

  btnClerCompleted.onclick = function () {
    deleteLi();
    deleteCompletedTodo();

    btn[3].style.visibility = "hidden";

  }
  chooseBtnMod(2, 1, 0);
}

btnClerCompleted.onclick = function () {
  deleteLi();
  deleteCompletedTodo();
  outPatternList(todoList);

  if (todoList.length === 0) {
    footer.style.display = "none";
    inputSelectAll.style.display = "none";
  }

}
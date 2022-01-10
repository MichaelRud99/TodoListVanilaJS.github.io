var input;
var ul = document.getElementById("list");
var todoList = [];
var count = 0;
var countDone = 0;
let answer =false;
console.log(answer);
/* by loadout */
var a=localStorage.getItem("todo");
if ( a!= undefined) {
  todoList = JSON.parse(localStorage.getItem('todo'));
  for (var key in todoList) {
    out = todoList[key].todo;
    patternList(out);
  }
  var getLenTodoList = localStorage.getItem("lenTodolist");
  countItemsDone(todoList.length,getLenTodoList);
  countItems();
}else{
  /* http://old.code.mu/books/javascript/dom/prodvinutaya-rabota-s-sobytiyami-v-javascript.html */
}

function enterKey(){
document.addEventListener('keydown', function(event){
  if (event.code == 'Enter') {
    var text = document.getElementsByTagName("input")[0];
    var input = text.value;
    text = document.getElementsByTagName("input")[0].value="";
    var tmp = {};
    tmp.todo = input;
    tmp.check = false;
    var lenTodoList = todoList.length;
    todoList[lenTodoList] = tmp;
/*     output(todoList); */
    localStorage.setItem('todo', JSON.stringify(todoList));
    localStorage.setItem('lenTodolist', lenTodoList+1);
    countItems();
  }
});
}

/* function output(todoList) {
  var out = '';
  for (var key in todoList) {
    out = todoList[key].todo;
  }
} */

function patternList(out) {
  var parentLi = document.getElementById('parentLi');
  var firstLi = parentLi.firstChild;
  var li = document.createElement("li");
  var div = document.createElement("div");
  var checkbox = document.createElement("input");
  var label = document.createElement("label");
  var p = document.createElement("p");
  var hr = document.createElement("hr");
  checkbox.type = 'checkbox';
  /* checkbox.value="answer"; */
  checkbox.classList.add("list__checkbox")
  label.classList.add("list__label");
  checkbox.setAttribute('id', 'cont');
  hr.classList.add("section__hr");
  label.appendChild(document.createTextNode(out));
  parentLi.insertBefore(li, firstLi );
/*   li.appendChild(div); */
  li.appendChild(checkbox);
  li.appendChild(label);
  parentLi.insertBefore(hr,firstLi);
}

function countItems(){
  var getLenTodoList = localStorage.getItem("lenTodolist");
  document.querySelector(".strong").innerHTML = getLenTodoList + ' item left';
}

function countItemsDone(todoList,getLenTodoList) {
  /*   var getLenTodoList = localStorage.getItem("lenTodolist"); */
    var clickCheckbox = document.querySelectorAll(".list__checkbox");
    var label = document.querySelectorAll(".list__label");
  
    for (let j = 0; j < clickCheckbox.length; j++) {
      clickCheckbox[j].addEventListener('click', function () {
      /*   console.log(todoList); */
        if (label[j].classList.contains('list__label_mod')) {
          countDone--;
          getLenTodoList = label.length - countDone;
        } else {
          countDone++;
          getLenTodoList = label.length - countDone;
        }
        document.querySelector(".strong").innerHTML = getLenTodoList + ' item left';
        label[j].classList.toggle("list__label_mod");
      });
    }
  }

function deleteAll() {
  var li = document.querySelectorAll("li");
  if (li != undefined) {
    var btn = document.querySelector(".todoapp__btn");
    var tmp = document.querySelector("footer");
    tmp.style.display = "inline";
    btn.style.display = "inline";
    btn.addEventListener('click', function () {
      localStorage.clear();

      for (let k = 1; k < li.length; k++) {
        li[k].remove();
      }
      tmp.style.display = "none";
    });
  }
}


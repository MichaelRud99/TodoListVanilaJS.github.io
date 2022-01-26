var input;
var ul = document.getElementById("list");
var todoList = [];
var count = 0;
var countDone = 0;

/*
почему индексы берём через (label.length-1)-key
так как мы создаём элементы и вставляем их в начало, то получаем, то получаем инвертированный список, то есть первый элемент внизу, но позиция у него 0 
(поэтому мы от длины и отменяем один)
длина всегда больше текущего индекса.
*/

var a=localStorage.getItem("todo");
if ( a!= undefined) {
  todoList = JSON.parse(localStorage.getItem('todo'));
  for (var key in todoList) {
    out = todoList[key].todo;
    patternList(out);
  }
  var label =document.querySelectorAll(".list__label");
  //console.log(label);
  for (var key in todoList) {
    var check =todoList[key].check
    //console.log(out.length);
    if(check === true){
     console.log(label[(label.length-1)-key]);
      if(clear_completed.addEventListener('click',btnClearAll)){}
     label[(label.length-1)-key].classList.add("list__label_mod");
    }
    //console.log(out);
  }
  var getLenTodoList = localStorage.getItem("lenTodolist");
  countItemsDone(todoList.length,getLenTodoList);
  countItems();
  footerBtn();
}

function footerBtn(){
  var btn = document.querySelectorAll(".todoapp__btn");
  console.log(btn);
  for(var i=0; i<btn.length; i++)btn[i].style.display="inline";
}



enterKey()

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
    //deleteAll();
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
  checkbox.setAttribute('id', 'count');
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

function countItemsDone(getLenTodoList) {
  /*   var getLenTodoList = localStorage.getItem("lenTodolist"); */
    var clickCheckbox = document.querySelectorAll(".list__checkbox");
    var label = document.querySelectorAll(".list__label");
    var todoList = JSON.parse(localStorage.getItem('todo'));
    //console.log(todoList);
    var lenClickCheckbox = clickCheckbox.length;
    for (let j = 0; j < lenClickCheckbox; j++) {
      clickCheckbox[j].addEventListener('click', function () {
      /*   console.log(todoList); */
        if (label[j].classList.contains('list__label_mod')) {
          countDone--;
          getLenTodoList = label.length - countDone;
          todoList[(lenClickCheckbox-1)-j].check=false;
          localStorage.setItem('todo', JSON.stringify(todoList));
        } else {
          countDone++;
          getLenTodoList = label.length - countDone;
          todoList[(lenClickCheckbox-1)-j].check=true;
          localStorage.setItem('todo', JSON.stringify(todoList));

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

 function tmp () {
  document.getElementById("count").focus();
};

function btnClearAll(){
var li = document.querySelectorAll("li");
todoList = JSON.parse(localStorage.getItem('todo'));
console.log(todoList);
for(var key in todoList){
var check =todoList[key].check;
  if(check === true){
    var v = (todoList.length)-key;
    delete todoList[v]
    li[v].remove();
  }
}
console.log(todoList);
//localStorage.setItem('todo', JSON.stringify(todoList));
}




var input;
var ul = document.getElementById("list");


function tmp(){}


function save(count,input,tmp) {
    if(tmp ===0){
        tmp();
    }else{localStorage.setItem(count, input);}
  }

function search(enterValue) {
 if(event.key == 'Enter'){
    tmp(count);
    input = enterValue.value;
    document.getElementById("textInput").value = "";
    output(input);
    count++;

 }
}
function output(count){
    var localValue = localStorage.getItem(count);
    var li = document.createElement("li");
    li.classList.add("list__li")
    li.appendChild(document.createTextNode(localValue));
    ul.appendChild(li);  
}

function add(count){
    var lenStorage = localStorage.length;
    if(lenStorage ===0){
        return
    }
    else{
        for(let i =0;i<lenStorage;i++){
        output(count);
        }
    }
}





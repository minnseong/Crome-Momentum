const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];
let setId = 1;

function deleteToDo(event) {
    //console.dir(event.target); : parentNode 찾아보기
    //console.log(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    // list에 있는 모든 item에 각각 funtion 실행
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    // localStorage는 string만 저장가능
    // JSON.stringify : Object -> String
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = setId;
    setId += 1;
    delBtn.innerText = "❌";
    delBtn.className = "toDo__button";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = " " + text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    // getItem해서 가져온 value type = String
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        // String -> Object 
        const parsedToDos = JSON.parse(loadedToDos);
        // 각각에 대해서 function 실행 , toDo 자리에는 아무 변수나 상관없음.
        // **의문점**
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
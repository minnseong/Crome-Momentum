const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

// localStorage에 currentUser 저장.
function saveName(text) {
    // localStorage는 그 URL에서만 접근 가능
    localStorage.setItem(USER_LS, text);
}

// form summit시, value를 가지고 paintGreeting, saveName 호출.
function handleSubmit(event) {
    // submit시 default로 새로고침이 되는데, 그것을 막아줌.
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
} 

// currentUser가 없을시, form 보여주기.
function askForName() {
    form.classList.add(SHOWING_CN);
    // form event add ( submit 시 )
    form.addEventListener("submit", handleSubmit);
}

// currentUser가 있을시, 출력.
function paintGreeting(text) {
    // form hidden , greeting show ( class add remove)
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

// localStorage를 참조해 각 function 호출.
function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        // user is
        askForName();
    } else {
        // user is not
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();


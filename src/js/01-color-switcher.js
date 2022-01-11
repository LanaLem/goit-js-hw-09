const startBtnEl = document.querySelector("[data-start]");
const stopBtnEl = document.querySelector("[data-stop]");
let timerId = null;

startBtnEl.addEventListener("click", onStartBtnElClick);
stopBtnEl.addEventListener("click", onStopBtnElClick);

function onStartBtnElClick(e) { 
    if (!e.currentTarget.disabled) { 
        e.currentTarget.disabled = true;
        timerId = setInterval(() => { document.body.style.backgroundColor = getRandomHexColor(); }, 1000)
    }
    stopBtnEl.disabled = false;
};

function onStopBtnElClick(e) { 
    if (!e.currentTarget.disabled) { 
        e.currentTarget.disabled = true;
        clearInterval(timerId);
    }
    startBtnEl.disabled = false;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
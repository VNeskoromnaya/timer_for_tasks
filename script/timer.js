const buttonStart = document.querySelector('.start');
const buttonSave = document.querySelector('.save');

const hoursItem = document.querySelector('.time-hours');
const minutesItem = document.querySelector('.time-minutes');
const secondsItem = document.querySelector('.time-seconds');

const errorMessage = document.querySelector('.error-message');
const task = document.querySelector('.tasks-input');

let startDate;
let timerId;
let gate = false;

// Функция таймера
function timer() {
    const nowDate = new Date();
    const diff = nowDate.getTime() - startDate.getTime();
    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
    hoursItem.textContent = hours < 10 ? '0' + hours : hours;
    minutesItem.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsItem.textContent = seconds < 10 ? '0' + seconds : seconds;
}

// Старт
export function start() {
    clearInterval(timerId);
    startDate = new Date();
    timerId = setInterval(timer, 1000);
    buttonSave.disabled = false;
}

// Пауза
export function pause() {
    if (gate == false) {
        clearInterval(timerId);
        buttonStart.textContent = "продолжить";
        buttonSave.disabled = true;
        gate = true;
    } else {
        clearInterval(timerId);
        startDate = new Date();
        buttonStart.textContent = "старт";
        buttonSave.disabled = false;
        gate = false;
    }
}

// Сброс данных
export function reset() {
    pause();
    timerId = null;
    resetDisplay();
    errorMessage.innerHTML = "";
    task.value = "";
    buttonSave.disabled = true;
    gate = true;
}

// Функция обнуляет данные таймера при нажатии на кнопку "сброс данных"
function resetDisplay() {
    hours = 00;
    minutes = 00;
    seconds = 00;
    hoursItem.textContent = "00";
    minutesItem.textContent = "00";
    secondsItem.textContent = "00";
}
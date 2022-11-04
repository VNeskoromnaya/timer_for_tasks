const buttonStart = document.querySelector('.start');
const buttonSave = document.querySelector('.save');

const hoursItem = document.querySelector('.time-hours');
const minutesItem = document.querySelector('.time-minutes');
const secondsItem = document.querySelector('.time-seconds');

const errorMessage = document.querySelector('.error-message');
const task = document.querySelector('.tasks-input');

let startDate;
let timerId;

// Функция таймера
function stopwatch() {
    const nowDate = new Date();
    const diff = new Date(nowDate - startDate);
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
    timerId = setInterval(stopwatch, 1000);
    buttonSave.disabled = false;
}

// Пауза
export function pause() {
    clearInterval(timerId);
    buttonSave.disabled = true;
}

// Сброс данных
export function reset() {
    pause();
    timerId = null;
    resetDisplay();
    errorMessage.innerHTML = "";
    task.value = "";
    buttonSave.disabled = true;
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
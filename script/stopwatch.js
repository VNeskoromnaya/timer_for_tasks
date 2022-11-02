const hoursItem = document.querySelector('.time-hours');
const minutesItem = document.querySelector('.time-minutes');
const secondsItem = document.querySelector('.time-seconds');

const errorMessage = document.querySelector('.error-message');
const task = document.querySelector('.tasks-input');

let startDate;
let interval = null;

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
    clearInterval(interval);
    startDate = new Date();
    interval = setInterval(stopwatch, 1000);
}

// Пауза
export function pause() {
    clearInterval(interval);
}

// Сброс данных
export function reset() {
    pause();
    interval = null;
    resetDisplay();
    errorMessage.innerHTML = "";
    task.value = "";
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
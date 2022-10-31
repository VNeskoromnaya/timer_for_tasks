import moment from "moment";

document.addEventListener('DOMContentLoaded', () => {

    console.log('test');

    const hoursItem = document.querySelector('.time-hours');
    const minutesItem = document.querySelector('.time-minutes');
    const secondsItem = document.querySelector('.time-seconds');

    const buttonStart = document.querySelector('.start');
    const buttonPause = document.querySelector('.pause');
    const buttonReset = document.querySelector('.reset');
    const buttonSave = document.querySelector('.save');

    const task = document.querySelector('.tasks-input');
    const errorMessage = document.querySelector('.error-message');

    const startDate = new Date();
    console.log(startDate);

    let posts = []; // все задачи с датами и временем выполнения собираются в этот массив

    let interval = null;

    buttonStart.addEventListener('click', start);
    buttonPause.addEventListener('click', pause);
    buttonReset.addEventListener('click', reset);
    buttonSave.addEventListener('click', save);

    // Функция таймера
    function timerForTasks() {
        const diff = new Date() - startDate;
        // console.log(diff);
        const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
        const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
        hoursItem.textContent = hours < 10 ? '0' + hours : hours;
        minutesItem.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondsItem.textContent = seconds < 10 ? '0' + seconds : seconds;
        if (diff <= 0) {
            clearInterval(interval);
        }
    }

    // Старт
    function start() {
        if (interval) {
            return
        }
        interval = setInterval(timerForTasks, 1000);
    }

    // Пауза
    function pause() {
        clearInterval(interval);
        interval = null;
    }

    // Сброс данных
    function reset() {
        pause();
        resetDisplay();
        errorMessage.innerHTML = "";
        task.innerHTML = "";
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

    // Функция сохраняет данные в массив объектов
    function save() {
        clearInterval(interval);

        if (task.value === '') {
            errorMessage.innerHTML = "Поле не заполнено";
            return false;
        } else {
            let postsItem = {};
            posts.task = task.value;
            posts.date = moment().format("DD/MM/YYYY");
            posts.time = `${hours}:${minutes}:${seconds}`;

            posts.push(postsItem);

            reset();
            clearInterval(interval);
        }

    }

    console.log(posts);

    const sendDataToServer = async (url, posts) => {
        const response = await fetch(url, {
            method: 'POST',
            body: posts,
        });
        if (!response.ok) {
            throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`);
        }
        return await response.json();
    }

})
import {reset} from './stopwatch.js';

const hoursItem = document.querySelector('.time-hours');
const minutesItem = document.querySelector('.time-minutes');
const secondsItem = document.querySelector('.time-seconds');

const task = document.querySelector('.tasks-input');
const errorMessage = document.querySelector('.error-message');

let data = []; // все задачи с датами и временем выполнения собираются в этот массив

// Функция сохраняет данные в массив объектов
export function save() {
    const hours = hoursItem.textContent;
    const minutes = minutesItem.textContent;
    const seconds = secondsItem.textContent;

    if (task.value === '') {
        errorMessage.innerHTML = "Поле не заполнено";
        return false;
    } else if (hours === '00' && minutes === '00' && seconds === '00') {
        errorMessage.innerHTML = "Таймер не запущен";
        return false;
    } else {

        let dataItem = {};
        dataItem[posts] = [{
            "task": `${task.value}`,
            "time": `${hours}:${minutes}:${seconds}`,
        }];
        dataItem.id = data.length + 1;
        dataItem.date = moment().format("DD/MM/YYYY");
        data.push(dataItem);

        reset();
    }

}

console.log(data);

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
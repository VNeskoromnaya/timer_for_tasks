'use strict';

export async function getAPI() {
    const response = await fetch("https://api.adviceslip.com/advice")
    const data = await response.json()
    getA(data)
}

function getA(slip) {
    document.getElementById('slaid1_phrase').innerText = slip.slip.advice;
}

export function getTodayDate() {
    const now = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[now.getMonth()];
    document.getElementById('slaid1_today').innerHTML = `${now.getDate()} ${month} ${now.getFullYear()}`;
}

export async function getHistory() {
    const response = await fetch('http://localhost:3001/posts')
    const data = await response.json()
    getData(data);
}

function getData(data) {
    const container = document.querySelector('#history');
    data.forEach(data => {
        container.innerHTML += `<h2 class="history_date">${data.day}</h2><div class="history_text">${data.text}</div> <div class="history_time">${data.time}</div><hr class="clear"><span class="history_summury">Итого</span>`
    });
}

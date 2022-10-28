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

export function getHistory() {
    let date = localStorage.getItem('date');
    let time = localStorage.getItem('time');
    let history = localStorage.getItem('history');
    let summary = localStorage.getItem('summary');
    let optionsString = "";

    optionsString = `<h2 class="history_date">${date}</h2><span class="history_text">${history}</span> <span class="history_time">${time}</span><hr><span class="history_summury">${summary}</span>`;
    document.querySelector("#history").innerHTML = optionsString;
}

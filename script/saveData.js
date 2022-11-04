import moment from "moment";

import {
    reset
} from './timer.js';

const hoursItem = document.querySelector('.time-hours');
const minutesItem = document.querySelector('.time-minutes');
const secondsItem = document.querySelector('.time-seconds');

const task = document.querySelector('.tasks-input');
const errorMessage = document.querySelector('.error-message');

let data = []; // все задачи с датами и временем выполнения собираются в этот массив
let posts = [];

// Функция сохраняет данные в массив объектов
export function save() {
    const hours = hoursItem.textContent;
    const minutes = minutesItem.textContent;
    const seconds = secondsItem.textContent;

    class DataItem {
        constructor(option) {
            this.id = option.id
            this.date = option.date
            this.posts = option.posts
        }
    }
    class PostsItem {
        constructor(option) {
            this.idPosts = option.idPosts
            this.day = option.day
            this.title = option.title
            this.time = option.time
        }
    }

    const postsItem = new PostsItem({
        idPosts: `${posts.length + 1}`,
        day: moment().format("DD/MM/YYYY"),
        title: `${task.value}`,
        time: `${hours}:${minutes}:${seconds}`,
    })

    const dataItem = new DataItem({
        id: `${data.length + 1}`,
        date: moment().format("DD/MM/YYYY"),
        posts: posts,
    })


    posts.push(postsItem);
    data.push(dataItem);


    reset();
}



console.log(data);


//     const response = await fetch('http://localhost:3001/posts', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(dataItem)
// });
// const result = await response.json;

// console.log(result);
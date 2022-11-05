import moment from "moment";

import {
    reset
} from './timer.js';

const hoursItem = document.querySelector('.time-hours');
const minutesItem = document.querySelector('.time-minutes');
const secondsItem = document.querySelector('.time-seconds');

const task = document.querySelector('.tasks-input');

let data = []; // все данные за день
let posts = []; // все задачи с датами и временем выполнения собираются в этот массив

// Функция сохраняет данные в массив объектов
export async function save() {
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


    const url = 'http://localhost:3001/posts/1';
    data.push(dataItem);

// console.log(data);

    try {
        const response = await fetch(url, {
            method: 'PUT', // или 'PUT'
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        console.log('Успех:', JSON.stringify(json));
    } catch (error) {
        console.error('Ошибка:', error);
    }

    reset();

}







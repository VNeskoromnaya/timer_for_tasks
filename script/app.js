const moment = require('moment');
const chart = require('chart.js');

// import { showChart } from './script.js'

// showChart();

let chartJson = `{
    "type": "bar",
    "data": {
        "labels": [
            "Понедельник",
            "Вторник",
            "Среда",
            "Четверг",
            "Пятница",
            "Суббота",
            "Воскресенье"
        ],
        "datasets": [
            {
                "label": "Время обучения по дням",
                "data": [
                    2,
                    7,
                    3,
                    5,
                    12,
                    6,
                    7
                ],
                "backgroundColor": [
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 99, 132, 0.2)"
                ],
                "borderColor": [
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 99, 132, 1)"
                ],
                "borderWidth": 1
            }
        ]
    },
    "options": {
        "scales": {
            "y": {
                "beginAtZero": true
            }
        }
    }
}`
const config = JSON.parse(chartJson);
const ctx = document.getElementById('myChart');

const myChart = new Chart(ctx, config);

console.log('hello');

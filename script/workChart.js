const chart = require('chart.js');
import moment from 'moment';
import { getDataFromServer } from './getDataServer.js'

// блок график
export async function drawWorkTimeChart(chartCtx) {
    let weekAgo = moment().startOf('day').subtract(7 - 1, 'day');
    let dataFromServer = await getDataFromServer(weekAgo);
    let workDurationsByDate = extractWorkDurationsByDate(dataFromServer, weekAgo)
    let chartConfig = convertToChartConfig(workDurationsByDate);
    drawAChart(chartCtx, chartConfig);
}

const dateFormat = 'DD-MM-YYYY';

function extractWorkDurationsByDate(dataFromServer, fromDate) {
    const workDurationsByDate = {};
    const today = moment().startOf('day');
    for (const date = moment(fromDate); date.isSameOrBefore(today); date.add(1, 'day')) {
        workDurationsByDate[date.format(dateFormat)] = 0;
    }
    for (const datum of dataFromServer) {
        const durationSum = moment.duration(0);
        for (const post of datum.posts) {
            durationSum.add(post.time);
        }
        workDurationsByDate[datum.date.format(dateFormat)] = durationSum.asHours();
    }
    return workDurationsByDate;
}

function convertToChartConfig(workDurationsByDate) {
    let workDurations = extractWorkDurationsForChart(workDurationsByDate);
    let weekDays = extractWeekDaysForChart(workDurationsByDate);
    let chartConfig = createChartConfig(weekDays, workDurations);
    return chartConfig;
}

function extractWorkDurationsForChart(workDurationsByDate) {
    return Object.values(workDurationsByDate);
}

function extractWeekDaysForChart(workDurationsByDate) {
    let dates = Object.keys(workDurationsByDate);
    return dates.map(date => moment(date, dateFormat).format('dddd'));
}

function createChartConfig(weekDays, workDurations) {
    let config = {
        type: "bar",
        data: {
            labels: weekDays,
            datasets: [
                {
                    label: "Время обучения по дням",
                    data: workDurations,
                    backgroundColor: [
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 99, 132, 0.2)"
                    ],
                    borderColor: [
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 99, 132, 1)"
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }
    return config;
}

function drawAChart(ctx, config) {
    const myChart = new Chart(ctx, config);
}

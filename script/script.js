// import moment from "moment";

// блок график
export async function drawWorkTimeChart(chartCtx) {
    let dataFromServer = await getDataFromServer();
    let workTimesByDate = convertFromServer(dataFromServer);
    let chartConfig = convertToChartConfig(workTimesByDate);
    drawAChart(chartCtx, chartConfig);
}

async function getDataFromServer() {
    try {
        const response = await fetch('http://localhost:3001/posts');
        const configFromServer = await response.json();
        return configFromServer;
    } catch (error) {
        alert('Извините, произошла ошибка.')
    }
}

function convertFromServer(dataFromServer) {
    let sevenDayAgo = moment().subtract(6, 'days').format("DD/MM/YYYY");
    let accum = {};
    for (let i = dataFromServer.length - 1; i >= 0; i--) {
        let datum = dataFromServer[i];
        if (datum.date < sevenDayAgo) break;
        accum[datum.date] = (accum[datum.date] || 0) + datum.dayTime;
    }
    return accum;
}

function convertToChartConfig(workTimesByDate) {
    let timeArray = extractTimeForChart(workTimesByDate);
    let weekDays = extractWeekDaysForChart(workTimesByDate);
    let chartConfig = createChartConfig(weekDays, timeArray);
    return chartConfig;
}

function extractTimeForChart(accum) {
    let timeArray = Object.values(accum).reverse();
    let newTimeArray = timeArray.map((time) => time / 60);
    return newTimeArray;
}

function extractWeekDaysForChart(accum) {
    let daysArray = Object.keys(accum).reverse();
    let newDaysArray = daysArray.map((date) => moment(date, "DD-MM-YYYY").format('dddd'));
    return newDaysArray;
}

function createChartConfig(daysWeek, timeArray) {
    let config = {
        type: "bar",
        data: {
            labels: daysWeek,
            datasets: [
                {
                    label: "Время обучения по дням",
                    data: timeArray,
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




//блок всплывающее окно
let interval;

function scheduleNotificationShow() {
    interval = setTimeout(showBreakNotification, 5 * 1000);
}

export function onWorkStart() {
    scheduleNotificationShow();
}

export function onWorkStop() {
    clearTimeout(interval);
}



export function showBreakNotification() {
    let body = document.querySelector('body');
    let newElementWindow = createDialogWindow();
    writeDialogWindow(newElementWindow, body);
}

function createDialogWindow() {
    let newElementWindow = document.createElement("dialog");
    return newElementWindow;
}

function writeDialogWindow(newElementWindow, body) {
    newElementWindow.classList.add('container-dialog-window');

    let text = document.createTextNode("Отличная работа! Пора сделать перерыв!");
    newElementWindow.appendChild(text);

    let closeBtn = document.createElement('button');
    closeBtn.innerHTML = 'X';
    closeBtn.classList.add('close-btn');
    closeBtn.addEventListener('click', closeWindow);
    newElementWindow.appendChild(closeBtn);

    body.appendChild(newElementWindow);
    newElementWindow.showModal();
}

function closeWindow() {
    const dialog = document.querySelector('.container-dialog-window');
    dialog.close();

    const body = document.querySelector('body');
    body.removeChild(dialog);

    scheduleNotificationShow();
}


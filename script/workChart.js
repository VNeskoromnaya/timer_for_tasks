import { getDataFromServer } from './getDataServer.js'

// блок график
export async function drawWorkTimeChart(chartCtx) {
    let weekAgo = moment().subtract(1, 'week');
    let newDataFromServer = await getDataFromServer(weekAgo);
    let accum = convertNewData(newDataFromServer)
    let chartConfig = convertToChartConfig(accum);
    drawAChart(chartCtx, chartConfig);
}

function convertNewData(newDataFromServer) {
    console.log('it works');
    let accum = {};
    for (let i = newDataFromServer.length - 1; i >= 0; i--) {
        let datum = newDataFromServer[i];
        const sum = moment.duration(0);
        let date = moment(datum.date).format('DD-MM-YYYY');
        for (let post of datum.posts) {
            sum.add(post.time);
        }
        accum[date] = sum.asHours();
    }
    return accum;
}

function convertToChartConfig(accum) {
    let timeArray = extractTimeForChart(accum);
    let weekDays = extractWeekDaysForChart(accum);
    let chartConfig = createChartConfig(weekDays, timeArray);
    return chartConfig;
}

function extractTimeForChart(accum) {
    return Object.values(accum);
}

function extractWeekDaysForChart(accum) {
    let daysArray = Object.keys(accum);
    return daysArray.map((date) => moment(date, "DD-MM-YYYY").format('dddd'));
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

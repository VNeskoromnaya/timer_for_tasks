// блок график

// import moment from "moment";

export async function mainFunctionChart() {
    let configFromServer = await getDatafromServer();
    let accum = convertFromServer(configFromServer);
    let timeArray = convertTimeToChart(accum);
    let daysWeek = convertDaysweekToChart(accum);
    let config = createConfigOfChart(daysWeek, timeArray);
    const ctx = chartDiv();
    createChart(ctx, config);
}

async function getDatafromServer() {
    try {
        const response = await fetch('http://localhost:3001/posts');
        const configFromServer = await response.json();
        console.log(configFromServer);
        return configFromServer;
    } catch (error) {
        console.log(error);
        alert('Извините, произошла ошибка.')
    }
}

function convertFromServer(configFromServer) {
    let daysSeven = moment().subtract(6, 'days');
    let day = daysSeven.format("DD/MM/YYYY");
    let accum = {};
    let datum;
    for (let i = configFromServer.length - 1; i >= 0; i--) {
        datum = configFromServer[i];
        if (datum.date < day) break;
        accum[datum.date] = (accum[datum.date] || 0) + datum.dayTime;
    }
    return accum;
}

function convertTimeToChart(accum) {
    let timeArray = Object.values(accum).reverse();
    let newTimeArray = timeArray.map((time) => time / 60);
    return newTimeArray;
}

function convertDaysweekToChart(accum) {
    let daysArray = Object.keys(accum).reverse();
    let newDaysArray = daysArray.map((date) => moment(date, "DD-MM-YYYY").format('dddd'));
    return newDaysArray;
    // a = moment('24/10/2022', "DD-MM-YYYY").format('dddd') - 'Monday' так получаем день недели
}


function createConfigOfChart(daysWeek, timeArray) {
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

function chartDiv() {
    const ctx = document.getElementById('myChart');
    return ctx;
}

function createChart(ctx, config) {
    const myChart = new Chart(ctx, config);
}





// const config = JSON.parse(chartJson);
// const ctx = document.getElementById('myChart');

// const myChart = new Chart(ctx, config);



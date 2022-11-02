import moment from 'moment';

export async function getDataFromServer(fromDate) {
    let dataFromServer = await fetchDataFromServer();
    return convertFromServer(dataFromServer, fromDate);
}

const dateFormat = 'DD/MM/YYYY';

async function fetchDataFromServer() {
    try {
        const response = await fetch('http://localhost:3001/data');
        const configFromServer = await response.json();
        return configFromServer;
    } catch (error) {
        alert('Извините, произошла ошибка.')
    }
}

function convertFromServer(dataFromServer, fromDate, toDate) {
    let convertedData = [];
    for (let i = dataFromServer.length - 1; i >= 0; i--) {
        let datum = dataFromServer[i]
        datum.date = moment(datum.date, dateFormat);
        if (fromDate && datum.date.isBefore(fromDate)) break;
        if (toDate && datum.date.isSameOrAfter(toDate)) continue;
        for (let post of datum.posts) {
            post.time = moment.duration(post.time);
        }
        convertedData.push(datum);
    }
    return convertedData.reverse();
}



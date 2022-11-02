export async function getDataFromServer(fromDate) {
    let dataFromServer = await fetchDataFromServer();
    return convertFromServer(dataFromServer, fromDate);
}

async function fetchDataFromServer() {
    try {
        const response = await fetch('http://localhost:3001/data');
        const configFromServer = await response.json();
        return configFromServer;
    } catch (error) {
        alert('Извините, произошла ошибка.')
    }
}

function convertFromServer(dataFromServer, fromDate) {
    let newDataServer = [];
    for (let i = dataFromServer.length - 1; i >= 0; i--) {
        let datum = dataFromServer[i]
        datum.date = moment(datum.date, 'DD-MM-YYYY');
        if ((datum.date).isSameOrBefore(fromDate)) break;
        for (let post of datum.posts) {
            post.time = moment.duration(post.time);
            console.log(post.time);
        }
        newDataServer.push(datum);
    }
    console.log(newDataServer);
    return newDataServer;
}




export async function conversionDataFromServer() {
    let dataFromServer = await getDataFromServer();
    let newDataFromServer = convertFromServer(dataFromServer);
    return newDataFromServer;
}

async function getDataFromServer() {
    try {
        const response = await fetch('http://localhost:3001/data');
        const configFromServer = await response.json();
        return configFromServer;
    } catch (error) {
        alert('Извините, произошла ошибка.')
    }
}

function convertFromServer(dataFromServer) {
    console.log(dataFromServer);
    for (let i = dataFromServer.length - 1; i >= 0; i--) {
        let datum = dataFromServer[i]
        datum.date = moment(datum.date, 'DD-MM-YYYY').format('YYYY-MM-DD');
        console.log(datum.date);
        for (let post of datum.posts) {
            post.time = moment.duration(post.time);
            console.log(post.time);
        }
    }
    return dataFromServer;
}



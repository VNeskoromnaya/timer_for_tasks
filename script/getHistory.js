export async function getHistory() {
    const response = await fetch('http://localhost:3001/posts')
    const data = await response.json()
    getData(data);
    getTotalHours(data);
}

function getData(data) {
    const container = document.querySelector('#history');

    data.forEach(item => {
        const title = item.date
        const div = document.createElement('div')
        div.classList.add('history_date')
        div.innerHTML = title
        let postTemplate = ''
        let postTime = ''
        let numTime = 0
        item.posts.forEach((post) => {
            const template = `<div class="history_container"><p>${post.task}</p><p>${post.time}</p></div><hr>`
            postTemplate += template
            postTime += post.time
            let timeParts = post.time.split(":");
            let hours = Number(timeParts[0]);
            let minutes = Number(timeParts[1]);
            let seconds = Number(timeParts[2]);
            numTime += hours * 3600 + minutes * 60 + seconds
            numTimeMin = Math.round(numTime / 3600)
        })
        const postsDiv = document.createElement('div')
        postsDiv.innerHTML = postTemplate
        const timeDiv = document.createElement('div')
        timeDiv.innerHTML = postTime
        container.append(div)
        div.append(postsDiv)
        const span = document.createElement('span')
        span.classList.add('histopy_sum')
        span.innerHTML = numTimeMin
        container.append(div)
        div.append(span)
    })
}
export async function getAPI() {
    const response = await fetch("https://api.adviceslip.com/advice")
    const data = await response.json()
    getA(data)
}

function getA(slip) {
    document.getElementById('slaid1_phrase').innerText = slip.slip.advice;
}
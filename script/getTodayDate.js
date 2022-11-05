export function getTodayDate() {
    const now = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[now.getMonth()];
    document.getElementById('slaid1_today').innerHTML = `${now.getDate()} ${month} ${now.getFullYear()}`;
}
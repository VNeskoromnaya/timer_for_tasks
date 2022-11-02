import { showBreakNotification } from './dialogWindow.js'

let interval;

export function scheduleNotificationShow() {
    interval = setTimeout(showBreakNotification, 5 * 1000);
}

export function onWorkStart() {
    scheduleNotificationShow();
}

export function onWorkStop() {
    clearTimeout(interval);
}

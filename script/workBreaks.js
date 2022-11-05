import { showDialogWindow } from './dialogWindow.js'

let timeoutId;

export function scheduleNotificationShow() {
    const notificationText = "Отличная работа! Пора сделать перерыв!";
    const notificationTimeout = 30 * 60 * 1000;
    timeoutId = setTimeout(() => showDialogWindow(notificationText), notificationTimeout);
}

export function onWorkStart() {
    scheduleNotificationShow();
}

export function onWorkStop() {
    clearTimeout(timeoutId);
}

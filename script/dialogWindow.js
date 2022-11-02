
import { scheduleNotificationShow } from './workBreaks.js'

export function showBreakNotification() {
    let body = document.querySelector('body');
    let newElementWindow = createDialogWindow();
    writeDialogWindow(newElementWindow, body);
}

function createDialogWindow() {
    let newElementWindow = document.createElement("dialog");
    return newElementWindow;
}

function writeDialogWindow(newElementWindow, body) {
    newElementWindow.classList.add('container-dialog-window');

    let text = document.createTextNode("Отличная работа! Пора сделать перерыв!");
    newElementWindow.appendChild(text);

    let closeBtn = document.createElement('button');
    closeBtn.innerHTML = 'X';
    closeBtn.classList.add('close-btn');
    closeBtn.addEventListener('click', closeWindow);
    newElementWindow.appendChild(closeBtn);

    body.appendChild(newElementWindow);
    newElementWindow.showModal();
}

function closeWindow() {
    const dialog = document.querySelector('.container-dialog-window');
    dialog.close();

    const body = document.querySelector('body');
    body.removeChild(dialog);

    scheduleNotificationShow();
}

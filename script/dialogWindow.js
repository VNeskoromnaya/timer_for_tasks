
import { scheduleNotificationShow } from './workBreaks.js'

export function showDialogWindow(text) {
    let body = document.querySelector('body');
    let newElementWindow = createDialogWindow();
    writeDialogWindow(newElementWindow, body, text);
}

function createDialogWindow() {
    let newElementWindow = document.createElement("dialog");
    return newElementWindow;
}

function writeDialogWindow(newElementWindow, body, text) {
    newElementWindow.classList.add('container-dialog-window');

    let textNode = document.createTextNode(text);
    newElementWindow.appendChild(textNode);

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

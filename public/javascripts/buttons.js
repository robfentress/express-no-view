const clickBtn = document.querySelectorAll(".btn.click");
const upBtn = document.querySelectorAll(".btn.up");
const downBtn = document.querySelectorAll(".btn.down");
const upDownBtn = document.querySelectorAll(".btn.upDown");
const pressBtn = document.querySelectorAll(".btn.press");

for (let i = 0; i < clickBtn.length; i++) {
    clickBtn[i].addEventListener('click', activateActionButton);
    //   let isBtnElement = btn[i] instanceof HTMLButtonElement;
    //   if (isBtnElement) {
    //     btn[i].addEventListener('keydown', actionButtonKeydownHandler);
    //     btn[i].addEventListener('keyup', actionButtonKeyupHandler);
    //   }
}

function activateActionButton() {
    alert("button activated");
}

/**
 * Activates the action button with the enter key.
 *
 * @param {KeyboardEvent} event
 */
function actionButtonKeydownHandler(event) {
    // The action button is activated by space on the keyup event, but the
    // default action for space is already triggered on keydown. It needs to be
    // prevented to stop scrolling the page before activating the button.
    if (event.keyCode === 32) {
        event.preventDefault();
    }
    // If enter is pressed, activate the button
    else if (event.keyCode === 13) {
        event.preventDefault();
        activateActionButton();
    }
}

/**
 * Activates the action button with the space key.
 *
 * @param {KeyboardEvent} event
 */
function actionButtonKeyupHandler(event) {
    if (event.keyCode === 32) {
        event.preventDefault();
        activateActionButton();
    }
}
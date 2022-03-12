/**
 * The keycode for the Enter key
 * @type {number}
 * @const
 */
const ENTER = 13;

/**
 * The keycode for the Spacebar key
 * @type {number}
 * @const
 */
const SPACE = 32;

const keydownEnterActivateBtn = document.querySelectorAll('[data-keydown-enter-activate]');

const keydownSpaceActivateBtn = document.querySelectorAll('[data-keydown-space-activate]');

const keydownSpacePreventDefaultBtn = document.querySelectorAll('[data-keydown-space-prevent-default]');

const keyupEnterBtn = document.querySelectorAll('[data-keyupEnter]');

const keydownEnterPreventDefaultBtn = document.querySelectorAll('[data-keydown-enter-prevent-default]');

const keyupSpaceActivateBtn = document.querySelectorAll('[data-keyup-space-activate]');

const keyupSpacePreventDefaultActivateBtn = document.querySelectorAll('[data-keyup-space-prevent-default-activate]');

const mousedownActivateBtn = document.querySelectorAll('[data-mousedown-activate]');

const mouseupActivateBtn = document.querySelectorAll('[data-mouseup-activate]');

const clickActivateBtn = document.querySelectorAll('[data-click-activate]');

const clickPreventDefaultActivateBtn = document.querySelectorAll('[data-click-prevent-default-activate]');

addEventListeners();

/**
 * Activates button, displaying an alert.
 *
 * @param {(MouseEvent|PointerEvent)} [event]
 */
function activateButton(event) {
    if (event) console.log(event);
    alert("button activated");
}

/**
 * Adds event listeners to all the NodeLists we've created.
 */
function addEventListeners() {

    for (let i = 0; i < keydownEnterActivateBtn.length; i++) {
        keydownEnterActivateBtn[i].addEventListener('keydown', keydownEnterActivate);
    }
    for (let i = 0; i < keydownSpaceActivateBtn.length; i++) {
        keydownSpaceActivateBtn[i].addEventListener('keydown', keydownSpaceActivate);
    }
    for (let i = 0; i < keydownSpacePreventDefaultBtn.length; i++) {
        keydownSpacePreventDefaultBtn[i].addEventListener('keydown', keydownSpacePreventDefault);
    }
    for (let i = 0; i < keyupEnterBtn.length; i++) {
        keyupEnterBtn[i].addEventListener('keydown', keyupEnterActivate);
    }
    for (let i = 0; i < keydownEnterPreventDefaultBtn.length; i++) {
        keydownEnterPreventDefaultBtn[i].addEventListener('keydown', keydownEnterPreventDefaultActivate);
    }
    for (let i = 0; i < keyupSpaceActivateBtn.length; i++) {
        keyupSpaceActivateBtn[i].addEventListener('keyup', keyupSpaceActivate);
    }
    for (let i = 0; i < keyupSpacePreventDefaultActivateBtn.length; i++) {
        keyupSpacePreventDefaultActivateBtn[i].addEventListener('keyup', keyupSpacePreventDefaultActivate);
    }
    for (let i = 0; i < mousedownActivateBtn.length; i++) {
        mousedownActivateBtn[i].addEventListener('mousedown', activateButton);
    }
    for (let i = 0; i < mouseupActivateBtn.length; i++) {
        mouseupActivateBtn[i].addEventListener('mouseup', activateButton);
    }
    for (let i = 0; i < clickActivateBtn.length; i++) {
        clickActivateBtn[i].addEventListener('click', activateButton);
    }
    for (let i = 0; i < clickPreventDefaultActivateBtn.length; i++) {
        clickPreventDefaultActivateBtn[i].addEventListener('click', clickPreventDefaultActivate);
    }
}


/**
 * Prevents default click behavior and instead activates button.
 *
 * @param {PointerEvent} event
 */
function clickPreventDefaultActivate(event) {
    console.log(event);
    event.preventDefault();
    activateButton();
}


/**
 * Activates button in response to Enter keydown.
 *
 * @param {KeyboardEvent} event
 */
function keydownEnterActivate(event) {
    console.log(event);
    // If enter is pressed, activate the button
    if (event.keyCode === ENTER) {
        activateButton();
    }
}

/**
 * Prevents default Enter keydown behavior and instead activates button.
 *
 * @param {KeyboardEvent} event
 */
function keydownEnterPreventDefaultActivate(event) {
    console.log(event);
    // If enter is pressed, activate the button
    if (event.keyCode === ENTER) {
        event.preventDefault();
        activateButton();
    }
}

/**
 * Activates button in response to Spacebar keydown event.
 *
 * @param {KeyboardEvent} event
 */
function keydownSpaceActivate(event) {
    console.log(event);
    // If spacebar is pressed, activate the button
    if (event.keyCode === SPACE) {
        activateButton();
    }
}

/**
 * Prevents default Spacebar keydown event.
 *
 * @param {KeyboardEvent} event
 */
function keydownSpacePreventDefault(event) {
    console.log(event);
    // If spacebar is pressed, activate the button
    if (event.keyCode === SPACE) {
        event.preventDefault();
    }
}

/**
 * Prevents default Spacebar keydown behavior.
 *
 * @param {KeyboardEvent} event
 */
function keyupSpacePreventDefault(event) {
    console.log(event);
    // If spacebar is pressed, activate the button
    if (event.keyCode === SPACE) {
        event.preventDefault();
    }
}

/**
 * Prevents default Spacebar keyup behavior and instead activates button.
 *
 * @param {KeyboardEvent} event
 */
function keyupSpacePreventDefaultActivate(event) {
    console.log(event);
    // If spacebar is pressed, activate the button
    if (event.keyCode === SPACE) {
        event.preventDefault();
        activateButton();
    }
}

/**
 * Activates button in response to Enter keyup event.
 *
 * @param {KeyboardEvent} event
 */
function keyupEnterActivate(event) {
    console.log(event);
    // If enter is pressed, activate the button
    if (event.keyCode === ENTER) {
        activateButton();
    }
}

/**
 * Activates button in response to Spacebar keyup event.
 *
 * @param {KeyboardEvent} event
 */
function keyupSpaceActivate(event) {
    console.log(event);
    // If spacebar is pressed, activate the button
    if (event.keyCode === SPACE) {
        activateButton();
    }
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
        activateButton();
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
        activateButton();
    }
}
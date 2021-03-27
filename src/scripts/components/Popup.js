import { ESC_KEYCODE } from '../utils/constants.js';

export default class Popup {
    constructor(popupSelector) {
        this.popupSelector = popupSelector;
    }

    open() {
        this.popupSelector.classList.add('popup_opened');
        this._handleEscClose();
    }

    close() {
        this.popupSelector.classList.remove('popup_opened');
    }

    _handleEscClose() {
        document.addEventListener('keydown', (evt) => {
            if (evt.key === ESC_KEYCODE) {
                this.close(this.popupSelector);
            }
        });
    }

    setEventListeners() {
        this.popupSelector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
                this.close(this.popupSelector);
            }
        })
    }
}
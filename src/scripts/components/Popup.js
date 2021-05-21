import { escKeycode } from '../utils/constants.js';

export default class Popup {
    constructor(popupSelector) {
        this.popupSelector = popupSelector;
    }

    open() {
        this.popupSelector.classList.add('popup_opened');
        this._handleEcsClose();
    }

    close() {
        this.popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEcsClose)
    }

    _handleEcsClose() {
        document.addEventListener('keydown', evt => {
            if (evt.key === escKeycode) {
                this.close();
            }
        })
    }

    setEventListeners() {
        this.popupSelector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
                this.close(this.popupSelector);
            }
        })
    }
}
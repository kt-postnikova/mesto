import { closeEditProfileBtn } from '../utils/constants.js';

export default class Popup {
    constructor(popupSelector) {
        this.popupSelector = popupSelector;
    }

    open() {
        this.popupSelector.classList.add('popup_opened');
        this._handleEscClose(this.popupSelector)
    }

    close() {
        this.popupSelector.classList.remove('popup_opened');
    }

    _handleEscClose() {
        const activePopup = document.querySelector('.popup_opened');
        document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape') {
                this.close();
            }
        })
    }

    setEventListeners() {
        closeEditProfileBtn.addEventListener('click', () => {
            this.close()
        })
    }
}
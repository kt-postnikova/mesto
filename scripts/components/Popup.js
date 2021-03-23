export default class Popup {
    constructor(popupSelector) {
        this.popupSelector = popupSelector;
    }

    open() {
        this.popupSelector.classList.add('popup_opened');
        this._handleEscClose();
        const overlay = this.popupSelector.querySelector('.popup__overlay');
        overlay.addEventListener('click', () => {
            this.close(this.popupSelector);
        })
    }

    close() {
        this.popupSelector.classList.remove('popup_opened');
    }

    _handleEscClose() {
        document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape') {
                this.close(this.popupSelector);
            }
        });
    }

    setEventListeners() {
        this.popupSelector.querySelector('.popup__close').addEventListener('click', () => {
            this.close(this.popupSelector);
        })
    }
}
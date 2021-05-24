export default class Popup {
    constructor(popupSelector) {
        this.popupSelector = popupSelector;

        this._handleEcsClose = this._handleEcsClose.bind(this);
    }

    open() {
        this.popupSelector.classList.add('popup_opened');

        document.addEventListener('keydown', this._handleEcsClose);
    }

    close() {
        this.popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEcsClose)
    }

    _handleEcsClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this.popupSelector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
                this.close(this.popupSelector);
            }
        })
    }
}
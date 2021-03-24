import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(item) {
        super.open();

        this.popupSelector.querySelector('.popup__image').src = item.link;
        this.popupSelector.querySelector('.popup__caption').textContent = item.name;
        this.popupSelector.classList.add('popup_opened');
        this._handleEscClose(this.popupSelector)
    }
}
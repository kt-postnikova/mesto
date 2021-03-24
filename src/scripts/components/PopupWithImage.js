import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(item) {
        super.open();
        const popupImage = this.popupSelector.querySelector('.popup__image');
        const popupCaption = this.popupSelector.querySelector('.popup__caption');

        popupImage.src = item.link;
        popupImage.alt = item.name;
        popupCaption.textContent = item.name;
        this._handleEscClose(this.popupSelector)
    }
}
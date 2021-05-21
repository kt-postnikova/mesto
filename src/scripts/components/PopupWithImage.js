import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this.popupCaption = this.popupSelector.querySelector('.popup__caption');
        this.popupImage = this.popupSelector.querySelector('.popup__image');
    }

    open(cardData) {
        super.open();
        this.popupImage.src = cardData.link;
        this.popupImage.alt = cardData.name;
        this.popupCaption.textContent = cardData.name;
    }
}
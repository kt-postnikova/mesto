import { popupCaption, popupImage } from "../utils/constants.js";
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(cardData) {
        super.open();
        popupImage.src = cardData.link;
        popupCaption.textContent = cardData.name;
    }
}
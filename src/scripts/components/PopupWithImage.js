import { POPUP_CAPTION, POPUP_IMAGE } from "../utils/constants.js";
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(cardData) {
        super.open();
        POPUP_IMAGE.src = cardData.link;
        POPUP_CAPTION.textContent = cardData.name;
    }
}
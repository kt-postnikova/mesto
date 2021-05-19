import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, popupForm) {
        super(popupSelector);
        this.popupForm = popupForm;
    }

    setEventListeners() {
        super.setEventListeners();
        this.popupForm.addEventListener('submit', evt => {
            evt.preventDefault();
            this.handleSubmit();
        })
    }

    setSubmitAction(action) {
        this.handleSubmit = action;
    }
}
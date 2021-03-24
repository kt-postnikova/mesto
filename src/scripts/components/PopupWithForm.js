import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, formSelector, submitForm }) {
        super(popupSelector);
        this.submitForm = submitForm;
        this.form = formSelector;
    }

    _getInputValues() {
        this.inputList = Array.from(this.form.querySelectorAll('.form__input'));
        const inputInfo = {};

        this.inputList.forEach((input) => {
            inputInfo[input.name] = input.value
        })

        return inputInfo
    }

    setEventListeners() {
        super.setEventListeners();
        this.form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.submitForm(this._getInputValues());
        });
    }

    close() {
        super.close();
        this.form.reset()
    }
}
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, popupForm, { submitForm }) {
        super(popupSelector);
        this.popupForm = popupForm;
        this.submitForm = submitForm;
    }

    _getInputsValues() {
        this.inputList = Array.from(this.popupForm.querySelectorAll('.form__input'));
        const inputInfo = {};

        this.inputList.forEach(input => {
            inputInfo[input.name] = input.value
        })

        return inputInfo;
    }

    setEventListeners() {
        super.setEventListeners();

        this.popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const inputValues = this._getInputsValues();
            this.submitForm(inputValues);
        })
    }

    close() {
        super.close();
        this.popupForm.reset();
    }
}
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, popupForm, { submitForm }) {
        super(popupSelector);
        this.popupForm = popupForm;
        this.submitForm = submitForm;
    }

    _getInputsValues() {
        this.inputList = Array.from(this.popupForm.querySelectorAll('.form__input'));
        const INPUT_INFO = {};

        this.inputList.forEach(input => {
            INPUT_INFO[input.name] = input.value
        })

        return INPUT_INFO;
    }

    setEventListeners() {
        super.setEventListeners();

        this.popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const INPUTS_VALUES = this._getInputsValues();
            this.submitForm(INPUTS_VALUES);
        })
    }

    close() {
        super.close();
        this.popupForm.reset();
    }
}
export default class FormValidator {
    constructor(selectors) {
        this.formElement = selectors['formElement'];
        this.inputElement = selectors['inputElement'];
        this.buttonElement = selectors['buttonElement'];
        this.formInputError = selectors['formInputError'];
        this.formInputErrorMessage = selectors['formInputErrorMessage'];
        this.formButtonInactive = selectors['formButtonInactive'];
    }

    showInputError(form, input) {
        const errorElement = form.querySelector(`.${input.id}-error`);
        input.classList.add(this.formInputError);
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(this.formInputErrorMessage);
    };

    hideInputError(form, input) {
        const errorElement = form.querySelector(`.${input.id}-error`);
        input.classList.remove(this.formInputError);
        errorElement.classList.remove(this.formInputErrorMessage);
        errorElement.textContent = '';
    };

    _checkInputValidity(form, input) {
        if (!input.validity.valid) {
            this.showInputError(form, input, input.validationMessage);
        }
        else {
            this.hideInputError(form, input);
        }
    };

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _toggleButtonState(inputList, buttonElement) {
        if (!this._hasInvalidInput(inputList)) {
            buttonElement.classList.remove(this.formButtonInactive);
            buttonElement.removeAttribute('disabled');
        }
        else {
            buttonElement.setAttribute('disabled', true);
            buttonElement.classList.add(this.formButtonInactive);
        }
    }

    _setEventListeners(form) {
        const inputList = Array.from(form.querySelectorAll(this.inputElement));
        const buttonElement = form.querySelector(this.buttonElement);
    
        inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(form, input);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };

    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this.formElement));
    
        formList.forEach((form) => {
            form.addEventListener('submit', function (evt) {
                evt.preventDefault();
            });
    
            this._setEventListeners(form);
        });
    };
}

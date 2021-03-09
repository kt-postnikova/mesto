export default class FormValidator {
    constructor(form) {
        this.inputElement = '.form__input';
        this.buttonElement = '.form__button';
        this.formInputError = 'form__input_error-line';
        this.formInputErrorMessage = 'form__input_error-message';
        this.formButtonInactive = 'form__button_inactive';
        this._form = form
    }

    _showInputError(form, input) {
        const errorElement = form.querySelector(`.${input.id}-error`);
        input.classList.add(this.formInputError);
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(this.formInputErrorMessage);
    };

    _hideInputError(form, input) {
        const errorElement = form.querySelector(`.${input.id}-error`);
        input.classList.remove(this.formInputError);
        errorElement.classList.remove(this.formInputErrorMessage);
        errorElement.textContent = '';
    };

    _checkInputValidity(form, input) {
        if (!input.validity.valid) {
            this._showInputError(form, input, input.validationMessage);
        }
        else {
            this._hideInputError(form, input);
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
        this._form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        this._setEventListeners(this._form);
    };
}

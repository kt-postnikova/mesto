export default class FormValidator {
    constructor(form) {
        this.formSelector = '.form';
        this.inputSelector = '.form__input';
        this.buttonSelector = '.form__button';
        this.inactiveButton = 'form__button_inactive';
        this.inputError = 'form__input_error-line';
        this.errorMessageStyle = 'form__input_error-message';
        this.form = form;
    }

    showError = (formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add(this.inputError);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.errorMessageStyle);
    }

    hideError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(this.inputError);
        errorElement.textContent = '';
        errorElement.classList.remove(this.errorMessageStyle);
    }

    checkValid = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            this.showError(formElement, inputElement, inputElement.validationMessage);
        }
        else {
            this.hideError(formElement, inputElement);
        }
    }

    hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid
        })
    }

    toggleButtonState = (inputList, buttonElement) => {
        if (this.hasInvalidInput(inputList)) {
            buttonElement.classList.add(this.inactiveButton);
        }
        else {
            buttonElement.classList.remove(this.inactiveButton);
        }
    }

    setEventListeners = (formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(this.inputSelector));
        const buttonElement = formElement.querySelector(this.buttonSelector);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this.checkValid(formElement, inputElement);

                this.toggleButtonState(inputList, buttonElement)
            })
        })
    }

    enableValidation = () => {
        this.form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        this.setEventListeners(this.form);
    }
}

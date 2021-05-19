export default class FormValidator {
    constructor(data, formElement) {
        this.formSelector = data.formSelector;
        this.inputSelector = data.inputSelector;
        this.buttonSelector = data.buttonSelector;
        this.inactiveButton = data.inactiveButton;
        this.inputError = data.inputError;
        this.errorMessageStyle = data.errorMessageStyle;
        this.formElement = formElement;

        this.inputList = Array.from(this.formElement.querySelectorAll(this.inputSelector));
        this.buttonElement = this.formElement.querySelector(this.buttonSelector);
    }

    showError(inputElement, errorMessage) {
        const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.inputError);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.errorMessageStyle);
    }

    hideError(inputElement) {
        const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(this.inputError);
        errorElement.textContent = ' ';
        errorElement.classList.remove(this.errorMessageStyle);
    }

    checkValid(inputElement) {
        if (!inputElement.validity.valid) {
            this.showError(inputElement, inputElement.validationMessage);
        }
        else {
            this.hideError(inputElement);
        }
    }

    hasInvalidInput(inputList) {
        return inputList.some(inputElement => {
            return !inputElement.validity.valid
        })
    }

    toggleButtonState(inputList) {
        if (this.hasInvalidInput(inputList)) {
            this.disableSubmitButton()
        }
        else {
            this.enableSubmitButton();
        }
    }

    setEventListeners() {
        this.inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this.checkValid(inputElement);

                this.toggleButtonState(this.inputList, this.buttonElement)
            })
        })
    }

    removeErrors() {
        this.inputList.forEach(inputElement => {
            this.hideError(inputElement)
        })
    }

    disableSubmitButton() {
        this.buttonElement.classList.add(this.inactiveButton)
        this.buttonElement.disbaled = true;
    }

    enableSubmitButton() {
        this.buttonElement.classList.remove(this.inactiveButton)
        this.buttonElement.disbaled = false;
    }

    enableValidation() {
        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        this.setEventListeners();
    }
}
class FormValidator {
    constructor() {
        this.formElement = formElement;
        this.inputElement = inputElement;
        this.errorMessage = errorMessage;
        this.buttonElement = buttonElement;
    }

    showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = this.formElement.querySelector(`.${this.inputElement.id}-error`);
        this.inputElement.classList.add('form__input_error-line');
        errorElement.textContent = this.errorMessage;
        errorElement.classList.add('form__input_error-message');
    };

    hideInputError = (formElement, inputElement, selectorsObject) => {
        const errorElement = this.formElement.querySelector(`.${this.inputElement.id}-error`);
        this.inputElement.classList.remove('form__input_error-line');
        errorElement.classList.remove('form__input_error-message');
        errorElement.textContent = '';
    };

    checkInputValidity = (formElement, inputElement, selectorsObject) => {
        if (!this.inputElement.validity.valid) {
            showInputError(this.formElement, this.inputElement, this.inputElement.validationMessage);
        }
        else {
            hideInputError(this.formElement, this.inputElement);
        }
    };

    hasInvalidInput = (inputList) => {
        return this.inputList.some((inputElement) => {
            return !this.inputElement.validity.valid;
        });
    };

    toggleButtonState = (inputList, buttonElement, selectorsObject) => {
        if (!this.hasInvalidInput(this.inputList)) {
            this.buttonElement.classList.remove('form__button_inactive');
            this.buttonElement.removeAttribute('disabled');
        }
        else {
            this.buttonElement.setAttribute('disabled', true);
            this.buttonElement.classList.add('form__button_inactive');
        }
    }

    disableSubmit = (buttonElement) => {
        this.buttonElement.classList.add('form__button_inactive');
        this.buttonElement.setAttribute('disabled', true);
    }

    setEventListeners = (formElement, selectorsObject) => {
        const inputList = Array.from(this.formElement.querySelectorAll('.form__input'));
        const buttonElement = this.formElement.querySelector('.form__button');
    
        inputList.forEach((inputElement) => {
            this.inputElement.addEventListener('input', function () {
                checkInputValidity(this.formElement, this.inputElement,);
                toggleButtonState(inputList, buttonElement);
            });
        });
    };

    enableValidation = () => {
        const formList = Array.from(document.querySelectorAll('.form'));
    
        formList.forEach((formElement) => {
            this.formElement.addEventListener('submit', function (evt) {
                evt.preventDefault();
            });
    
            setEventListeners(this.formElement);
    
        });
    };
}

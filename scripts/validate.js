selectors = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__input_error-line',
    errorClass: 'form__input_error-message'
};

const showInputError = (formElement, inputElement, errorMessage, selectorsObject) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(selectorsObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectorsObject.errorClass);
};

const hideInputError = (formElement, inputElement, selectorsObject) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectorsObject.inputErrorClass);
    errorElement.classList.remove(selectorsObject.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, selectorsObject) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, selectorsObject);
    }
    else {
        hideInputError(formElement, inputElement, selectorsObject);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, selectorsObject) => {
    console.log(hasInvalidInput(inputList));
    if (!hasInvalidInput(inputList)) {
        buttonElement.classList.remove(selectorsObject.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
    else {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(selectorsObject.inactiveButtonClass);
    }
}

const disableSubmit = (element) => {
    element.classList.add(selectors['inactiveButtonClass']);
    buttonElement.setAttribute('disabled', true);
}

const setEventListeners = (formElement, selectorsObject) => {
    const inputList = Array.from(formElement.querySelectorAll(selectorsObject.inputSelector));
    const buttonElement = formElement.querySelector(selectorsObject.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, selectorsObject);
            toggleButtonState(inputList, buttonElement, selectorsObject);
        });
    });
};

const enableValidation = (selectorsObject) => {
    const formList = Array.from(document.querySelectorAll(selectorsObject.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(formElement, selectorsObject);

    });
};

enableValidation(selectors);
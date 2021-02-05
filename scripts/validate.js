const formEditProfile = document.forms.formEditProfile;
const formAddPlace = document.forms.formAddPlace;

const name = formEditProfile.elements.name;
const job = formEditProfile.elements.job;

const title = formAddPlace.elements.title;
const link = formAddPlace.elements.link;

const overlayEditProfile = document.querySelector('.popup__overlay');
const overlayAddPlace = document.querySelector('.popup__overlay_type_add-place');
const overlayShowImage = document.querySelector('.popup__overlay_type_show-image');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddPlace = document.querySelector('.popup_type_add-place');
const popupShowImage = document.querySelector('.popup_type_show-image');

selectors = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__input_error-line',
    errorClass: 'form__input_error-message'
};

const showInputError = (formElement, inputElement, errorMessage, selectorsObj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(selectorsObj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectorsObj.errorClass);
};

const hideInputError = (formElement, inputElement, selectorsObj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectorsObj.inputErrorClass);
    errorElement.classList.remove(selectorsObj.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, selectorsObj) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, selectorsObj);
    }
    else {
        hideInputError(formElement, inputElement, selectorsObj);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, selectorsObj) => {
    console.log(hasInvalidInput(inputList));
    if (!hasInvalidInput(inputList)) {
        buttonElement.classList.remove(selectorsObj.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
    else {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(selectorsObj.inactiveButtonClass);
    }
}

const disableSubmit = (element) => {
    element.classList.add(selectors['inactiveButtonClass']);
    buttonElement.setAttribute('disabled', true);
}

const setEventListeners = (formElement, selectorsObj) => {
    const inputList = Array.from(formElement.querySelectorAll(selectorsObj.inputSelector));
    const buttonElement = formElement.querySelector(selectorsObj.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, selectorsObj);
            toggleButtonState(inputList, buttonElement, selectorsObj);
        });
    });
};

const enableValidation = (selectorsObj) => {
    const formList = Array.from(document.querySelectorAll(selectorsObj.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(formElement, selectorsObj);

    });
};

enableValidation(selectors);

const closePopupByEsc = () => {
    const popupList = Array.from(document.querySelectorAll('.popup'));

    popupList.forEach(function (popupElement) {

        document.addEventListener('keydown', function (evt) {
            if (evt.key === 'Escape') {
                closePopup(popupElement);
            }
        })
    })
}


const closePopupByOverlayClick = (overlayElement, popupElement) => {
    const overlayList = Array.from(document.querySelectorAll('.popup__overlay'));

    overlayList.forEach(function () {
        overlayElement.addEventListener('mousedown', function () {
            closePopup(popupElement);
        })
    })
}

const closeObjList = [
    {
        overlay: overlayEditProfile,
        popup: popupEditProfile,
    },
    {
        overlay: overlayAddPlace,
        popup: popupAddPlace,
    },
    {
        overlay: overlayShowImage,
        popup: popupShowImage,
    }
]

for (const closeObj of closeObjList) {
    closePopupByEsc(closeObj.popup)
    closePopupByOverlayClick(closeObj.overlay, closeObj.popup)
}
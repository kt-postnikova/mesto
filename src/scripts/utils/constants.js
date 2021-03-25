export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const validation = {
    formSelector: '.form',
    inputSelector: '.form__input',
    buttonSelector: '.form__button',
    inactiveButton: 'form__button_inactive',
    inputError: 'form__input_error-line',
    errorMessage: 'form__input_error-message'
}

export const profileButton = document.querySelector('.profile__button');
export const addCardButton = document.querySelector('.profile__add-button');

export const editPopup = document.querySelector('.popup_type_edit-profile');
export const addCardPopup = document.querySelector('.popup_type_add-place');
export const showImagePopup = document.querySelector('.popup_type_show-image');

export const closeEdit = editPopup.querySelector('.popup__close');
export const closeAddCard = addCardPopup.querySelector('.popup__close');
export const closeShowImage = showImagePopup.querySelector('.popup__close');

export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');

export const inputName = editPopup.querySelector('.form__input_type_name');
export const inputJob = editPopup.querySelector('.form__input_type_job');
export const inputCardName = addCardPopup.querySelector('.form__input_type_title');
export const inputCardLink = addCardPopup.querySelector('.form__input_type_link');

export const formEditProfile = editPopup.querySelector('.form');
export const formAddCard = addCardPopup.querySelector('.form');

export const cardContainer = '.elements';

export const ESC_KEYCODE = 'Escape';
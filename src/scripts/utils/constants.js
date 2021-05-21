/* Popups */
export const popupUserInfo = document.querySelector('.popup_user-info');
export const popupAddCard = document.querySelector('.popup_add-card');
export const popupShowImage = document.querySelector('.popup_show-image');
export const popupDeleteCard = document.querySelector('.popup_delete-card');
export const popupEditAvatar = document.querySelector('.popup_edit-avatar');
export const popupImage = popupShowImage.querySelector('.popup__image');
export const popupCaption = popupShowImage.querySelector('.popup__caption');

/* Buttons */
export const buttonUserInfo = document.querySelector('.profile__button');
export const buttonAddCard = document.querySelector('.profile__add-button');
export const buttonEditAvatar = document.querySelector('.avatar__overlay');

/* Elements */
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
export const profileAvatar = document.querySelector('.avatar__image');
export const cardContainer = '.elements';
export const cardTemplate = document.querySelector('#template-element');

/* Forms */
export const formUserInfo = popupUserInfo.querySelector('.form');
export const formAddCard = popupAddCard.querySelector('.form');
export const formDeleteCard = popupDeleteCard.querySelector('form');
export const formEditAvatar = popupEditAvatar.querySelector('.form');

/* Inputs */
export const inputName = formUserInfo.querySelector('.form__input_type_name');
export const inputAbout = formUserInfo.querySelector('.form__input_type_about');
export const inputTitle = formAddCard.querySelector('.form__input_type_title');
export const inputLink = formAddCard.querySelector('.form__input_type_link');
export const inputAvatar = formEditAvatar.querySelector('.form__input_type_avatar');

export const escKeycode = 'Escape';

export const validation = {
    formSelector: '.form',
    inputSelector: '.form__input',
    buttonSelector: '.form__button',
    inactiveButton: 'form__button_inactive',
    inputError: 'form__input_error-line',
    errorMessageStyle: 'form__input_error-message'
}
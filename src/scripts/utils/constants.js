/* Popups */
export const POPUP_USER_INFO = document.querySelector('.popup_user-info');
export const POPUP_ADD_CARD = document.querySelector('.popup_add-card');
export const POPUP_SHOW_IMAGE = document.querySelector('.popup_show-image');
export const POPUP_DELETE_CARD = document.querySelector('.popup_delete-card');
export const POPUP_EDIT_AVATAR = document.querySelector('.popup_edit-avatar');
export const POPUP_IMAGE = POPUP_SHOW_IMAGE.querySelector('.popup__image');
export const POPUP_CAPTION = POPUP_SHOW_IMAGE.querySelector('.popup__caption');

/* Buttons */
export const BUTTON_USER_INFO = document.querySelector('.profile__button');
export const BUTTON_ADD_CARD = document.querySelector('.profile__add-button');
export const BUTTON_EDIT_AVATAR = document.querySelector('.avatar__overlay');

/* Elements */
export const PROFILE_NAME = document.querySelector('.profile__name');
export const PROFILE_ABOUT = document.querySelector('.profile__about');
export const PROFILE_AVATAR = document.querySelector('.avatar__image');
export const CARD_CONTAINER = '.elements';
export const CARD_TEMPLATE = document.querySelector('#template-element');

/* Forms */
export const FORM_USER_INFO = POPUP_USER_INFO.querySelector('.form');
export const FORM_ADD_CARD = POPUP_ADD_CARD.querySelector('.form');
export const FORM_DELETE_CARD = POPUP_DELETE_CARD.querySelector('form');
export const FORM_EDIT_AVATAR = POPUP_EDIT_AVATAR.querySelector('.form');

/* Inputs */
export const INPUT_NAME = FORM_USER_INFO.querySelector('.form__input_type_name');
export const INPUT_ABOUT = FORM_USER_INFO.querySelector('.form__input_type_about');
export const INPUT_TITLE = FORM_ADD_CARD.querySelector('.form__input_type_title');
export const INPUT_LINK = FORM_ADD_CARD.querySelector('.form__input_type_link');
export const INPUT_AVATAR = FORM_EDIT_AVATAR.querySelector('.form__input_type_avatar');

export const ESC_KEYCODE = 'Escape';

export const VALIDATION = {
    formSelector: '.form',
    inputSelector: '.form__input',
    buttonSelector: '.form__button',
    inactiveButton: 'form__button_inactive',
    inputError: 'form__input_error-line',
    errorMessageStyle: 'form__input_error-message'
}
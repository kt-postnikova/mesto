export const addCardBtn = document.querySelector('.profile__add-button');
export const editProfileBtn = document.querySelector('.profile__button');

export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');

export const popupInputName = document.querySelector('.form__input_type_name');
export const popupInputJob = document.querySelector('.form__input_type_job');

export const popupAddPlace = document.querySelector('.popup_type_add-place');
export const popupShowImage = document.querySelector('.popup_type_show-image');
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');

export const closeAddPlaceBtn = popupAddPlace.querySelector('.popup__close');
export const closeShowImageBtn = popupShowImage.querySelector('.popup__close');
export const closeEditProfileBtn = popupEditProfile.querySelector('.popup__close');

export const cardContainer = document.querySelector('.elements');

export const formAddPlace = popupAddPlace.querySelector('.form_type_add-place');
export const editForm = popupEditProfile.querySelector('.form');

export const inputTitle = formAddPlace.querySelector('.form__input_type_title');
export const inputLink = formAddPlace.querySelector('.form__input_type_link');

export const TEMPLATE_ELEMENT = '#template-element';

export const selectors = {
    'addCardBtn': addCardBtn,
    'popupAddPlace': popupAddPlace,
    'popupShowImage': popupShowImage,
    'closeAddPlaceBtn': closeAddPlaceBtn,
    'closeShowImageBtn': closeShowImageBtn,
    'cardContainer': cardContainer,
    'formAddPlace': formAddPlace,
    'inputTitle': inputTitle,
    'inputLink': inputLink,
    'editProfileBtn': editProfileBtn,
    'closeEditProfileBtn': closeEditProfileBtn,
    'editForm': editForm,
}

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
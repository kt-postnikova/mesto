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

export const options = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-21',
    headers: {
        authorization: 'b9ddb8ca-c8e3-475f-814b-c43ae8005cc3',
        'Content-Type': 'application/json'
    },
}


export const editPopup = document.querySelector('.popup_type_edit-profile');
export const addCardPopup = document.querySelector('.popup_type_add-place');
export const showImagePopup = document.querySelector('.popup_type_show-image');
export const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
export const confirmDeletePopup = document.querySelector('.popup_type_confirm-delete');

export const profileButton = document.querySelector('.profile__button');
export const addCardButton = document.querySelector('.profile__add-button');
export const avatarButton = document.querySelector('.avatar__overlay');
export const confirmationButton = confirmDeletePopup.querySelector('.form__button');

export const closeEdit = editPopup.querySelector('.popup__close');
export const closeAddCard = addCardPopup.querySelector('.popup__close');
export const closeShowImage = showImagePopup.querySelector('.popup__close');
export const closeConfirm = confirmDeletePopup.querySelector('.popup__close');
export const closeEditAvatar = editAvatarPopup.querySelector('.popup__close');

export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');

export const inputName = editPopup.querySelector('.form__input_type_name');
export const inputJob = editPopup.querySelector('.form__input_type_job');
export const inputCardName = addCardPopup.querySelector('.form__input_type_title');
export const inputCardLink = addCardPopup.querySelector('.form__input_type_link');

export const formEditProfile = editPopup.querySelector('.form');
export const formAddCard = addCardPopup.querySelector('.form');
export const formEditAvatar = editAvatarPopup.querySelector('.form')

export const avatarImage = document.querySelector('.avatar__image');
export const inputAvatar = editAvatarPopup.querySelector('.form__input_type_avatar');

export const cardContainer = '.elements';

export const ESC_KEYCODE = 'Escape';
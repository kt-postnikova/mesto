import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import {openPopup, closePopup} from '../scripts/utilis.js'

const addCardBtn = document.querySelector('.profile__add-button');
const editProfileBtn = document.querySelector('.profile__button');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popupInputName = document.querySelector('.form__input_type_name');
const popupInputJob = document.querySelector('.form__input_type_job');

const popupAddPlace = document.querySelector('.popup_type_add-place');
const popupShowImage = document.querySelector('.popup_type_show-image');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');

const closeAddPlaceBtn = popupAddPlace.querySelector('.popup__close');
const closeShowImageBtn = popupShowImage.querySelector('.popup__close');
const closeEditProfileBtn = popupEditProfile.querySelector('.popup__close');

const cardContainer = document.querySelector('.elements');

const formAddPlace = popupAddPlace.querySelector('.form_type_add-place');
const editForm = popupEditProfile.querySelector('.form');

const inputTitle = formAddPlace.querySelector('.form__input_type_title');
const inputLink = formAddPlace.querySelector('.form__input_type_link');

let selectors = {
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
    'popupShowImage': popupShowImage,
}

const TEMPLATE_ELEMENT = '#template-element';

initialCards.forEach((item) => {
  const newCard = new Card(item, selectors, TEMPLATE_ELEMENT); // заполняем карточки дефолтными значениями
  newCard.appendCard()
})

// function openPopup(popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', closePopupByEsc);
//     overlayHandler(popup, 'add');
// }

// function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', closePopupByEsc);
//     overlayHandler(popup, 'remove');
// }

// function overlayHandler(popup, state) {
//   const activeOverlay = popup.querySelector('.popup__overlay');
//   if( state === 'add') {
//     activeOverlay.addEventListener('mousedown', closePopupByOverlayClick);
//   }
//   else if ( state === 'remove' ) {
//     activeOverlay.removeEventListener('mousedown', closePopupByOverlayClick);
//   }
// }

function addProfileInfo(evt) {
  evt.preventDefault();

  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;

  closePopup(popupEditProfile);
}

function insertProfileValue(evt) {
  evt.preventDefault();

  popupInputName.value = profileName.innerText;
  popupInputJob.value = profileJob.innerText;
}

// function closePopupByEsc(evt) {
//   const activePopup = document.querySelector('.popup_opened');
//   if (evt.key === 'Escape') {
//     closePopup(activePopup);
//   }
// }

// function closePopupByOverlayClick() {
//   const activePopup = document.querySelector('.popup_opened');
//   closePopup(activePopup); 
// }

// const closeObjectList = [
//   {
//       overlay: overlayEditProfile,
//       popup: popupEditProfile,
//   },
//   {
//       overlay: overlayAddPlace,
//       popup: popupAddPlace,
//   },
//   {
//       overlay: overlayShowImage,
//       popup: popupShowImage,
//   }
// ]

// for (const closeObj of closeObjectList) {
//   closePopupByEsc(closeObj.popup)
// }

const selectorsValidate = {
  formElement: '.form',
  inputElement: '.form__input',
  buttonElement: '.form__button',
  formInputError: 'form__input_error-line',
  formInputErrorMessage: 'form__input_error-message',
  formButtonInactive: 'form__button_inactive'
};

const validate = new FormValidator(selectorsValidate);
validate.enableValidation();



selectors['editProfileBtn'].addEventListener('click', function () {
  openPopup(popupEditProfile);
});

selectors['closeEditProfileBtn'].addEventListener('click', function () {
  closePopup(popupEditProfile);
});

selectors['editProfileBtn'].addEventListener('click', insertProfileValue);

selectors['editForm'].addEventListener('submit', addProfileInfo);

selectors['addCardBtn'].addEventListener('click', function() {
    openPopup(selectors['popupAddPlace']);
});

selectors['closeAddPlaceBtn'].addEventListener('click', function() {
  closePopup(selectors['popupAddPlace']);
});

selectors['formAddPlace'].addEventListener('submit', (evt) => {
    evt.preventDefault();
    const data = {
        'link': inputLink.value,
        'name': inputTitle.value,
    };
    const newCard = new Card(data, selectors, TEMPLATE_ELEMENT);
    newCard.appendCard()
})

selectors['closeShowImageBtn'].addEventListener('click', function() {
    const popupShowImageSelector = selectors['popupShowImage']
    closePopup(popupShowImageSelector);
    popupShowImageSelector.querySelector('.popup__image').src = '';
    popupShowImageSelector.querySelector('.popup__caption').textContent = '';
})
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import {openPopup, closePopup} from '../scripts/utilis.js';
import {initialCards} from '../scripts/initial-cards.js';

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
}

const TEMPLATE_ELEMENT = '#template-element';

initialCards.forEach((item) => {
  const newCard = new Card(item, selectors, TEMPLATE_ELEMENT).generateCard();
  appendCard(newCard)
})

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

function appendCard(card) {
  selectors['cardContainer'].prepend(card);
  selectors['popupAddPlace'].classList.remove('popup_opened');
}

const formList = Array.from(document.querySelectorAll('.form'));
formList.forEach(form => {
  const validate = new FormValidator(form);
  validate.enableValidation();
});

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
    const newCard = new Card(data, selectors, TEMPLATE_ELEMENT).generateCard();
    appendCard(newCard)
})

selectors['closeShowImageBtn'].addEventListener('click', function() {
    const popupShowImageSelector = selectors['popupShowImage']
    closePopup(popupShowImageSelector);
    popupShowImageSelector.querySelector('.popup__image').src = '';
    popupShowImageSelector.querySelector('.popup__caption').textContent = '';
})
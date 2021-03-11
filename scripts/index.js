import Card from './components/Card.js';
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import { TEMPLATE_ELEMENT, initialCards, selectors, cardContainer, profileName, profileJob, popupInputName, popupInputJob, popupEditProfile } from './utils/constants.js';
import FormValidator from './components/FormValidator.js';
// import { openPopup, closePopup } from '../scripts/utilis.js';



const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = new Card(item, selectors, TEMPLATE_ELEMENT);
    const cardElement = newCard.generateCard();
    defaultCardList.addItem(cardElement);
  }

}, cardContainer);

defaultCardList.renderItems();



// initialCards.forEach((item) => {
//   const newCard = new Card(item, selectors, TEMPLATE_ELEMENT).generateCard();
//   appendCard(newCard)
// })



const defaultPopupEditProfile = new Popup(popupEditProfile);
defaultPopupEditProfile.setEventListeners()


function addProfileInfo(evt) {
  evt.preventDefault();

  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;

  // closePopup(popupEditProfile);
  defaultPopupEditProfile.close();
}

function insertProfileValue(evt) {
  evt.preventDefault();

  popupInputName.value = profileName.innerText;
  popupInputJob.value = profileJob.innerText;
}

// function appendCard(card) {
//   selectors['cardContainer'].prepend(card);
//   selectors['popupAddPlace'].classList.remove('popup_opened');
// }

// const formList = Array.from(document.querySelectorAll('.form'));
// formList.forEach(form => {
//   const validate = new FormValidator(form);
//   validate.enableValidation();
// });

selectors['editProfileBtn'].addEventListener('click', function () {
  // openPopup(popupEditProfile);
  defaultPopupEditProfile.open();
});

// selectors['closeEditProfileBtn'].addEventListener('click', function () {
//   //closePopup(popupEditProfile);
//   popup.close();
// });

selectors['editProfileBtn'].addEventListener('click', insertProfileValue);

selectors['editForm'].addEventListener('submit', addProfileInfo);

// selectors['addCardBtn'].addEventListener('click', function () {
//   openPopup(selectors['popupAddPlace']);
// });

// selectors['closeAddPlaceBtn'].addEventListener('click', function () {
//   closePopup(selectors['popupAddPlace']);
// });

// selectors['formAddPlace'].addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   const data = {
//     'link': inputLink.value,
//     'name': inputTitle.value,
//   };
//   const newCard = new Card(data, selectors, TEMPLATE_ELEMENT).generateCard();
//   appendCard(newCard)
// })

// selectors['closeShowImageBtn'].addEventListener('click', function () {
//   const popupShowImageSelector = selectors['popupShowImage']
//   closePopup(popupShowImageSelector);
//   popupShowImageSelector.querySelector('.popup__image').src = '';
//   popupShowImageSelector.querySelector('.popup__caption').textContent = '';
// })
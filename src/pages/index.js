import '../pages/index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Popup from '../scripts/components/Popup.js';
import {
  initialCards,
  inputName,
  inputJob,
  profileName,
  profileJob,
  editPopup,
  profileButton,
  formEditProfile,
  addCardButton,
  addCardPopup,
  closeAddCard,
  showImagePopup,
  cardContainer,
  formAddCard,
  validation
} from '../scripts/utils/constants.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

function createCard(item) {
  const card = new Card({
    data: item,
    cardSelector: '#template-element',
    handleCardClick: (imagePopup) => {
      popupWithImage.open(imagePopup);
    }
  });
  return card.generateCard();
}



const popupWithImage = new PopupWithImage(showImagePopup);

const defaultCardList = new Section({
  data: initialCards,
  renderer: (item) => {

    const cardElement = createCard(item)
    defaultCardList.setItems(cardElement);
  }
}, cardContainer);

defaultCardList.renderItems();

const popupEditProfile = new Popup(editPopup);

const addCard = new PopupWithForm({
  popupSelector: addCardPopup,
  formSelector: formAddCard,
  submitForm: (item) => {
    const cardElement = createCard(item)
    document.querySelector(cardContainer).prepend(cardElement);
    addCard.close();
  },
});

const userInfo = new UserInfo({ profileName, profileJob });

const profile = new PopupWithForm({
  popupSelector: editPopup,
  formSelector: formEditProfile,
  submitForm: (item) => {
    const info = new UserInfo({ profileName, profileJob });
    info.setUserInfo(item);
    profile.close();
  }
})

popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
profile.setEventListeners();
addCard.setEventListeners();

profileButton.addEventListener('click', function () {
  popupEditProfile.open();
  userInfo.getUserInfo({ inputName, inputJob });
});

addCardButton.addEventListener('click', function () {
  addCard.open();
})

closeAddCard.addEventListener('click', function () {
  addCard.close();
})

const formList = Array.from(document.querySelectorAll(validation['formSelector']));

formList.forEach(form => {
  const valid = new FormValidator(form);
  valid.enableValidation();
})
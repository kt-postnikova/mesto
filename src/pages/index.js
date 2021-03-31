import '../pages/index.css';
import Card from '../scripts/components/Card.js';
//import FormValidator from '../scripts/components/FormValidator.js';
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
import Api from '../scripts/components/Api.js';

const options = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: 'b9ddb8ca-c8e3-475f-814b-c43ae8005cc3',
    'Content-Type': 'application/json'
  },
}

const api = new Api(options);


//api.editUserInfo();
//api.addNewCard();



function createCard(item) {
  const card = new Card({
    data: item,
    cardSelector: '#template-element',
    handleCardClick: (imagePopup) => {
      popupWithImage.open(imagePopup);
    },
    api
  });
  return card.generateCard();
}


const popupWithImage = new PopupWithImage(showImagePopup);


const defaultCardList = new Section({
  //data: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    defaultCardList.setItems(cardElement);
  }
}, cardContainer);

// defaultCardList.renderItems();


api.getCards()
  .then(res => {
    //console.log(res);
    defaultCardList.renderItems(res);
    return res
  })


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

// экземпляр объекта
const userInfo = new UserInfo({ profileName, profileJob }, api);

api.getUserInfo()
  .then(res => {

    profileName.textContent = res.name;
    profileJob.textContent = res.about;


    userInfo.getUserInfo(res);
    //userInfo.setUserInfo(res);

  })



const profile = new PopupWithForm({
  popupSelector: editPopup,
  formSelector: formEditProfile,
  submitForm: (item) => {
    const info = new UserInfo({ profileName, profileJob }, api);
    info.setUserInfo(item);
    popupEditProfile.close();

    api.editUserInfo(item)
      .then(res => {
        res.name = item.name;
        res.about = item.about;
      })
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

// const formList = Array.from(document.querySelectorAll(validation['formSelector']));

// formList.forEach(form => {
//   const valid = new FormValidator(form);
//   valid.enableValidation();
// })



const deleteBtn = document.querySelector('.element__trash-btn');
const popupConfirmDelete = document.querySelector('.popup_type_confirm-delete');
const closeConfirm = popupConfirmDelete.querySelector('.popup__close');
const confirmDelete = new Popup(popupConfirmDelete);


deleteBtn.addEventListener('click', () => {
  confirmDelete.open();
});

closeConfirm.addEventListener('click', () => {
  confirmDelete.close();
})
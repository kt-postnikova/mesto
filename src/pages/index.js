import '../pages/index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Popup from '../scripts/components/Popup.js';
import {
  inputName,
  inputJob,
  inputAvatar,
  profileName,
  profileJob,
  editPopup,
  profileButton,
  formEditProfile,
  formEditAvatar,
  addCardButton,
  confirmationButton,
  addCardPopup,
  confirmDeletePopup,
  editAvatarPopup,
  avatarImage,
  closeAddCard,
  closeConfirm,
  closeEditAvatar,
  showImagePopup,
  cardContainer,
  formAddCard,
  avatarButton,
  validation,
  options
} from '../scripts/utils/constants.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

const api = new Api(options);
const popupWithImage = new PopupWithImage(showImagePopup);
const popupEditProfile = new Popup(editPopup);
const userInfo = new UserInfo({ profileName, profileJob }, api);
const confirmDelete = new Popup(confirmDeletePopup);

let userId;

api.getUserInfo()
  .then(res => {

    profileName.textContent = res.name;
    profileJob.textContent = res.about;

    userId = res._id;
    userInfo.getUserInfo(res);
  })


api.getUserInfo()
  .then(res => {
    avatarImage.src = res.avatar;
  })


function setLoader(form) {
  const formButton = form.querySelector('.form__button');
  formButton.innerHTML = 'Сохранение...';
}


function createCard(item) {
  const card = new Card({
    data: item,
    userId: userId,
    cardSelector: '#template-element',
    handleCardClick: (imagePopup) => {
      popupWithImage.open(imagePopup);
    },
    api,
    confirm: (card) => {
      confirmDelete.open();
      confirmationButton.addEventListener('click', () => {
        api.deleteCard(item._id)
          .then(() => {
            card.remove();
            confirmDelete.close();
          })
      })

    }
  });
  return card.generateCard();
}


const defaultCardList = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    defaultCardList.setItems(cardElement);
  }
}, cardContainer);


api.getCards()
  .then(res => {
    defaultCardList.renderItems(res);
  })


const addCard = new PopupWithForm({
  popupSelector: addCardPopup,
  formSelector: formAddCard,
  submitForm: (item) => {
    api.createCard(item)
      .then(res => {
        const cardElement = createCard(res);
        document.querySelector(cardContainer).prepend(cardElement);
        addCard.close();
      })
      .then(() => {
        setLoader(formAddCard);
      })
  },
});


const profile = new PopupWithForm({
  popupSelector: editPopup,
  formSelector: formEditProfile,
  submitForm: (item) => {
    const info = new UserInfo({ profileName, profileJob }, api);
    info.setUserInfo(item);
    popupEditProfile.close();
    setLoader(formEditProfile);

    api.editUserInfo(item)
      .then(res => {
        res.name = item.name;
        res.about = item.about;
      })
  }
})


const avatar = new PopupWithForm({
  popupSelector: editAvatarPopup,
  formSelector: formEditAvatar,
  submitForm: (item) => {
    api.editAvatar(item)
      .then(res => {
        avatarImage.src = res.avatar
        avatar.close();
      })
      .then(() => {
        setLoader(formEditAvatar);
      })
  }
})


popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
profile.setEventListeners();
addCard.setEventListeners();
avatar.setEventListeners();


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

closeConfirm.addEventListener('click', () => {
  confirmDelete.close();
})

closeEditAvatar.addEventListener('click', () => {
  avatar.close();
})

avatarButton.addEventListener('click', () => {
  avatar.open();

  inputAvatar.value = avatarImage.src;
})


const formList = Array.from(document.querySelectorAll(validation['formSelector']));

formList.forEach(form => {
  const valid = new FormValidator(form);
  valid.enableValidation();
})





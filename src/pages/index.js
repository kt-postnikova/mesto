import './index.css';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import Popup from '../scripts/components/Popup.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import {
  popupUserInfo,
  popupAddCard,
  popupShowImage,
  popupDeleteCard,
  popupEditAvatar,
  buttonUserInfo,
  buttonAddCard,
  buttonEditAvatar,
  profileName,
  profileAbout,
  profileAvatar,
  cardContainer,
  cardTemplate,
  formUserInfo,
  formAddCard,
  formDeleteCard,
  formEditAvatar,
  inputName,
  inputAbout,
  inputAvatar,
  validation,
} from '../scripts/utils/constants.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithSubmit from '../scripts/components/PopupWithSubmit.js';
import FormValidator from '../scripts/components/FormValidator.js';



const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: 'be14df10-ef56-405e-9870-1c2d83310783',
    'Content-Type': 'application/json'
  }
});

const userInfo = new Popup(popupUserInfo);
const addCardPopup = new Popup(popupAddCard);
const showImage = new PopupWithImage(popupShowImage);
const getUserInfo = new UserInfo(profileName, profileAbout, profileAvatar, inputName, inputAbout, inputAvatar);
const deleteCard = new PopupWithSubmit(popupDeleteCard, formDeleteCard);
const userInfoValidation = new FormValidator(validation, formUserInfo);
const cardValidator = new FormValidator(validation, formAddCard);
const avatarValidator = new FormValidator(validation, formEditAvatar)

let userData;




const editUserInfo = new PopupWithForm(popupUserInfo, formUserInfo, {
  submitForm: (inputsValues) => {
    setLoading(true, formUserInfo);
    api.editUserInfo(inputsValues)
      .then(() => {
        getUserInfo.setUserInfo(inputsValues);
        editUserInfo.close();
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false, formUserInfo, 'Сохранить')
      })
  }
})


const editAvatar = new PopupWithForm(popupEditAvatar, formEditAvatar, {
  submitForm: (inputsValues) => {
    setLoading(true, formEditAvatar)
    api.editAvatar(inputsValues)
      .then(userData => {
        console.log(userData);
        getUserInfo.setAvatar(userData)
        editAvatar.close();
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false, formEditAvatar, 'Сохранить');
      })
  }
})


function createCard(cardInfo) {
  const card = new Card(cardInfo, {
    handleCardClick: () => {
      showImage.open(cardInfo);
    },
    handleLikeCard: () => {
      card.likeCard();
    },
    handleCardDelete: () => {
      deleteCard.setSubmitAction(() => {
        setLoading(true, formDeleteCard)
        api.deleteCard(cardInfo._id)
          .then(() => {
            card.removeCard();
            deleteCard.close();
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            setLoading(false, formDeleteCard, 'Да')
          })
      })
      deleteCard.open();
    }
  }, cardTemplate, userData, api)

  return card.generateCard();
}


function renderCard(isNewCard) {
  const renderingCard = new Section({
    renderer: (cardInfo) => {
      const cardElement = createCard(cardInfo);
      renderingCard.addItem(isNewCard, cardElement);
    }
  }, cardContainer)

  return renderingCard
}


// function renderDefaultCards(cardInfo) {
//   const renderingCard = new Section({
//     items: cardInfo,
//     renderer: (cardInfo) => {
//       const cardElement = createCard(cardInfo);
//       renderingCard.addDefaultCards(cardElement);
//     }
//   }, cardContainer)

//   return renderingCard
// }

// function renderNewCard(cardInfo) {
//   const renderingCard = new Section({
//     items: cardInfo,
//     renderer: (cardInfo) => {
//       const cardElement = createCard(cardInfo);
//       renderingCard.addNewCard(cardElement);
//     }
//   }, cardContainer)

//   return renderingCard
// }


Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userInfo, cardData]) => {
    getUserInfo.setUserInfo(userInfo);
    getUserInfo.setAvatar(userInfo);
    userData = userInfo._id
    //const defaultCards = renderingCard.renderItems(cardData);
    const defaultCards = renderCard(false);
    defaultCards.renderItems(cardData);
  })
  .catch(err => {
    console.log(err)
  })

// api.getUserInfo()
//   .then(userInfo => {
//     getUserInfo.setUserInfo(userInfo);
//     getUserInfo.setAvatar(userInfo);
//     userData = userInfo._id
//   })
//   .catch(err => {
//     console.log(err)
//   });


const addCard = new PopupWithForm(popupAddCard, formAddCard, {
  submitForm: (inputsValues) => {
    setLoading(true, formAddCard)
    api.createCard(inputsValues)
      .then(cardData => {
        const cardArray = [];
        cardArray[0] = cardData;

        //const newCard = renderNewCard(cardArray);
        const newCard = renderCard(true);
        newCard.renderItems(cardArray)
        //newCard.renderItems();
        addCard.close();
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false, formAddCard, 'Создать')
      })
  }
})


function setLoading(isLoading, form, buttonText) {
  const formButton = form.querySelector('.form__button');
  if (isLoading) {
    formButton.textContent = 'Сохранение...'
  } else {
    formButton.textContent = buttonText;
  }
}


const formList = Array.from(document.querySelectorAll(validation.formSelector));

formList.forEach(form => {
  const formValidator = new FormValidator(validation, form);
  formValidator.enableValidation();
})


buttonUserInfo.addEventListener('click', () => {
  userInfo.open();
  inputName.value = getUserInfo.getUserInfo().name;
  inputAbout.value = getUserInfo.getUserInfo().about;
  userInfoValidation.removeErrors();
  userInfoValidation.enableSubmitButton();
});

buttonAddCard.addEventListener('click', () => {
  addCardPopup.open()
  cardValidator.disableSubmitButton();
})

buttonEditAvatar.addEventListener('click', () => {
  editAvatar.open();
  avatarValidator.removeErrors();
  avatarValidator.enableSubmitButton();
})


userInfo.setEventListeners();
addCard.setEventListeners();
addCardPopup.setEventListeners();
deleteCard.setEventListeners();
editAvatar.setEventListeners();
showImage.setEventListeners();
editUserInfo.setEventListeners();





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
const getUserInfo = new UserInfo(profileName, profileAbout, profileAvatar);
const deleteCard = new PopupWithSubmit(popupDeleteCard, formDeleteCard);
const userInfoValidation = new FormValidator(validation, formUserInfo);
const cardValidator = new FormValidator(validation, formAddCard);
const avatarValidator = new FormValidator(validation, formEditAvatar)

let userData;


/* Получает актуальные данные с сервера о пользователе (name, about, avatar) и отображает на странице
при загрузке
+ записывет в переменную id пользователя */
api.getUserInfo()
  .then(userInfo => {
    profileAvatar.src = userInfo.avatar;
    profileName.textContent = userInfo.name;
    profileAbout.textContent = userInfo.about;
    return userInfo
  })
  .then(userInfo => {
    userData = userInfo._id
  })
  .catch(err => {
    console.log(err)
  });


/* Создаёт экземпляр класса для редактирования инфо о пользователе. Объявляется классс PopupWithForm
с колбеком сабмита формы. При вызове сабмита будет сделан запрос к серверу на редактирование инфо.
В нём создаётся экземпляр класса UserInfo. Вызовется его метод setUserInfo(), который добавит изменения на страницу */
const editUserInfo = new PopupWithForm(popupUserInfo, formUserInfo, {
  submitForm: (inputsValues) => {
    setLoading(true, formUserInfo);
    api.editUserInfo(inputsValues)
      .then(() => {
        const userInfo = new UserInfo(profileName, profileAbout);
        userInfo.setUserInfo(inputsValues);
        editUserInfo.close();
      })
      .catch(err => {
        console.log(err)
      });
  }
})


/* Создаёт экземпляр класса для редактирования аватара пользователя. Объявляется классс PopupWithForm
с колбеком сабмита формы. При вызове сабмита будет сделан запрос к серверу на редактирование аватара. В вёрстку
запишется ссылка на аватар из данных с сервера */
const editAvatar = new PopupWithForm(popupEditAvatar, formEditAvatar, {
  submitForm: (inputsValues) => {
    setLoading(true, formEditAvatar)
    api.editAvatar(inputsValues)
      .then(userData => {
        profileAvatar.src = userData.avatar;
        editAvatar.close();
      })
      .catch(err => {
        console.log(err)
      });
  }
})


/* Функция создания карточки (для дефолтных и для пользовательских). Функция создаёт экземпляр класса Card
и возвращает полностью готовый для работы 
+ в каждом экземпляре есть колбеки на просмотр картинки, лайк и удаление. 
+ для удаления вызывается колбек, в котором вызывается метод setSubmitAction. В нем форме назначается сабмит,
в котором делается запрос к серверу на удаление карточки. Карточка удаляется методом removeCard */
const createCard = (cardInfo) => {
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
            setLoading(false, formDeleteCard, 'Да')
          })
          .catch(err => {
            console.log(err)
          });
      })
      deleteCard.open();
    }
  }, cardTemplate, userData, api)

  return card;
}


/* Экземпляр класса для дефолтных карточек. Класс Section получает массив с дефолтными карточками.
В колбеке renderer вызывается функция createCard с параметром данных карточек с сервера.
В элемент карточки вставляются значения методом generateCard().
Методом addItem() класса Section готовая карточка вставляется на страницу */
api.getCards()
  .then(cardsData => {
    const getDeafaultCards = new Section({
      items: cardsData,
      renderer: (cardInfo) => {
        const defaultCards = createCard(cardInfo);
        const cardElement = defaultCards.generateCard();
        getDeafaultCards.addItem(cardElement);
      }
    }, cardContainer)
    /* Вызывается колбек класса Section, чтобы отработало всё, что описано выше. */
    getDeafaultCards.renderItems();
  })
  .catch(err => {
    console.log(err)
  });


/* Экземпляр класса для создания новых карточек. Объявляется класс PopupWithForm с колбеком сабмита формы.
В нем отправляется запрос к серверу на создание новой карточки с параметром данных из инпута попапа. В запросе
вызывается функция createCard с параметром данных карточек из запроса. В элемент карточки вставляются значения
методом generateCard(). Методом prepend карточка вставляется на страницу */
const addCard = new PopupWithForm(popupAddCard, formAddCard, {
  submitForm: (inputsValues) => {
    setLoading(true, formAddCard)
    api.createCard(inputsValues)
      .then(cardData => {
        const newCard = createCard(cardData);
        const cardElement = newCard.generateCard();
        document.querySelector(cardContainer).prepend(cardElement);
        addCard.close();
      })
      .catch(err => {
        console.log(err)
      });
  }
})


/* Функция установки "загрузки" при отправки данных на сервер */
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
  getUserInfo.getUserInfo();
  userInfoValidation.removeErrors();
  userInfoValidation.enableSubmitButton();
  setLoading(false, formUserInfo, 'Сохранить')
});

buttonAddCard.addEventListener('click', () => {
  addCardPopup.open()
  cardValidator.disableSubmitButton();
  setLoading(false, formAddCard, 'Создать')
})

buttonEditAvatar.addEventListener('click', () => {
  editAvatar.open();
  avatarValidator.removeErrors();
  avatarValidator.enableSubmitButton();
  getUserInfo.getUserInfo();
  setLoading(false, formEditAvatar, 'Сохранить')

})


userInfo.setEventListeners();
addCard.setEventListeners();
addCardPopup.setEventListeners();
deleteCard.setEventListeners();
editAvatar.setEventListeners();
showImage.setEventListeners();
editUserInfo.setEventListeners();





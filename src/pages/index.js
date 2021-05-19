import './index.css';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import Popup from '../scripts/components/Popup.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import {
  POPUP_USER_INFO,
  POPUP_ADD_CARD,
  POPUP_SHOW_IMAGE,
  POPUP_DELETE_CARD,
  POPUP_EDIT_AVATAR,
  BUTTON_USER_INFO,
  BUTTON_ADD_CARD,
  BUTTON_EDIT_AVATAR,
  PROFILE_NAME,
  PROFILE_ABOUT,
  PROFILE_AVATAR,
  CARD_CONTAINER,
  CARD_TEMPLATE,
  FORM_USER_INFO,
  FORM_ADD_CARD,
  FORM_DELETE_CARD,
  FORM_EDIT_AVATAR,
  VALIDATION,
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

const USER_INFO = new Popup(POPUP_USER_INFO);
const ADD_CARD_POPUP = new Popup(POPUP_ADD_CARD);
const SHOW_IMAGE = new PopupWithImage(POPUP_SHOW_IMAGE);
const GET_USER_INFO = new UserInfo(PROFILE_NAME, PROFILE_ABOUT, PROFILE_AVATAR);
const DELETE_CARD = new PopupWithSubmit(POPUP_DELETE_CARD, FORM_DELETE_CARD);
const USER_INFO_VALIDATOR = new FormValidator(VALIDATION, FORM_USER_INFO);
const CARD_VALIDATOR = new FormValidator(VALIDATION, FORM_ADD_CARD);
const AVATAR_VALIDATOR = new FormValidator(VALIDATION, FORM_EDIT_AVATAR)

let userData;


/* Получает актуальные данные с сервера о пользователе (name, about, avatar) и отображает на странице
при загрузке
+ записывет в переменную id пользователя */
api.getUserInfo()
  .then(userInfo => {
    PROFILE_AVATAR.src = userInfo.avatar;
    PROFILE_NAME.textContent = userInfo.name;
    PROFILE_ABOUT.textContent = userInfo.about;
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
const EDIT_USER_INFO = new PopupWithForm(POPUP_USER_INFO, FORM_USER_INFO, {
  submitForm: (inputsValues) => {
    setLoading(true, FORM_USER_INFO);
    api.editUserInfo(inputsValues)
      .then(() => {
        const USER_INFO = new UserInfo(PROFILE_NAME, PROFILE_ABOUT);
        USER_INFO.setUserInfo(inputsValues);
        EDIT_USER_INFO.close();
      })
      .catch(err => {
        console.log(err)
      });
  }
})


/* Создаёт экземпляр класса для редактирования аватара пользователя. Объявляется классс PopupWithForm
с колбеком сабмита формы. При вызове сабмита будет сделан запрос к серверу на редактирование аватара. В вёрстку
запишется ссылка на аватар из данных с сервера */
const EDIT_AVATAR = new PopupWithForm(POPUP_EDIT_AVATAR, FORM_EDIT_AVATAR, {
  submitForm: (inputsValues) => {
    setLoading(true, FORM_EDIT_AVATAR)
    api.editAvatar(inputsValues)
      .then(userData => {
        PROFILE_AVATAR.src = userData.avatar;
        EDIT_AVATAR.close();
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
  const CARD = new Card(cardInfo, {
    handleCardClick: () => {
      SHOW_IMAGE.open(cardInfo);
    },
    handleLikeCard: () => {
      CARD.likeCard();
    },
    handleCardDelete: () => {
      DELETE_CARD.setSubmitAction(() => {
        setLoading(true, FORM_DELETE_CARD)
        api.deleteCard(cardInfo._id)
          .then(() => {
            CARD.removeCard();
            DELETE_CARD.close();
            setLoading(false, FORM_DELETE_CARD, 'Да')
          })
          .catch(err => {
            console.log(err)
          });
      })
      DELETE_CARD.open();
    }
  }, CARD_TEMPLATE, userData, api)

  return CARD;
}


/* Экземпляр класса для дефолтных карточек. Класс Section получает массив с дефолтными карточками.
В колбеке renderer вызывается функция createCard с параметром данных карточек с сервера.
В элемент карточки вставляются значения методом generateCard().
Методом addItem() класса Section готовая карточка вставляется на страницу */
api.getCards()
  .then(cardsData => {
    const GET_DEFAULT_CARDS = new Section({
      items: cardsData,
      renderer: (cardInfo) => {
        const DEFAULT_CARDS = createCard(cardInfo);
        const CARD_ELEMENT = DEFAULT_CARDS.generateCard();
        GET_DEFAULT_CARDS.addItem(CARD_ELEMENT);
      }
    }, CARD_CONTAINER)
    /* Вызывается колбек класса Section, чтобы отработало всё, что описано выше. */
    GET_DEFAULT_CARDS.renderItems();
  })
  .catch(err => {
    console.log(err)
  });


/* Экземпляр класса для создания новых карточек. Объявляется класс PopupWithForm с колбеком сабмита формы.
В нем отправляется запрос к серверу на создание новой карточки с параметром данных из инпута попапа. В запросе
вызывается функция createCard с параметром данных карточек из запроса. В элемент карточки вставляются значения
методом generateCard(). Методом prepend карточка вставляется на страницу */
const ADD_CARD = new PopupWithForm(POPUP_ADD_CARD, FORM_ADD_CARD, {
  submitForm: (inputsValues) => {
    setLoading(true, FORM_ADD_CARD)
    api.createCard(inputsValues)
      .then(cardData => {
        const NEW_CARD = createCard(cardData);
        const CARD_ELEMENT = NEW_CARD.generateCard();
        document.querySelector(CARD_CONTAINER).prepend(CARD_ELEMENT);
        ADD_CARD.close();
      })
      .catch(err => {
        console.log(err)
      });
  }
})


/* Функция установки "загрузки" при отправки данных на сервер */
function setLoading(isLoading, form, buttonText) {
  const FORM_BUTTON = form.querySelector('.form__button');
  if (isLoading) {
    FORM_BUTTON.textContent = 'Сохранение...'
  } else {
    FORM_BUTTON.textContent = buttonText;
  }
}



const formList = Array.from(document.querySelectorAll(VALIDATION.formSelector));

formList.forEach(form => {
  const FORM_VALIDATOR = new FormValidator(VALIDATION, form);
  FORM_VALIDATOR.enableValidation();
})



BUTTON_USER_INFO.addEventListener('click', () => {
  USER_INFO.open();
  GET_USER_INFO.getUserInfo();
  USER_INFO_VALIDATOR.removeErrors();
  USER_INFO_VALIDATOR.enableSubmitButton();
  setLoading(false, FORM_USER_INFO, 'Сохранить')
});

BUTTON_ADD_CARD.addEventListener('click', () => {
  ADD_CARD_POPUP.open()
  CARD_VALIDATOR.disableSubmitButton();
  setLoading(false, FORM_ADD_CARD, 'Создать')
})

BUTTON_EDIT_AVATAR.addEventListener('click', () => {
  EDIT_AVATAR.open();
  AVATAR_VALIDATOR.removeErrors();
  AVATAR_VALIDATOR.enableSubmitButton();
  GET_USER_INFO.getUserInfo();
  setLoading(false, FORM_EDIT_AVATAR, 'Сохранить')

})


USER_INFO.setEventListeners();
ADD_CARD.setEventListeners();
ADD_CARD_POPUP.setEventListeners();
DELETE_CARD.setEventListeners();
EDIT_AVATAR.setEventListeners();
SHOW_IMAGE.setEventListeners();
EDIT_USER_INFO.setEventListeners();





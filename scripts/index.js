// //import { Card } from '../scripts/Card.js'

// // Элементы Profile
// const profileName = document.querySelector('.profile__name');
// const profileJob = document.querySelector('.profile__job');

// const popupInputName = document.querySelector('.form__input_type_name');
// const popupInputJob = document.querySelector('.form__input_type_job');

// // Попапы
// const popupEditProfile = document.querySelector('.popup_type_edit-profile');
// const popupAddPlace = document.querySelector('.popup_type_add-place');
// const popupShowImage = document.querySelector('.popup_type_show-image');

// // Оверлеи
// const overlayEditProfile = document.querySelector('.popup__overlay');
// const overlayAddPlace = document.querySelector('.popup__overlay_type_add-place');
// const overlayShowImage = document.querySelector('.popup__overlay_type_show-image');

// // Кнопки для открытия попапов
// const popupEditBtn = document.querySelector('.profile__button');
// const popupAddPlaceBtn = document.querySelector('.profile__add-button');

// // Кнопки закрытия попапов
// const closeBtnEditForm = popupEditProfile.querySelector('.popup__close');
// const closeBtnAddPlace = popupAddPlace.querySelector('.popup__close');
// const closeBtnShowImage = popupShowImage.querySelector('.popup__close');

// // Контейнер для карточек
// const elementsContainer = document.querySelector('.elements');

// // Формы отправки
// const editForm = popupEditProfile.querySelector('.form');
// const createForm = popupAddPlace.querySelector('.form_type_add-place');

// // Template карточки
// const cardTemplate = document.querySelector('#template-element').content;

// // Инпуты попапа новой карточки
// const inputName = document.querySelector('.form__input_type_title');
// const inputLink = document.querySelector('.form__input_type_link');

// const btnAddPlace = document.querySelector('.form__button_type_add-place');


// function overlayHandler(popup, state) {
//   // находим селектор открытого оверлея
//   const activeOverlay = popup.querySelector('.popup__overlay');
//   // если второй аргумент при вызове функции - 'add'
//   if( state === 'add') {
//   // на открытый попап вешаем событие 'mousedown' с функцией закрытия активного попапа
//     activeOverlay.addEventListener('mousedown', closePopupByOverlayClick);
//   }
//   // если второй аргумент при вызове функции - 'remove' 
//   else if ( state === 'remove' ) {
//   // на открытый попап удаляем событие 'mousedown' с функцией закрытия активного попапа
//     activeOverlay.removeEventListener('mousedown', closePopupByOverlayClick);
//   }
// }

// function openPopup(popup) {
//   popup.classList.add('popup_opened');

//   document.addEventListener('keydown', closePopupByEsc);
//   overlayHandler(popup, 'add');
// }

// function closePopup(popup) {
//   popup.classList.remove('popup_opened');

//   document.removeEventListener('keydown', closePopupByEsc);
//   overlayHandler(popup, 'remove');
// }

// function addProfileInfo(evt) {
//   evt.preventDefault();

//   profileName.textContent = popupInputName.value;
//   profileJob.textContent = popupInputJob.value;

//   closePopup(popupEditProfile);
// }

// function insertProfileValue(evt) {
//   evt.preventDefault();

//   popupInputName.value = profileName.innerText;
//   popupInputJob.value = profileJob.innerText;
// }

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

// popupEditBtn.addEventListener('click', function () {
//   openPopup(popupEditProfile);
// });

// closeBtnEditForm.addEventListener('click', function () {
//   closePopup(popupEditProfile);
// });

// popupAddPlaceBtn.addEventListener('click', function () {
//   openPopup(popupAddPlace);
// });

// closeBtnAddPlace.addEventListener('click', function () {
//   closePopup(popupAddPlace);
// })

// closeBtnShowImage.addEventListener('click', function () {
//   closePopup(popupShowImage);
// })

// editForm.addEventListener('submit', addProfileInfo);

// popupEditBtn.addEventListener('click', insertProfileValue);



import Card from '../scripts/Card.js'

// Кнопки
const addCardBtn = document.querySelector('.profile__add-button');
const editProfileBtn = document.querySelector('.profile__button');

// Элементы Profile
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popupInputName = document.querySelector('.form__input_type_name');
const popupInputJob = document.querySelector('.form__input_type_job');

// Попапы
const popupAddPlace = document.querySelector('.popup_type_add-place');
const popupShowImage = document.querySelector('.popup_type_show-image');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');

// Кнопки закрытия
const closeAddPlaceBtn = popupAddPlace.querySelector('.popup__close');
const closeShowImageBtn = popupShowImage.querySelector('.popup__close');
const closeEditProfileBtn = popupEditProfile.querySelector('.popup__close');

// Контейнер с карточками
const cardContainer = document.querySelector('.elements');

// Формы
const formAddPlace = popupAddPlace.querySelector('.form_type_add-place');
const editForm = popupEditProfile.querySelector('.form');

// Инпуты
const inputTitle = formAddPlace.querySelector('.form__input_type_title');
const inputLink = formAddPlace.querySelector('.form__input_type_link');

// Оверлеи
const overlayEditProfile = document.querySelector('.popup__overlay');
const overlayAddPlace = document.querySelector('.popup__overlay_type_add-place');
const overlayShowImage = document.querySelector('.popup__overlay_type_show-image');

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
}


const TEMPLATE_ELEMENT = '#template-element'

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
    overlayHandler(popup, 'add');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
    overlayHandler(popup, 'remove');
}

initialCards.forEach((item) => {
    const newCard = new Card(item, selectors, TEMPLATE_ELEMENT); // заполняем карточки дефолтными значениями
    newCard.appendCard()
})

// Слушатель открытия попапа создания новой карточки
selectors['addCardBtn'].addEventListener('click', function() {
    openPopup(selectors['popupAddPlace']);
});

selectors['formAddPlace'].addEventListener('submit', (evt) => {
    evt.preventDefault();
    const data = {
        'link': inputLink.value,
        'name': inputTitle.value,
    };
    const newCard = new Card(data, selectors, TEMPLATE_ELEMENT); // заполняем карточки дефолтными значениями
    newCard.appendCard()
})

// Слушатель закрытия попапа создания новой карточки
selectors['closeAddPlaceBtn'].addEventListener('click', function() {
    closePopup(selectors['popupAddPlace']);
});

// Слушатель закрытия попапа показа картинки
selectors['closeShowImageBtn'].addEventListener('click', function() {
    const popupShowImageSelector = selectors['popupShowImage']
    closePopup(popupShowImageSelector);
    popupShowImageSelector.querySelector('.popup__image').src = '';
    popupShowImageSelector.querySelector('.popup__caption').textContent = '';
})

editProfileBtn.addEventListener('click', function() {
    openPopup(popupEditProfile);
});

closeEditProfileBtn.addEventListener('click', function() {
    closePopup(popupEditProfile);
})



function overlayHandler(popup, state) {
  // находим селектор открытого оверлея
  const activeOverlay = popup.querySelector('.popup__overlay');
  // если второй аргумент при вызове функции - 'add'
  if( state === 'add') {
  // на открытый попап вешаем событие 'mousedown' с функцией закрытия активного попапа
    activeOverlay.addEventListener('mousedown', closePopupByOverlayClick);
  }
  // если второй аргумент при вызове функции - 'remove' 
  else if ( state === 'remove' ) {
  // на открытый попап удаляем событие 'mousedown' с функцией закрытия активного попапа
    activeOverlay.removeEventListener('mousedown', closePopupByOverlayClick);
  }
}

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

function closePopupByEsc(evt) {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(activePopup);
  }
}

function closePopupByOverlayClick() {
  const activePopup = document.querySelector('.popup_opened');
  closePopup(activePopup); 
}

const closeObjectList = [
  {
      overlay: overlayEditProfile,
      popup: popupEditProfile,
  },
  {
      overlay: overlayAddPlace,
      popup: popupAddPlace,
  },
  {
      overlay: overlayShowImage,
      popup: popupShowImage,
  }
]

for (const closeObj of closeObjectList) {
  closePopupByEsc(closeObj.popup)
}

editProfileBtn.addEventListener('click', function () {
  openPopup(popupEditProfile);
});

closeEditProfileBtn.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

editProfileBtn.addEventListener('click', insertProfileValue);

editForm.addEventListener('submit', addProfileInfo);
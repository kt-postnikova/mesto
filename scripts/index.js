// Элементы Profile
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popupInputName = document.querySelector('.form__input_type_name');
const popupInputJob = document.querySelector('.form__input_type_job');

// Попапы
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddPlace = document.querySelector('.popup_type_add-place');
const popupShowImage = document.querySelector('.popup_type_show-image');

// Оверлеи
const overlayEditProfile = document.querySelector('.popup__overlay');
const overlayAddPlace = document.querySelector('.popup__overlay_type_add-place');
const overlayShowImage = document.querySelector('.popup__overlay_type_show-image');

// Кнопки для открытия попапов
const popupEditBtn = document.querySelector('.profile__button');
const popupAddPlaceBtn = document.querySelector('.profile__add-button');

// Кнопки закрытия попапов
const closeBtnEditForm = popupEditProfile.querySelector('.popup__close');
const closeBtnAddPlace = popupAddPlace.querySelector('.popup__close');
const closeBtnShowImage = popupShowImage.querySelector('.popup__close');

// Контейнер для карточек
const elementsContainer = document.querySelector('.elements');

// Формы отправки
const editForm = popupEditProfile.querySelector('.form');
const createForm = popupAddPlace.querySelector('.form_type_add-place');

// Template карточки
const cardTemplate = document.querySelector('#template-element').content;

// Инпуты попапа новой карточки
const inputName = document.querySelector('.form__input_type_title');
const inputLink = document.querySelector('.form__input_type_link');

const btnAddPlace = document.querySelector('.form__button_type_add-place');


/* Функция закрытия на оверлей по условию - событие либо добавляется, либо удаляется.
param: popup - селектор открытого попапа. Пример: ['<div class=​"popup popup_type_edit-profile popup_opened">​…​</div>​'].
param: state - состояние попапа, когда оно открыто и закрыто. Пример: ['add', 'remove'].
*/
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

/* Функция: 
открывает попап, 
вешает слушатель на открытый попап с функцией закрытия на Escape,
выполняет функцию, которая вешает слушатель с функцией закрытия попапа на оверлей, если в параметре - 'add'
param: popup - селектор открытого попапа. Пример: ['<div class=​"popup popup_type_edit-profile popup_opened">​…​</div>​'].
*/
function openPopup(popup) {
// открытому попапу добавляется класс 'popup_opened', попап появляется
  popup.classList.add('popup_opened');

// при открытии попапа вешается слушатель 'keydown' с функцией закрытия открытого попапа на Escape
  document.addEventListener('keydown', closePopupByEsc);

// слушатель с функцией закрытия попапа на оверлей вешается, т.к. в параметре 'add'
  overlayHandler(popup, 'add');
}

/* Функция:
закрывает открытый попап,
удаляет слушатель, закрывающий попап на Escape,
удаляет слушатель закрытия попапа на оверлей
param: popup - селектор открытого попапа. Пример: ['<div class=​"popup popup_type_edit-profile popup_opened">​…​</div>​'].
*/
function closePopup(popup) {
// у открытого попапа удаляет класс 'popup_opened', попап закрывается
  popup.classList.remove('popup_opened');

// удаляет слушатель, закрывающий попап на Escape
  document.removeEventListener('keydown', closePopupByEsc);

// слушатель с функцией закрытия попапа на оверлей удаляется, т.к. в параметре 'remove'
  overlayHandler(popup, 'remove');
}

/* Функция присваивает заголовку и подзаголовку в верстке значение из инпутов в попапе*/
function addProfileInfo(evt) {
  evt.preventDefault();

// profileName.textContent - значение из верстки. Пример: Жак-Ив Кусто 
// popupInputName.value - значение из инпутов попапа. Пример: Жак-Ив Кусто
  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;

// закрытие попапа с редактированием профиля
  closePopup(popupEditProfile);
}

/* Функция вставляет зачения заголовка и подзаголовка из верстки в инпуты попапа*/
function insertProfileValue(evt) {
  evt.preventDefault();

  popupInputName.value = profileName.innerText;
  popupInputJob.value = profileJob.innerText;
}






/* Функция отработки лайка на карточке
param: cardTemplate - template в верстке. Пример: ['#document-fragment'] 
*/
function handleLikeButtonClick(cardTemplate) {
// кнопка лайка в темплэйте
  const likeBtn = cardTemplate.querySelector('.element__like');

// кнопке лайка вешается событие клик с функцией смены состояния - нажата/не нажата
  likeBtn.addEventListener('click', function (event) {
    event.target.classList.toggle('element__like_active');
  })
}

/* Функция удаления карточки
param: cardTemplate - template в верстке. Пример: ['#document-fragment'] 
*/
function handleDeleteButtonClick(cardTemplate) {
// находим кнопку удаления в темплэйте
  const removeBtn = cardTemplate.querySelector('.element__trash-btn');

// кнопке удаления вешается событие клик с функцией 
  removeBtn.addEventListener('click', function () {
// listItem - это ближайший родительский элемент кнопке удаления. Пример: [<article class="element">...</article] 
    const listItem = removeBtn.closest('.element');

// этот ближайший элемент (т.е. сама карточка) удаляется
    listItem.remove();
  })
}

/* Функция назначает значения из объектов в верстку и показывает попап
param: cardTemplate - template в верстке. Пример: ['#document-fragment']
param: cardInfo - объекты
*/
function insertCardValue(cardTemplate, cardInfo) {
// на .element__image темплэйта вешаем событие клик с функцией...
  cardTemplate.querySelector('.element__image').addEventListener('click', function (event) {

// вставляем в попап показа картинки в линк - линк из объектов...
    popupShowImage.querySelector('.popup__image').src = cardInfo.link;
// в нэйм - нэйм из объектов
    popupShowImage.querySelector('.popup__caption').textContent = cardInfo.name;

// показываем попап
    openPopup(popupShowImage);
  })
}

/* Функция 
param: cardInfo - объекты 
*/
function getCard(cardInfo) {

// newCard  - клонированный темплэйт
  const newCard = cardTemplate.cloneNode(true);

// в клонированном темплэйте назначаем атрибутам значения из объектов  
  newCard.querySelector('.element__image').src = cardInfo.link;
  newCard.querySelector('.element__image').alt = cardInfo.name;
  newCard.querySelector('.element__title').textContent = cardInfo.name;

// функция обработки лайка 
  handleLikeButtonClick(newCard);
// функция добавления значений в попап показа картинки
  insertCardValue(newCard, cardInfo);
// функция удаления карточки
  handleDeleteButtonClick(newCard);

// возвращаем новый темплейт карточки
  return newCard;
}

/* Функция
param: newCard - темплейт 
param: prepend -
*/
function addNewCard(newCard, prepend = false) {
// если параметр prepend - true
  if (prepend) {
// в elements в верстку вставить новый темплэйт (карточку)
    elementsContainer.prepend(newCard);
// в массив объектов с данными дефолтных карточек вставить в начало массива объект
// с name из нового темплейта, так же - link 
    initialCards.unshift({ name: newCard.name, link: newCard.link });
  }
// в elements вставить новый темплейт
  elementsContainer.append(newCard);
}


// пробежаться по массиву initialCards и каждой карточке 
// initialCards.forEach(function (item) {
//   const newCard = getCard(item);

//   addNewCard(newCard);
// })



/* Функция
*/
function createNewCard(evt) {
  evt.preventDefault();

// создаем новый объект со значениями из инпутов попапа
  const newCard = getCard({ name: inputName.value, link: inputLink.value });

// вызываем функцию, которая вставит новый объект (карточку) в начало контейнера, 
// заменив значения из инпутов попап
  addNewCard(newCard, true);

// закрывает попап
  closePopup(popupAddPlace);

// стирает значения из инпутов
  inputName.value = '';
  inputLink.value = '';

// функция валидации
  disableSubmit(btnAddPlace);
}





/* Функция 
*/
function closePopupByEsc(evt) {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(activePopup);
  }
}

/* Функция 
*/
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
  //closePopupByOverlayClick(closeObj.overlay, closeObj.popup)
}

// событие создания новой карточки
createForm.addEventListener('submit', createNewCard);

// событие открытия попапа редактирования профиля
popupEditBtn.addEventListener('click', function () {
  openPopup(popupEditProfile);
});

// событие закрытия попапа редактирования профиля
closeBtnEditForm.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

// событие открытия попапа создания новой карточки
popupAddPlaceBtn.addEventListener('click', function () {
  openPopup(popupAddPlace);
});

// событие закрытия попапа создания новой карточки
closeBtnAddPlace.addEventListener('click', function () {
  closePopup(popupAddPlace);
})

// событие закрытия попапа показа картинки
closeBtnShowImage.addEventListener('click', function () {
  closePopup(popupShowImage);
})

// событие изменения данных профиля
editForm.addEventListener('submit', addProfileInfo);

// событие изменения данных профиля
popupEditBtn.addEventListener('click', insertProfileValue);
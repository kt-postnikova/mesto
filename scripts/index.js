// Элементы Profile
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputJob = document.querySelector('.popup__input_type_job');

// Попапы
const popupEditForm = document.querySelector('.popup_type_edit-form');
const popupAddPlace = document.querySelector('.popup_type_add-place');
const popupShowImage = document.querySelector('.popup_type_show-image');

// Кнопки для открытия попапов
const popupEditBtn = document.querySelector('.profile__button');
const popupAddPlaceBtn = document.querySelector('.profile__add-button');

// Кнопки закрытия попапов
const closeBtnEditForm = popupEditForm.querySelector('.popup__close');
const closeBtnAddPlace = popupAddPlace.querySelector('.popup__close');
const closeBtnShowImage = popupShowImage.querySelector('.popup__close');

// Контейнер для карточек
const elementsContainer = document.querySelector('.elements');

// Формы отправки
const editForm = document.querySelector('.popup__form');
const createForm = popupAddPlace.querySelector('.popup__form_type_add-place');

// Template карточки
const cardTemplate = document.querySelector('#template-element').content;

// Инпуты попапа новой карточки
const inputName = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');


function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function addProfileInfo(evt) {
  evt.preventDefault();

  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;

  closePopup(popupEditForm);
}

function insertProfileValue(evt) {
  evt.preventDefault();

  popupInputName.value = profileName.innerText;
  popupInputJob.value = profileJob.innerText;
}

function handleLikeButtonClick(cardTemplate) {
  const likeBtn = cardTemplate.querySelector('.element__like');

  likeBtn.addEventListener('click', function (event) {
    event.target.classList.toggle('element__like_active');
  })
}

function handleDeleteButtonClick(cardTemplate) {
  const removeBtn = cardTemplate.querySelector('.element__trash-btn');

  removeBtn.addEventListener('click', function () {
    const listItem = removeBtn.closest('.element');
    listItem.remove();
  })
}

function insertCardValue(cardTemplate, cardInfo) {
  cardTemplate.querySelector('.element__image').addEventListener('click', function (event) {

    popupShowImage.querySelector('.popup__overlay').src = cardInfo.link;
    popupShowImage.querySelector('.popup__caption').textContent = cardInfo.name;

    openPopup(popupShowImage);
  })
}

function getCard(cardInfo) {
  const newCard = cardTemplate.cloneNode(true);

  newCard.querySelector('.element__image').src = cardInfo.link;
  newCard.querySelector('.element__image').alt = cardInfo.name;
  newCard.querySelector('.element__title').textContent = cardInfo.name;

  handleLikeButtonClick(newCard);
  insertCardValue(newCard, cardInfo);
  handleDeleteButtonClick(newCard);

  return newCard;
}

function addNewCard(newCard, prepend = false) {
  if (prepend) {
    elementsContainer.prepend(newCard);
    initialCards.unshift({ name: newCard.name, link: newCard.link });
  }
  elementsContainer.append(newCard);
}

initialCards.forEach(function (item) {
  const newCard = getCard(item);

  addNewCard(newCard);
})

function createNewCard(evt) {
  evt.preventDefault();

  const newCard = getCard({ name: inputName.value, link: inputLink.value });
  addNewCard(newCard, true);

  closePopup(popupAddPlace);

  inputName.value = '';
  inputLink.value = '';
}



createForm.addEventListener('submit', createNewCard);
popupEditBtn.addEventListener('click', function () {
  openPopup(popupEditForm);
});
closeBtnEditForm.addEventListener('click', function () {
  closePopup(popupEditForm);
});
popupAddPlaceBtn.addEventListener('click', function () {
  openPopup(popupAddPlace);
});
closeBtnAddPlace.addEventListener('click', function () {
  closePopup(popupAddPlace);
})
closeBtnShowImage.addEventListener('click', function () {
  closePopup(popupShowImage);
})
editForm.addEventListener('submit', addProfileInfo);
popupEditBtn.addEventListener('click', insertProfileValue);
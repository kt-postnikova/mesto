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

  closePopup(popupEditProfile);
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

    popupShowImage.querySelector('.popup__image').src = cardInfo.link;
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

  disableSubmit(btnAddPlace);
}

const closePopupByEsc = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));

  popupList.forEach(function (popupElement) {

      document.addEventListener('keydown', function (evt) {
          if (evt.key === 'Escape') {
              closePopup(popupElement);
          }
      })
  })
}

const closePopupByOverlayClick = (overlayElement, popupElement) => {
  const overlayList = Array.from(document.querySelectorAll('.popup__overlay'));

  overlayList.forEach(function () {
      overlayElement.addEventListener('mousedown', function () {
          closePopup(popupElement);
      })
  })
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
  closePopupByOverlayClick(closeObj.overlay, closeObj.popup)
}

createForm.addEventListener('submit', createNewCard);
popupEditBtn.addEventListener('click', function () {
  openPopup(popupEditProfile);
});
closeBtnEditForm.addEventListener('click', function () {
  closePopup(popupEditProfile);
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
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


function openPopup(popup) {
  popupInputName.value = profileName.innerText;
  popupInputJob.value = profileJob.innerText;

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

function getTemplateCard() {
  const cardTemplate = document.querySelector('#template-element').content;
  const newCard = cardTemplate.cloneNode(true);

  return newCard;
}

function getLikeCard(cardTemplate) {
  const likeBtn = cardTemplate.querySelector('.element__like');

  likeBtn.addEventListener('click', function (event) {
    const elementTagetList = event.target.classList;
    const likeElement = 'element__like_active'
    if (elementTagetList.contains(likeElement)) {
      elementTagetList.remove(likeElement)
    } else {
      elementTagetList.add('element__like_active');
    }
  })
}

function getDeleteCard(cardTemplate) {
  const removeBtn = cardTemplate.querySelector('.element__trash-btn');

  removeBtn.addEventListener('click', function () {
    const listItem = removeBtn.closest('.element');
    listItem.remove();
  })
}

function getPopupCard(cardTemplate, cardInfo) {
  cardTemplate.querySelector('.element__image').addEventListener('click', function (event) {

    let popupShowImage = document.querySelector('.popup_type_show-image');
    popupShowImage.querySelector('.popup__overlay').src = cardInfo.link;
    popupShowImage.querySelector('.popup__caption').textContent = cardInfo.name;

    popupShowImage.classList.add('popup_opened');
  })
}

function getCard(cardInfo) {
  let cardTemplate = getTemplateCard();

  cardTemplate.querySelector('.element__image').src = cardInfo.link;
  cardTemplate.querySelector('.element__title').textContent = cardInfo.name;

  getLikeCard(cardTemplate);
  getPopupCard(cardTemplate, cardInfo);
  getDeleteCard(cardTemplate);
  return cardTemplate;
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
  const inputName = document.querySelector('.popup__input_type_title').value;
  const inputLink = document.querySelector('.popup__input_type_link').value;

  document.querySelector('.popup__input_type_title').value = '';
  document.querySelector('.popup__input_type_link').value = '';

  const newCard = getCard({ name: inputName, link: inputLink });
  addNewCard(newCard, true);

  closePopup(popupAddPlace);
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

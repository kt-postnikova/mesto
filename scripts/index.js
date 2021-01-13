let container = document.querySelector('.page');
let popup = container.querySelector('.popup');
let editButton = container.querySelector('.profile__button');
let popupCloseBtn = container.querySelector('.popup__close');
let popupForm = container.querySelector('.popup__form');
let profileName = container.querySelector('.profile__name');
let profileJob = container.querySelector('.profile__job');
let inputName = container.querySelector('.popup__input_type_name');
let inputJob = container.querySelector('.popup__input_type_job');


const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


function openEditBtn() {
    inputName.value = profileName.innerText;
    inputJob.value = profileJob.innerText;

    popup.classList.add('popup_opened');
}

function closeEditBtn() {
    popup.classList.remove('popup_opened');
}

function addProfileInfo(evt) {
    evt.preventDefault();

    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;

    closeEditBtn()
}


editButton.addEventListener('click', openEditBtn);
popupCloseBtn.addEventListener('click', closeEditBtn);
popupForm.addEventListener('submit', addProfileInfo);

let addPlaceBtn = container.querySelector('.profile__add-button');
let popupAddPlace = container.querySelector('.popup_type_add-place');
let closeAddPlaceBtn = container.querySelector('.popup__close_type_add-place');

function addPlace() {
  popupAddPlace.classList.add('popup_opened');
}
addPlaceBtn.addEventListener('click', addPlace);

let createBtn = document.querySelector('.popup__button_type_add-place');
let createForm = document.querySelector('.popup__form_type_add-place')

function createPlace(evt) {
  evt.preventDefault();

  const inputTitle = document.querySelector('.popup__input_type_title');
  const inputLink = document.querySelector('.popup__input_type_link');

  initialCards.unshift({name: inputTitle.value, link: inputLink.value});

  cleanupCards()
  renderCards()
  closeAddPlace()
}
createForm.addEventListener('submit', createPlace)

function closeAddPlace() {
  popupAddPlace.classList.remove('popup_opened');
}

closeAddPlaceBtn.addEventListener('click', closeAddPlace);

function renderCards() {
  initialCards.forEach(data => {
    const elementTemplate = document.querySelector('#template-element').content;
    const elementsContainer = document.querySelector('.elements');
    
    const element = elementTemplate.cloneNode(true);
    
    element.querySelector('.element__image').src = data.link;
    element.querySelector('.element__title').textContent = data.name;
    
    elementsContainer.append(element);
  });
}

function cleanupCards() {
  const cardElements = document.querySelectorAll('.element')
  cardElements.forEach(element => {
    element.remove();
  })
}

renderCards()
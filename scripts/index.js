let container = document.querySelector('.page');
let popup = container.querySelector('.popup');
let editButton = container.querySelector('.profile__button');
let popupCloseBtn = container.querySelector('.popup__close');
let popupForm = container.querySelector('.popup__form');
let profileName = container.querySelector('.profile__name');
let profileJob = container.querySelector('.profile__job');
let inputName = container.querySelector('.popup__input_type_name');
let inputJob = container.querySelector('.popup__input_type_job');

let addPlaceBtn = container.querySelector('.profile__add-button');
let popupAddPlace = container.querySelector('.popup_type_add-place');
let closeAddPlaceBtn = container.querySelector('.popup__close_type_add-place');
let createBtn = document.querySelector('.popup__button_type_add-place');
let createForm = document.querySelector('.popup__form_type_add-place');


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

// Открывает попап редактирования профиля; в инпутах - значения со страницы
function openEditPopup() {
    inputName.value = profileName.innerText;
    inputJob.value = profileJob.innerText;

    popup.classList.add('popup_opened');
}

// Закрывает попап редактирования профиля (клик на "крестик")
function closeEditPopup() {
    popup.classList.remove('popup_opened');
}

// Выставляет значения инпутов из попапа на страницу
function addProfileInfo(evt) {
    evt.preventDefault();

    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;

    closeEditBtn()
}

// Открывает попап создания нового места
function openPlacePopup() {
  popupAddPlace.classList.add('popup_opened');
}

// Закрывает попап создания нового места (клик на "крестик")
function closePlacePopup() {
  popupAddPlace.classList.remove('popup_opened');
}

// Создание новой карточки места; берет значения из инпутов попапа и создает новый
// объект в массиве initialCards
function createPlace(evt) {
  evt.preventDefault();

  const inputTitle = document.querySelector('.popup__input_type_title');
  const inputLink = document.querySelector('.popup__input_type_link');

  const newCard = {
    name: inputTitle.value, 
    link: inputLink.value
  };

  initialCards.unshift(newCard);
  // удаляет уже созданные элементы со страницы, 
  // чтобы заменить их массивом с новым элементом
  cleanupCards() 
  renderCards() // создает темплейты объектов из массива
  closePlacePopup()
}

// Создает темплейты объектов из массива
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

// Удаляет уже созданные элементы со страницы
function cleanupCards() {
  const cardElements = document.querySelectorAll('.element')
  cardElements.forEach(element => {
    element.remove();
  })
}

editButton.addEventListener('click', openEditPopup);
popupCloseBtn.addEventListener('click', closeEditPopup);
popupForm.addEventListener('submit', addProfileInfo);
addPlaceBtn.addEventListener('click', openPlacePopup);
createForm.addEventListener('submit', createPlace)
closeAddPlaceBtn.addEventListener('click', closePlacePopup);

renderCards()


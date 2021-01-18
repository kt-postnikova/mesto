const container = document.querySelector('.page');
const profileName = container.querySelector('.profile__name');
const profileJob = container.querySelector('.profile__job');
const editButton = container.querySelector('.profile__button');
const addPlaceBtn = container.querySelector('.profile__add-button');
const popupAddPlace = container.querySelector('.popup_type_add-place');
const popup = container.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close');
const popupForm = popup.querySelector('.popup__form');
const inputName = popup.querySelector('.popup__input_type_name');
const inputJob = popup.querySelector('.popup__input_type_job');
const closeAddPlaceBtn = popupAddPlace.querySelector('.popup__close_type_add-place');
const createBtn = popupAddPlace.querySelector('.popup__button_type_add-place');
const createForm = popupAddPlace.querySelector('.popup__form_type_add-place');


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

    closeEditPopup()
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
renderCards()

// Удаляет уже созданные элементы со страницы
function cleanupCards() {
  const cardElements = document.querySelectorAll('.element')
  cardElements.forEach(element => {
    element.remove();
  })
}


// Проставление лайков
const likeBtn = document.querySelectorAll('.element__like');
likeBtn.forEach(function(item) {
  item.addEventListener('click', function (event) {
    const elementTagetList = event.target.classList;
    const likeElement = 'element__like_active'
    if (elementTagetList.contains(likeElement)) {
      elementTagetList.remove(likeElement)
    } else {
      elementTagetList.add('element__like_active');
    }
  });
})

// Удаление по клику на иконку
const trashBtn = document.querySelectorAll('.element__trash-btn');
function removeCardEvent() {
  trashBtn.forEach(function(item) {
    item.addEventListener('click', function () {
      initialCards.shift()
      cleanupCards()
      renderCards()
    })
  });
};
removeCardEvent()

editButton.addEventListener('click', openEditPopup);
popupCloseBtn.addEventListener('click', closeEditPopup);
popupForm.addEventListener('submit', addProfileInfo);
addPlaceBtn.addEventListener('click', openPlacePopup);
createForm.addEventListener('submit', createPlace)
closeAddPlaceBtn.addEventListener('click', closePlacePopup);
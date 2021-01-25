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

function openEditPopup() {
    inputName.value = profileName.innerText;
    inputJob.value = profileJob.innerText;

    popup.classList.add('popup_opened');
}

function closeEditPopup() {
    popup.classList.remove('popup_opened');
}

function addProfileInfo(evt) {
    evt.preventDefault();

    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;

    closeEditPopup()
}

function openPlacePopup() {
  popupAddPlace.classList.add('popup_opened');
}

function closePlacePopup() {
  popupAddPlace.classList.remove('popup_opened');
}

const cardTemplate = document.querySelector('#template-element').content;
const elementsContainer = document.querySelector('.elements');
    
function renderCard(name, link, prepend=false) {
  const newCard = cardTemplate.cloneNode(true);
  
  newCard.querySelector('.element__image').src = link;
  newCard.querySelector('.element__title').textContent = name;
  newCard.querySelector('.image-popup__overlay').src = link;
  newCard.querySelector('.image-popup__caption').textContent = name;


  newCard.querySelector('.element__image').addEventListener('click', function(event) {
    const imagePopup = event.target.parentElement.querySelector('.image-popup');
    imagePopup.classList.add('image-popup_disabled');

    const closeImage = imagePopup.querySelector('.popup__close_place_image-popup');
    closeImage.addEventListener('click', function() {
      imagePopup.classList.add('image-popup_close');
      imagePopup.addEventListener('transitionend', function() {
        imagePopup.classList.remove('image-popup_disabled');
      })
    })
  })

  const removeBtn = newCard.querySelector('.element__trash-btn');
  removeBtn.addEventListener('click', function(){
    const listItem = removeBtn.closest('.element');
    listItem.remove();
  })

  const likeBtn = newCard.querySelector('.element__like');
  likeBtn.addEventListener('click', function (event) {
    const elementTagetList = event.target.classList;
    const likeElement = 'element__like_active'
    if (elementTagetList.contains(likeElement)) {
      elementTagetList.remove(likeElement)
    } else {
      elementTagetList.add('element__like_active');
    }
  })

  if (prepend) {
    elementsContainer.prepend(newCard);
    initialCards.unshift({name: name, link: link});
  }
  elementsContainer.append(newCard);

}

initialCards.forEach(function (item) {
 renderCard(item.name, item.link)
})

function createPlace(evt) {
  evt.preventDefault();
  let placeInputName = document.querySelector('.popup__input_type_title').value;
  let placeInputLink = document.querySelector('.popup__input_type_link').value;

 renderCard(placeInputName, placeInputLink, true);
  closePlacePopup();
  document.querySelector('.popup__input_type_title').value = '';
  document.querySelector('.popup__input_type_link').value = '';
}


createForm.addEventListener('submit', createPlace);
editButton.addEventListener('click', openEditPopup);
popupCloseBtn.addEventListener('click', closeEditPopup);
popupForm.addEventListener('submit', addProfileInfo);
addPlaceBtn.addEventListener('click', openPlacePopup);
closeAddPlaceBtn.addEventListener('click', closePlacePopup);
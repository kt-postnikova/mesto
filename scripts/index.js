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
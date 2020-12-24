let container = document.querySelector('.page');
let popup = container.querySelector('.popup');
let editButton = container.querySelector('.profile__button');
let popupCloseBtn = container.querySelector('.popup__close');
let profileContainer = container.querySelector('.profile__info');
let saveInfoBtn = container.querySelector('.popup__button');

let profileName = container.querySelector('.profile__name');
let profileJob = container.querySelector('.profile__job');



function openEditBtn() {
    document.querySelector('.popup__input_type_name').value = profileName.innerText;
    document.querySelector('.popup__input_type_job').value = profileJob.innerText;

    popup.classList.add('popup_opened');
}

editButton.addEventListener('click', openEditBtn);

function closeEditBtn() {
    popup.classList.remove('popup_opened');
}

popupCloseBtn.addEventListener('click', closeEditBtn);

function addProfileInfo(evt) {
    evt.preventDefault();

    let name = container.querySelector('.popup__input_type_name');
    let job = container.querySelector('.popup__input_type_job');

    profileName.textContent = name.value;
    profileJob.textContent = job.value;

    closeEditBtn()
}

saveInfoBtn.addEventListener('click', addProfileInfo);


let formElement = document.querySelector('.popup__form');

function handleFormSubmit (evt) {
    evt.preventDefault(); 

    let nameInput = document.querySelector('.popup__input_type_name');
    let jobInput = document.querySelector('.popup__input_type_job');

    let name = nameInput.value;
    let job = jobInput.value;

    profileName.textContent = name.value;
    profileJob.textContent = job.value;
}

formElement.addEventListener('submit', handleFormSubmit); 

let likeBtn = container.querySelectorAll('.element__like');

function clickLikeBtn(index) {
    if (likeBtn[index].src.includes('like.svg')) {
        likeBtn[index].setAttribute('src', './images/like-active.svg');
    }
    else {
        likeBtn[index].setAttribute('src', './images/like.svg');
    }
}

for (let i = 0; i < likeBtn.length; i++) {
    let likeElement = likeBtn[i];
    likeElement.addEventListener('click', function() {
        clickLikeBtn(i);
    })
}

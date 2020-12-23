// let editButton = document.querySelector('.profile__button');
// let popup = document.querySelector('.popup');
// let popupClose = document.querySelector('.popup__close');
// let popupForm = document.querySelector('.popup__form');

// let profileContainer = document.querySelector('.profile');
// let profileInfo = document.querySelectorAll('.profile__info');
// let saveButton = document.querySelector('.popup__button');


// function clickButton() {
//     let name = document.querySelector('.profile__name').value;
//     let job = document.querySelector('.profile__job').value;
//     document.querySelector('.popup__input_type_name').value = name;
//     document.querySelector('.popup__input_type_job').value = job;
//     popup.classList.add('popup_opened');
// }
// editButton.addEventListener('click', clickButton);

// function closeEdit() {
//     popup.classList.remove('popup_opened');
// }

// popupClose.addEventListener('click', closeEdit);

// function editInfo(evt) {
//     evt.preventDefault();
//     let name = document.querySelector('.popup__input_type_name');
//     let job = document.querySelector('.popup__input_type_job');

//     profileContainer.innerHTML = `
//     <div class="profile__info">
//         <h2 class="profile__name">${name.value}</h2>
//         <p class="profile__job">${job.value}</p>
//     </div>`;
// }

// saveButton.addEventListener('click', editInfo);

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





// Находим форму в DOM
let formElement = document.querySelector('.popup__form')

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = document.querySelector('.popup__input_type_name');
    let jobInput = document.querySelector('.popup__input_type_job');

    // Получите значение полей из свойства value
    // let name = nameInput.value;
    // let job = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей
    let name = nameInput.value;
    let job = jobInput.value;

    // Вставьте новые значения с помощью textContent
    profileName.textContent = name.value;
    profileJob.textContent = job.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 


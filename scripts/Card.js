// const popupShowImage = document.querySelector('.popup_type_show-image');
// const cardTemplate = document.querySelector('#template-element');
//const createForm = popupAddPlace.querySelector('.form_type_add-place');
const inputName = document.querySelector('.form__input_type_title');
const inputLink = document.querySelector('.form__input_type_link');
const elementsContainer = document.querySelector('.elements');

class Card {
    constructor(link, name) {// метод, вызвается при создании нового объекта класса, заполняет объект данными
        this.link = link;
        this.name = name;
        // this.templateSelector = templateSelector;
    }

    getTemplate() { // функция возвращает разметку, забирает разветку из HTML и клонирует элемент
        const newCard = document
            .querySelector('#template-element')
            .content
            .querySelector('.element')
            .cloneNode(true);

        // handleLikeButtonClick(newCard);
        // insertCardValue(newCard, cardInfo);
        // handleDeleteButtonClick(newCard);

        return newCard; // возвращает DOM-элемент карточки
    }

    generateCard() { // подготавливает карточку к публикации, добавляет данные в разметку
        this.element = this.getTemplate(); // записывает разметку, чтобы иметь к ней доступ
        //this.setEventListeners();
        this.handleLikeButtonClick();

        this.element.querySelector('.element__image').src = this.link;
        this.element.querySelector('.element__image').alt = this.name;
        this.element.querySelector('.element__title').textContent = this.name;

        return this.element; // возвращаем элемент наружу
    }

    // insertCardValue(cardTemplate, cardInfo) {
    //     cardTemplate.querySelector('.element__image').addEventListener('click', function () {

    //         popupShowImage.querySelector('.popup__image').src = cardInfo.link;
    //         popupShowImage.querySelector('.popup__caption').textContent = cardInfo.name;

    //         openPopup(popupShowImage);
    //     })
    // }

    // addNewCard(newCard, prepend = false) {
    //     if (prepend) {
    //         elementsContainer.prepend(newCard);
    //         initialCards.unshift({ name: newCard.name, link: newCard.link });
    //     }
    //     elementsContainer.append(newCard);
    // }

    setEventListeners() {
        this.createForm = document.querySelector('.form_type_add-place');
        this.element.addEventListener('submit', () => {
            this.createCard();
        })
    }

    createCard(evt) {
        //evt.preventDefault();
    
        const newCard = this.generateCard({name: inputName.value, link: inputLink.value });
        elementsContainer.append(newCard);

        console.log(newCard);

        //addNewCard(newCard, true);
    
        //closePopup(popupAddPlace);
    
        //inputName.value = '';
        //inputLink.value = '';
    
        //disableSubmit(btnAddPlace);
    }

    handleLikeButtonClick() {
        const likeBtn = this.element.querySelector('.element__like');
      
        likeBtn.addEventListener('click', function (event) {
          event.target.classList.toggle('element__like_active');
        })
    }

    handleDeleteButtonClick() {
        const removeBtn = this.element.querySelector('.element__trash-btn');
      
        removeBtn.addEventListener('click', function () {
          const listItem = removeBtn.closest('.element');
          listItem.remove();
        })
    }
}


//const card54 = new Card('fdsfds', 'sfsdf');
//card54.createCard();

// initialCards.forEach(function (item) {
//     const newCard = getCard(item);

//     addNewCard(newCard);
// })

initialCards.forEach((item) => { // обходим массив для каждого элемента:
    const card = new Card(item.link, item.name); // создает экземпляр карточки
    const cardElement = card.generateCard(); // создает карточку и возвращает наружу

    document.querySelector('.elements').append(cardElement); // добавляет в DOM
})
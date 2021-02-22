export default class Card {
    constructor(data, selectors, template) {
        this.link = data.link;
        this.name = data.name;
        this.selectors = selectors;
        this.template = template;
        this._card;
    }

    _getTemplate() { // забираем вёрстку шаблона
        const cardTemplate = document
            .querySelector(this.template)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardTemplate; // получаем пустой элемент, который нужно опубликовать, чтобы он стал карточкой с данными
    }

    generateCard() {
        this._card = this._getTemplate(); // cardTemplate
        this.setEventListeners();

        this._card.querySelector('.element__image').src = this.link;
        this._card.querySelector('.element__image').alt = this.name;
        this._card.querySelector('.element__title').textContent = this.name;
    }

    appendCard() {
        this.generateCard()
        this.selectors['cardContainer'].prepend(this._card); // вставляем шаблон (карточку) в верстку
        this.selectors['popupAddPlace'].classList.remove('popup_opened');
    }

    setEventListeners() {
        const likeBtn = this._card.querySelector('.element__like');
        likeBtn.addEventListener('click', function(evt) {
            evt.target.classList.toggle('element__like_active');
        })

        const trashBtn = this._card.querySelector('.element__trash-btn');
        trashBtn.addEventListener('click', function() {
            const selectedCard = trashBtn.closest('.element');
            selectedCard.remove();
        })

        const cardImage = this._card.querySelector('.element__image');
        let popupShowImageSelector = this.selectors['popupShowImage']
        cardImage.addEventListener('click', function() {
            popupShowImageSelector.querySelector('.popup__image').src = cardImage.src;
            popupShowImageSelector.querySelector('.popup__caption').textContent = cardImage.alt;
            popupShowImageSelector.classList.add('popup_opened');
        })
    }
}
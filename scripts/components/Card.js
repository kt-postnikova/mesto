//import { openPopup } from '../utilis.js'

export default class Card {
    constructor(data, selectors, template) {
        this.link = data.link;
        this.name = data.name;
        this.selectors = selectors;
        this.template = template;
    }

    _getTemplate() {
        const cardTemplate = document
            .querySelector(this.template)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardTemplate;
    }

    generateCard() {
        const card = this._getTemplate();
        this._setEventListeners(card);

        card.querySelector('.element__image').src = this.link;
        card.querySelector('.element__image').alt = this.name;
        card.querySelector('.element__title').textContent = this.name;

        return card
    }

    _likeCard(evt) {
        evt.target.classList.toggle('element__like_active');
    }

    _deleteCard(trashBtn) {
        const selectedCard = trashBtn.closest('.element');
        selectedCard.remove();
    }

    _insertCardImageValue(cardImage) {
        const popupShowImageSelector = this.selectors['popupShowImage']
        popupShowImageSelector.querySelector('.popup__image').src = cardImage.src;
        popupShowImageSelector.querySelector('.popup__caption').textContent = cardImage.alt;
        openPopup(popupShowImageSelector);
    }

    _setEventListeners(card) {
        const likeBtn = card.querySelector('.element__like');
        likeBtn.addEventListener('click', this._likeCard)

        const trashBtn = card.querySelector('.element__trash-btn');
        trashBtn.addEventListener('click', () => {
            this._deleteCard(trashBtn)
        })

        const cardImage = card.querySelector('.element__image');
        cardImage.addEventListener('click', () => {
            this._insertCardImageValue(cardImage)
        })
    }
}
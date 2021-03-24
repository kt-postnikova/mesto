export default class Card {
    constructor({ data, cardSelector, handleCardClick }) {
        this.data = data;
        this.handleCardClick = handleCardClick;
        this.cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardTemplate = document
            .querySelector(this.cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardTemplate;
    }

    generateCard() {
        const card = this._getTemplate();
        this.setEventListeners(card);

        card.querySelector('.element__image').src = this.data.link;
        card.querySelector('.element__image').alt = this.data.name;
        card.querySelector('.element__title').textContent = this.data.name;


        return card;
    }

    _likeCard(evt) {
        evt.target.classList.toggle('element__like_active')
    }

    setEventListeners(card) {
        const likeBtn = card.querySelector('.element__like');
        likeBtn.addEventListener('click', this._likeCard);

        const trashBtn = card.querySelector('.element__trash-btn');
        trashBtn.addEventListener('click', () => {
            const deletedCard = trashBtn.parentElement;
            deletedCard.remove();
        });


        const cardImage = card.querySelector('.element__image');
        cardImage.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.handleCardClick(this.data);
        })
    }
}
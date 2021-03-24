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
        const cardImage = card.querySelector('.element__image');
        const cardTitle = card.querySelector('.element__title');
        this.setEventListeners(card);

        cardImage.src = this.data.link;
        cardImage.alt = this.data.name;
        cardTitle.textContent = this.data.name;


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
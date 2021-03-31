export default class Card {
    constructor({ data, cardSelector, handleCardClick, api }) {
        this.data = data;
        this.handleCardClick = handleCardClick;
        this.cardSelector = cardSelector;
        this.api = api;
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

        this._likeCounter(card, this.data.likes.length)
        return card;
    }

    _likeCounter(card, count) {
        const counter = card.querySelector('.like__counter')
        counter.textContent = count;
    }

    _likeCard(card) {
        const likeBtn = card.querySelector('.like__button');
        likeBtn.addEventListener('click', (evt) => {
            evt.target.classList.toggle('like__button_active')
            if (likeBtn.classList.contains('like__button_active')) {
                this.api.putLike(this.data._id).then(res => {
                    this._likeCounter(card, res.likes.length);
                })
            } else {
                this.api.removeLike(this.data._id).then(res => {
                    this._likeCounter(card, res.likes.length);
                })
            };
        });
    }

    _deleteCard(card) {
        const trashBtn = card.querySelector('.element__trash-btn');
        trashBtn.addEventListener('click', () => {
            const deletedCard = trashBtn.parentElement;
            deletedCard.remove();
        });
    }

    _showImage(card) {
        const cardImage = card.querySelector('.element__image');
        cardImage.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.handleCardClick(this.data);
        })
    }

    setEventListeners(card) {
        this._likeCard(card);
        this._deleteCard(card);
        this._showImage(card);
    }
}
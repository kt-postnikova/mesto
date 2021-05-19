export default class Card {
    constructor(cardInfo, { handleCardClick, handleLikeCard, handleCardDelete }, templateSelector, userData, api) {
        this.cardInfo = cardInfo;
        this.handleCardClick = handleCardClick;
        this.handleLikeCard = handleLikeCard;
        this.handleCardDelete = handleCardDelete;
        this.templateSelector = templateSelector;
        this.userData = userData;
        this.api = api;
    }

    _getTemplate() {
        const CARD_ELEMENT = this.templateSelector
            .content
            .querySelector('.element')
            .cloneNode(true);

        return CARD_ELEMENT;
    }

    generateCard() {
        this.cardElement = this._getTemplate();
        this._setEventListeners();
        this._setLikeCounter(this.cardInfo.likes.length);
        this._hideDeleteButton();

        const CARD_IMAGE = this.cardElement.querySelector('.element__image');
        const CARD_TITLE = this.cardElement.querySelector('.element__title');

        CARD_IMAGE.src = this.cardInfo.link;
        CARD_IMAGE.alt = this.cardInfo.name;
        CARD_TITLE.textContent = this.cardInfo.name;

        if (this.cardInfo.likes.find(user => this.userData === user._id)) {
            this.cardElement.querySelector('.like__button').classList.add('like__button_active')
        }

        return this.cardElement;
    }

    likeCard() {
        const BUTTON_LIKE_CARD = this.cardElement.querySelector('.like__button');

        if (!(BUTTON_LIKE_CARD.classList.contains('like__button_active'))) {
            this.api.putLike(this.cardInfo._id)
                .then(cardInfo => {
                    BUTTON_LIKE_CARD.classList.add('like__button_active');
                    this._setLikeCounter(cardInfo.likes.length)
                })
                .catch(err => {
                    console.log(err)
                });
        }
        else {
            this.api.deleteLike(this.cardInfo._id)
                .then(cardInfo => {
                    BUTTON_LIKE_CARD.classList.remove('like__button_active');
                    this._setLikeCounter(cardInfo.likes.length)
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }

    _setLikeCounter(count) {
        const LIKE_COUNTER = this.cardElement.querySelector('.like__counter');
        LIKE_COUNTER.textContent = count
    }

    _hideDeleteButton() {
        if (this.cardInfo.owner._id !== this.userData) {
            const DELETE_BUTTON = this.cardElement.querySelector('.element__trash-btn');
            DELETE_BUTTON.setAttribute('style', 'display:none')
        }
    }

    removeCard() {
        this.cardElement.remove();
    }

    _setEventListeners() {
        this.cardElement.querySelector('.like__button').addEventListener('click', () => {
            this.handleLikeCard();
        })

        this.cardElement.querySelector('.element__trash-btn').addEventListener('click', () => {
            this.handleCardDelete();
        })

        this.cardElement.querySelector('.element__image').addEventListener('click', () => {
            this.handleCardClick();
        })
    }
}
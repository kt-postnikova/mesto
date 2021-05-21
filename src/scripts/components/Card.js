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
        const cardElement = this.templateSelector
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this.cardElement = this._getTemplate();
        this._setEventListeners();
        this._setLikeCounter(this.cardInfo.likes.length);
        this._hideDeleteButton();

        const cardImage = this.cardElement.querySelector('.element__image');
        const cardTitle = this.cardElement.querySelector('.element__title');

        cardImage.src = this.cardInfo.link;
        cardImage.alt = this.cardInfo.name;
        cardTitle.textContent = this.cardInfo.name;

        if (this.cardInfo.likes.find(user => this.userData === user._id)) {
            this.cardElement.querySelector('.like__button').classList.add('like__button_active')
        }

        return this.cardElement;
    }

    likeCard() {
        const buttonLikeCard = this.cardElement.querySelector('.like__button');

        if (!(buttonLikeCard.classList.contains('like__button_active'))) {
            this.api.putLike(this.cardInfo._id)
                .then(cardInfo => {
                    buttonLikeCard.classList.add('like__button_active');
                    this._setLikeCounter(cardInfo.likes.length)
                })
                .catch(err => {
                    console.log(err)
                });
        }
        else {
            this.api.deleteLike(this.cardInfo._id)
                .then(cardInfo => {
                    buttonLikeCard.classList.remove('like__button_active');
                    this._setLikeCounter(cardInfo.likes.length)
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }

    _setLikeCounter(count) {
        const likeCounter = this.cardElement.querySelector('.like__counter');
        likeCounter.textContent = count
    }

    _hideDeleteButton() {
        if (this.cardInfo.owner._id !== this.userData) {
            const deleteButton = this.cardElement.querySelector('.element__trash-btn');
            deleteButton.setAttribute('style', 'display:none')
        }
    }

    removeCard() {
        this.cardElement.remove();
        this.cardElement = null;
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
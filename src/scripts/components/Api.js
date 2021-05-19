export default class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    getCards() {
        return fetch(`${this.baseUrl}` + '/cards', {
            headers: this.headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    createCard(inputValues) {
        return fetch(`${this.baseUrl}` + '/cards', {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: inputValues.name,
                link: inputValues.link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}` + '/cards/' + `${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    putLike(cardId) {
        return fetch(`${this.baseUrl}` + '/cards/likes/' + `${cardId}`, {
            method: 'PUT',
            headers: this.headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    deleteLike(cardId) {
        return fetch(`${this.baseUrl}` + '/cards/likes/' + `${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}` + '/users/me', {
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    editUserInfo(inputValues) {
        return fetch(`${this.baseUrl}` + '/users/me', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: inputValues.name,
                about: inputValues.about
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    editAvatar(inputValues) {
        return fetch(`${this.baseUrl}` + '/users/me/avatar', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: inputValues.link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }
}
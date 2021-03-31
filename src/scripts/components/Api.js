export default class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    getCards() {
        return fetch(this.url + '/cards', {
            headers: this.headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Произошла ошибка с кодом ${res.status}`));
            })
            .catch(err => Promise.reject(err))
    }

    putLike(cardId) {
        return fetch(`${this.url}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.headers,
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(`Произошла ошибка с кодом ${res.status}`));
        })
            .catch(err => Promise.reject(err))
    }

    removeLike(cardId) {
        return fetch(`${this.url}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(`Произошла ошибка с кодом ${res.status}`));
        })
            .catch(err => Promise.reject(err))
    }


    getUserInfo() {
        return fetch(`${this.url}/users/me/`, {
            headers: this.headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Произошла ошибка с кодом ${res.status}`));
            })
            .catch(err => Promise.reject(err))
    }


}

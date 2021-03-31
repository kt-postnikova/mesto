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

    createCard(card) {
        return fetch(this.url + '/cards', {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })
        })

            .then(res => {

            })
    }

    deleteCard(id) {
        return fetch(`${this.url}/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
    }

    addLikeCard(cardId) {
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

    deleteLikeCard(cardId) {
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

// export default class Api {
//     getUserInfo() {
//         fetch('https://mesto.nomoreparties.co/v1/cohort-21/users/me', {
//             headers: {
//                 authorization: 'b9ddb8ca-c8e3-475f-814b-c43ae8005cc3'
//             }
//         })
//             .then(res => res.json())
//             .then((result) => {
//                 console.log(result);
//             });
//     }

//     getCards() {
//         return fetch('https://mesto.nomoreparties.co/v1/cohort-21/cards', {
//             headers: {
//                 authorization: 'b9ddb8ca-c8e3-475f-814b-c43ae8005cc3'
//             }
//         })
//         // .then((res) => {
//         //     return res.json()
//         // })
//         // .then((res) => {
//         //     return res.name;
//         // });
//     }

//     editUserInfo() {
//         fetch('https://mesto.nomoreparties.co/v1/cohort-21/users/me', {
//             method: 'PATCH',
//             headers: {
//                 authorization: 'b9ddb8ca-c8e3-475f-814b-c43ae8005cc3',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 name: 'Marie Skłodowska Curie',
//                 about: 'Physicist and Chemist'
//             })
//         });
//     }

//     addNewCard() {
//         fetch('https://mesto.nomoreparties.co/v1/cohort-21/cards', {
//             method: 'POST',
//             headers: {
//                 authorization: 'b9ddb8ca-c8e3-475f-814b-c43ae8005cc3',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 name: 'Omsk',
//                 link: 'http://omsk.ru'
//             })
//         });
//     }
// }
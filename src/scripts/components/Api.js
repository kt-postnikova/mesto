export default class Api {
    getUserInfo() {
        fetch('https://mesto.nomoreparties.co/v1/cohort-21/users/me', {
            headers: {
                authorization: 'b9ddb8ca-c8e3-475f-814b-c43ae8005cc3'
            }
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result);
            });
    }

    getCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-21/cards', {
            headers: {
                authorization: 'b9ddb8ca-c8e3-475f-814b-c43ae8005cc3'
            }
        })
        // .then((res) => {
        //     return res.json()
        // })
        // .then((res) => {
        //     return res.name;
        // });
    }

    editUserInfo() {
        fetch('https://mesto.nomoreparties.co/v1/cohort-21/users/me', {
            method: 'PATCH',
            headers: {
                authorization: 'b9ddb8ca-c8e3-475f-814b-c43ae8005cc3',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Marie Skłodowska Curie',
                about: 'Physicist and Chemist'
            })
        });
    }

    addNewCard() {
        fetch('https://mesto.nomoreparties.co/v1/cohort-21/cards', {
            method: 'POST',
            headers: {
                authorization: 'b9ddb8ca-c8e3-475f-814b-c43ae8005cc3',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Omsk',
                link: 'http://omsk.ru'
            })
        });
    }
}
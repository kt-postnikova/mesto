export default class UserInfo {
    constructor(userNameSelector, userAboutSelector, avatarSelector, inputName, inputAbout) {
        this.userNameSelector = userNameSelector;
        this.userAboutSelector = userAboutSelector;
        this.avatarSelector = avatarSelector;
        this.inputName = inputName;
        this.inputAbout = inputAbout
    }

    // вствить данные в инпуты
    getUserInfo() {
        this.inputName.value = this.userNameSelector.textContent;
        this.inputAbout.value = this.userAboutSelector.textContent;
        // inputAvatar.value = this.avatarSelector.src
    }

    // добавление данных на страницу
    setUserInfo(inputsValues) {
        this.userNameSelector.textContent = inputsValues.name;
        this.userAboutSelector.textContent = inputsValues.about;
    }

    setAvatar(userData) {
        this.avatarSelector.src = userData.avatar
    }
}
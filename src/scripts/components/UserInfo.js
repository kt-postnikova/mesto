import { inputName, inputAbout, inputAvatar } from '../utils/constants.js';

export default class UserInfo {
    constructor(userNameSelector, userAboutSelector, avatarSelector) {
        this.userNameSelector = userNameSelector;
        this.userAboutSelector = userAboutSelector;
        this.avatarSelector = avatarSelector;
    }

    // вствить данные в инпуты
    getUserInfo() {
        inputName.value = this.userNameSelector.textContent;
        inputAbout.value = this.userAboutSelector.textContent;
        inputAvatar.value = this.avatarSelector.src
    }

    // добавление данных на страницу
    setUserInfo(inputsValues) {
        this.userNameSelector.textContent = inputsValues.name;
        this.userAboutSelector.textContent = inputsValues.about;
    }
}
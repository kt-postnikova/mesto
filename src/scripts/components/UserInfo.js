import { INPUT_NAME, INPUT_ABOUT, INPUT_AVATAR } from '../utils/constants.js';

export default class UserInfo {
    constructor(userNameSelector, userAboutSelector, avatarSelector) {
        this.userNameSelector = userNameSelector;
        this.userAboutSelector = userAboutSelector;
        this.avatarSelector = avatarSelector;
    }

    // вствить данные в инпуты
    getUserInfo() {
        INPUT_NAME.value = this.userNameSelector.textContent;
        INPUT_ABOUT.value = this.userAboutSelector.textContent;
        INPUT_AVATAR.value = this.avatarSelector.src
    }

    // добавление данных на страницу
    setUserInfo(inputsValues) {
        this.userNameSelector.textContent = inputsValues.name;
        this.userAboutSelector.textContent = inputsValues.about;
    }
}
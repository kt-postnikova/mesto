export default class UserInfo {
    constructor(userNameSelector, userAboutSelector, avatarSelector, inputName, inputAbout, inputAvatar) {
        this.userNameSelector = userNameSelector;
        this.userAboutSelector = userAboutSelector;
        this.avatarSelector = avatarSelector;
        this.inputName = inputName;
        this.inputAbout = inputAbout;
        this.inputAvatar = inputAvatar;
    }

    getUserInfo() {
        return {
            name: this.userNameSelector.textContent,
            about: this.userAboutSelector.textContent
        }
    }

    setUserInfo(inputsValues) {
        this.userNameSelector.textContent = inputsValues.name;
        this.userAboutSelector.textContent = inputsValues.about;
    }

    setAvatar(userData) {
        this.avatarSelector.src = userData.avatar
    }
}
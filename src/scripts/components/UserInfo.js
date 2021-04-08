import { inputName, inputJob } from '../utils/constants.js';

export default class UserInfo {
    constructor({ profileName, profileJob }, api) {
        this.profileName = profileName;
        this.profileJob = profileJob;
        this.api = api;
    }

    getUserInfo() {
        inputName.value = this.profileName.textContent
        inputJob.value = this.profileJob.textContent
    }

    setUserInfo(data) {
        this.profileName.textContent = data.name;
        this.profileJob.textContent = data.about;
    }
}
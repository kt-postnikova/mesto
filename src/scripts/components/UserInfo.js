export default class UserInfo {
    constructor({ profileName, profileJob }) {
        this.profileName = profileName;
        this.profileJob = profileJob;
    }

    getUserInfo(data) {
        const userInfo = {
            name: this.profileName.textContent,
            job: this.profileJob.textContent,
        }
        data.inputName.value = userInfo.name;
        data.inputJob.value = userInfo.job;

        return userInfo;
    }

    setUserInfo(data) {
        this.profileName.textContent = data.name;
        this.profileJob.textContent = data.job;
    }
}
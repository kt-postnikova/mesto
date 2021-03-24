export default class UserInfo {
    constructor(data, { profileName, profileJob }) {
        this.profileName = profileName;
        this.profileJob = profileJob;
        this.inputName = data.inputName;
        this.inputJob = data.inputJob
    }

    getUserInfo() {
        const userInfo = {
            name: this.profileName.textContent,
            job: this.profileJob.textContent
        }

        this.inputName.value = userInfo.name;
        this.inputJob.value = userInfo.job;

        return userInfo

    }

    setUserInfo(data) {
        this.profileName.textContent = data.name;
        this.profileJob.textContent = data.job;
    }
}


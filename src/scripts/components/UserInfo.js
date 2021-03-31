export default class UserInfo {
    constructor({ profileName, profileJob }) {
        this.profileName = profileName;
        this.profileJob = profileJob;
    }

    getUserInfo(data) {
        const userInfo = {
            name: this.profileName.textContent,
            //job: this.profileJob.textContent,
            about: this.profileJob.textContent,
        }
        data.inputName.value = userInfo.name;
        //data.inputJob.value = userInfo.job;
        data.inputJob.value = userInfo.about;

        console.log(userInfo);
        return userInfo;
    }

    setUserInfo(data) {
        this.profileName.textContent = data.name;
        //this.profileJob.textContent = data.job;
        this.profileJob.textContent = data.about;
        const avatar = document.querySelector('.profile__avatar');
        avatar.src = data.avatar;
    }
}
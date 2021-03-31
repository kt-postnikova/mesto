import { inputName, inputJob } from '../utils/constants.js';

export default class UserInfo {
    constructor({ profileName, profileJob }, api) {
        this.profileName = profileName;
        this.profileJob = profileJob;
        this.api = api;
    }

    getUserInfo(data) {
        //console.log(data.name);
        //console.log(inputName.value);
        //console.log(this.profileName.textContent);
        // const userInfo = {
        //     name: this.profileName.textContent,
        //     //job: this.profileJob.textContent,
        //     about: this.profileJob.textContent,
        // }
        // data.inputName.value = userInfo.name;
        // //data.inputJob.value = userInfo.job;
        // data.inputJob.value = userInfo.about;

        // this.profileName.textContent = data.name;
        // this.profileJob.textContent = data.about;

        inputName.value = this.profileName.textContent
        inputJob.value = this.profileJob.textContent
        // inputName.value = data.name;
        // inputJob.value = data.about;
        //console.log(data);

        //return userInfo;
    }

    setUserInfo(data) {
        this.profileName.textContent = data.name;
        this.profileJob.textContent = data.about;
        // this.profileJob.textContent = data.about;
        // const avatar = document.querySelector('.profile__avatar');
        // avatar.src = data.avatar;


        //console.log(data.name);



        // this.api.editUserUnfo(data)
        //     .then(res => {
        //         inputName.value = data.name;
        //         inputJob.value = data.about;

        //         // console.log(inputName.value);
        //         // console.log(data.name);
        //     })
    }
}
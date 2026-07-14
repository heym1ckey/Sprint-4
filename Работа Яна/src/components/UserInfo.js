export default class UserInfo {
    constructor({ profileTitle, profileSubtitle, profileAvatar }){
    this.profileTitle = profileTitle;
    this.profileSubtitle = profileSubtitle;
    this.profileAvatar = profileAvatar;
    }

    getUserInfo(){
        return {
            name: this.profileTitle.textContent,
            about: this.profileSubtitle.textContent
        }
    }

    setUserInfo(data){
        this.profileTitle.textContent = data.name;
        this.profileSubtitle.textContent = data.about;
        this.profileAvatar.src = data.avatar;
    }
}
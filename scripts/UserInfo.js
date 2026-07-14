export default class UserInfo {
  constructor(profileNameSelector, profileActivitySelector, profileAvatarSelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileActivity = document.querySelector(profileActivitySelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }
  //Получает информацию с селекторов (с помощью него мы делаем подписи в форме при открытии)
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileActivity.textContent,
      avatar: this._profileAvatar.src,
    };
  }
  //Обновляет информацию на странице
  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileActivity.textContent = data.about;
    this._profileAvatar.src = data.avatar;
  }
}

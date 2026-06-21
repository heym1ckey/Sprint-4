export default class UserInfo {
  constructor(profileNameSelector, profileActivitySelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileActivity = document.querySelector(profileActivitySelector);
  }
  //Получает информацию с селекторов (с помощью него мы делаем подписи в форме при открытии)
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      activity: this._profileActivity.textContent,
    };
  }
  //Обновляет информацию на странице
  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileActivity.textContent = data.activity;
  }
}

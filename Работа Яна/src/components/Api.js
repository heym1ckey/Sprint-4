export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok){
      return res.json();
    } else {
      throw new Error(`Response is not OK with code ${res.status}`);
    }
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  getCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  updateUserInfo(name, about) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
    .then(this._checkResponse);
  }

  updateCards(name, link) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
    .then(this._checkResponse);
  }

  removeCard(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  updateAvatar(avatar) {
    return fetch(this._baseUrl + `/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
    .then(this._checkResponse);
  }

  like(cardId) {
    return fetch(this._baseUrl + `/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  likeDelete(cardId) {
    return fetch(this._baseUrl + `/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(this._checkResponse);
  }
}

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Response is not OK with code ${res.status}`);
    }
  }

  async getUserInfo() {
    const userInfo = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
    return this._checkResponse(userInfo);
  }

  async getCards() {
    const cards = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
    return this._checkResponse(cards);
  }

  async editUserInfo(name, about) {
    const editUser = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
    return this._checkResponse(editUser);
  }

  async addNewCards(name, link) {
    const newCard = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
    return this._checkResponse(newCard);
  }

  async deleteCard(cardId) {
    const deleteCard = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._checkResponse(deleteCard);
  }

  async putLikeCard(cardId) {
    const putLike = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
    return this._checkResponse(putLike);
  }

  async deleteLikeCard(cardId) {
    const deleteLike = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._checkResponse(deleteLike);
  }

  async editUserAvatar(avatar) {
    const newAvatar = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
    return this._checkResponse(newAvatar);
  }
}

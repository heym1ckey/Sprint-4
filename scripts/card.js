export class Card {
  constructor(data, userId, template, handleCardClick, deleteLike, setLike, openDeletePopup) {
    this._link = data.link;
    this._name = data.name;
    this._myId = userId;
    this._likesArray = data.likes.length;
    this._isLiked = data.likes.some((item) => item._id === this._myId);
    this._cardId = data._id;
    this._userId = data.owner._id;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._deleteLike = deleteLike;
    this._setLike = setLike;
    this._openDeletePopup = openDeletePopup;
  }

  _hideDeleteButton() {
    if (this._myId !== this._userId) {
      this._cardDeleteButton.hidden = true;
    }
  }

  _getTemplate() {
    const cardElement = this._template.querySelector(".rectangle").cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".rectangle__image");
    this._cardName = this._element.querySelector(".rectangle__header");
    this._cardLike = this._element.querySelector(".rectangle__button");
    this._cardDeleteButton = this._element.querySelector(".rectangle__delete-button");
    this._cardLikesCount = this._element.querySelector(".rectangle__like__number");

    this._cardImage.src = this._link;
    this._cardName.textContent = this._name;
    this._cardLikesCount.textContent = this._likesArray;
    if (this._likesArray === 0) {
      this._cardLikesCount.hidden = true;
    } else {
      this._cardLikesCount.hidden = false;
    }

    if (this._isLiked) {
      this._cardLike.classList.add("rectangle__button_active");
    }

    this._hideDeleteButton();
    this._setEventListeners();
    return this._element;
  }

  _checkLike = () => {
    if (this._isLiked) {
      this._deleteLike(this._cardId);
    } else {
      this._setLike(this._cardId);
    }
  };

  refreshLikes() {
    this._isLiked = !this._isLiked;
  }

  refreshLikesCount(res) {
    this._likesArray = res.likes.length;

    this._cardLikesCount.textContent = this._likesArray;
    this._cardLikesCount.hidden = this._likesArray === 0;
  }

  _putOrRemoveLike = (evt) => {
    evt.currentTarget.classList.add("rectangle__button_active");
  };

  _setEventListeners() {
    this._element.querySelector(".rectangle__button").addEventListener("click", this._checkLike);
    this._cardDeleteButton.addEventListener("click", () => {
      this._openDeletePopup(this._cardId, this._element);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({
        name: this._name,
        link: this._link,
      });
    });
  }
}

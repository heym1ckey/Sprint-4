export default class Card {
  constructor(
    { data, openPopupWithDelete, handleCardClick, setLike, deleteLike },
    selector, userId
  ) {
    this._text = data.name;
    this._image = data.link;
    this._cardId = data._id;
    this._userId = data.owner._id;
    this._cardLikesArray = data.likes.length;
    this._myUserId = userId;
    this._isLiked = data.likes.some((item) => item._id === this._myUserId);
    this._selector = selector;
    this.handleCardClick = handleCardClick;
    this._openPopupWithDelete = openPopupWithDelete;
    this._setLike = setLike;
    this._deleteLike = deleteLike;
  }

  _hideDeleteButton() {
    if (this._myUserId !== this._userId) {
      this._deleteButton.hidden = true;
    }
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generate() {
    this._element = this._getElement();
    this._cardImage = this._element.querySelector(".element__image");
    this._cardTitle = this._element.querySelector(".element__title");
    this._cardLike = this._element.querySelector(".element__like");
    this._cardLikesCount = this._element.querySelector(".element__like-count");
    this._deleteButton = this._element.querySelector(".element__delete");
    this._cardLikesCount = this._element.querySelector(".element__like-count");
    this._setEventListeners();

    this._cardImage.src = this._image;
    this._cardImage.alt = this._text;
    this._cardTitle.textContent = this._text;
    this._cardLikesCount.textContent = this._cardLikesArray;

    return this._element;
  }

  _setEventListeners() {
    this._likeSetEventListeners();
    this._imageSetEventListeners();
    this._deleteSetEventListeners();
    this._hideDeleteButton();
    this._likeIsSet();
  }

  _imageSetEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this.handleCardClick();
    });
  }

  _deleteSetEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._openPopupWithDelete(this.handleDeleteImage);
    });
  }

  handleDeleteImage = () => {
    if (this._element.closest(".element")) {
      this._element.remove();
    }
  };

  likeCountChange(res) {
    this._cardLikesCount.textContent = res.likes.length;
  }

  _likeIsSet() {
    if (this._isLiked) {
      this._cardLike.classList.toggle("element__like_active");
    }
  }

  likeChangeTruth(){
    this._isLiked = !this._isLiked;
  }

  _likeSetEventListeners() {
    this._cardLike.addEventListener("click", () => {
      if (this._isLiked) {
        this._deleteLike(); // коллбэк на удаление
      } else {
        this._setLike(); // коллбэк на постановку лайка
      }
    });
  }

  likeHandleClick() {
    this._cardLike.classList.toggle("element__like_active");
  }
}

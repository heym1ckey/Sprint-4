export class Card {
  constructor(data, template, handleCardClick) {
    this._link = data.link;
    this._name = data.name;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = this._template.querySelector(".rectangle").cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(".rectangle__image");

    cardImage.src = this._link;
    this._element.querySelector(".rectangle__header").textContent = this._name;

    this._setEventListeners(cardImage);
    return this._element;
  }

  _putOrRemoveLike = (evt) => {
    evt.currentTarget.classList.toggle("rectangle__button_active");
  };

  _deleteCard() {
    this._element.remove();
  }

  _setEventListeners(cardImage) {
    this._element.querySelector(".rectangle__button").addEventListener("click", this._putOrRemoveLike);

    this._element.querySelector(".rectangle__delete-button").addEventListener("click", () => {
      this._deleteCard();
    });
    cardImage.addEventListener("click", () => {
      this._handleCardClick({
        name: this._name,
        link: this._link,
      });
    });
  }
}

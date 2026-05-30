export class Card {
  constructor(data, template, handleDeleteClick) {
    this._link = data.link;
    this._name = data.name;
    this._id = data.id;
    this._template = template;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    const cardElement = this._template.querySelector(".rectangle").cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".rectangle__image").src = this._link;
    this._element.querySelector(".rectangle__header").textContent = this._name;

    return this._element;
  }

  _putOrRemoveLike(evt) {
    evt.target.classList.toggle("rectangle__button_active");
  }

  _deleteCard() {
    this._handleDeleteClick(this._id);
  }

  _setEventListeners() {
    this._element.querySelector(".rectangle__button").addEventListener("click", (evt) => {
      this._putOrRemoveLike(evt);
    });

    this._element.querySelector(".rectangle__delete-button").addEventListener("click", () => {
      this._deleteCard();
    });
  }
}

import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor({ popupSelector, closeButtonSelector, agreementButtonSelector }, handleDelete) {
    super({ popupSelector, closeButtonSelector });
    this._handleDelete = handleDelete;
    this._agreementButton = this._popup.querySelector(agreementButtonSelector);
  }
  open(cardId, element) {
    super.open();
    this._cardId = cardId;
    this._element = element;
  }

  setEventListeners() {
    super.setEventListeners();

    this._agreementButton.addEventListener("click", () => {
      this._handleDelete(this._cardId, this._element);
    });
  }
}

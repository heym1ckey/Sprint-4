import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector, closeButtonSelector, imageSelector, captionSelector }) {
    super({ popupSelector, closeButtonSelector }); // ← убраны фигурные скобки!

    this._image = this._popup.querySelector(imageSelector);
    this._caption = this._popup.querySelector(captionSelector);
  }

  open({ link, name }) {
    this._image.src = data.link;
    this._image.alt = data.name;
    this._caption.textContent = data.name;
    super.open();
  }
}

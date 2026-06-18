import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector, closeButtonSelector, imageSelector, captionSelector }) {
    super({ popupSelector, closeButtonSelector });
    this._image = this._popup.querySelector(imageSelector);
    this._caption = this._popup.querySelector(captionSelector);
  }

  open({ link, name }) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}

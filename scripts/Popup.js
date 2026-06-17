export default class Popup {
  constructor(popupSelector, closeButtonSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(closeButtonSelector);
  }

  open = () => {
    this._popup.classList.add("popup_active");
    document.addEventListener("keydown", this._handleEscClose);
  };

  close = () => {
    this._popup.classList.remove("popup_active");
    document.removeEventListener("keydown", this._handleEscClose);
  };

  _handleEscClose = (evt) => {
    if (evt.key == "Escape") {
      this.close();
    }
  };

  _handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("click", this._handleOverlayClose);
    this._closeButton.addEventListener("click", this.close);
  }
}

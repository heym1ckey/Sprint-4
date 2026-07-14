import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__viewer_image');
        this._popupText = this._popup.querySelector('.popup__viewer_title');
    }

    open(data){
        this._popupImage.src = data.link;
        this._popupImage.alt = data.name;
        this._popupText.textContent = data.name;
        super.open();
    }
}
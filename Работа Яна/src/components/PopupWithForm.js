import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleSubmitForm }){
        super(popupSelector);
        this.handleSubmitForm = handleSubmitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
    }

    _getInputValues(){
        this.inputValues = {};
        this._inputList.forEach(input => {
            this.inputValues[input.name] = input.value; 
        });
        return this.inputValues;
    }

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.handleSubmitForm(this._getInputValues());
            const saveButton = this._form.querySelector('.popup__submit');
            saveButton.textContent = 'Сохранение ...';
        });
    }

    close(){
        super.close();
        this._form.reset();
    }
}
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSelector, inputSelector, closeButtonSelector }, formSubmit) {
    super({ popupSelector, closeButtonSelector });

    this._handleFormSubmit = formSubmit;
    this._form = this._popup.querySelector(formSelector);
    this._inputs = Array.from(this._form.querySelectorAll(inputSelector));
  }
  // Сбор данных с формы
  _getInputValues = () => {
    const values = {};

    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  };

  //Заполнение полей формы
  setInputValues(data) {
    this._inputs.forEach((input) => {
      if (data[input.name] !== undefined) {
        input.value = data[input.name];
      }
    });
  }

  // Отображение данных на странице(данные взял с __getInputValues, колбеком отразил на странице)
  _handleSubmit = (evt) => {
    evt.preventDefault();
    const inputValues = this._getInputValues();
    this._handleFormSubmit(inputValues);
    this.close();
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }
}

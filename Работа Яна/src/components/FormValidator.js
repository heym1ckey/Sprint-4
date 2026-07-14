export default class FormValidator {
  constructor(validateObject, formElement) {
    this._validateObject = validateObject;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(
      this._validateObject.submitButtonSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._validateObject.inputSelector)
    );
  }

  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._validateObject.inputErrorClass);
    this._errorElement.innerText = errorMessage;
    this._errorElement.classList.add(this._validateObject.errorClass);
  }

  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._validateObject.inputErrorClass);
    this._errorElement.classList.remove(this._validateObject.errorClass);
    this._errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    !inputElement.validity.valid
      ? this._showInputError(inputElement, inputElement.validationMessage)
      : this._hideInputError(inputElement);
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  _toggleButtonState() {
    
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(
        this._validateObject.inactiveButtonClass
      );
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.classList.remove(
        this._validateObject.inactiveButtonClass
      );
      this._buttonElement.removeAttribute("disabled", false);
    }
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

  }



  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

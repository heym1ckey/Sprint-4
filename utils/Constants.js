export const container = document.querySelector(".page");
export const formElement = container.querySelector(".popup__container");
export const formAddElement = container.querySelector(".popup-add__container");
export const formAvatarElement = container.querySelector(".popup-avatar__container");
export const introButton = container.querySelector(".intro__button");
export const profileButton = container.querySelector(".profile__button");
export const rectangleTemplate = document.querySelector("#rectangle-template").content;
export const popupSubmitProfile = document.querySelector(".popup__form-button");
export const popupSubmitAdd = document.querySelector(".popup-add__form-button");
export const popupSubmitAvatar = document.querySelector(".popup-avatar__form-button");
export const editAvatarButton = document.querySelector(".intro__image-edit");
export let initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const validationConfig = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const validationConfigAdd = {
  formSelector: ".popup-add__container",
  inputSelector: ".popup-add__input",
  submitButtonSelector: ".popup-add__form-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const validationConfigAvatar = {
  formSelector: ".popup-avatar__container",
  inputSelector: ".popup-avatar__input",
  submitButtonSelector: ".popup-avatar__form-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

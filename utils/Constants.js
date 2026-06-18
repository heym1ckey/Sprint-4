export const container = document.querySelector(".page");
export const formElement = container.querySelector(".popup__container");
export const formAddElement = container.querySelector(".popup-add__container");
export const introButton = container.querySelector(".intro__button");
export const profileButton = container.querySelector(".profile__button");
export const rectangleTemplate = document.querySelector("#rectangle-template").content;

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

//Ещё очкую удалять :)

// const popup = container.querySelector(".popup");
// const popupInputName = container.querySelector(".popup__input-name");
// const popupInputActivity = container.querySelector(".popup__input-activity");
// const closeButton = popup.querySelector(".popup__button");
// const saveButton = container.querySelector(".popup__form-button");

// const popupAdd = container.querySelector(".popup-add");
// const closeAddButton = popupAdd.querySelector(".popup-add__button");

// const popupEnlargedImage = container.querySelector(".popup-image");
// const popupSignature = popupEnlargedImage.querySelector(".popup-image__signature");
// const popupPicture = popupEnlargedImage.querySelector(".popup-image__picture");
// const closePopupEnlargedImage = popupEnlargedImage.querySelector(".popup-image__button");

// const introName = container.querySelector(".intro__name");
// const introActivity = container.querySelector(".intro__activity");

// const elementsContainer = container.querySelector(".elements");

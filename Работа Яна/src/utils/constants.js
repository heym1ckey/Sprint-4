 export const profileEdit = document.querySelector(".profile__edit-button");
 export const popupProfile = document.querySelector(".popup_profile");
 export const profileContainer = document.querySelector(".popup__container_profile");
 export const profilePopupCloseButton = document.querySelector(".popup__close_profile");
 export const nameInput = profileContainer.querySelector(".popup__input_text_name");
 export const jobInput = profileContainer.querySelector(".popup__input_text_job");
 export const popupInput = document.querySelector(".popup__input");
 export const profileName = document.querySelector(".profile__title");
 export const profileJob = document.querySelector(".profile__subtitle");
 export const cardContainer = document.querySelector(".elements");
 export const createPopupOpenButton = document.querySelector(".profile__add-button");
 export const popupCreate = document.querySelector(".popup_create");
 export const closeAddButton = document.querySelector(".popup__close_create");
 export const popupSubmitCreate = document.querySelector(".popup__submit_create");
 export const popupSubmitProfile = document.querySelector(".popup__submit_profile")
 export const closePopupImage = document.querySelector(".popup_image");
 export const formCreate = document.forms.create;
 export const formProfile = document.forms.profile;
 export const formAvatar = document.forms.avatar;
 export const inputListCreate = Array.from(formCreate.querySelectorAll('.popup__input'));
 export const inputListProfile = Array.from(formProfile.querySelectorAll('.popup__input'));
 export const placeInput = document.querySelector(".popup__input_text_place");
 export const urlInput = document.querySelector(".popup__input_text_url");
 export const popupInputTextPlace = document.querySelector(".popup__input_text_place");
 export const popupInputTextUrl = document.querySelector(".popup__input_text_url");
 export const popupCloseImage = document.querySelector(".popup__close_image");
 export const popupImage = document.querySelector(".popup_image");
 export const elementTemplate = document.querySelector("#element").content;
 export const profileAvatar = document.querySelector('.profile__avatar');
 export const avatarButton = document.querySelector('.profile__avatar-edit');
 export const popupSubmitAvatar = document.querySelector('.popup__submit_avatar');
  
  // Массив фотокарт
  export const initialCards = [
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
  
  // Объект настроек для валидации
  export const validateObject = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_invalid",
    inputErrorClass: "popup__input_invalid",
    errorClass: "error_active",
  };
  

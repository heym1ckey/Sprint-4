import { Card } from "../scripts/Card.js";
import {
  initialCards,
  validationConfig,
  validationConfigAdd,
  container,
  formElement,
  formAddElement,
  introButton,
  profileButton,
  rectangleTemplate,
} from "../utils/Constants.js";
import { FormValidator } from "../scripts/FormValidator.js";
import Popup from "../scripts/Popup.js";
import Section from "../scripts/Section.js";
import PopupWithImage from "../scripts/PopupWithImage.js";

import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";

const userInfo = new UserInfo(".intro__name", ".intro__activity");

// Модалка для увеличения картинки
const popupImage = new PopupWithImage({
  popupSelector: ".popup-image",
  imageSelector: ".popup-image__picture",
  captionSelector: ".popup-image__signature",
  closeButtonSelector: ".popup-image__button",
});

popupImage.setEventListeners();

function handleCardClick({ name, link }) {
  popupImage.open({ link, name });
}

//Функия для подписей в форме, которые берутся из профиля
const signPopupProfile = () => {
  const userItems = userInfo.getUserInfo();
  popupInputName.value = userItems.name;
  popupInputActivity.value = userItems.activity;
};

// Экземпляр модалки профиля
const popupProfile = new PopupWithForm(
  {
    popupSelector: ".popup",
    formSelector: ".popup__container",
    inputSelector: ".popup__input",
    closeButtonSelector: ".popup__button",
  },
  (data) => {
    userInfo.setUserInfo(data);
  },
);

popupProfile.setEventListeners();

introButton.addEventListener("click", function () {
  signPopupProfile();
  popupProfile.open();
});

// Экземпляр модалки добавления карточки
const popupAddCard = new PopupWithForm(
  {
    popupSelector: ".popup-add",
    formSelector: ".popup-add__container",
    inputSelector: ".popup-add__input",
    closeButtonSelector: ".popup-add__button",
  },
  (data) => {
    const newCard = { name: data.name, link: data.link };
    elementsContainer.prepend(createCard(newCard));
  },
);

popupAddCard.setEventListeners();
profileButton.addEventListener("click", () => {
  popupAddCard.open();
});

// Отображение карточек
const displayCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      displayCards.addItem(cardElement);
    },
  },
  ".elements",
);

displayCards.renderItems();

function createCard(item) {
  const card = new Card(item, rectangleTemplate, handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

const validPopup = new FormValidator(validationConfig, formElement);
validPopup.enableValidation();
const validAddPopup = new FormValidator(validationConfigAdd, formAddElement);
validAddPopup.enableValidation();

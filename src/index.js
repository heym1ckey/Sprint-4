import { Card } from "../scripts/Card.js"; // для коммита
import {
  initialCards,
  validationConfig,
  validationConfigAdd,
  formElement,
  formAddElement,
  introButton,
  profileButton,
  rectangleTemplate,
} from "../utils/Constants.js";
import { FormValidator } from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";
import PopupWithImage from "../scripts/PopupWithImage.js";

import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import "../pages/styles.css";

const userInfo = new UserInfo(".intro__name", ".intro__activity");

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
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
});

const popupAddCard = new PopupWithForm(
  {
    popupSelector: ".popup-add",
    formSelector: ".popup-add__container",
    inputSelector: ".popup-add__input",
    closeButtonSelector: ".popup-add__button",
  },
  (data) => {
    const newCard = { name: data.name, link: data.link };
    displayCards.prependItem(createCard(newCard));
  },
);

popupAddCard.setEventListeners();
profileButton.addEventListener("click", () => {
  popupAddCard.open();
});

const displayCards = new Section(
  {
    items: initialCards,
    renderer: (item) => createCard(item),
  },
  ".elements",
);

displayCards.renderItems();

function createCard(item) {
  return new Card(item, rectangleTemplate, handleCardClick).generateCard();
}

const validPopup = new FormValidator(validationConfig, formElement);
validPopup.enableValidation();
const validAddPopup = new FormValidator(validationConfigAdd, formAddElement);
validAddPopup.enableValidation();

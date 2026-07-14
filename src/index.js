import { Card } from "../scripts/Card.js";
import {
  initialCards,
  validationConfig,
  validationConfigAdd,
  validationConfigAvatar,
  formElement,
  formAddElement,
  formAvatarElement,
  introButton,
  profileButton,
  rectangleTemplate,
  popupSubmitProfile,
  popupSubmitAvatar,
  popupSubmitAdd,
  editAvatarButton,
} from "../utils/Constants.js";
import { FormValidator } from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";
import PopupWithImage from "../scripts/PopupWithImage.js";

import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import Api from "../scripts/Api.js";
import "../pages/styles.css";
import PopupDelete from "../scripts/PopupDelete.js";

let userId = null;

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort-28",
  headers: {
    authorization: "8999a51c-1ed0-4ed4-a807-902250d23524",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo(".intro__name", ".intro__activity", ".intro__image");

const popupProfile = new PopupWithForm(
  {
    popupSelector: ".popup",
    formSelector: ".popup__container",
    inputSelector: ".popup__input",
    closeButtonSelector: ".popup__button",
  },
  async (data) => {
    popupSubmitProfile.textContent = "Сохранение...";
    try {
      const res = await api.editUserInfo(data.name, data.about);
      userInfo.setUserInfo(res);
      popupProfile.close();
    } catch (err) {
      console.error("Ошибка обновления профиля:", err);
    } finally {
      popupSubmitProfile.textContent = "Сохранить";
    }
  },
);

popupProfile.setEventListeners();

introButton.addEventListener("click", function () {
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
});

const popupAvatar = new PopupWithForm(
  {
    popupSelector: ".popup-avatar",
    formSelector: ".popup-avatar__container",
    inputSelector: ".popup-avatar__input",
    closeButtonSelector: ".popup-avatar__button",
  },
  async (data) => {
    popupSubmitAvatar.textContent = "Сохранение...";
    try {
      const avatar = await api.editUserAvatar(data.avatar);
      userInfo.setUserInfo(avatar);
      popupAvatar.close();
    } catch (err) {
      console.error("Ошибка обновления профиля:", err);
    } finally {
      popupSubmitAvatar.textContent = "Сохранить";
    }
  },
);

popupAvatar.setEventListeners();
editAvatarButton.addEventListener("click", function () {
  popupAvatar.setInputValues(userInfo.getUserInfo());
  popupAvatar.open();
});

const popupImage = new PopupWithImage({
  popupSelector: ".popup-image",
  imageSelector: ".popup-image__picture",
  captionSelector: ".popup-image__signature",
  closeButtonSelector: ".popup-image__button",
});

popupImage.setEventListeners();

const popupDelete = new PopupDelete(
  {
    popupSelector: ".popup-delete",
    closeButtonSelector: ".popup-delete__close-button",
    agreementButtonSelector: ".popup-delete__form-button",
  },
  async (cardId, element) => {
    try {
      await api.deleteCard(cardId);
      element.remove();
      popupDelete.close();
    } catch (err) {
      console.error("Ошибка удаления:", err);
    }
  },
);

popupDelete.setEventListeners();

function createCard(item) {
  const handleDeleteLike = async (cardInstance) => {
    try {
      const res = await api.deleteLikeCard(item._id);
      cardInstance.refreshLikes();
      cardInstance.refreshLikesCount(res);
      cardInstance._cardLike.classList.toggle("rectangle__button_active");
    } catch (err) {
      console.error("Ошибка удаления лайка:", err);
    }
  };

  const handleSetLike = async (cardInstance) => {
    try {
      const res = await api.putLikeCard(item._id);
      cardInstance.refreshLikes();
      cardInstance.refreshLikesCount(res);
      cardInstance._cardLike.classList.toggle("rectangle__button_active");
    } catch (err) {
      console.error("Ошибка постановки лайка:", err);
    }
  };

  const card = new Card(
    item,
    userId,
    rectangleTemplate,
    ({ name, link }) => {
      popupImage.open({ link, name });
    },
    (cardId) => handleDeleteLike(card),
    (cardId) => handleSetLike(card),
    (cardId, element) => popupDelete.open(cardId, element),
  );

  return card.generateCard();
}

const displayCards = new Section(
  {
    items: [],
    renderer: (item) => {
      return createCard(item);
    },
  },
  ".elements",
);

const popupAddCard = new PopupWithForm(
  {
    popupSelector: ".popup-add",
    formSelector: ".popup-add__container",
    inputSelector: ".popup-add__input",
    closeButtonSelector: ".popup-add__button",
  },
  async (data) => {
    popupSubmitAdd.textContent = "Создание...";
    try {
      const newCardObj = {};
      newCardObj.name = data.name;
      newCardObj.link = data.link;
      const newCard = await api.addNewCards(newCardObj.name, newCardObj.link);
      console.log("Ответ сервера:", newCard);
      displayCards.prependItem(createCard(newCard));
    } catch (err) {
      console.error("Ошибка обновления профиля:", err);
    } finally {
      popupSubmitAdd.textContent = "Создать";
    }
  },
);

popupAddCard.setEventListeners();
profileButton.addEventListener("click", () => {
  popupAddCard.open();
});

const validPopup = new FormValidator(validationConfig, formElement);
validPopup.enableValidation();
const validAddPopup = new FormValidator(validationConfigAdd, formAddElement);
validAddPopup.enableValidation();
const validAvatarPopup = new FormValidator(validationConfigAvatar, formAvatarElement);
validAvatarPopup.enableValidation();

async function loadData() {
  try {
    const user = await api.getUserInfo();
    userInfo.setUserInfo(user);
    userId = user._id;

    const cards = await api.getCards();
    displayCards.renderItems(cards);
  } catch (err) {
    console.error("Ошибка загрузки данных:", err);
  }
}

loadData();

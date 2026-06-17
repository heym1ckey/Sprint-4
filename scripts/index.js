import { Card } from "./Card.js";
import { initialCards, validationConfig, validationConfigAdd } from "./Constants.js";
import { FormValidator } from "./FormValidator.js";
import Popup from "./Popup.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";

import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const container = document.querySelector(".page");

const popup = container.querySelector(".popup");
const formElement = container.querySelector(".popup__container");
const popupInputName = container.querySelector(".popup__input-name");
const popupInputActivity = container.querySelector(".popup__input-activity");
const closeButton = popup.querySelector(".popup__button");
const saveButton = container.querySelector(".popup__form-button");

const popupAdd = container.querySelector(".popup-add");
const formAddElement = container.querySelector(".popup-add__container");
const closeAddButton = popupAdd.querySelector(".popup-add__button");

const popupEnlargedImage = container.querySelector(".popup-image");
const popupSignature = popupEnlargedImage.querySelector(".popup-image__signature");
const popupPicture = popupEnlargedImage.querySelector(".popup-image__picture");
const closePopupEnlargedImage = popupEnlargedImage.querySelector(".popup-image__button");

const introName = container.querySelector(".intro__name");
const introActivity = container.querySelector(".intro__activity");
const introButton = container.querySelector(".intro__button");
const profileButton = container.querySelector(".profile__button");

const elementsContainer = container.querySelector(".elements");
const rectangleTemplate = document.querySelector("#rectangle-template").content;

const userInfo = new UserInfo(".intro__name", ".intro__activity");

// Модалка для увеличения картинки
window.popupImage = new PopupWithImage({
  popupSelector: ".popup-image",
  imageSelector: ".popup-image__picture",
  captionSelector: ".popup-image__signature",
  closeButtonSelector: ".popup-image__button",
});

popupImage.setEventListeners();

function handleCardClick(name, link) {
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

// formAddElement.addEventListener("submit", addNewCard);

// function handleCardClick(name, link) {
//   popupPicture.src = link;
//   popupSignature.textContent = name;
//   openPopup(popupEnlargedImage);
// }
// function renderCards() {
//   initialCards.forEach((item) => {
//     elementsContainer.append(createCard(item));
//   });
// }

// function openPopup(item) {
//   item.classList.add("popup_active");
// }

// introButton.addEventListener("click", function () {
//   popupInputName.value = introName.textContent;
//   popupInputActivity.value = introActivity.textContent;

//   openPopup(popup);
// });
// profileButton.addEventListener("click", () => openPopup(popupAdd));

// function closePopup(item) {
//   item.classList.remove("popup_active");
// }

// formElement.addEventListener("submit", function (evt) {
//   evt.preventDefault();

//   introName.textContent = popupInputName.value;
//   introActivity.textContent = popupInputActivity.value;

//   closePopup(popup);
// });
// closeButton.addEventListener("click", () => closePopup(popup));
// closeAddButton.addEventListener("click", () => closePopup(popupAdd));
// closePopupEnlargedImage.addEventListener("click", () => closePopup(popupEnlargedImage));

// function closePopupOnOverlayClick(evt) {
//   if (evt.target === evt.currentTarget) {
//     closePopup(evt.currentTarget);
//   }
// }

// popup.addEventListener("click", closePopupOnOverlayClick);
// popupAdd.addEventListener("click", closePopupOnOverlayClick);
// popupEnlargedImage.addEventListener("click", closePopupOnOverlayClick);

// function addNewCard(evt) {
//   evt.preventDefault();

//   const nameValue = formAddElement.querySelector(".popup-add__input-name").value;
//   const linkValue = formAddElement.querySelector(".popup-add__input-link").value;
//   const newCard = { name: nameValue, link: linkValue };

//   elementsContainer.prepend(createCard(newCard));

//   formAddElement.reset();

//   closePopup(popupAdd);
// }

// function closePopupEscapeClick(evt) {
//   if (evt.key == "Escape") {
//     const activePopup = document.querySelector(".popup_active");
//     if (activePopup) {
//       closePopup(activePopup);
//     }
//   }
// }

// document.addEventListener("keydown", closePopupEscapeClick);

// renderCards();

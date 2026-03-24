// Активный
const container = document.querySelector(".page");
const popup = container.querySelector(".popup");
const elementsContainer = container.querySelector(".elements");
const introName = container.querySelector(".intro__name");
const introActivity = container.querySelector(".intro__activity");

const popupInputName = container.querySelector(".popup__input-name");
const popupInputActivity = container.querySelector(".popup__input-activity");

const introButton = container.querySelector(".intro__button");
const formElement = container.querySelector(".popup__container");

function popupActive() {
  popup.classList.add("popup_active");

  popupInputName.value = introName.textContent;
  popupInputActivity.value = introActivity.textContent;
}

introButton.addEventListener("click", popupActive);

// Закрытый
const closeButton = popup.querySelector(".popup__form-button");

function closePopup() {
  popup.classList.remove("popup_active");
}

closeButton.addEventListener("click", closePopup);

//Сохраним изменения

const saveButton = container.querySelector(".popup__form-button");

function handleFormSubmit(evt) {
  evt.preventDefault();

  introName.textContent = popupInputName.value;
  introActivity.textContent = popupInputActivity.value;

  closePopup();
}

formElement.addEventListener("submit", handleFormSubmit);

const initialCards = [
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

const rectangleTemplate = container.querySelector("#rectangle-template").content;

for (let i = 0; i < initialCards.length; i++) {
  const rectangleElement = rectangleTemplate.querySelector(".rectangle").cloneNode(true);

  rectangleElement.querySelector(".rectangle__image").src = initialCards[i].link;
  rectangleElement.querySelector(".rectangle__header").textContent = initialCards[i].name;
  rectangleElement.querySelector(".rectangle__button-image").src = "/images/Elements/button__image.svg";

  elementsContainer.append(rectangleElement);
}

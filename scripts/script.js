const container = document.querySelector(".page");

const popup = container.querySelector(".popup");
const formElement = container.querySelector(".popup__container");
const popupInputName = container.querySelector(".popup__input-name");
const popupInputActivity = container.querySelector(".popup__input-activity");
const closeButton = popup.querySelector(".popup__button");
const saveButton = container.querySelector(".popup__form-button");

const popupAdd = container.querySelector(".popup-add");
const formAddElement = container.querySelector(".popup-add__container");
const saveAddButton = container.querySelector(".popup-add__form-button");
const closeAddButton = popupAdd.querySelector(".popup-add__button");

const popupImage = container.querySelector(".popup-image");
const popupSignature = popupImage.querySelector(".popup-image__signature");
const popupPicture = popupImage.querySelector(".popup-image__picture");
const closePopupImage = popupImage.querySelector(".popup-image__button");

const introName = container.querySelector(".intro__name");
const introActivity = container.querySelector(".intro__activity");
const introButton = container.querySelector(".intro__button");
const profileButton = container.querySelector(".profile__button");

const elementsContainer = container.querySelector(".elements");
const rectangleTemplate = container.querySelector("#rectangle-template").content;

let initialCards = [
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

function renderCards() {
  elementsContainer.innerHTML = "";

  const cardsWithIds = initialCards.map((item, index) => ({
    ...item,
    id: index + 1,
  }));

  cardsWithIds.forEach((item) => {
    elementsContainer.append(createCard(item));
  });
}

function openPopup(item) {
  item.classList.add("popup_active");
}

introButton.addEventListener("click", function () {
  // popupInputName.value = introName.textContent;
  // popupInputActivity.value = introActivity.textContent;

  openPopup(popup);
});
profileButton.addEventListener("click", () => openPopup(popupAdd));

function closePopup(item) {
  item.classList.remove("popup_active");
}

formElement.addEventListener("submit", function (evt) {
  evt.preventDefault();

  introName.textContent = popupInputName.value;
  introActivity.textContent = popupInputActivity.value;

  closePopup(popup);
});
closeButton.addEventListener("click", () => closePopup(popup));
closeAddButton.addEventListener("click", () => closePopup(popupAdd));
closePopupImage.addEventListener("click", () => closePopup(popupImage));

function closePopupOnOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

popup.addEventListener("click", closePopupOnOverlayClick);
popupAdd.addEventListener("click", closePopupOnOverlayClick);
popupImage.addEventListener("click", closePopupOnOverlayClick);

function createCard(item) {
  const card = rectangleTemplate.querySelector(".rectangle").cloneNode(true);

  const cardImage = card.querySelector(".rectangle__image");
  const cardHeader = card.querySelector(".rectangle__header");
  const rectangleButton = card.querySelector(".rectangle__button");

  cardImage.src = item.link;
  cardHeader.textContent = item.name;

  cardImage.addEventListener("click", () => {
    popupPicture.src = item.link;
    popupSignature.textContent = item.name;

    openPopup(popupImage);
  });

  rectangleButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("rectangle__button_active");
  });

  const deleteButton = card.querySelector(".rectangle__delete-button");

  deleteButton.addEventListener("click", () => {
    initialCards = initialCards.filter((_, index) => index + 1 !== item.id);
    renderCards();
  });

  return card;
}

function addNewCard(evt) {
  evt.preventDefault();

  const nameValue = formAddElement.querySelector(".popup-add__input-name").value;
  const linkValue = formAddElement.querySelector(".popup-add__input-link").value;

  initialCards.unshift({ name: nameValue, link: linkValue });

  renderCards();

  formAddElement.reset();

  closePopup(popupAdd);
}

renderCards();
formAddElement.addEventListener("submit", addNewCard);

document.addEventListener("keydown", (evt) => {
  if (evt.key == "Escape") {
    const activePopups = Array.from(document.querySelectorAll(".popup_active"));
    activePopups.forEach((popup) => {
      popup.classList.remove("popup_active");
    });
  }
});

// Активный
const container = document.querySelector(".page");
const popup = container.querySelector(".popup");
const popupAdd = container.querySelector(".popup-add");
const popupImage = container.querySelector(".popup-image");
const elementsContainer = container.querySelector(".elements");
const introName = container.querySelector(".intro__name");
const introActivity = container.querySelector(".intro__activity");

const popupInputName = container.querySelector(".popup__input-name");
const popupInputActivity = container.querySelector(".popup__input-activity");

const introButton = container.querySelector(".intro__button");
const formElement = container.querySelector(".popup__container");
const formAddElement = container.querySelector(".popup-add__container");
const closeButton = popup.querySelector(".popup__button");
const saveButton = container.querySelector(".popup__form-button");
const popupPicture = popupImage.querySelector(".popup-image__picture");
const popupSignature = popupImage.querySelector(".popup-image__signature");

function openPopup(item) {
  item.classList.add("popup_active");
}

function closePopup(item) {
  item.classList.remove("popup_active");
}

introButton.addEventListener("click", function () {
  popupInputName.value = introName.textContent;
  popupInputActivity.value = introActivity.textContent;

  openPopup(popup);
});

formElement.addEventListener("submit", function (evt) {
  evt.preventDefault();

  introName.textContent = popupInputName.value;
  introActivity.textContent = popupInputActivity.value;

  closePopup(popup);
});

closeButton.addEventListener("click", () => closePopup(popup));

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

function createCard(item) {
  const card = rectangleTemplate.querySelector(".rectangle").cloneNode(true);

  const imageActive = card.querySelector(".rectangle__image");

  imageActive.src = item.link;
  card.querySelector(".rectangle__header").textContent = item.name;

  imageActive.addEventListener("click", () => {
    popupPicture.src = item.link;
    popupSignature.textContent = item.name;

    openPopup(popupImage);
  });

  const rectangleButton = card.querySelector(".rectangle__button");

  rectangleButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("rectangle__button_active");
  });

  const deleteButton = card.querySelector(".rectangle__delete-button");
  if (deleteButton) {
    deleteButton.addEventListener("click", function () {
      card.remove();
    });
  }

  return card;
}

initialCards.forEach((item) => {
  elementsContainer.append(createCard(item));
});

function newCard(evt) {
  evt.preventDefault();

  const nameValue = formAddElement.querySelector(".popup-add__input-name").value;
  const linkValue = formAddElement.querySelector(".popup-add__input-link").value;

  const newItem = { name: nameValue, link: linkValue };
  const card = createCard(newItem);

  elementsContainer.prepend(card);

  formAddElement.reset();

  closePopup(popupAdd);
}

const profileButton = container.querySelector(".profile__button");

profileButton.addEventListener("click", () => openPopup(popupAdd));

const closeAddButton = popupAdd.querySelector(".popup-add__button");

closeAddButton.addEventListener("click", () => closePopup(popupAdd));

const saveAddButton = container.querySelector(".popup-add__form-button");

formAddElement.addEventListener("submit", newCard);

const closePopupImage = popupImage.querySelector(".popup-image__button");

closePopupImage.addEventListener("click", () => closePopup(popupImage));

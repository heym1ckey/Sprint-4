// Активный
const container = document.querySelector(".page");
const popup = container.querySelector(".popup");
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

# Подробный разбор замечаний к коду (для pre-junior)

Этот документ — **расширенная версия** [CODE_REVIEW.md](./CODE_REVIEW.md).  
Здесь каждое замечание разобрано **максимально просто**, с объяснением «что происходит», «почему это ошибка» и «как исправить по шагам».

---

## Как пользоваться этим документом

1. Сначала прочитай **краткий список** в `CODE_REVIEW.md` — там видно, *что* не так.
2. Потом возвращайся сюда — здесь объясняется *почему* и *как чинить*.
3. Исправляй ошибки **сверху вниз** по приоритету (P0 → P1 → P2).
4. После каждого исправления **проверяй в браузере** (открой DevTools → вкладка Console).

---

## Небольшой словарь (если что-то непонятно)

| Термин | Простыми словами |
|--------|------------------|
| **import / export** | Подключение кода из другого файла (`import`) и отдача кода наружу (`export`) |
| **DOM** | «Дерево» HTML-элементов на странице, с которым работает JavaScript |
| **querySelector** | Найти один элемент на странице по CSS-селектору (например, `.intro__name`) |
| **ReferenceError** | Ошибка «переменная не существует» — JavaScript не знает, что такое `popupInputName` |
| **Модуль** | Отдельный `.js` файл, который подключается через `import` |
| **Класс** | «Чертёж» объекта. `new Card(...)` — создаём конкретную карточку по чертежу |
| **Колбек (callback)** | Функция, которую передают «на потом» — её вызовут, когда что-то произойдёт |
| **renderer** | Функция, которая «рисует» (создаёт) один элемент из данных |

---

# ЧАСТЬ 1. Грубые ошибки (P0 — без них проект ломается)

---

## Ошибка 1. Неверный регистр в импорте `Card.js` vs `card.js`

### Где проблема

Файл: `pages/index.js`, строка 2:

```js
import { Card } from "../scripts/Card.js";
```

Реальное имя файла на диске: `scripts/card.js` (все буквы **строчные**).

### Что такое import и почему важен регистр

Когда ты пишешь:

```js
import { Card } from "../scripts/Card.js";
```

браузер буквально ищет файл с именем **`Card.js`** (с большой буквы C).

На **Linux** и на **серверах** (GitHub, CI, деплой) имена файлов **чувствительны к регистру**:
- `card.js` ≠ `Card.js` — это **два разных файла**.

На macOS по умолчанию файловая система часто **не различает** регистр. Поэтому у тебя на компьютере код может работать, а у ревьюера или на сервере — **упасть** с ошибкой:

```
Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/html"
```
или
```
Cannot find module '../scripts/Card.js'
```

### Как проверить самому

**Шаг 1.** Открой папку `scripts/` в проводнике или в VS Code.  
**Шаг 2.** Посмотри точное имя файла: `card.js`, не `Card.js`.  
**Шаг 3.** Импорт должен **точно совпадать** с именем файла.

### Как исправить (пошагово)

**Шаг 1.** Открой `pages/index.js`.  
**Шаг 2.** Замени строку импорта:

```js
// Было:
import { Card } from "../scripts/Card.js";

// Стало:
import { Card } from "../scripts/card.js";
```

**Шаг 3.** Сохрани файл и перезагрузи страницу в браузере.  
**Шаг 4.** Убедись, что в Console **нет красных ошибок** про загрузку модулей.

### Важно понять

- `{ Card }` — это **имя класса внутри файла** (может быть с большой буквы).
- `"../scripts/card.js"` — это **путь к файлу** (должен совпадать с реальным именем файла).

Это разные вещи!

---

## Ошибка 2. `popupInputName` и `popupInputActivity` не объявлены

### Где проблема

Файл: `pages/index.js`, функция `signPopupProfile`:

```js
const signPopupProfile = () => {
  const userItems = userInfo.getUserInfo();
  popupInputName.value = userItems.name;      // ← переменной popupInputName не существует!
  popupInputActivity.value = userItems.activity; // ← та же проблема
};
```

Эта функция вызывается при клике на кнопку редактирования профиля:

```js
introButton.addEventListener("click", function () {
  signPopupProfile();  // ← здесь всё сломается
  popupProfile.open();
});
```

### Что происходит по шагам (когда пользователь нажимает кнопку)

1. Пользователь нажимает кнопку «Редактировать профиль» (`.intro__button`).
2. Срабатывает обработчик клика.
3. Вызывается `signPopupProfile()`.
4. Внутри функции JavaScript пытается обратиться к `popupInputName`.
5. JavaScript **не находит** такую переменную нигде в коде.
6. Браузер выбрасывает ошибку **`ReferenceError: popupInputName is not defined`**.
7. Выполнение кода **останавливается** — `popupProfile.open()` **даже не вызывается**.
8. Модальное окно **не открывается** (или открывается только если ошибка где-то перехвачена — но обычно нет).

### Откуда взялась эта ошибка (история рефакторинга)

Раньше (в прошлых спринтах) ты, скорее всего, писал так в `Constants.js`:

```js
const popupInputName = container.querySelector(".popup__input-name");
const popupInputActivity = container.querySelector(".popup__input-activity");
```

Потом ты перешёл на **классы** (`PopupWithForm`, `UserInfo`) и **закомментировал** старые константы в `utils/Constants.js` (строки 56–57):

```js
// const popupInputName = container.querySelector(".popup__input-name");
// const popupInputActivity = container.querySelector(".popup__input-activity");
```

Но функцию `signPopupProfile` в `index.js` **забыли переписать**.  
Это типичная ситуация при рефакторинге: убрали старое — не обновили все места, где оно использовалось.

### Что такое `.value`

У `<input>` в HTML есть свойство `.value` — текст, который пользователь видит в поле ввода.

```html
<input name="name" class="popup__input popup__input-name" ... />
```

Чтобы подставить имя из профиля в поле формы, нужно найти этот input и записать:

```js
inputElement.value = "Жак-Ив Кусто";
```

### Правильный подход (через класс `PopupWithForm`)

Класс `PopupWithForm` **уже хранит** ссылки на все инпуты формы:

```js
this._inputs = Array.from(this._form.querySelectorAll(inputSelector));
```

Значит, **не нужно** искать инпуты вручную через `popupInputName`.  
Логику заполнения лучше положить **внутрь класса** или вызывать метод при открытии.

### Как исправить — вариант А (рекомендуется для учебного проекта)

#### Шаг 1. Создай метод заполнения полей в `PopupWithForm.js`

Добавь в класс `PopupWithForm` метод:

```js
setInputValues(data) {
  this._inputs.forEach((input) => {
    if (data[input.name] !== undefined) {
      input.value = data[input.name];
    }
  });
}
```

**Что делает этот код:**
- `data` — объект вида `{ name: "Жак-Ив Кусто", activity: "Исследователь океана" }`.
- У каждого `<input>` есть атрибут `name` (`name="name"`, `name="activity"`).
- Мы проходим по всем инпутам формы и подставляем значение с **таким же ключом** из `data`.

#### Шаг 2. Переопредели `open()` для профиля (или вызывай `setInputValues` перед `open`)

В `index.js` **удали** функцию `signPopupProfile` полностью.

Измени обработчик клика:

```js
introButton.addEventListener("click", () => {
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
});
```

#### Шаг 3. Проверь в браузере

1. Открой сайт.
2. Нажми кнопку редактирования профиля.
3. Модалка должна открыться.
4. Поля «Имя» и «Род деятельности» должны быть **заполнены** текущими данными профиля.
5. В Console **не должно быть** красных ошибок.

### Как исправить — вариант Б (быстрый, но «старый» подход)

Раскомментировать в `Constants.js`:

```js
export const popupInputName = container.querySelector(".popup__input-name");
export const popupInputActivity = container.querySelector(".popup__input-activity");
```

И импортировать их в `index.js`.

**Минус:** ты снова смешиваешь старый процедурный код с новыми классами. Ревьюеру это не понравится. Вариант А — правильнее.

---

## Ошибка 3. `elementsContainer` не объявлен

### Где проблема

Файл: `pages/index.js`, колбек формы добавления карточки:

```js
(data) => {
  const newCard = { name: data.name, link: data.link };
  elementsContainer.prepend(createCard(newCard)); // ← elementsContainer не существует!
},
```

### Что происходит по шагам

1. Пользователь нажимает «+» (кнопка `.profile__button`).
2. Открывается форма «Новое место».
3. Пользователь заполняет название и ссылку, нажимает «Создать».
4. `PopupWithForm` собирает данные и вызывает этот колбек.
5. Код пытается вызвать `elementsContainer.prepend(...)`.
6. **`ReferenceError: elementsContainer is not defined`**
7. Новая карточка **не появляется** на странице.

### Откуда проблема

Та же история, что с `popupInputName`. Раньше было:

```js
const elementsContainer = container.querySelector(".elements");
```

Сейчас это закомментировано в `Constants.js` (строка 72), потому что за контейнер карточек должен отвечать класс **`Section`**.

У тебя уже есть:

```js
const displayCards = new Section({ ... }, ".elements");
```

Класс `Section` знает, где находится контейнер `.elements`.  
Но при добавлении новой карточки ты **обходишь** `Section` и пытаешься работать со старой переменной.

### Что такое `prepend` и `append`

- **`append(element)`** — добавить элемент **в конец** контейнера.
- **`prepend(element)`** — добавить элемент **в начало** контейнера.

Новые карточки в Mesto обычно появляются **первыми** — поэтому нужен `prepend`, не `append`.

### Как исправить (пошагово)

#### Шаг 1. Добавь метод `prependItem` в `scripts/Section.js`

```js
prependItem(element) {
  this._container.prepend(element);
}
```

**Объяснение:**
- `this._container` — это DOM-элемент `<section class="elements">`, который нашёлся в конструкторе.
- `prepend` — встроенный метод браузера для вставки в начало.

#### Шаг 2. Измени колбек в `index.js`

```js
(data) => {
  const newCard = { name: data.name, link: data.link };
  displayCards.prependItem(createCard(newCard));
},
```

#### Шаг 3. Проверь в браузере

1. Нажми «+».
2. Заполни форму валидными данными.
3. Нажми «Создать».
4. Новая карточка должна появиться **первой** в списке.
5. Console — без ошибок.

### Почему это лучше, чем `elementsContainer`

| Старый способ | Новый способ |
|---------------|--------------|
| DOM разбросан по разным файлам | Один класс `Section` управляет контейнером |
| Легко забыть обновить одно место | Вся работа с `.elements` в одном месте |
| Сложнее поддерживать | Проще читать и тестировать |

---

## Ошибка 4. Двойной вызов `_hasInvalidInput()` в `FormValidator.js`

### Где проблема

```js
_toggleButtonState() {
  this._hasInvalidInput(); // ← вызов №1: результат никуда не записывается
  if (this._hasInvalidInput()) { // ← вызов №2: результат используется
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.disabled = true;
  } else {
    ...
  }
}
```

### Что делает `_hasInvalidInput()`

```js
_hasInvalidInput() {
  return this._inputList.some((inputElement) => !inputElement.validity.valid);
}
```

**Пошагово:**
1. `this._inputList` — массив всех полей формы.
2. `.some(...)` — проверяет: **есть ли хотя бы одно** поле, которое не прошло валидацию?
3. Если хотя бы одно невалидно → возвращает `true`.
4. Если все валидны → возвращает `false`.

### Что делает `_toggleButtonState()`

Этот метод **включает или выключает** кнопку «Сохранить» / «Создать»:
- Если форма невалидна → кнопка **disabled** (серная, не нажимается).
- Если форма валидна → кнопка **активна**.

### В чём ошибка

Строка `this._hasInvalidInput();` **ничего не делает полезного**:
- Метод вызывается.
- Возвращает `true` или `false`.
- Но результат **нигде не сохраняется** — он просто «улетает в никуда».
- Сразу после этого тот же метод вызывается **ещё раз** в `if`.

Это не ломает сайт, но:
- лишняя работа при **каждом** нажатии клавиши в поле;
- выглядит как опечатка или недоделанный рефакторинг.

### Как исправить (пошагово)

**Шаг 1.** Открой `scripts/FormValidator.js`.  
**Шаг 2.** Замени метод `_toggleButtonState`:

```js
_toggleButtonState() {
  const hasError = this._hasInvalidInput(); // один вызов, результат в переменной

  if (hasError) {
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.disabled = true;
  } else {
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }
}
```

**Шаг 3.** Проверь обе формы:
- Очисти поле «Имя» → кнопка «Сохранить» должна стать неактивной.
- Заполни обратно → кнопка снова активна.

---

# ЧАСТЬ 2. Улучшения (P1 и P2)

Эти пункты **не всегда ломают** проект, но делают код чище, понятнее и «взрослее».

---

## Пункт 5. Неиспользуемые импорты

### Где

`pages/index.js`:

```js
import Popup from "../scripts/Popup.js"; // не используется
import { ..., container, ... } from "../utils/Constants.js"; // container не используется
```

### Что такое import

`import` **подключает** код из другого файла. Если ты импортировал, но **ни разу не использовал** — это «мусор» в коде.

### Почему стоит убрать

1. **Путаница** — читающий думает, что `Popup` где-то нужен.
2. **Лишняя загрузка** — браузер всё равно может загрузить файл (хотя tree-shaking иногда помогает).
3. **Ревью** — ревьюеры часто снижают оценку за неиспользуемый код.

### Как исправить

**Шаг 1.** Удали строку `import Popup from ...`  
**Шаг 2.** Убери `container` из деструктуризации импорта из `Constants.js`

---

## Пункт 6. Комментарии «ОШИБКА» / «ЛУЧШЕ» в коде

### Где

По всему `index.js` и другим файлам есть комментарии вроде:

```js
// ОШИБКА: файл называется card.js...
// ЛУЧШЕ: не используется — удалить из импорта
```

### Почему убрать

Эти комментарии полезны **во время ревью**, но в **финальной версии проекта** они:
- засоряют код;
- выглядят непрофессионально при сдаче;
- могут уже **не соответствовать** реальности после исправлений.

### Как исправить

После того как исправишь все замечания — **удали** все такие комментарии.  
Оставь только те, что объясняют **неочевидную бизнес-логику** (если такие есть).

---

## Пункт 7. Неправильная роль `renderer` в `Section`

### Текущий код

```js
const displayCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      displayCards.addItem(cardElement); // ← Section должна сама добавлять!
    },
  },
  ".elements",
);
```

### Что такое `renderer` по заданию

`renderer` — это функция, которая:
- **получает** один объект данных (одну карточку из массива);
- **создаёт** DOM-элемент;
- **возвращает** этот элемент.

Она **не должна** сама вставлять элемент на страницу.  
Вставкой занимается класс **`Section`**.

### Аналогия

Представь конвейер:
- **renderer** — повар, который готовит блюдо и **отдаёт тарелку**.
- **Section** — официант, который **ставит тарелку на стол**.

Сейчас повар сам бегает к столу — это не его работа.

### Как исправить (пошагово)

#### Шаг 1. Упрости `renderer` в `index.js`

```js
const displayCards = new Section(
  {
    items: initialCards,
    renderer: (item) => createCard(item),
  },
  ".elements",
);
```

#### Шаг 2. Измени `renderItems()` в `Section.js`

```js
renderItems() {
  this.clear();

  this._renderedItems.forEach((item) => {
    this.addItem(this._renderer(item));
  });
}
```

**Что происходит:**
1. `this.clear()` — очистить контейнер.
2. Для каждого элемента массива `initialCards`:
   - `this._renderer(item)` — создать DOM-карточку;
   - `this.addItem(...)` — добавить её в конец `.elements`.

#### Шаг 3. Проверь

При загрузке страницы все 6 карточек из `initialCards` должны отображаться как раньше.

---

## Пункт 8. Упростить `createCard`

### Текущий код

```js
function createCard(item) {
  const card = new Card(item, rectangleTemplate, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}
```

### Как упростить

```js
function createCard(item) {
  return new Card(item, rectangleTemplate, handleCardClick).generateCard();
}
```

**Логика та же**, строк меньше. Промежуточные переменные не нужны, если они используются один раз.

---

## Пункт 9–11. `prependItem` и единая работа с контейнером

Подробно разобрано в **Ошибке 3** выше.

Кратко:
- `addItem` — в конец (для начальной отрисовки);
- `prependItem` — в начало (для новых карточек);
- оба метода — внутри `Section`.

---

## Пункт 10. Заполнение формы профиля

Подробно разобрано в **Ошибке 2** выше.

---

## Пункт 13. Закомментированный импорт в `Section.js`

```js
// import { initialCards } from "./Constants";
```

Этот импорт **не используется**. Закомментированный код создаёт вопросы: «Это нужно? Забыли?»

**Исправление:** просто удали эту строку.

---

## Пункт 14. `==` vs `===` для Escape

### Где

`scripts/Popup.js`:

```js
if (evt.key == "Escape") {
```

### В чём разница

- **`==`** — «нестрогое» сравнение. JavaScript может **приводить типы**: `"5" == 5` → `true`.
- **`===`** — «строгое» сравнение. Сравнивает **и значение, и тип**: `"5" === 5` → `false`.

Для сравнения клавиш **всегда** используй `===` — так безопаснее и это стандарт в современном JS.

### Исправление

```js
if (evt.key === "Escape") {
```

---

## Пункт 15. Лишняя обёртка на кнопке закрытия

### Текущий код

```js
this._closeButton.addEventListener("click", () => this.close());
```

### Зачем так пишут

Стрелочная функция `() => this.close()` создаёт **новую функцию-обёртку**, которая при клике вызывает `this.close()`.

### Как можно лучше

Сделать отдельный метод-обработчик (как для ESC):

```js
_handleCloseClick = () => {
  this.close();
};

// в setEventListeners:
this._closeButton.addEventListener("click", this._handleCloseClick);
```

**Зачем:** единый стиль с `_handleEscClose`, проще снимать слушатель, если понадобится.

Для учебного проекта текущий вариант **работает** — это улучшение стиля, не критичная ошибка.

---

## Пункт 16. Повторный `open()` без `close()`

### Проблема

```js
open() {
  this._popup.classList.add("popup_active");
  document.addEventListener("keydown", this._handleEscClose); // добавляем слушатель
}
```

Каждый раз при `open()` добавляется **новый** слушатель Escape на `document`.

Если по какой-то причине `open()` вызовут **два раза подряд** без `close()`:
- на Escape повесится **2 слушателя**;
- при нажатии Escape `close()` вызовется **дважды**.

На практике это редко, но «взрослый» код защищается:

```js
open() {
  this._popup.classList.add("popup_active");
  document.removeEventListener("keydown", this._handleEscClose); // сначала снять
  document.addEventListener("keydown", this._handleEscClose);    // потом повесить
}
```

---

## Пункт 17. `PopupWithForm` всегда закрывает форму после submit

### Текущий код

```js
_handleSubmit = (evt) => {
  evt.preventDefault();
  const inputValues = this._getInputValues();
  this._handleFormSubmit(inputValues);
  this.close(); // ← всегда закрывает
};
```

### Что это значит

После нажатия «Сохранить» форма **всегда** закроется — даже если в будущем сохранение на сервер **не удалось**.

Сейчас у тебя нет сервера — это **нормально**.  
Но когда добавишь API, захочешь:

```js
this._handleFormSubmit(inputValues)
  .then(() => this.close())
  .catch(() => { /* показать ошибку, форму не закрывать */ });
```

Пока просто **знай об этом** — не ошибка, а задел на будущее.

---

## Пункт 18. Нет заполнения полей при открытии формы

См. **Ошибку 2** — там полное пошаговое решение.

---

## Пункт 19. `PopupWithImage` — всё хорошо

```js
open({ link, name }) {
  this._image.src = link;       // 1. ставим картинку
  this._image.alt = name;       // 2. alt для доступности
  this._caption.textContent = name; // 3. подпись
  super.open();                 // 4. показываем модалку
}
```

**Порядок важен:** сначала данные, потом показ.  
Если вызвать `super.open()` раньше, пользователь на миг увидит **пустую** картинку.

---

## Пункт 20–21. Стиль методов в `UserInfo`

### Текущий код

```js
getUserInfo = () => { ... };
setUserInfo = (data) => { ... };
```

### Обычный стиль (как в других классах)

```js
getUserInfo() {
  return {
    name: this._profileName.textContent,
    activity: this._profileActivity.textContent,
  };
}

setUserInfo(data) {
  this._profileName.textContent = data.name;
  this._profileActivity.textContent = data.activity;
}
```

### В чём разница (для начинающего)

| Обычный метод | Поле-стрелка |
|---------------|--------------|
| `getUserInfo() { }` | `getUserInfo = () => { }` |
| Находится в **prototype** класса | Создаётся **отдельно для каждого объекта** |
| Стандарт для классов ES6 | Чаще для колбеков, где важен `this` |

Оба варианта **работают**. Но в твоём проекте все классы используют обычные методы — лучше **единый стиль**.

---

## Пункт 22. Неиспользуемое поле `_id` в `Card`

```js
this._id = data.id;
```

В массиве `initialCards` у объектов **нет** поля `id`:

```js
{ name: "Архыз", link: "https://..." }
```

Значит `this._id` всегда `undefined`, и **нигде не читается**.

**Исправление:** удали строку `this._id = data.id;`  
(или добавь `id` в данные, если планируешь использовать — но сейчас не нужно).

---

## Пункт 23. `evt.target` vs `evt.currentTarget`

### Где

```js
_putOrRemoveLike(evt) {
  evt.target.classList.toggle("rectangle__button_active");
}
```

### Разница

Когда пользователь кликает на элемент:

- **`evt.target`** — элемент, **на который реально кликнули** (может быть `<img>` внутри кнопки).
- **`evt.currentTarget`** — элемент, **на котором висит обработчик** (сама кнопка `.rectangle__button`).

### Пример проблемы

```html
<button class="rectangle__button">
  <img src="heart.svg" />  <!-- если добавишь иконку -->
</button>
```

Клик по иконке:
- `evt.target` → `<img>`
- `evt.currentTarget` → `<button>`

Класс `rectangle__button_active` нужен **кнопке**, а не `<img>`.  
Поэтому правильнее:

```js
evt.currentTarget.classList.toggle("rectangle__button_active");
```

---

## Пункт 24. Лишние обёртки в `addEventListener`

### Текущий код

```js
.addEventListener("click", (evt) => {
  this._putOrRemoveLike(evt);
});
```

### Можно короче

Если `_putOrRemoveLike` сделать **стрелочной функцией** на уровне класса:

```js
_putOrRemoveLike = (evt) => {
  evt.currentTarget.classList.toggle("rectangle__button_active");
};

// и в _setEventListeners:
this._element.querySelector(".rectangle__button")
  .addEventListener("click", this._putOrRemoveLike);
```

**Зачем стрелка на уровне класса:** она «запоминает» правильный `this` (объект `Card`).

---

## Пункт 25. Повторные `querySelector`

В `generateCard()` и `_setEventListeners()` ты несколько раз ищешь одни и те же элементы:

```js
this._element.querySelector(".rectangle__image")
this._element.querySelector(".rectangle__button")
```

Можно один раз сохранить в переменные — чуть быстрее и читабельнее.  
Для 6 карточек разница незаметна. **Не обязательно** для сдачи проекта.

---

## Пункт 26. Тернарный оператор в `_checkInputValidity`

### Текущий код

```js
!inputElement.validity.valid
  ? this._showInputError(inputElement, inputElement.validationMessage)
  : this._hideInputError(inputElement);
```

### Более читаемый вариант

```js
if (!inputElement.validity.valid) {
  this._showInputError(inputElement, inputElement.validationMessage);
} else {
  this._hideInputError(inputElement);
}
```

**Логика одинаковая.** `if/else` проще читать, когда только начинаешь.

---

## Пункт 27. Два обработчика `submit` на одной форме

### Кто слушает submit

1. **`FormValidator.enableValidation()`:**
   ```js
   this._formElement.addEventListener("submit", (evt) => {
     evt.preventDefault();
   });
   ```

2. **`PopupWithForm.setEventListeners()`:**
   ```js
   this._form.addEventListener("submit", this._handleSubmit);
   ```

### Что происходит при submit

Оба обработчика **сработают** (порядок зависит от порядка подключения).

Оба вызывают `evt.preventDefault()` — страница **не перезагрузится**. Это правильно.

**Это не баг**, но важно понимать: на одной форме может быть **несколько** слушателей одного события.

---

## Пункт 28. Опечатка в HTML для класса ошибки

В `index.html`:

- Поле «Имя»: `class="popup__input-error ..."` ✅
- Поле «Деятельность»: `class="popup__input_error ..."` ❌ (нижнее подчёркивание `_` вместо дефиса `-`)

`FormValidator` ищет ошибку по id: `` `.${inputElement.id}-error` `` — на JS **не влияет**.

Но CSS-стили для `.popup__input-error` **не применятся** ко второму полю.

**Исправление в HTML:**

```html
<span class="popup__input-error input-activity-error"></span>
```

---

## Пункт 29. Закомментированный код в `Constants.js`

Большой блок закомментированных констант (строки 55–72) — это **старый код**.

Он путает: кажется, что его нужно раскомментировать, хотя правильный путь — **классы**.

**Рекомендация:** после переноса логики в классы — **удали** закомментированный блок целиком.

---

# ЧАСТЬ 3. План работы по шагам (чеклист)

Выполняй по порядку. После каждого пункта — проверка в браузере.

## Этап 1 — Критичные ошибки (P0)

- [ ] **1.1** Исправить импорт: `card.js` вместо `Card.js`
- [ ] **1.2** Добавить `setInputValues()` в `PopupWithForm`
- [ ] **1.3** Удалить `signPopupProfile`, вызывать `setInputValues` + `open` при клике на профиль
- [ ] **1.4** Добавить `prependItem()` в `Section`
- [ ] **1.5** В колбеке добавления карточки использовать `displayCards.prependItem(...)`

**Проверка этапа 1:**
- [ ] Страница загружается без ошибок в Console
- [ ] Редактирование профиля открывается и поля заполнены
- [ ] Новая карточка добавляется в начало списка

## Этап 2 — Архитектура (P1)

- [ ] **2.1** Исправить двойной `_hasInvalidInput()` в `FormValidator`
- [ ] **2.2** Перенести `addItem` внутрь `Section.renderItems()`
- [ ] **2.3** Упростить `renderer` до `(item) => createCard(item)`

**Проверка этапа 2:**
- [ ] Все 6 начальных карточек отображаются
- [ ] Валидация форм работает как раньше

## Этап 3 — Чистота кода (P2)

- [ ] **3.1** Удалить неиспользуемые импорты (`Popup`, `container`)
- [ ] **3.2** Удалить комментарии «ОШИБКА» / «ЛУЧШЕ»
- [ ] **3.3** Удалить `_id` из `Card`
- [ ] **3.4** Заменить `==` на `===` в `Popup.js`
- [ ] **3.5** Использовать `evt.currentTarget` в лайке
- [ ] **3.6** Привести методы `UserInfo` к обычному стилю
- [ ] **3.7** Исправить опечатку в HTML (`popup__input-error`)
- [ ] **3.8** Удалить закомментированный код из `Constants.js` и `Section.js`

---

# ЧАСТЬ 4. Как отлаживать ошибки самому

## Открыть Console в браузере

1. Открой сайт.
2. **Chrome / Edge:** `F12` или `Cmd+Option+J` (Mac) / `Ctrl+Shift+J` (Windows).
3. Вкладка **Console**.

## Типичные ошибки и что они значат

| Ошибка | Значение | Что делать |
|--------|----------|------------|
| `ReferenceError: X is not defined` | Переменная `X` нигде не объявлена | Найти, где используется `X`, объявить или заменить на правильное имя |
| `Failed to load module` | Файл импорта не найден | Проверить путь и **регистр** имени файла |
| `Cannot read properties of null` | `querySelector` не нашёл элемент | Проверить селектор и наличие элемента в HTML |
| `X is not a function` | Вызываешь не функцию | Проверить импорт и имя метода |

## Мини-алгоритм отладки

1. Прочитай **текст ошибки** — там часто написано имя переменной и номер строки.
2. Кликни на ссылку с номером строки в Console — откроется нужное место в Sources.
3. Поставь **breakpoint** (точку останова) и пройди код по шагам.
4. Исправь **одну** ошибку → перезагрузи → проверь снова.

---

# Итог

Твой проект **уже близок к правильной архитектуре**: классы разделены, наследование `Popup → PopupWithForm → PopupWithImage` сделано верно.

Главная проблема — **половина кода обновлена на классы, половина ещё ссылается на старые переменные**. Это нормальная ситуация при обучении.

Исправь **P0** (4 пункта) — и проект заработает стабильно.  
Потом **P1** и **P2** — код станет чище, и ревью пройдёт легче.

Если застрянешь на конкретном шаге — открой Console, скопируй **точный текст ошибки** и разбирай по таблице выше.

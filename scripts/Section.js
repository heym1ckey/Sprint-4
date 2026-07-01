export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  clear() {
    this._container.innerHTML = "";
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this.clear();

    this._renderedItems.forEach((item) => {
      this.addItem(this._renderer(item));
    });
  }
}

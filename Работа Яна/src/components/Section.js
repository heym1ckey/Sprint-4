export default class Section {
    constructor({ renderer }, container) {
      this._renderer = renderer;
      this._container = container;
    }
  
    addItem(element, method) {
      this._container[method](element);
    }
  
    renderItems(renderedItems) {
      renderedItems.forEach(item => {
        this._renderer(item);
      });
    }
  }
  
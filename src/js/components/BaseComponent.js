/* eslint-disable no-underscore-dangle */
export default class BaseComponent {
  constructor() {
    this._setHandlers = this._setHandlers.bind(this);
    this._setEventListeners = this._setEventListeners.bind(this);
    this.removeEventListeners = this.removeEventListeners.bind(this);
    this.handlersArray = [];
  }

  _setHandlers(eventObjects = []) {
    eventObjects.forEach((eventObject) => this._setEventListeners(eventObject));
  }

  _setEventListeners({ element, event, callback }) {
    element.addEventListener(event, callback);
    this.handlersArray.push({ element, event, callback });
  }

  removeEventListeners() {
    this.handlersArray.forEach(({ element, event, callback }) => {
      element.removeEventListener(event, callback);
    });
  }
}

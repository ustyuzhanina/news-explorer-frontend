/* eslint-disable no-underscore-dangle */
export default class BaseComponent {
  constructor(handlersArray) {
    this._setHandlers = this._setHandlers.bind(this);
    this._setEventListeners = this._setEventListeners.bind(this);
    this._removeEventListeners = this._setHandlers.bind(this);
    this.handlersArray = handlersArray;
  }

  _setHandlers(eventObjects = []) {
    eventObjects.forEach((eventObject) => this._setEventListeners(eventObject));
  }

  _setEventListeners({ element, event, callback }) {
    element.addEventListener(event, callback);
    this.handlersArray.push({ element, event, callback });
  }

  _removeEventListeners() {
    this.handlersArray.forEach(({ element, event, callback }) => {
      element.removeEventListener(event, callback);
    });
  }
}
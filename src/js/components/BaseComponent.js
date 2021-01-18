export default class BaseComponent {
  constructor(handlersArray) {
    this._setHandlers = this._setHandlers.bind(this);
    this.handlersArray = handlersArray;
  }
}
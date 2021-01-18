export default class Form {
  constructor(form) {
    this.form = form;
    this.setServerError = this.setServerError.bind(this);
    this._validateInputElement = this._validateInputElement.bind(this);
    this._validateForm = this._validateForm.bind(this);
    this._clear = this._clear.bind(this);
    this._getInfo = this._getInfo.bind(this);
  }
}

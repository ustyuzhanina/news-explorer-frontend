/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import Popup from './Popup';

export default class popupRegister extends Popup {
  constructor(mainApi, formClass, popup) {
    super(popup, formClass);
    this.mainApi = mainApi;
    this.setServerError = this.setServerError.bind(this);
    this.linkBtn = this.popup.querySelector('.popup__input-link');
  }

  submit(e) {
    e.preventDefault();
    this.mainApi.signup(this.form.elements.email.value, this.form.elements.password.value, this.form.elements.name.value, this.setServerError);
  }
}

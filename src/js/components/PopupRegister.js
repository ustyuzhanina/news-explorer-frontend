/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import Popup from './Popup';

export default class popupRegister extends Popup {
  constructor(mainApi, formClass, popup) {
    super(popup, formClass);
    this.mainApi = mainApi;
    this.linkBtn = this.popup.querySelector('.popup__input-link');
  }

  submit(e) {
    e.preventDefault();
    const email = this.form.email.value;
    const password = this.form.password.value;
    const name = this.form.name.value;
    this.mainApi.signup(email, password, name, this.setServerError);
  }
}

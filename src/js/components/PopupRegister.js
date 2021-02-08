/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import Popup from './Popup';

export default class popupRegister extends Popup {
  constructor(formClass, popup) {
    super(popup, formClass);
    this.linkBtn = this.popup.querySelector('.popup__input-link');
    this.pickUpData = this.pickUpData.bind(this);
  }

  pickUpData(form) {
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    return { email, password, name };
  }
}

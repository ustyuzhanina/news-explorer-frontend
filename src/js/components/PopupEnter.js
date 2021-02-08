/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import Popup from './Popup';

export default class PopupEnter extends Popup {
  constructor(formClass, popup) {
    super(popup, formClass);
    this.linkBtn = this.popup.querySelector('.popup__input-link');
    this.pickUpData = this.pickUpData.bind(this);
  }

  setSuccessSignIn(name) {
    this.close();
    this.headerClass.render({ isLoggedin: true, userName: name });
    // this.newsCardClass.switchIcons();
  }

  pickUpData(form) {
    const email = form.email.value;
    const password = form.password.value;
    return { email, password };
  }

  submit(e) {
    e.preventDefault();
    this.mainApi.signin();
  }
}
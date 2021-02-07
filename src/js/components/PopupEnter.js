/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import Popup from './Popup';

export default class PopupEnter extends Popup {
  constructor(formClass, mainApiClass, cardClass, headerClass, popup) {
    super(popup, formClass);
    this.mainApi = mainApiClass;
    this.setServerError = this.setServerError.bind(this);
    this.setSuccessSignIn = this.setSuccessSignIn.bind(this);
    this.headerClass = headerClass;
    this.newsCardClass = cardClass;
    this.linkBtn = this.popup.querySelector('.popup__input-link');
  }

  setSuccessSignIn(name) {
    this.close();
    this.headerClass.render({ isLoggedin: true, userName: name });
    // this.newsCardClass.switchIcons();
  }

  submit(e) {
    e.preventDefault();
    this.mainApi.signin(this.form.elements.email.value, this.form.elements.password.value, this.setServerError, this.setSuccessSignIn);
  }
}
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
import { NAVBAR } from '../constants/MARKUP_SELECTORS';
import disableSubmitBtn from '../utils/disableSubmitBtn';
import enableSubmitBtn from '../utils/enableSubmitBtn';
import resetError from '../utils/resetError';

export default class Popup {
  constructor(popup, formClass) {
    this.popup = popup;
    this.formClass = formClass;
    this.form = null;
    this.serverError = null;
    this.closeBtn = null;
    this.submitBtn = null;
    this.clearContent = this.clearContent.bind(this);
    this.setServerError = this.setServerError.bind(this);
    this.resetSubmitBtn = this.resetSubmitBtn.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  setServerError(errText) {
    this.serverError.textContent = errText;
    this.serverError.classList.add('error_general_visible');
  }

  open() {
    this.form = this.popup.querySelector('.popup__form');
    this.serverError = this.popup.querySelector('.error_general');
    this.submitBtn = this.popup.querySelector('.popup__button');
    this.closeBtn = this.popup.querySelector('.popup__close');

    this.popup.classList.add('popup_is-opened');
    this.setEventListeners();
    this.form.elements[1].focus();
    NAVBAR.classList.remove('navbar_opened');
  }

  resetSubmitBtn() {
    let submitBtnActive = true;

    for (const input of this.form) {
      if (input.name.length === 0) {
        continue;
      }

      if (submitBtnActive) {
        submitBtnActive = input.checkValidity();
      }
    }

    if (!submitBtnActive) {
      disableSubmitBtn(this.form);
    } else {
      enableSubmitBtn(this.form);
    }
  }

  clearContent() {
    const inputs = this.form.querySelectorAll('input');
    inputs.forEach((input) => {
      resetError(input);
    });
    this.form.reset();
    this.serverError.classList.remove('error_general_visible');
    this.serverError.textContent = '';
    disableSubmitBtn(this.form);
  }

  close() {
    this.clearContent();
    this.popup.classList.remove('popup_is-opened');
  }

  // eventListeners helpers
  _handleKeyDown(e) {
    if (e.key === 'Escape' || e.key === 'Esc') { this.close(); }
  }

  _handleMouseDown(e) {
    if (e.target.classList.contains('popup')) {
      this.close();
    }
  }

  // basic event listeners

  setEventListeners() {
    this.closeBtn.addEventListener('click', this.close, { once: true });
    document.addEventListener('keydown', (e) => this._handleKeyDown(e), { once: true });
    this.popup.addEventListener('click', (e) => this._handleMouseDown(e));
    this.form.addEventListener('input', (e) => { this.formClass.validateForm(e); this.resetSubmitBtn(); });
  }
}

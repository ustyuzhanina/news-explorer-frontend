import {
  POPUP,
} from '../constants/MARKUP_SELECTORS';

export default class Popup {
  constructor() {
    this.popupElement = POPUP;
    this.setContent = this.setContent.bind(this);
    this.clearContent = this.clearContent.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  setContent(popupName, popupContent) {
    this.popupElement.classList.add(popupName);
    this.popupElement.insertAdjacentHTML('afterbegin', popupContent);
  }

  clearContent() {
    this.popupElement.className = 'popup';
    this.popupElement.textContent = '';
  }

  open() {
    this.popupElement.classList.add('popup_is-opened');
  }

  close() {
    this.popupElement.classList.remove('popup_is-opened');
    this.clearContent();
  }
}

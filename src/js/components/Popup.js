export default class Popup {
  constructor(popup, onClose) {
    this.popupElement = popup;
    this.popupCloser = this.popupElement.querySelector('.popup__close');
    this.popupBackground = this.popupElement.querySelector('.popup::before'); // возможно инициализировать надо буде в функции, где попап уже открыт, иначе может не найти
    this.onClose = onClose;
    this.setContent = this.setContent.bind(this); // вставляет в попап содержимое, например, форму входа или сообщение об успешной регистрации;
    this.clearContent = this.clearContent.bind(this); // очищает содержимое попапа
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  setContent() {

  }
}


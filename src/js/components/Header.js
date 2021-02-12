import {
  PAGE,
  HEADER,
  NAVBAR_USERNAME,
  NAVBAR_BTN_LOGOUT,
} from '../constants/MARKUP_SELECTORS';

export default class Header {
  constructor({ headerColor }, newsCardClass, mainApiClass, newsApiClass) {
    this.headerColor = headerColor;
    this.page = PAGE;
    this.cardClass = newsCardClass;
    this.apiClass = mainApiClass;
    this.newsApiClass = newsApiClass;
    this.userName = null;
    this.setEventListeners = this.setEventListeners.bind(this);
  }

  render(isLoggedIn, userName) {
    HEADER.style.backgroundColor = this.headerColor;
    this.userName = userName;
    NAVBAR_USERNAME.textContent = this.userName;
    const cards = document.querySelectorAll('.card');

    if (!isLoggedIn) {
      PAGE.classList.remove('page_logged-in');
      cards.forEach((card) => {
        this.cardClass.switchIcons(card, false);
      });
    } else {
      PAGE.classList.add('page_logged-in');
      cards.forEach((card) => {
        this.cardClass.switchIcons(card, true);
      });
      this.setEventListeners();
    }
  }

  setEventListeners() {
    NAVBAR_BTN_LOGOUT.addEventListener('click', () => {
      this.apiClass.signout()
        .then((res) => {
          console.log(res.message);
          window.location.href = '../';
          this.userName = null;
          this.render(false, this.userName);
          this.newsApiClass.isLoggedIn = false;

          cards.forEach((card) => {
            this.cardClass.switchIcons(card, false);
          });
        })
        .catch((err) => console.log(err));
    }, { once: true });
  }
}

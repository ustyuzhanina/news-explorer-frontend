import {
  PAGE,
  HEADER,
  NAVBAR_USERNAME,
  NAVBAR_BTN_LOGOUT,
  NAVBAR_SHOW_MENU_BTN,
  NAVBAR,
} from '../constants/MARKUP_SELECTORS';
import { USER } from '../constants/USER';

export default class Header {
  constructor({ headerColor }, newsCardClass, mainApiClass) {
    this.headerColor = headerColor;
    this.page = PAGE;
    this.cardClass = newsCardClass;
    this.apiClass = mainApiClass;
  }

  render(userName) {
    HEADER.style.backgroundColor = this.headerColor;

    if (!userName) {
      PAGE.classList.remove('page_logged-in');
    } else {
      PAGE.classList.add('page_logged-in');

      NAVBAR_BTN_LOGOUT.addEventListener('click', () => {
        this.apiClass.signout()
          .then((res) => {
            console.log(res.message);
            window.location.href = '../';
            USER.name = null;
            USER.email = null;
            this.render(USER.name);
            this.cardClass.switchIcons(false);
          })
          .catch((err) => console.log(err));
      });
    }

    NAVBAR_SHOW_MENU_BTN.addEventListener('click', () => {
      NAVBAR.classList.toggle('navbar_opened');
    });

    NAVBAR_USERNAME.textContent = userName;
  }
}

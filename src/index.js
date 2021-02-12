/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable wrap-iife */
import './index.css';

import NewsApi from './js/api/NewsApi';
import MainApi from './js/api/MainApi';
import Form from './js/components/Form';
import Header from './js/components/Header';
import NewsCard from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';
import PopupEnter from './js/components/PopupEnter';
import PopupRegister from './js/components/PopupRegister';
import PopupSuccess from './js/components/PopupSuccess';
import { NEWS_API_CONFIG } from './js/constants/NEWS_API_CONFIG';
import { MAIN_API_CONFIG } from './js/constants/MAIN_API_CONFIG';
// import { USER } from './js/constants/USER';
import ProfilePage from './js/components/ProfilePage';
import {
  POPUP_ENTER,
  POPUP_REGISTER,
  POPUP_SUCCESS,
  NAVBAR_BTN_AUTH,
  BTN_SHOW_MORE,
  NAVBAR_SHOW_MENU_BTN,
  NAVBAR,
  CARD_CONTAINER,
} from './js/constants/MARKUP_SELECTORS';
import {
  NOT_FOUND_ERROR,
  BAD_REQUEST_ERROR,
  AUTH_ERROR,
  FORBIDDEN,
  MAIN_API_ERROR,
  MONGO_ERROR,
} from './js/constants/ERRORS';

(function () {
  const newsApi = new NewsApi(NEWS_API_CONFIG);
  const mainApi = new MainApi(MAIN_API_CONFIG);
  const profilePage = new ProfilePage();
  const newsCard = new NewsCard(mainApi, profilePage);
  const header = new Header({ headerColor: 'transparent' }, newsCard, mainApi, newsApi);
  const cardList = new NewsCardList(newsCard, mainApi, newsApi);
  const form = new Form(newsApi, cardList);
  const popupRegister = new PopupRegister(form, POPUP_REGISTER);
  const popupSuccess = new PopupSuccess(POPUP_SUCCESS);
  const popupEnter = new PopupEnter(form, POPUP_ENTER);

  function switchPopups(from, to) {
    from.close();
    to.open();
  }

  function setSubmitListenerToPopupEnter() {
    popupEnter.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const userData = popupEnter.pickUpData(e.target);
      mainApi.signin(userData)
        .then((jwt) => {
          popupEnter.close();
          header.render(mainApi.isLoggedIn, localStorage.getItem('user'));
        })
        .catch((err) => {
          if (err === 401) {
            popupEnter.setServerError(AUTH_ERROR.invalidCreds);
          } else { popupEnter.setServerError(MAIN_API_ERROR); }
        });
    });
  }

  // первичная отрисовка страницы
  mainApi.getUserData()
    .finally(() => {
      header.render(mainApi.isLoggedIn, localStorage.getItem('user'));
    });

  // newsCard.switchIcons(, isLoggedIn);

  form.setEventListeners();

  // слушатели событий для кнопок интерфейса
  NAVBAR_BTN_AUTH.addEventListener('click', () => {
    popupEnter.open();
    setSubmitListenerToPopupEnter();
  });

  BTN_SHOW_MORE.addEventListener('click', () => cardList.showMore());

  NAVBAR_SHOW_MENU_BTN.addEventListener('click', () => {
    NAVBAR.classList.toggle('navbar_opened');
  });

  // переключатели для попапов
  popupEnter.linkBtn.addEventListener('click', () => {
    switchPopups(popupEnter, popupRegister);

    popupRegister.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const userData = popupRegister.pickUpData(e.target);
      mainApi.signup(userData)
        .then(() => {
          switchPopups(popupRegister, popupSuccess);
        })
        .catch((err) => {
          if (err === 409) {
            popupRegister.setServerError(MONGO_ERROR.usedEmailErr);
          } else { popupRegister.setServerError(MAIN_API_ERROR); }
        });
    });
  });

  popupRegister.linkBtn.addEventListener('click', () => {
    switchPopups(popupRegister, popupEnter);
    setSubmitListenerToPopupEnter();
  });

  popupSuccess.linkBtn.addEventListener('click', () => {
    switchPopups(popupSuccess, popupEnter);
    setSubmitListenerToPopupEnter();
  });
})();

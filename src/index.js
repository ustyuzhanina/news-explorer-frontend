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
import { USER } from './js/constants/USER';
import ProfilePage from './js/components/ProfilePage';
import {
  PAGE,
  POPUP_ENTER,
  POPUP_REGISTER,
  POPUP_SUCCESS,
  NAVBAR_BTN_AUTH,
  NAVBAR,
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
  const profilePage = new ProfilePage(USER);
  const newsCard = new NewsCard(mainApi, profilePage);
  const header = new Header({ headerColor: 'transparent' }, newsCard);
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
          mainApi.getUserData()
            .then((userObj) => {
              USER.name = userObj.name;
              USER.email = userObj.email;
              console.log(USER);
              header.render(USER.name);
            })
            .catch((err) => console.log(`Код ошибки: ${err}`));
          console.log(jwt);
        })
        .catch((err) => {
          if (err === 401) {
            popupEnter.setServerError(AUTH_ERROR.invalidCreds);
          } else { popupEnter.setServerError(MAIN_API_ERROR); }
        });
    });
  }

  header.render(USER.name);

  // общие слушатели событий
  form.setEventListeners();
  cardList.setEventListeners();
  // newsCard.setEventListeners();

  NAVBAR_BTN_AUTH.addEventListener('click', () => {
    popupEnter.open();
    setSubmitListenerToPopupEnter();
  });

  // переключатели для попапов
  popupEnter.linkBtn.addEventListener('click', () => {
    switchPopups(popupEnter, popupRegister);

    popupRegister.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const userData = popupRegister.pickUpData(e.target);
      mainApi.signup(userData)
        .then((regData) => {
          switchPopups(popupRegister, popupSuccess);
          console.log(regData);
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

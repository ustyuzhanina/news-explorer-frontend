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

(function () {
  const newsApi = new NewsApi(NEWS_API_CONFIG);
  const mainApi = new MainApi(MAIN_API_CONFIG);
  const profilePage = new ProfilePage(USER);
  const newsCard = new NewsCard(mainApi, profilePage);
  const header = new Header({ headerColor: 'transparent' }, newsCard);
  const cardList = new NewsCardList(newsCard, mainApi, newsApi);
  const form = new Form(newsApi, cardList);
  const popupRegister = new PopupRegister(mainApi, form, POPUP_REGISTER);
  const popupSuccess = new PopupSuccess(POPUP_SUCCESS);
  const popupEnter = new PopupEnter(form, mainApi, newsCard, header, POPUP_ENTER);

  function switchPopups(from, to) {
    from.close();
    to.open();
  }

  if (!USER) {
    header.render({ isLoggedin: false });
  } else {
    header.render({ isLoggedin: true, userName: USER.name });
  }

  NAVBAR_BTN_AUTH.addEventListener('click', () => popupEnter.open());

  // переключатели для попапов
  popupEnter.linkBtn.addEventListener('click', () => switchPopups(popupEnter, popupRegister));
  popupRegister.linkBtn.addEventListener('click', () => switchPopups(popupRegister, popupEnter));
  popupSuccess.linkBtn.addEventListener('click', () => switchPopups(popupSuccess, popupEnter));

  // общие слушатели событий
  form.setEventListeners();
  cardList.setEventListeners();
  // newsCard.setEventListeners();
})();

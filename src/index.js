/* eslint-disable func-names */
/* eslint-disable wrap-iife */
import './index.css';

import BaseComponent from './js/components/BaseComponent';
import NewsApi from './js/api/NewsApi';
import MainApi from './js/api/MainApi';
import Form from './js/components/Form';
import Header from './js/components/Header';
import NewsCard from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';
import Popup from './js/components/Popup';
import NEWS_API_CONFIG from './js/constants/NEWS_API_CONFIG';

(function () {
  const cardContainer = document.querySelector('.cards-list');
  const newsApiConfig = NEWS_API_CONFIG.NEWS_API_CONFIG;
  const newsApi = new NewsApi(newsApiConfig);
  const newsCardList = new NewsCardList(cardContainer);

  newsApi.getNews().then((res) => {
    console.log(res);
    const cardsArray = res.map((item) => {
      const card = new NewsCard(item);
      return card.create();
    });
    newsCardList.renderResults(cardsArray);
  })
    .catch((err) => console.log(err));
})();

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
const keyword = 'экономика';
(function () {
  const newsApi = new NewsApi(NEWS_API_CONFIG, keyword);

  newsApi.getNews().then((res) => {
    const cardsArray = res.map((item) => {
      const card = new NewsCard(item, keyword);
      return card.create();
    })
    cardList.render(cardsArray);
  })
  .catch((err) => console.log(err));
})()

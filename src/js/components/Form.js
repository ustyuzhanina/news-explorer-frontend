/* eslint-disable no-underscore-dangle */
import {
  SEARCH_BAR,
  SEARCH_BTN,
  SEARCH_FORM,
} from '../constants/MARKUP_SELECTORS';

export default class Form {
  constructor(newsApi, cardList) {
    this.searchBar = SEARCH_BAR;
    this.searchBtn = SEARCH_BTN;
    this.searchForm = SEARCH_FORM;
    this.newsApi = newsApi;
    this.cardList = cardList;
    // this.setServerError = this.setServerError.bind(this);
    // this._validateInputElement = this._validateInputElement.bind(this);
    // this._validateForm = this._validateForm.bind(this);
    this._clear = this._clear.bind(this);
    // this._getInfo = this._getInfo.bind(this);
  }

  validateSearch() {
    if (!this.searchBar.checkValidity()) {
      this.searchBar.placeholder = 'Введите ключевое слово для начала поиска';
      this.searchBtn.setAttribute('disabled', true);
      return false;
    }
    this.searchBar.placeholder = 'Введите тему новости';
    this.searchBtn.removeAttribute('disabled');
    return true;
  }

  _clear() {
    this.searchForm.reset();
  }

  setEventListeners() {
    this.searchBar.addEventListener('input', () => this.validateSearch());
    this.searchBtn.addEventListener('click', () => {
      this.cardList.renderLoader(true);
      this.newsApi.getNews(this.searchBar.value, this.cardList);
      this._clear();
      this.cardList.resetSearch();
    });
  }
}

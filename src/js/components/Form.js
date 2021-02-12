/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import activateInputError from '../utils/activateInputError';
import resetError from '../utils/resetError';
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
    this._validateInputElement = this._validateInputElement.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  _validateInputElement(input) {
    if (!input.checkValidity()) {



      activateInputError(input);
      return false;
    }
    return true;
  }

  validateForm(e) {
    resetError(e.target);
    this._validateInputElement(e.target);
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

  setEventListeners() {
    this.searchBar.addEventListener('input', () => this.validateSearch());
    this.searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = e.target.querySelector('input');
      const button = e.target.querySelector('button');

      input.setAttribute('disabled', true);
      button.setAttribute('disabled', true);

      this.cardList.renderLoader(true);
      this.newsApi.getNews(this.searchBar.value, this.cardList);

      input.removeAttribute('disabled');
      button.removeAttribute('disabled');

      this.searchForm.reset();
      this.cardList.resetSearch();
    });
  }
}

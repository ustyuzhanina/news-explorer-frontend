/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import activateInputError from '../utils/activateInputError';
import resetError from '../utils/resetError';
import {
  SEARCH_BAR,
  SEARCH_BTN,
  SEARCH_FORM,
} from '../constants/MARKUP_SELECTORS';
import { BAD_REQUEST_ERROR } from '../constants/ERRORS';

export default class Form {
  constructor(newsApi, cardList) {
    this.searchBar = SEARCH_BAR;
    this.searchBtn = SEARCH_BTN;
    this.searchForm = SEARCH_FORM;
    this.newsApi = newsApi;
    this.cardList = cardList;
    this._validateInputElement = this._validateInputElement.bind(this);
    this._isValidate = this._isValidate.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  _isValidate(inputElement) {
    inputElement.setCustomValidity('');

    if (inputElement.validity.valueMissing) {
      inputElement.setCustomValidity(BAD_REQUEST_ERROR.empty);
      return false;
    }

    if (inputElement.validity.tooShort) {
      if (inputElement.name === 'password') {
        inputElement.setCustomValidity(BAD_REQUEST_ERROR.tooShort.password);
        return false;
      }
      if (inputElement.name === 'name') {
        inputElement.setCustomValidity(BAD_REQUEST_ERROR.tooShort.name);
        return false;
      }
    }

    if (inputElement.validity.tooLong) {
      if (inputElement.name === 'password') {
        inputElement.setCustomValidity(BAD_REQUEST_ERROR.tooLong.password);
        return false;
      }
      if (inputElement.name === 'name') {
        inputElement.setCustomValidity(BAD_REQUEST_ERROR.tooLong.name);
        return false;
      }
    }

    if (inputElement.validity.patternMismatch) {
      if (inputElement.name === 'email') {
        inputElement.setCustomValidity(BAD_REQUEST_ERROR.pattern.email);
        return false;
      }
      if (inputElement.name === 'name') {
        inputElement.setCustomValidity(BAD_REQUEST_ERROR.pattern.name);
        return false;
      }
    }

    return inputElement.checkValidity();
  }

  _validateInputElement(input) {
    if (!this._isValidate(input)) {
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

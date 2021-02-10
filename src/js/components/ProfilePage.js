/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { sortByFrequency } from '../utils/sortByFrequency';
import { INTRO } from '../constants/MARKUP_SELECTORS';

export default class ProfilePage {
  constructor() {
    this._user = null;
    this.renderMarkup = this.renderMarkup.bind(this);
  }

  _createMarkup(articles) {
    const keywords = articles.map((article) => article.keyword.toUpperCase());
    const sortedKeywords = sortByFrequency(keywords);
    const totalArticlesN = articles.length;

    let headerEnding = '';
    let keywordsTemplate = '';
    const totalArticlesNStr = totalArticlesN.toString();
    const totalArticlesNEnd = () => {
      let number = null;
      if (totalArticlesN > 9) {
        number = totalArticlesNStr[totalArticlesNStr.length - 1];
      } else {
        number = totalArticlesN;
      }
      return number;
    };

    if (totalArticlesN === 0) {
      headerEnding = 'еще нет сохранённых статей';
      keywordsTemplate = `
      <div class="intro__container">
        <h2 class="intro__title">Сохранённые статьи</h2>
        <p class="intro__greeting">
          ${this.user}, у вас ${headerEnding}
        </p>
      </div>
      `;
    } else {
      switch (totalArticlesNEnd) {
        case 1:
          headerEnding = `${totalArticlesN} сохранённая статья`;
          break;

        case 2 || 3 || 4:
          headerEnding = `${totalArticlesN} сохранённых статьи`;
          break;

        case 0 || 5 || 6 || 7 || 8 || 9:
          headerEnding = `${totalArticlesN} сохранённых статей`;
          break;

        default:
          headerEnding = 'непонятное количество сохранённых статей';
      }

      switch (sortedKeywords.length) {
        case 1:
          keywordsTemplate = `
          <div class="intro__container">
            <h2 class="intro__title">Сохранённые статьи</h2>
            <p class="intro__greeting">
            ${this.user}, у вас ${headerEnding}
            </p>
            <p class="intro__keywords-summary">
              По ключевому слову:
              <span class="intro__keywords">${sortedKeywords[0]}</span>
            </p>
          </div>
          `;
          break;

        case 2:
          keywordsTemplate = `
            <div class="intro__container">
              <h2 class="intro__title">Сохранённые статьи</h2>
              <p class="intro__greeting">
              ${this.user}, у вас ${headerEnding}
              </p>
              <p class="intro__keywords-summary">
                По ключевым словам:
                <span class="intro__keywords">${sortedKeywords[0]}, ${sortedKeywords[1]}</span>
              </p>
            </div>
            `;
          break;

        case 3:
          keywordsTemplate = `
              <div class="intro__container">
                <h2 class="intro__title">Сохранённые статьи</h2>
                <p class="intro__greeting">
                ${this.user}, у вас ${headerEnding}
                </p>
                <p class="intro__keywords-summary">
                  По ключевым словам:
                  <span class="intro__keywords">${sortedKeywords[0]}, ${sortedKeywords[1]} и ${sortedKeywords[2]}</span>
                </p>
              </div>
              `;
          break;

        default:
          keywordsTemplate = `
            <div class="intro__container">
               <h2 class="intro__title">Сохранённые статьи</h2>
              <p class="intro__greeting">
              ${this.user}, у вас ${headerEnding}
              </p>
               <p class="intro__keywords-summary">
                По ключевым словам:
                <span class="intro__keywords">${sortedKeywords[0]}, ${sortedKeywords[1]}</span>
                и
                <span class="intro__rest-qty">${sortedKeywords.length - 2} другим</span>
               </p>
             </div>
             `;
      }
    }
    return keywordsTemplate;
  }

  renderMarkup(articles) {
    INTRO.insertAdjacentHTML('afterbegin', this._createMarkup(articles));
  }

  set user(userName) {
    this._user = userName;
  }

  get user() {
    return this._user;
  }
}

/* eslint-disable class-methods-use-this */
import {
  CARD_CONTAINER,
  PAGE,
  SEARCH_BAR,
} from '../constants/MARKUP_SELECTORS';

export default class NewsCard {
  constructor(mainApi) {
    this.switchIcons = this.switchIcons.bind(this);
    this.mainApi = mainApi;
    this.clickHandler = this.clickHandler.bind(this);
  }

  create(article, searchKeyword = null) {
    const title = article.title;
    const date = article.publishedAt;
    const description = article.description;
    const image = article.urlToImage;
    const source = article.source.name;
    const sourceUrl = article.url;
    const keyword = article.keyword || searchKeyword;
    const id = article._id || '';
    const owner = article.owner || '';

    const cardDate = (new Intl.DateTimeFormat('ru', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(date))).replace(' г.', '').replace(' 20', ', 20');

    const template = `
    <article class="card" data-id="${id}" data-owner="${owner}">
    <div class="card__cover">
      <img src="${image}" alt="Без фотографии" class="card__image">
      <div class="card__controls">
        <button class="card__icon card__icon_trash">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 3H9V5H3V7H21V5H15V3ZM5 9V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V9H17V20H7V9H5ZM9 9L9 18H11L11 9H9ZM13 9V18H15V9H13Z" fill="#B6BCBF"/>
          </svg>
        </button>
        <button class="card__icon card__icon_bookmark">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.3822 15.7137L6 19.9425V4L18 4V19.9425L12.6178 15.7137L12 15.2283L11.3822 15.7137Z" stroke="#B6BCBF" stroke-width="2"/>
          </svg>
        </button>
        <p class="card__icon card__icon_keyword">${keyword.toUpperCase()}</p>
      </div>
    </div>
    <div class="card__description">
      <time class="card__data" datetime="${(new Date(date)).toISOString().slice([0], [10])}">${cardDate}</time>
      <h2 class="card__title">${title}</h2>
      <p class="card__info">${description}</p>
    </div>
    <a class="card__source" href="${sourceUrl}" target="_blank" rel="noopener noreferrer">${source}</a>
  </article>
    `.trim();

    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', template);
    const newCard = element.firstChild;
    return newCard;
  }

  switchIcons() {
    const trashIcons = document.querySelectorAll('.card__icon_trash');
    const bookmarkIcons = document.querySelectorAll('.card__icon_bookmark');

    if (!JSON.parse(localStorage.getItem('user'))) {
      PAGE.classList.remove('page_logged-in');
      bookmarkIcons.forEach((icon) => icon.setAttribute('disabled', true));
    } else {
      PAGE.classList.add('page_logged-in');
      bookmarkIcons.forEach((icon) => {
        icon.removeAttribute('disabled');
        this.setEventListeners(icon);
      });
      trashIcons.forEach((icon) => {
        this.setEventListeners(icon);
      });
    }
  }

  clickHandler(event) {
    this.switchIcons(); // опредеелить правильное место для этой функции

    if (event.target.contains('card__icon_bookmark') || event.target.contains('card__icon_trash')) {
      const card = event.target.closest('card');
      const cardData = {
        keyword: card.querySelector('.card__icon_keyword').textContent,
        title: card.querySelector('.card__title').textContent,
        description: card.querySelector('.card__info').textContent,
        date: card.querySelector('.card__data').textContent,
        source: card.querySelector('.card__source').textContent,
        sourceUrl: card.querySelector('.card__source').href,
        image: card.querySelector('.card__image').src,
        id: card.dataset.id,
      };
      if (event.target.classList.contains('card__icon_bookmark_marked')) {
        const clearData = () => {
          card.dataset.id = '';
          card.dataset.owner = '';
          event.target.classList.remove('card__icon_bookmark_marked');
        };
        this.mainApi.removeArticle(card.dataset.id)
          .then((res) => {
            if (!res.ok) {
              return Promise.reject(res.statusText);
            }
            return res.json();
          })
          .then(() => clearData())
          .catch((err) => console.log(err));
      } else if (event.target.classList.contains('card__icon_trash')) {
        this.mainApi.removeArticle(card.dataset.id)
          .then((res) => {
            if (!res.ok) {
              return Promise.reject(res.statusText);
            }
            return res.json();
          })
          .then(() => this.mainApi.getArticles())
          .then((articles) => {
            this.savedNewsPage.renderMarkup(articles);
            CARD_CONTAINER.removeChild(card);
          })
          .catch((err) => console.log(err));
      } else {
        const fillInCard = (article) => {
          card.dataset.id = article.article._id;
          card.dataset.owner = article.article.owner;
          event.target.classList.add('card__icon_bookmark_marked');
        };
        this.mainApi.createArticle(cardData)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(res.statusText);
          })
          .then((article) => {
            fillInCard(article);
          })
          .catch((err) => console.log (err));
      }
    }
  }

  setEventListeners(icon) {
    icon.addEventListener('click', (event) => this.clickHandler(event));
  }
}

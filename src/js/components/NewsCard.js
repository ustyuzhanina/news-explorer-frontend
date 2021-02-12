/* eslint-disable class-methods-use-this */
import {
  CARD_CONTAINER,
} from '../constants/MARKUP_SELECTORS';

export default class NewsCard {
  constructor(mainApi, profilePage) {
    this.mainApi = mainApi;
    this.profilePage = profilePage;
    this.switchIcons = this.switchIcons.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleBookmarkClick = this.handleBookmarkClick.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
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

    const cardDate = (new Intl.DateTimeFormat('ru', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(date))).replace(' г.', '').replace(' 20', ', 20');

    const template = `
    <article class="card" data-id="${id}">
    <div class="card__cover">
      <img src="${image}" alt="Иллюстрация новости" class="card__image" onerror="this.src = 'https://images.unsplash.com/photo-1612538498456-e861df91d4d0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=40&q=20'; this.onerror = null;">
      <div class="card__controls">
        <button class="card__icon card__icon_trash" disabled>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 3H9V5H3V7H21V5H15V3ZM5 9V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V9H17V20H7V9H5ZM9 9L9 18H11L11 9H9ZM13 9V18H15V9H13Z" fill="#B6BCBF"/>
          </svg>
        </button>
        <button class="card__icon card__icon_bookmark" disabled>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.3822 15.7137L6 19.9425V4L18 4V19.9425L12.6178 15.7137L12 15.2283L11.3822 15.7137Z" stroke="#B6BCBF" stroke-width="2"/>
          </svg>
        </button>
        <p class="card__icon card__icon_keyword">${keyword.toUpperCase()}</p>
      </div>
    </div>
    <div class="card__description">
      <time class="card__data" datetime="${date}">${cardDate}</time>
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

  switchIcons(card, isLoggedIn) {
    const icons = card.querySelectorAll('.card__icon');

    if (!isLoggedIn) {
      icons.forEach((icon) => icon.setAttribute('disabled', true));
    } else {
      icons.forEach((icon) => icon.removeAttribute('disabled'));
    }
  }

  handleDelete(e) {
    const savedArticles = [];

    const card = e.target.closest('.card');
    this.mainApi.removeArticle(card.dataset.id)
      .then(() => {
        this.mainApi.getArticles()
          .then((res) => {
            savedArticles.push.apply(savedArticles, res);
            this.profilePage.renderMarkup(savedArticles);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            this.profilePage.renderMarkup(savedArticles);
          });
      })
      .then(() => CARD_CONTAINER.removeChild(card))
      .catch((err) => console.log(err));
  }

  handleBookmarkClick(e) {
    const card = e.target.closest('.card');
    const bookmarkIcon = card.querySelector('.card__icon_bookmark');
    const cardData = {
      keyword: card.querySelector('.card__icon_keyword').textContent,
      title: card.querySelector('.card__title').textContent,
      text: card.querySelector('.card__info').textContent,
      date: card.querySelector('.card__data').dateTime,
      source: card.querySelector('.card__source').textContent,
      link: card.querySelector('.card__source').href,
      image: card.querySelector('.card__image').src,
    };

    if (bookmarkIcon.classList.contains('card__icon_bookmark_marked')) {
      const clearData = () => {
        card.dataset.id = '';
        bookmarkIcon.classList.remove('card__icon_bookmark_marked');
      };

      this.mainApi.removeArticle(card.dataset.id)
        .then(() => clearData())
        .catch((err) => console.log(err));
    } else {
      const fillInCard = (article) => {
        card.dataset.id = article._id;
        bookmarkIcon.classList.add('card__icon_bookmark_marked');
      };

      this.mainApi.createArticle(cardData)
        .then((article) => {
          console.log(article);
          fillInCard(article);
        })
        .catch((err) => console.log(err));
    }
  }

  setEventListeners(card) {
    const trashIcon = card.querySelector('.card__icon_trash');
    const bookmarkIcon = card.querySelector('.card__icon_bookmark');

    trashIcon.addEventListener('click', (e) => this.handleDelete(e), { once: true });
    bookmarkIcon.addEventListener('click', (e) => this.handleBookmarkClick(e));
  }
}

export default class NewsCard {
  constructor(cardElementData) {
    // this.renderIcon = this.renderIcon.bind(this); // отвечает за отрисовку иконки карточки. У этой иконки три состояния: иконка незалогиненного пользователя, активная иконка залогиненного, неактивная иконка залогиненного.
    this.keyword = 'экономика';
    this.source = cardElementData.source.name;
    this.title = cardElementData.title;
    this.text = cardElementData.description;
    this.link = cardElementData.url;
    this.image = cardElementData.urlToImage;
    this.date = cardElementData.publishedAt;
    this.newCard = null;
  }

  create() {
    const cardDate = (new Intl.DateTimeFormat('ru', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(this.date))).replace(' г.', '').replace(' 20', ', 20');


    const template = `
    <article class="card">
    <div class="card__cover">
      <img src="${this.image}" alt="" class="card__image">
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
        <p class="card__icon card__icon_keyword">${this.keyword}</p>
      </div>
    </div>
    <div class="card__description">
      <time class="card__data" datetime="${(new Date(this.date)).toJSON().toString().slice([0], [10])}">${cardDate}</time>
      <h2 class="card__title">${this.title}</h2>
      <p class="card__info">${this.text}</p>
    </div>
    <h3 class="card__source">${this.source}</h3>
  </article>
    `;

    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', template.trim());

    this.newCard = element.firstChild;

    // this.setEventListeners();

    return this.newCard;
  }
}

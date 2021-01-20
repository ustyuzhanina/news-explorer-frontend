export default class NewsCardList {
  constructor(container) { // принимает массив карточек, которые должны быть в списке при первой отрисовке.
    this.container = container;
    this.renderResults = this.renderResults.bind(this);
    // this.renderLoader = this.renderLoader.bind(this);
    // this.renderError = this.renderError.bind(this);
    // this.showMore = this.showMore.bind(this); // отвечает за функциональность кнопки «Показать ещё»
    this.addCard = this.addCard.bind(this); // принимает экземпляр карточки и добавляет её в список
  }

  addCard(newCard) {
    this.container.appendChild(newCard);
  }

  renderResults(cards) {
    cards.forEach((item) => {
      this.addCard(item);
    });
  }
}

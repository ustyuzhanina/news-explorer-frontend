export default class NewsCardList {
  constructor(cardsArray) { // принимает массив карточек, которые должны быть в списке при первой отрисовке.
    this.renderResults = this.renderResults.bind(this);
    this.renderLoader = this.renderLoader.bind(this);
    this.renderError = this.renderError.bind(this);
    this.showMore = this.showMore.bind(this); // отвечает за функциональность кнопки «Показать ещё»
    this.addCard = this.addCard.bind(this); // принимает экземпляр карточки и добавляет её в список
  }
}
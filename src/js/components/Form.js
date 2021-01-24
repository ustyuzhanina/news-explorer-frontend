export default class Form {
  constructor(searchBar, searchBtn) {
    this.searchBar = searchBar;
    this.searchBtn = searchBtn;
    // this.setServerError = this.setServerError.bind(this);
    // this._validateInputElement = this._validateInputElement.bind(this);
    // this._validateForm = this._validateForm.bind(this);
    // this._clear = this._clear.bind(this);
    // this._getInfo = this._getInfo.bind(this);
  }

  validateSearch() {
    if (!this.searchBar.checkValidity()) {
      this.searchBar.placeholder = 'Введите ключевое слово для начала поиска';
      this.searchBtn.setAttribute('disabled', 'disabled');
      return false;
    }
    this.searchBar.placeholder = 'Введите тему новости';
    this.searchBtn.removeAttribute('disabled');
    return true;
  }

  setEventListeners() {
    this.searchBtn.addEventListener('click', () => this.validateSearch());
    this.searchBar.addEventListener('input', () => this.validateSearch());
  }
}

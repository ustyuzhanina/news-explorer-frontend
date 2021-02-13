const NEWS_API_ERROR = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';

const BAD_REQUEST_ERROR = {
  empty: 'Заполните поле',
  tooShort: {
    password: 'Минимальная длина пароля - 8 символов',
    name: 'Минимальная длина имени - 2 буквы',
  },
  tooLong: {
    password: 'Максимальная длина пароля - 30 символов',
    name: 'Максимальная длина имени - 20 букв',
  },
  pattern: {
    email: 'Неверный формат email',
    name: 'Введите имя буквами кириллицы',
  },
};

const AUTH_ERROR = {
  invalidCreds: 'Неправильные почта или пароль',
};

const MONGO_ERROR = {
  usedEmailErr: 'Такой пользователь уже есть',
};

const MAIN_API_ERROR = 'На сервере произошла ошибка';

export {
  NEWS_API_ERROR,
  BAD_REQUEST_ERROR,
  AUTH_ERROR,
  MAIN_API_ERROR,
  MONGO_ERROR,
};

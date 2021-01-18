// export const API_URL = NODE_ENV === 'production' ? 'https://nomoreparties.co' : 'http://nomoreparties.co';
const API_URL = 'http://newsapi.org';

const NEWS_API_CONFIG = {
  baseUrl: `${API_URL}/v2/everything`,
  params: {
    from: '2021-01-18',
    to: '2021-01-18',
    sortBy: 'popularity',
    pageSize: 3, // 100
    language: 'ru',
    q: '',
  },
  headers: {
    'X-Api-Key': 'b326bbabb1dd4436bca051964a795414',
    'Content-Type': 'application/json',
  },
};

export default { NEWS_API_CONFIG };

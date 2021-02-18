const API_URL = NODE_ENV === 'production' ? 'https://api.news4u.xyz' : 'http://localhost:3000';
const ORIGIN_URL = NODE_ENV === 'production' ? 'https://news4u.xyz' : 'http://localhost:8080';

const MAIN_API_CONFIG = {
  url: API_URL,
  origin: ORIGIN_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
};

export {
  MAIN_API_CONFIG,
};

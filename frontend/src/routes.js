const API_URL = '/api/v1';

export default {
  loginPath: [API_URL, 'login'].join('/'),
  signupPath: [API_URL, 'signup'].join('/'),
  dataPath: [API_URL, 'data'].join('/'),
  chatPagePath: '/',
  loginPagePath: '/login',
  signupPagePath: '/signup',
};

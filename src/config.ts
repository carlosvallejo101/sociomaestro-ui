export const config = {
  captcha: {
    siteKey: process.env.REACT_APP_SITE_KEY || 'api_key',
  },
  backend: {
    url: process.env.REACT_APP_API_URL,
  },
};

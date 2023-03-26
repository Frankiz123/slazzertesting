// Develop api

const baseURL = `https://product-data-collector-backend-production.up.railway.app/`;
const baseUrlSlazer = `https://api.slazzer.com/v2.0/remove_image_background`;

const endpoints = {
  userLogin: `users/signin`,
  brands: `brands/`,
  productsAdd: `products/add`,
};

const methods = {
  get: `GET`,
  post: `POST`,
  put: `PUT`,
  delete: `DELETE`,
};

const header = {
  simpleHeader: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },

  jsonSlazzerHeader: {
    'Content-Type': 'multipart/form-data',
    'API-KEY': '2c3a3aac72434b0888c439bca78ae6d9',
  },
  jsonHeader: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  jsonTokenHeader: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InV5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidXNhIiwiaWQiOiI2NDFjMTcwOWRkZTI0YzQ5NjFlNDA4MGMiLCJpYXQiOjE2Nzk1NjI1MDV9.x8QQY7xwMjl_T0ZYvEVNfwGlvzxW-faAodUxB_RUp8o`,
  },

  multiImage: 'multipart/form-data',
};

async function authenticatedHeader() {
  const beareToken = await getAuthTokenDetails().then(value => {
    return value;
  });
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: beareToken,
  };
}

export {
  baseURL,
  baseUrlSlazer,
  endpoints,
  methods,
  header,
  authenticatedHeader,
};

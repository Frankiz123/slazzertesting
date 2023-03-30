import axios from 'axios';
import {endpoints, header, baseURL} from '../endpoints';

//slazzerCustomApi Api
export const slazzerCustomApi = (Image, token) => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return instance
    .post(`${endpoints.slazzer}`, {
      Image: Image,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

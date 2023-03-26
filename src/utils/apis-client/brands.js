import axios from 'axios';
import {endpoints, header, baseURL} from '../endpoints';

//User Brand Api
export const userBrand = token => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return instance
    .get(`${endpoints.brands}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};

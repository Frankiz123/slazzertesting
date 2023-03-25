import axios from 'axios';
import {endpoints, header, baseURL} from '../endpoints';

const instance = axios.create({
  baseURL: baseURL,
  headers: header.jsonTokenHeader,
});

//User Brand Api
export const userBrand = () => {
  return instance
    .get(`${endpoints.brands}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};

import axios from 'axios';
import {endpoints, header, baseURL} from '../endpoints';

const instance = axios.create({
  baseURL: baseURL,
  headers: header.jsonHeader,
});

//Login Api
export const userLogIn = (email, password) => {
  return instance
    .post(`${endpoints.userLogin}`, {
      email: email,
      password: password,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};

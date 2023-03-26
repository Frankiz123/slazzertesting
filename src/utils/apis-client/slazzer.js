import axios from 'axios';
import {header, baseUrlSlazer} from '../endpoints';

const instance = axios.create({
  // baseURL: baseUrlSlazer,
  headers: header.jsonSlazzerHeader,
});

//Login Api
export const slazzerApi = imageUrl => {
  console.log('imageUrl ::: ', imageUrl);
  return instance
    .post(`https://api.slazzer.com/v2.0/remove_image_background`, {
      imageUrl,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};

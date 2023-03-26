import axios from 'axios';
import {header, baseUrlSlazer} from '../endpoints';

const instance = axios.create({
  // baseURL: baseUrlSlazer,
  headers: header.jsonSlazzerHeader,
});

//Login Api
export const slazzerApi = imageUrl => {
  console.log('imageUrl ::: ', imageUrl);
  return axios
    .post(`https://api.slazzer.com/v2.0/remove_image_background`, imageUrl, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'API-KEY': 'f0f3ddadcd4943de8df7b6bd2fadeceb',
      },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};

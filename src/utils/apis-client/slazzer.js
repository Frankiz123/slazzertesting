import axios from 'axios';
import {header, baseUrlSlazer} from '../endpoints';
import RNFS from 'react-native-fs';

const instance = axios.create({
  // baseURL: baseUrlSlazer,
  headers: header.jsonSlazzerHeader,
});

//Login Api
export const slazzerApi = imageUrl => {
  console.log('imageUrl ::: ', imageUrl);
  return axios
    .post(
      `https://api.slazzer.com/v2.0/remove_image_background?format=base64&output_url=data%3Aimage%2Fpng%3Bbase64`,
      imageUrl,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'API-KEY': 'd3e00e761bbd4248ab805af2e23db6c5',
        },
        responseType: 'arraybuffer',
      },
    )
    .then(response => {
      return response;
    })
    .catch(error => console.log(error));
};

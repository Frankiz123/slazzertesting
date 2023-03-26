import axios from 'axios';
import {endpoints, header, baseURL} from '../endpoints';

//productsAddApi Api
export const productsAddApi = (
  name,
  barcode,
  brandId,
  primaryImageText,
  secondayImageText,
  additionalImages,
  token,
) => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return instance
    .post(`${endpoints.productsAdd}`, {
      Name: name,
      Barcode: barcode,
      BrandId: brandId,
      Size: 'small',
      PrimaryImageText: primaryImageText,
      SecondayImageText: secondayImageText,
      AdditionalImages: additionalImages,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};

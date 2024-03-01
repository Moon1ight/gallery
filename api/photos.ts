/* eslint-disable prettier/prettier */
import axios from 'axios';
import {Alert} from 'react-native';

export const getPhotos = async (offset: number, limit: number) => {
  return await axios
    .get(
      `https://api.slingacademy.com/v1/sample-data/photos?offset=${offset}&limit=${limit}`,
    )
    .then(res => res.data.photos)
    .catch(err => {
      console.log(err);
      Alert.alert('Ошибка', 'Ошибка при получении фотографий');
    });
};

export const getPhoto = async (id: number) => {
  return await axios
    .get(`https://api.slingacademy.com/v1/sample-data/photos/${id}`)
    .then(res => res.data.photo)
    .catch(err => {
      console.log(err);
      Alert.alert('Ошибка', 'Ошибка при получении данных о фотографии');
    });
};

import axios from 'axios';
import {Alert} from 'react-native';

export const getUserInfo = async (userId: number) => {
  return await axios
    .get(`https://api.slingacademy.com/v1/sample-data/users/${userId}`)
    .then(res => res.data.user)
    .catch(err => {
      console.log(err);
      Alert.alert('Ошибка', 'Ошибка при получении данных о пользователе');
    });
};

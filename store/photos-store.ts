/* eslint-disable prettier/prettier */
import {makeAutoObservable, runInAction} from 'mobx';
import {getPhoto, getPhotos} from '../api/photos';
import {getUserInfo} from '../api/user';

type Photo = {
  url: string,
  user: string,
  title: string,
  id: string,
  description: string,
}

type User = {
    id: number,
    gender: string,
    date_of_birth: string,
    job: string,
    city: string,
    zipcode: string,
    latitude: number,
    profile_picture: string,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    street: string,
    state: string,
    country: string,
    longitude: number
}

class PhotosStore {
  photos: Photo[] = [];
  photo: Photo = {};
  user: User = {};
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  getPhotosAction = async () => {
    try {
      this.isLoading = true;
      const response = await getPhotos(0, 5);
      runInAction(() => {
        this.photos = response;
        this.isLoading = false;
      });
    } catch {
      this.isLoading = false;
    }
  };

  getNextPhotosAction = async (offset: number, limit: number) => {
    try {
      const response = await getPhotos(offset, limit);
      runInAction(() => {
        this.photos = [...this.photos, ...response];
      });
    } catch (error) {
      console.log('ERROR:: ', error);
    }
  };

  getPhotoAction = async (id: number) => {
    try {
      this.isLoading = true;
      const response = await getPhoto(id);
      runInAction(() => {
        this.photo = response;
        this.isLoading = false;
      });
    } catch {
      this.isLoading = false;
    }
  };

  getUserInfoAction = async (userId: number) => {
    try {
      this.isLoading = true;
      const response = await getUserInfo(userId);
      runInAction(() => {
        this.user = response;
        this.isLoading = false;
      });
    } catch {
      this.isLoading = false;
    }
  };
}

export default new PhotosStore();

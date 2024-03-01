/* eslint-disable prettier/prettier */
import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import {Loader} from '../components/Loader';
import ImageViewer from 'react-native-image-zoom-viewer';
import photosStore from '../store/photos-store';
import {observer} from 'mobx-react-lite';
import {useTheme} from '@react-navigation/native';

export const PhotoDetails = observer(({route}: any) => {
  const {colors} = useTheme();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const {id, userId} = route.params;
  const {getPhotoAction, getUserInfoAction, photo, user, isLoading} =
    photosStore;

  React.useEffect(() => {
    getPhotoAction(id);
    getUserInfoAction(userId);
  }, []);

  // Обрезать заголовок у фотографии
  const slicedText = (text: string, maxLength: number) => {
    let sliced = text?.slice(0, maxLength);
    if (sliced?.length < text?.length) {
      return (sliced += '..');
    }
    return sliced;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View>
      {photo ? (
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Photo
            alt={photo.title}
            source={{
              uri: `${photo.url}`,
            }}
          />
        </TouchableOpacity>
      ) : (
        <Photo
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/1178/1178479.png',
          }}
        />
      )}
      <UserInfo style={{backgroundColor: colors.card}}>
        {user ? (
          <UserImage
            alt="Фото пользователя"
            source={{uri: `${user.profile_picture}`}}
          />
        ) : (
          <UserImage
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/149/149452.png',
            }}
          />
        )}
        <View>
          <PhotoTitle style={{color: colors.text}}>
            {slicedText(photo?.title, 40)}
          </PhotoTitle>
          <Text style={{color: colors.text}}>
            by{' '}
            <UserName>
              {user?.first_name} {user?.last_name}
            </UserName>
          </Text>
        </View>
      </UserInfo>
      <Modal visible={isModalVisible} transparent={true}>
        <ImageViewer
          imageUrls={[{url: photo?.url}]}
          onSwipeDown={() => setIsModalVisible(false)}
          enableSwipeDown={true}
          saveToLocalByLongPress={false}
        />
      </Modal>
      <PhotoDescription style={{backgroundColor: colors.card}}>
        <Text style={{fontWeight: 'bold', color: colors.text}}>Описание:</Text>
        <Text style={{color: colors.text}}>{photo?.description}</Text>
      </PhotoDescription>
    </View>
  );
});

// Стили для компонентов
const Photo = styled.Image`
  width: 100%;
  height: 400px;
`;
const PhotoTitle = styled.Text`
  font-weight: bold;
  margin-bottom: 5px;
`;
const PhotoDescription = styled.View`
  padding: 10px 15px;
  font-weight: 400;
  color: grey;
`;

const UserInfo = styled.View`
  padding: 10px 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;
const UserImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 50px;
`;
const UserName = styled.Text`
  font-weight: 600;
  color: #c5a7ff;
`;


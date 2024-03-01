/* eslint-disable prettier/prettier */
import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  View,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import {Loader} from '../components/Loader';
import {observer} from 'mobx-react-lite';
import photosStore from '../store/photos-store';
import {useTheme} from '@react-navigation/native';

const PHOTOS_LIMIT = 30

export const HomeScreen = observer(({navigation}) => {
  const {colors} = useTheme();
  const [searchText, setSearchText] = React.useState('');
  const [photosCount, setPhotosCount] = React.useState(5);
  const {getPhotosAction, getNextPhotosAction, photos, isLoading} = photosStore;

  React.useEffect(() => {
    setSearchText('');
    getPhotosAction();
  }, []);

  // Loader при достижении конца списка
  const renderLoader = () => {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  // При достижении конца списка, загружает еще 5 фотографий
  const loadMorePhotos = () => {
    setPhotosCount(prev => prev + 5);
    getNextPhotosAction(photosCount, 5);
  };

  // Поиск по заголовку у фотографий
  const filteredPhotos = () => {
    const newPhotos = photos?.filter(photo =>
      photo?.title?.toLowerCase().includes(searchText.toLowerCase()),
    );
    return newPhotos;
  };

  const isLimitReached = photosCount >= PHOTOS_LIMIT ? true : false;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header style={{backgroundColor: colors.card}}>
        <SearchInput
          style={{color: colors.text, borderColor: colors.border}}
          placeholderTextColor={colors.text}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Поиск по названию.."
        />
      </Header>
      <FlatList
        style={{padding: 10}}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => getPhotosAction(5)}
          />
        }
        data={filteredPhotos()}
        ListFooterComponent={!isLimitReached ? renderLoader : null}
        onEndReached={!isLimitReached ? loadMorePhotos : null}
        onEndReachedThreshold={0}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Details', {id: item.id, userId: item.user})
            }>
            <Photo
              alt={item?.title}
              source={{
                uri: item?.url,
              }}
            />
          </TouchableOpacity>
        )}
      />
    </>
  );
});

// Стили для компонентов
const Header = styled.View`
  border-bottom-color: #7c7c7c5e;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  padding: 10px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 30px;
`;
const SearchInput = styled.TextInput`
  flex: 1;
  background: transparent;
  border-width: 1px;
  border-radius: 5px;
  padding: 10px 15px;
`;
const Photo = styled.Image`
  border-radius: 5px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`;

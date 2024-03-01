import React from 'react';
import {ActivityIndicator, Text} from 'react-native';
import styled from 'styled-components/native';

const LoadingDisplay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Loader = (): React.JSX.Element => {
  return (
    <LoadingDisplay>
      <ActivityIndicator size="large" />
      <Text style={{marginTop: 10}}>Загрузка..</Text>
    </LoadingDisplay>
  );
};

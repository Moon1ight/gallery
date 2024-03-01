import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './HomeScreen';
import {PhotoDetails} from './PhotoDetails';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {useColorScheme} from 'react-native';

const Stack = createNativeStackNavigator();

export const Navigation = (): React.JSX.Element => {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Лента изображений'}}
        />
        <Stack.Screen
          name="Details"
          component={PhotoDetails}
          options={{title: 'Подробнее'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

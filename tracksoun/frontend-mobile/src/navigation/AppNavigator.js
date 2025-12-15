import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import PlayerScreen from '../screens/PlayerScreen';
import OfflineLibraryScreen from '../screens/OfflineLibraryScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Player" component={PlayerScreen} />
        <Stack.Screen name="Offline Library" component={OfflineLibraryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
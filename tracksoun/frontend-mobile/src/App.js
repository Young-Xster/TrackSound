import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';

const App = () => {
  return (
    <AuthProvider>
      <PlayerProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PlayerProvider>
    </AuthProvider>
  );
};

export default App;
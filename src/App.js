import React, { useContext } from 'react';
import { enableScreens } from 'react-native-screens';
enableScreens(true);

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthProvider, { AuthContext } from './auth';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import AddMahasiswaScreen from './AddMahasiswaScreen';

const Stack = createStackNavigator();

function Screens() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddMahasiswa" component={AddMahasiswaScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Screens />
      </NavigationContainer>
    </AuthProvider>
  );
}
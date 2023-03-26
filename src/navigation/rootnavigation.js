import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Login} from '../screens/auth-screens/index';
import {
  AddProductScreen,
  ImagesScreen,
  ScannerScreen,
} from '../screens/protected-screens';

const RootNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}
          component={Login}
        />
        <Stack.Screen
          name="ScannerScreen"
          options={{
            headerShown: false,
          }}
          component={ScannerScreen}
        />
        <Stack.Screen
          name="ImagesScreen"
          options={{
            headerShown: false,
          }}
          component={ImagesScreen}
        />
        <Stack.Screen
          name="AddProductScreen"
          options={{
            headerShown: false,
          }}
          component={AddProductScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

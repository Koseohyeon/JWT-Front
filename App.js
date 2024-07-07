import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './app/screens/SignUpScreen';
import LoginScreen from './app/screens/LoginScreen';
import UserListScreen from './app/screens/UserListScreen';
import EditUserScreen from './app/screens/EditUserScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="UserList" component={UserListScreen} />
        <Stack.Screen name="EditUser" component={EditUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

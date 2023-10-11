import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import LoginScreen from '../screens/LoginScreen';
const Stack = createNativeStackNavigator();


export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
      </Stack.Navigator>
  )
}
import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import { LogBox } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { AuthContext} from '../context/AuthContext';


export default function AppNavigation() {
  const {userToken} = useContext(AuthContext);
  return (

    <NavigationContainer>

    {userToken ==null ? <AuthStack/> : <AppStack/>}
    </NavigationContainer>

  )
}

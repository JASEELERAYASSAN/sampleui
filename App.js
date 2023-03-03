import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import PopupScreen from './src/screens/PopupScreen'
import LoginScreen from './src/screens/LoginScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import LoginActivity from './src/login/LoginActivity'
import LoginOtp from './src/login/LoginOtp'
import HomeScreen from './src/screens/HomeScreen'


const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='SignupScreen' component={SignUpScreen} />
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='PopupScreen' component={PopupScreen} />
        <Stack.Screen name='LoginActivity' component={LoginActivity} />
        <Stack.Screen name='LoginOtp' component={LoginOtp} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
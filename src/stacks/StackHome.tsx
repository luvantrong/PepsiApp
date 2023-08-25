import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import About from '../screens/About';
import {NavigationContainer} from '@react-navigation/native';
type HomeProps = {};
type AboutProps = {};

export type StackHomeParamList = {
  Home1: HomeProps | undefined;
  About: AboutProps | undefined;
};

const Stack = createNativeStackNavigator<StackHomeParamList>();

const StackHome = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home1"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home1" component={Home} options={{title: 'Home'}} />
      <Stack.Screen name="About" component={About} options={{title: 'About'}} />
    </Stack.Navigator>
  );
};

export default StackHome;

import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from './SignIn'
import SignUp from './SignUp'

const Stack = createNativeStackNavigator();

export default function Auth({}){
  return(
    <Stack.Navigator initialRouteName='SignIn'>
      <Stack.Screen name = "SignIn" component={SignIn} options={{title: 'Sign in', headerShown: false}}/>
      <Stack.Screen name = "SignUp" component={SignUp} options={{title: 'Sign up'}}/>
    </Stack.Navigator>
  )
}
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'

import SignIn from './SignIn'
import SignUp from './SignUp'

const Stack = createNativeStackNavigator();

export default function Auth({}){
  return(
    <Stack.Navigator initialRouteName='SignIn'>
      <Stack.Screen name = "SignIn" component={SignIn} options={{title: 'Sign in'}}/>
      <Stack.Screen name = "SignUp" component={SignUp} options={{title: 'Sign up'}}/>
    </Stack.Navigator>
  )
}
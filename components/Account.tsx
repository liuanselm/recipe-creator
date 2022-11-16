import { View, Text, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'

import ProfileList from './ProfileList'
import Recipes from './Recipes'

const Stack = createNativeStackNavigator();

export default function Auth({}){
  return(
    <Stack.Navigator initialRouteName='SignIn'>
      <Stack.Screen name = "ProfileList" component={ProfileList} options={{title: 'Profile'}}/>
      <Stack.Screen name = "Recipes" component={Recipes} options={{title: 'Recipes'}}/>
    </Stack.Navigator>
  )
}
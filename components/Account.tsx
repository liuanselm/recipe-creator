import { View, Text, TouchableOpacity , StyleSheet, StatusBar} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileList from './ProfileList'
import Recipes from './Recipes'

const Stack = createNativeStackNavigator();

//stack navigator that is displayed when user is signed in and in the profile section.
//the profile list is the menu for my recipes, my friends, settings, etc
//the stack screens for each item on the profilelist menu must be linked below

export default function Account({ session }: { session: Session }){
  return(
    <Stack.Navigator initialRouteName='SignIn'>
      <Stack.Screen name = "ProfileList" component={ProfileList} options={{title: 'Profile', headerShown: false}}/>
      <Stack.Screen name = "Recipes" component={Recipes} options={{title: 'Recipes'}}/>
    </Stack.Navigator>
  )
}

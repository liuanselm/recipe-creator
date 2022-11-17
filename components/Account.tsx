import { View, Text, TouchableOpacity , StyleSheet, StatusBar} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileList from './ProfileList'
import Recipes from './Recipes'

const Stack = createNativeStackNavigator();

export default function Auth({}){
  return(
    <Stack.Navigator initialRouteName='SignIn'>
      <Stack.Screen name = "ProfileList" component={ProfileList} options={{title: 'Profile', headerShown: false}}/>
      <Stack.Screen name = "Recipes" component={Recipes} options={{title: 'Recipes'}}/>
    </Stack.Navigator>
  )
}

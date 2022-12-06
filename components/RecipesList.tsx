import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Recipes from './Recipes'
import DisplayRecipes from './DisplayRecipes';

const Stack = createNativeStackNavigator();

export default function RecipesList({ session }: { session: Session }){
  return(
    <Stack.Navigator initialRouteName='Recipes'>
      <Stack.Screen name = "Recipes" children={()=><Recipes session={session}/>} options={{headerShown: false}}/>
      <Stack.Screen name = "DisplayRecipes" component={DisplayRecipes}/>
    </Stack.Navigator>
  )
}
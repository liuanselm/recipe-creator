import { View, Text, Button, Animated, TouchableOpacity,  StyleSheet, StatusBar, FlatList} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'
import { Session } from '@supabase/supabase-js'


export default function DisplayRecipes(){
  const navigation = useNavigation();
  const route = useRoute();
  const { recipeTitle, recipeID } = route.params;
  const [recipe, setRecipe] = useState([])
  const [data, setData] = useState([])
  
  useEffect(()=>{
    navigation.setOptions({ title: JSON.stringify(recipeTitle)})
    getRecipe()
  },[])

  const getRecipe = async () => {
    let recipeQuery = await supabase.from('recipes').select('ingredients, directions, image, title, summary, prep, servingSize').eq('id', JSON.stringify(recipeID)).then(values=>setRecipe(values.data[0]))
  }

  return(
    <View>
    </View>
  )
}


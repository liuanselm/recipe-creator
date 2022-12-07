import { View, Text, Button, Animated, TouchableOpacity,  StyleSheet, StatusBar, FlatList} from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'
import { Session } from '@supabase/supabase-js'

import DisplayIngredients from './DisplayIngredients'
import DisplayDirections from './DisplayDirections';
import DisplayInfo from './DisplayInfo'

export default function DisplayRecipes(){
  const navigation = useNavigation();
  const route = useRoute();
  const { recipeTitle, recipeID } = route.params;
  const [index, setIndex] = useState(0);
  const [info, setInfo] = useState([])
  
  const [routes] = useState([
    { key: 'first', title: 'Ingredients' },
    { key: 'second', title: 'Directions' },
    { key: 'third', title: 'Info'}
  ]);
  
  useEffect(()=>{
    getRecipe()
  },[])

  const getRecipe = async () => {
    let recipeQuery = await supabase.from('recipes').select('ingredients, directions, image, title, summary, prep, servingSize').eq('id', JSON.stringify(recipeID)).then(values=>setInfo(values.data[0]))
  }

   const _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });
          return (
            <TouchableOpacity
              key={i}
              style={styles.tabItem}
              onPress={() => setIndex(i)}>
              <Animated.Text style={{ opacity, color: 'tomato' }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };


  const renderScene = SceneMap({
    first: ()=> <DisplayIngredients recipeID={recipeID}/>,
    second: ()=> <DisplayDirections recipeID={recipeID}/>,
    third: ()=> <DisplayInfo recipeID={recipeID}/>,
  });

  useEffect(()=>{
    navigation.setOptions({ title: JSON.stringify(recipeTitle)})
  },[])

  return(
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={_renderTabBar}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});

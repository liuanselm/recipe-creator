import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import DraggableFlatList, {ScaleDecorator,RenderItemParams} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { event } from "react-native-reanimated";
import { supabase } from '../lib/supabase'
import { Session } from '@supabase/supabase-js'

export default function DisplayDirections({recipeID}) {
  const [data, setData] = useState([]);
  const [height, setHeight] = useState(0);

  useEffect(()=>{
    getRecipe()
  },[])

  const getRecipe = async () => {
    let recipeQuery = await supabase.from('recipes').select('ingredients, directions, image, title, summary, prep, servingSize').eq('id', JSON.stringify(recipeID)).then(values=>setData(JSON.parse(values.data[0].directions)))
  }

  const ItemRender = ({ id, direction, drag, isActive }: RenderItemParams<Item>) => {
    return (
      <TouchableOpacity style={[styles.itemView, {borderColor: isActive ? "tomato" : "black"}]} onLongPress={drag} disabled={isActive}>
        <Text multiline={true} style={{flex:1}}>{direction}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, paddingBottom: height,}}>
      <GestureHandlerRootView style={{width:'100%', height:'100%'}}>
        <DraggableFlatList
          data={data}
          onDragEnd={({ data }) => setTEMP_DATA(data)}
          renderItem={({ item, drag, isActive }) => <ItemRender id={item.id} direction={item.directions} drag={drag} isActive={isActive}/>}
          keyExtractor={(item, index) => item.id}
        />
      </GestureHandlerRootView>
    </View>
  );
}


const styles = StyleSheet.create({
  itemView : {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  bottomAdd : {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: 'tomato',
    borderWidth: 5,
    padding: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    position: 'absolute',
    bottom: 0,
  },
});
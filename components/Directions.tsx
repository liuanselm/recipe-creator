import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import DraggableFlatList, {ScaleDecorator,RenderItemParams} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { event } from "react-native-reanimated";

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Directions() {
  const [directions, setDirections] = useState('');
  const [TEMP_DATA, setTEMP_DATA] = useState([]);
  const [height, setHeight] = useState(0);

  useEffect(()=>{
    getData().then(value=>setTEMP_DATA(value))
  },[])

  //every time temp_data state updates, update async storage
  useEffect(()=>{
    storeData(TEMP_DATA)
  },[TEMP_DATA])

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('directionsKey', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }
  
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('directionsKey')
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    }catch(e){
      console.log(e)
    }
  }

  const addElement = (id, name, quantity, unit) => {
    setTEMP_DATA(TEMP_DATA.concat(({id: id, directions: directions})))
  }

  const deleteSelectedElement = (id, direction) => {
    Alert.alert(
      'Are You Sure Want To Delete Direction: ',
      'Select Below Options',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'OK', onPress: () => {
            const filteredData = TEMP_DATA.filter(item => item.id !== id);
            setTEMP_DATA(filteredData);
          }
        },
      ])
  }

  const ItemRender = ({ id, direction, drag, isActive }: RenderItemParams<Item>) => {
    return (
      <TouchableOpacity style={[styles.itemView, {borderColor: isActive ? "tomato" : "black"}]} onLongPress={drag} disabled={isActive}>
        <Text multiline={true} style={{flex:1}}>{direction}</Text>
        <TouchableOpacity onPress={()=>deleteSelectedElement(id, direction)} style={{padding:10}}><Ionicons name="trash"></Ionicons></TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, paddingBottom: height,}}>
      <GestureHandlerRootView style={{width:'100%', height:'100%'}}>
        <DraggableFlatList
          data={TEMP_DATA}
          onDragEnd={({ data }) => setTEMP_DATA(data)}
          renderItem={({ item, drag, isActive }) => <ItemRender id={item.id} direction={item.directions} drag={drag} isActive={isActive}/>}
          keyExtractor={(item) => item.id}
        />
      </GestureHandlerRootView>
      <View style={styles.bottomAdd} onLayout={(event)=> setHeight(event.nativeEvent.layout.height+20)}>
          <TextInput onChangeText={(text)=> setDirections(text)} placeholder='Directions' style={{flex:3}}></TextInput>
          <TouchableOpacity style={{padding:10}} onPress={()=>addElement((TEMP_DATA.length+1) * Math.random()*100, directions)}><Text><Ionicons name="add-circle"></Ionicons></Text></TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
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
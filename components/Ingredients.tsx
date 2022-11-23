import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import DraggableFlatList, {ScaleDecorator,RenderItemParams} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { event } from "react-native-reanimated";

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Ingredients() {
  const [quantityState, setQuantityState] = useState('');
  const [unitState, setUnitState] = useState('');
  const [ingredientState, setIngredientState] = useState('');
  const [TEMP_DATA, setTEMP_DATA] = useState([]);
  const [height, setHeight] = useState(0);

  //this is to load the saved async storage on load, runs once
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
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }
  
  const clearData = async () => {
    try{
      await AsyncStorage.setItem('@storage_Key', JSON.stringify([]))
      setTEMP_DATA([])
      } catch(e){
        console.log(e)
    }
  }
  
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    }catch(e){
    // error reading value
    }
  }
  
  const addElement = async (id, name, quantity, unit) => {
    await setTEMP_DATA(TEMP_DATA.concat(({id: id, name: name, quantity: quantity, unit: unit})))
  }

  const deleteSelectedElement = (id, name) => {
    Alert.alert(
      'Are You Sure Want To Delete Item: ' + name,
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
  
  const ItemRender = ({ id, name, quantity, unit, drag, isActive }: RenderItemParams<Item>) => {
    return (
      <TouchableOpacity style={[styles.itemView, {borderColor: isActive ? "tomato" : "black"}]} onLongPress={drag} disabled={isActive}>
        <Text placeholder='Quantity' multiline={true} maxLength={5} style={{flex:1}}>{quantity}</Text>
        <Text placeholder='Unit' multiline={true} maxLength={5} style={{flex:1}}>{unit}</Text>
        <Text placeholder='New ingredient' style={{flex:3}}>{name}</Text>
        <TouchableOpacity onPress={()=>deleteSelectedElement(id, name)} style={{padding:10}}><Ionicons name="trash"></Ionicons></TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, paddingBottom: height,}}>
      <GestureHandlerRootView style={{width:'100%', height:'100%'}}>
        <DraggableFlatList
          data={TEMP_DATA}
          onDragEnd={({ data }) => setTEMP_DATA(data)}
          renderItem={({ item, drag, isActive }) => <ItemRender id={item.id} name={item.name} quantity={item.quantity} unit={item.unit} drag={drag} isActive={isActive}/>}
          keyExtractor={(item) => item.id}
        />
      </GestureHandlerRootView>
      <View style={styles.bottomAdd} onLayout={(event)=> setHeight(event.nativeEvent.layout.height+20)}>
          <TextInput onChangeText={(text)=> setQuantityState(text)} placeholder='Quantity' multiline={true} maxLength={5} style={{flex:1}}></TextInput>
          <TextInput onChangeText={(text) => setUnitState(text)} placeholder='Unit' multiline={true} maxLength={5} style={{flex:1}}></TextInput>
          <TextInput onChangeText={(text)=> setIngredientState(text)} placeholder='New ingredient' style={{flex:3}}></TextInput>
          <TouchableOpacity style={{padding:10}} onPress={()=>clearData()}><Ionicons name="trash"></Ionicons></TouchableOpacity>
          <TouchableOpacity style={{padding:10}} onPress={()=>addElement((TEMP_DATA.length+1) * Math.random()*100, ingredientState, quantityState, unitState)}><Text><Ionicons name="add-circle"></Ionicons></Text></TouchableOpacity>
        </View>
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
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase'
import { Session } from '@supabase/supabase-js'

export default function Information({ session }: { session: Session }) {
  const [image, setImage] = useState('https://cdn-icons-png.flaticon.com/512/1160/1160358.png');
  const [title, setTitle] = useState('')
  const [prep, setPrep] = useState('')
  const [summary, setSummary] = useState('')
  const [servingSize, setServingSize] = useState('')
  const [data, setData] = useState({})
  const [uploadIngredients, setUploadIngredients] = useState('')
  const [uploadDirections, setUploadDirections] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true)

  //loads ingredient and directions from async using effect as useState does not reflect changes immedietely
  useEffect(()=>{
    getData('ingredientKey').then(value=>setUploadIngredients(JSON.stringify(value)))
    getData('directionsKey').then(value=>setUploadDirections(JSON.stringify(value)))
  })

  //this is to load the saved async storage on load, runs once
  //async for data fields
  useEffect(()=>{
    getDataImage().then(value=>setImage(value))
    getData('dataKey').then(value=>setTitle(value.title))
    getData('dataKey').then(value=>setSummary(value.summary))
    getData('dataKey').then(value=>setPrep(value.prep))
    getData('dataKey').then(value=>setServingSize(value.servingSize))
  },[])

  useEffect(()=>{
    if (session) getUserInfo()
  },[session])

  //every time temp_data state updates, update async storage
  useEffect(()=>{
    storeDataImage(image)
  },[image])

  //any time the states title summary prep or serving size change, update the data state
  useEffect(()=>{
    setData({title: title, prep: prep, summary: summary, servingSize: servingSize})
  },[title, summary, prep, servingSize])

  useEffect(()=>{
    storeData(data)
  },[data])

  const storeDataImage = async (value) => {
    try{
      await AsyncStorage.setItem('imageKey', value)
    }catch (e){
      console.log(e)
    }
  }

  //stores info into async storage under one key
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('dataKey', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }
  
  const getDataImage = async () => {
    try{
      const value = await AsyncStorage.getItem('imageKey')
      return value;
    }catch (e){
      console.log(e)
    }
  }

  //since objects are stored as strings in async, retrieve them and convert them back to objects
  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    }catch(e){
    // error reading value
    }
  }

  const getUserInfo = async () => {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      //console.log(result.assets[0].uri)
    }
  };

  const deletePicture = () => {
    setImage('https://cdn-icons-png.flaticon.com/512/1160/1160358.png')
  }

  const upload = async () => {
    let { error } = await supabase.from('recipes').insert({ingredients: uploadIngredients, directions: uploadDirections, image: image, info: JSON.stringify(data), user: username, user_id: session?.user.id}).select()
  }

  return (
    <View style={{ flex: 1, alignItems: 'center'}}>
      <View style={styles.viewFull}>
        <TextInput defaultValue={title} onChangeText={(text)=>setTitle(text)} maxLength={50} placeholder='Title'></TextInput>
      </View>
      {image ? <TouchableOpacity onLongPress={deletePicture} onPress={pickImage}><Image source={{ uri: image }} style={{ width: 200, height: 200 }} /></TouchableOpacity> : <TouchableOpacity onPress={pickImage}><Ionicons name="camera-outline"></Ionicons></TouchableOpacity>}
      <View style={styles.viewFull}>
        <Ionicons name="book-outline" style={{padding:10}}></Ionicons>
        <TextInput defaultValue={summary} onChangeText={(text)=>setSummary(text)} multiline={true} placeholder='Summary'></TextInput>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.view}>
          <Ionicons name="time-outline" style={{padding:10}}></Ionicons>
          <TextInput defaultValue={prep} onChangeText={(text)=>setPrep(text)} maxLength={10} placeholder= "Prep Time"></TextInput>
        </View>
        <View style={styles.view}>
          <Ionicons name="people-outline" style={{padding:10}}></Ionicons>
          <TextInput defaultValue={servingSize} onChangeText={(text)=>setServingSize(text)} maxLength={10} placeholder= "Serving Size"></TextInput>
        </View>
      </View>
      <View style={styles.bottomAdd}>
        <TouchableOpacity onPress={upload}><Text style={{color: 'white'}}>Finish Recipe</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view : {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'tomato',
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 10
  },
  viewFull: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'tomato',
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 10,
    alignSelf: 'stretch'
  },
  bottomAdd : {
    backgroundColor: 'tomato',
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'tomato',
    padding: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    position: 'absolute',
    bottom: 0,
  }
})
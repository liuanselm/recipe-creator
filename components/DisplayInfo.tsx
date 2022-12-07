import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase'
import { Session } from '@supabase/supabase-js'

export default function DisplayInformation({recipeID}) {
  const [image, setImage] = useState('https://cdn-icons-png.flaticon.com/512/1160/1160358.png');
  const [title, setTitle] = useState('')
  const [prep, setPrep] = useState('')
  const [summary, setSummary] = useState('')
  const [servingSize, setServingSize] = useState('')

  const [info, setInfo] = useState([])

  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true)


  useEffect(()=>{
    getRecipe()
  },[])

  const getRecipe = async () => {
    let recipeQuery = await supabase.from('recipes').select('ingredients, directions, image, title, summary, prep, servingSize').eq('id', JSON.stringify(recipeID)).then(values=>setInfo(values.data[0]))
  }

  return (
    <View style={{ flex: 1, alignItems: 'center'}}>
      <View style={styles.viewFull}>
        <Text>{info.title}</Text>
      </View>
      <Image source={{ uri: info.image }} style={{ width: 200, height: 200 }} />
      <View style={styles.viewFull}>
        <Ionicons name="book-outline" style={{padding:10}}></Ionicons>
        <Text>{info.summary}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.view}>
          <Ionicons name="time-outline" style={{padding:10}}></Ionicons>
          <Text>{info.prep}</Text>
        </View>
        <View style={styles.view}>
          <Ionicons name="people-outline" style={{padding:10}}></Ionicons>
          <Text>{info.servingSize}</Text>
        </View>
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
    borderRadius: 10,
    alignItems: 'center'
  },
  viewFull: {
    alignItems: 'center',
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
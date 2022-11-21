import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text, TouchableOpacity, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center'}}>
      <View style={{borderWidth: 1, borderColor: 'tomato', margin: 10, padding: 10, flexDirection: 'row', alignSelf: 'stretch', borderRadius: 10}}>
        <TextInput maxLength={50} placeholder='Title'></TextInput>
      </View>
      {image ? <TouchableOpacity onPress={pickImage}><Image source={{ uri: image }} style={{ width: 200, height: 200 }} /></TouchableOpacity> : <TouchableOpacity onPress={pickImage}><Ionicons name="camera-outline"></Ionicons></TouchableOpacity>}
      <View style={{borderWidth: 1, borderColor: 'tomato', margin: 10, padding: 10, flexDirection: 'row', alignSelf: 'stretch', borderRadius: 10}}>
        <TextInput multiline={true} placeholder='Summary'></TextInput>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TextInput maxLength={10} placeholder= "Prep Time" style={{borderWidth: 1, borderColor: 'tomato', margin: 10, padding: 10, flexDirection: 'row', borderRadius: 10}}></TextInput>
        <TextInput maxLength={10} placeholder= "Serving Size" style={{borderWidth: 1, borderColor: 'tomato', margin: 10, padding: 10, flexDirection: 'row', borderRadius: 10}}></TextInput>
      </View>
    </View>
  );
}
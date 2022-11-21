import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function Information(){
  return (
    <View>
      <TextInput placeholder="Title"></TextInput>
      <TouchableOpacity><Ionicons name="image-outline"></Ionicons></TouchableOpacity>
    </View>
  )
}
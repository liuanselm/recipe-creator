import { Alert, View, StyleSheet, SafeAreaView, FlatList, Text, TouchableOpacity, TextInput, } from 'react-native';
import { NestableScrollContainer, NestableDraggableFlatList } from "react-native-draggable-flatlist"
import { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function App() {
  
  const [direction, setDirection] = useState(['']);
  const [TEMP_DATA, setTEMP_DATA] = useState([]);
  
  const addElement = (id, direction ) => {
    setTEMP_DATA(TEMP_DATA.concat(({id: id, direction: direction,})))
  }

  const deleteSelectedElement = (id, direction) => {
    Alert.alert(
      'Are You Sure Want To Delete Step: ' + direction.toUpperCase(),
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
 
  const ItemRender = ({ id, direction }) => (
    <View style={styles.itemView}>
      <Text></Text>
      <Text multiline={true} style={{flex:1}}>{direction}</Text>
      <TouchableOpacity onPress={()=>deleteSelectedElement(id, direction)} style={{padding:10}}><Ionicons name="trash"></Ionicons></TouchableOpacity>
    </View>
  );
 
  return (
    <SafeAreaView style={styles.MainContainer}>
      <FlatList
        data={TEMP_DATA}
        renderItem={({ item }) => <ItemRender id={item.id} direction={item.direction}/>}
        keyExtractor={item => item.id}
      />
      <View style={styles.bottomAdd}>
        <TextInput onChangeText={(text)=> setDirection(text)} placeholder='Directions' multiline={true} style={{flex:1}}></TextInput>
        <TouchableOpacity style={{padding:10}} onPress={()=>addElement(TEMP_DATA.length * Math.random()*100, direction,)}><Text><Ionicons name="add-circle"></Ionicons></Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  itemView : {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: 'tomato',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center'
  },
  buttonText : {
    color: 'white'
  },
  addButton : {
    backgroundColor: 'tomato',
    width: 66,
    height: 66,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems:'center',
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  view :{
    justifyContent: 'center',
    flex:1,
    margin: 10
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
  },
});
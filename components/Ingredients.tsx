import { Alert, View, StyleSheet, SafeAreaView, FlatList, Text, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function App() {
  
  const [quantityState, setQuantityState] = useState('');
  const [unitState, setUnitState] = useState('');
  const [ingredientState, setIngredientState] = useState('');
  const [TEMP_DATA, setTEMP_DATA] = useState([]);
  
  const addElement = (id, name, quantity, unit) => {
    setTEMP_DATA(TEMP_DATA.concat(({id: id, name: name, quantity: quantity, unit: unit})))
  }

  const deleteSelectedElement = (id, name) => {
    Alert.alert(
      'Are You Sure Want To Delete Item: ' + name.toUpperCase(),
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
 
  const ItemRender = ({ id, name, quantity, unit }) => (
    <View style={styles.itemView}>
      <Text placeholder='Quantity' multiline={true} maxLength={5} style={{flex:1}}>{quantity}</Text>
      <Text placeholder='Unit' multiline={true} maxLength={5} style={{flex:1}}>{unit}</Text>
      <Text placeholder='New ingredient' style={{flex:3}}>{name} </Text>
      <TouchableOpacity onPress={()=>deleteSelectedElement(id, name)} style={{padding:10}}><Ionicons name="trash"></Ionicons></TouchableOpacity>
    </View>
  );
 
  return (
    <SafeAreaView style={styles.MainContainer}>
      <FlatList
        data={TEMP_DATA}
        renderItem={({ item }) => <ItemRender id={item.id} name={item.name} quantity={item.quantity} unit={item.unit}/>}
        keyExtractor={item => item.id}
      />
      <View style={styles.bottomAdd}>
        <TextInput onChangeText={(text)=> setQuantityState(text)} placeholder='Quantity' multiline={true} maxLength={5} style={{flex:1}}></TextInput>
        <TextInput onChangeText={(text) => setUnitState(text)} placeholder='Unit' multiline={true} maxLength={5} style={{flex:1}}></TextInput>
        <TextInput onChangeText={(text)=> setIngredientState(text)} placeholder='New ingredient' style={{flex:3}}></TextInput>
        <TouchableOpacity style={{padding:10}} onPress={()=>addElement(TEMP_DATA.length * Math.random()*100, ingredientState, quantityState, unitState)}><Text><Ionicons name="add-circle"></Ionicons></Text></TouchableOpacity>
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
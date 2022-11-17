import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native'
import { useState, useEffect } from 'react'

const Ingredient = () => {
  return(
    <TextInput placeholder='New ingredient'></TextInput>
  )
}

export default function Profile(){
  const [ingredientList, setIngredientList] = useState([])
  const addIngredient = event => {
  setIngredientList(ingredientList.concat(<Ingredient key={ingredientList.length}/>))
  }

  return(
    <ScrollView style={styles.scrollView}>
      {ingredientList}
      <TouchableOpacity onPress={()=>addIngredient()} style={styles.addIngredientButton}><Text style={styles.addIngredientText}>Add</Text></TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  addIngredientText: {
  },
  scrollView:{
    flexDirection: 'column',
    flex: 1,
  },
  addIngredientButton: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 35
  }
})
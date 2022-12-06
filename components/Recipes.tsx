import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native'
import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { useIsFocused} from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { withTheme } from 'react-native-elements';

export default function Recipes({ session }: { session: Session }){
  const [info, setInfo] = useState([])
  const [infoFiltered, setInfoFiltered] = useState([])
  const [filter, setFilter] = useState('')
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused){
      getInfo()
    }
  },[isFocused])

  useEffect(()=>{
    filterTitles()
  },[filter])

  const getInfo = async () => {
    try{
      let queryInfo = await supabase.from('recipes').select('id, title, image').eq('user_id', session?.user.id).then(values=>setInfo(values.data))
    }catch (error){
      console.log(error)
    }
  }

  const filterTitles = () => {
    setInfoFiltered(info.filter(i => {
      return i.title.toLowerCase().includes(filter.toLowerCase())
    }))
  }

  const Item = ({ title, image, id }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DisplayRecipes', {recipeTitle: title, recipeID: id})} style={styles.item}>
      <Image source={{uri: image}} style={{ width: 50, height: 50 }}></Image>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} image={item.image} id={item.id} />
  )

  return(
    <View>
      <TextInput onChangeText={(text)=>setFilter(text)} style={styles.textInput} placeholder="Search..."></TextInput>
      <FlatList
      contentContainerStyle={{ paddingBottom: 80 }}
      data={filter == '' ? info : infoFiltered}
      renderItem={renderItem}
      keyExtractor={(item, index) => index}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    padding: 10,
  },
  textInput: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10
  },
  view : {
    flex: 1
  }
});


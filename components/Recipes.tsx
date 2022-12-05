import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native'
import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { useIsFocused} from "@react-navigation/native"; 

export default function Recipes({ session }: { session: Session }){
  const [info, setInfo] = useState([])
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused){
      getInfo()
    }
  },[isFocused])

  const getInfo = async () => {
    try{
      let queryInfo = await supabase.from('recipes').select('id, title, image').eq('user_id', session?.user.id).then(values=>setInfo(values.data))
    }catch (error){
      console.log(error)
    }
  }

  const Item = ({ title, image, id }) => (
    <TouchableOpacity onPress={()=>console.log(id)} style={styles.item}>
      <Image source={{uri: image}} style={{ width: 50, height: 50 }}></Image>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} image={item.image} id={item.id} />
  )

  return(
    <View>
      <FlatList
      data={info}
      renderItem={renderItem}
      keyExtractor={(item, index) => index}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    padding: 10,
  }
});


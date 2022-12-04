import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native'
import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'


export default function Recipes({ session }: { session: Session }){
  const [titles, setTitles] = useState([])
  const [titlesData, setTitlesData] = useState([])

  useEffect(()=>{
    getTitles()
  },[])

  const getTitles = async () => {
    try{
      let queryTitles = await supabase.from('recipes').select('info').eq('user_id', session?.user.id).then(values=>setTitles(values.data))
    }catch (error){
      console.log(error)
    }
  }

  return(
    <View>
      {titles.map((i, index)=>{
        return(
          <View key={index}>
            <Text>{JSON.parse(i.info).title}</Text>
            <Image source={{uri: JSON.parse(i.info).image}} style={{ width: 50, height: 50 }}></Image>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

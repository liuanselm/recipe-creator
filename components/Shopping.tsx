import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { supabase } from '../lib/supabase'
import { Session } from '@supabase/supabase-js'

export default function Shopping({ session }: { session: Session }){

  const [search, setSearch] = useState('')
  const [query, setQuery] = useState([])
  const [queryFiltered, setQueryFiltered] = useState([])
  const [list, setList] = useState([])

  useEffect(()=>{
    getRecipe()
  },[])

  useEffect(()=>{
    filterTitles()
  },[search])

  const getRecipe = async () => {
    let queryInfo = await supabase.from('recipes').select('id, title').eq('user_id', session?.user.id).then(values=>setQuery(values.data))
  }

  const filterTitles = () => {
    setQueryFiltered(query.filter(i => {
      return i.title.toLowerCase().includes(search.toLowerCase())
    }))
  }

  const Item = ({ title, id }) => (
    <TouchableOpacity onPress={()=>setList(list.concat({title: title, id: id}))} style={{margin: 10}}><Text>{title}</Text></TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} id={item.id}/>
  )

  const ListItem = ({title, id}) => (
    <TouchableOpacity style={{margin: 10, borderColor: 'black', borderWidth: 1, padding: 10, borderRadius: 10}}><Text>{id}{title}</Text></TouchableOpacity>
  )

  const ListRenderItem = ({ item }) => (
    <ListItem title={item.title} id={item.id} />
  )

  return(
    <View>
      <View style={styles.searchwrapper}>
        <TextInput placeholder="Search dishes..." onChangeText={(text)=>setSearch(text)} style={styles.search}></TextInput>
      </View>
      <View style={styles.list}>
        <FlatList
        contentContainerStyle={{}}
        data={list}
        renderItem={ListRenderItem}
        keyExtractor={(item, index) => index}
        />
      </View>
      <View>
        <FlatList
        contentContainerStyle={{}}
        data={search == '' ? [] : queryFiltered}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        style={search == '' ? null : styles.flatlist}
        />
      </View>
    </View>
  )
}

const styles = new StyleSheet.create({
  searchwrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  search : {
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    flexGrow: 1,
    backgroundColor: 'white'
  },
  flatlist: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'tomato',
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  list: {
    position: 'absolute',
    top: 70,
    flexDirection: 'row'
  }
})
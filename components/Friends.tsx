import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { supabase } from '../lib/supabase'
import { Session } from '@supabase/supabase-js'

export default function Friends({ session }: { session: Session }){

  const [request, setRequest] = useState('')

  const requestFriend = async () => {
    let { error } = await supabase.from('relationships').insert({}).select()
  }

  return(
    <View style={{flexDirection: 'row'}}>
      <TextInput onChangeText={(text)=>setRequest(text)} placeholder='Search for friends...' style={{margin: 10, backgroundColor: 'white', padding: 10, borderRadius: 10, flexGrow: 1}}></TextInput>
      <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', padding: 10}}><Ionicons name="send-outline"></Ionicons></TouchableOpacity>
    </View>
  )
}

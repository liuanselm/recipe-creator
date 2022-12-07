import { View, Text, TouchableOpacity, StyleSheet, StatusBar, TextInput } from 'react-native'
import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export default function Friends({ session }: { session: Session }){
  const [friend, setFriend] = useState('')

  return(
    <View>
      <TextInput placeholder='Username' onChangeText={(text)=>setFriend(text)}></TextInput>
      <TouchableOpacity><Text>Send Friend Request</Text></TouchableOpacity>
    </View>
  )
}

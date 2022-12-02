import { View, Text, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'


export default function Recipes({}){
  return(
    <View>
      <Text>Recipes</Text>
      <TouchableOpacity><Text>Get Profile</Text></TouchableOpacity>
    </View>
  )
}
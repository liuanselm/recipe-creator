import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'

export default function ProfileList({navigation}){
  return(
    <TouchableOpacity onPress={() => navigation.navigate('Recipes')} style={styles.recipesButton}><Text style={styles.recipesButtonText}>My Recipes</Text></TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  recipesButtonText : {
    textAlign : 'center'
  },
  recipesButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'tomato'
  }
})
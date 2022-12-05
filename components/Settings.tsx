import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export default function Settings({navigation}){
  return(
    <View style={styles.view}>
      <TouchableOpacity onPress={() => supabase.auth.signOut()} style={styles.signOutButton}><Text style={styles.signOutButtonText}>Sign out</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  view : {
    paddingTop: StatusBar.currentHeight,
  },
  recipesButtonText : {
    textAlign : 'center',
  },
  recipesButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
    borderBottomColor: '#BEBEBE',
    borderBottomWidth: 1,
  },
  signOutButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'tomato'
  },
  signOutButtonText: {
    textAlign: 'center',
    color: 'white',
  }
})
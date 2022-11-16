import React, { useState } from 'react'
import { Alert, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input } from 'react-native-elements'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRetyped, setPasswordRetyped] = useState('')
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(false)

  async function signUpWithEmail() {
    setLoading(true)
    if (password != passwordRetyped){
      Alert.alert('Passwords do not match')
    }
    else{
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data:{
            username: user
          }
        }
      })
      
      if (error){
        Alert.alert(error.message)
      }
      else{
        Alert.alert('Check your email to verify, then sign in to use your account.')
      }
      setLoading(false)
    }
  }

  return (
    <View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced]}>
        <Input
          label="Username"
          onChangeText={(text) => setUser(text)}
          value={user}
          placeholder="Username"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Retype Password"
          onChangeText={(text) => setPasswordRetyped(text)}
          value={passwordRetyped}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
      <TouchableOpacity onPress={() => signUpWithEmail()} style={styles.signUpButton}><Text style={styles.signUpButtonText}>Sign up</Text></TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  signUpButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
    backgroundColor: 'tomato',
  },
  signUpButtonText: {
    textAlign: 'center',
    color: 'white',
  }
})
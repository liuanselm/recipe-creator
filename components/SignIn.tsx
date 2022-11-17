import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import { Alert, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input } from 'react-native-elements'

import SignUp from './SignUp'

export default function SignIn({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }
  
  return (
    <View style={styles.view}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
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
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TouchableOpacity onPress={() => signInWithEmail()} style={styles.signInButton}><Text style={styles.signInButtonText}>Sign in</Text></TouchableOpacity>
        <Text style={styles.orText}>or</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}><Text style={styles.signUpButtonText}>Create account</Text></TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  view : {
    paddingTop: StatusBar.currentHeight,
  },
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
  signInButtonText: {
    textAlign: 'center',
    color: 'white',
  },
  signInButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
    backgroundColor: 'tomato',
  },
  signUpButtonText: {
    textAlign: 'center',
    margin: 10,
    color: 'tomato',
    textDecorationLine: 'underline',
  },
  orText: {
    textAlign: 'center',
  }
})
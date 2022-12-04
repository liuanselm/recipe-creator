import { View, Text } from 'react-native'
import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

import Auth from './Auth'
import Account from './Account'


export default function Profile({ session }: { session: Session }){
  return(
    session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />
  )
}
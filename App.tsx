import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import Account from './components/Account'
import { View, LogBox } from 'react-native'
import { Session } from '@supabase/supabase-js'

import Tabs from './components/Tabs'
import TabsUnsigned from './components/TabsUnsigned'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    session && session.user ? <Tabs session={session} /> : <TabsUnsigned />
  )
}
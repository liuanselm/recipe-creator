import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { Session } from '@supabase/supabase-js'
import Auth from './components/Auth'
import Account from './components/Account'
import { View, LogBox, Alert } from 'react-native'

import Tabs from './components/Tabs'
import TabsUnsigned from './components/TabsUnsigned'
import Drawer from './components/Drawer'
import DrawerUnsigned from './components/DrawerUnsigned'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    session && session.user ? <Drawer session={session} /> : <DrawerUnsigned />
  )
}
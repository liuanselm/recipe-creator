import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ntlcbhkqpniwlcxvhxtk.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50bGNiaGtxcG5pd2xjeHZoeHRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg2MzIxNzMsImV4cCI6MTk4NDIwODE3M30.ns8HSWI2KVatjls7w0a_MrA7CyouKkGmeo8BcVT_XpU"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
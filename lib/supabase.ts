import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://kgtzoojginrvtfrtgkdq.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtndHpvb2pnaW5ydnRmcnRna2RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzOTQ0MjYsImV4cCI6MTk4Mzk3MDQyNn0.gqeYgSSQdOJblP17BLyVZktBEDv0QvUHaKbGSgm0iOw"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
import { API_CONFIG } from '@/api/api-config'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl: string = API_CONFIG.supabaseUrl
const supabaseAnonKey: string = API_CONFIG.supabaseAnonKey

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
)

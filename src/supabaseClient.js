import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lnxjcipgbssqdefgevjy.supabase.co'
const supabaseAnonKey = 'sb_publishable_ZxLLBM7eImGquz-j-CVzvQ_b-do2inB'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

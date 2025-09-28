import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

// Helper function to get current user ID
export const getCurrentUserId = async (): Promise<number | null> => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  // Get the userid from our users table based on the auth user's email
  const { data, error } = await supabase
    .from('users')
    .select('userid')
    .eq('email', user.email)
    .single()

  if (error || !data) {
    console.error('Error getting user ID:', error)
    return null
  }

  return data.userid
}

// Helper function to ensure user exists in users table
export const ensureUserExists = async (): Promise<number | null> => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user?.email) return null

  // Try to get existing user
  const { data: existingUser } = await supabase
    .from('users')
    .select('userid')
    .eq('email', user.email)
    .single()

  if (existingUser) {
    return existingUser.userid
  }

  // Create new user record
  const { data, error } = await supabase
    .from('users')
    .insert({ 
      email: user.email,
      phonenumber: user.phone || null
    })
    .select('userid')
    .single()

  if (error) {
    console.error('Error creating user:', error)
    return null
  }

  return data?.userid || null
}
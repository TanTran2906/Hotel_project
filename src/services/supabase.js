import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://litxtnsvbcuamynapjpg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpdHh0bnN2YmN1YW15bmFwanBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQzNjA1MjksImV4cCI6MjAwOTkzNjUyOX0._F7ScPKcygtHFcpJhNp3YJjFPW1C3GOHvj-Z6qpvF_A'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
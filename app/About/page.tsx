"use client";

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient';
export default function Home() {
  const [status, setStatus] = useState('Checking...')

  useEffect(() => {
    const testConnection = async () => {
    const { data, error } = await supabase.from('users').select('*').limit(1)

      if (error) {
        console.error('Connection failed:', error)
        setStatus('❌ Connection failed')
      } else {
        console.log('Connection successful:', data)
        setStatus('✅ Connection successful')
      }
    }

    testConnection()
  }, [])

  return (
    <div>
      <h1>Supabase Connection Test</h1>
      <p>Status: {status}</p>
    </div>
  )
}

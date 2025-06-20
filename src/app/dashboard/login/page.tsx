'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_URL } from '../../../utils/api-config'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const res = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (res.ok) {
      const { token } = await res.json()
      localStorage.setItem('dashboard_token', token)
      router.push('/dashboard')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <form
        onSubmit={handleSubmit}
        className='bg-white/90 dark:bg-gray-900/90 p-8 rounded-xl shadow-xl flex flex-col gap-4 w-full max-w-sm'
      >
        <h2 className='text-2xl font-bold text-pink-700 dark:text-pink-400 mb-2'>Trainer Login</h2>
        {error && <div className='text-red-600 dark:text-red-400'>{error}</div>}
        <input
          type='text'
          placeholder='Username'
          className='p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          className='p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type='submit'
          className='bg-pink-600 dark:bg-pink-700 text-white font-semibold py-3 rounded-full shadow-lg hover:bg-pink-700 dark:hover:bg-pink-800 transition'
        >
          Login
        </button>
      </form>
    </div>
  )
}

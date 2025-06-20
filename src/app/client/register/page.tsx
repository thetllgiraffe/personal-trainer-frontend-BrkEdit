'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_URL } from '../../../utils/api-config'

export default function ClientRegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    const res = await fetch(`${API_URL}/api/client/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setSuccess(true)
      setTimeout(() => router.push('/client/login'), 1500)
    } else {
      const data = await res.json()
      setError(data.error || 'Registration failed')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <form
        onSubmit={handleSubmit}
        className='bg-white/90 dark:bg-gray-900/90 p-8 rounded-xl shadow-xl flex flex-col gap-4 w-full max-w-sm'
      >
        <h2 className='text-2xl font-bold text-pink-700 dark:text-pink-400 mb-2'>
          Client Registration
        </h2>
        {error && <div className='text-red-600 dark:text-red-400'>{error}</div>}
        {success && (
          <div className='text-green-600 dark:text-green-400'>
            Registration successful! Redirecting...
          </div>
        )}
        <input
          type='text'
          name='name'
          placeholder='Your Name'
          className='p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type='email'
          name='email'
          placeholder='Your Email'
          className='p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          className='p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          type='submit'
          className='bg-pink-600 dark:bg-pink-700 text-white font-semibold py-3 rounded-full shadow-lg hover:bg-pink-700 dark:hover:bg-pink-800 transition'
        >
          Register
        </button>
      </form>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export function BookingForm() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const token = localStorage.getItem('client_token')
    if (!token) {
      toast.error('Please log in to book a session')
      router.push('/client/login')
      return
    }

    const loadingToast = toast.loading('Booking your session...')

    try {
      console.log('Submitting booking:', form)
      const res = await fetch('http://localhost:4000/api/client/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })

      if (res.status === 401) {
        toast.dismiss(loadingToast)
        toast.error('Session expired. Please log in again')
        localStorage.removeItem('client_token')
        router.push('/client/login')
        return
      }

      if (!res.ok) {
        const errorData = await res.text()
        console.error('Error response:', errorData)
        throw new Error('Failed to book session')
      }

      const data = await res.json()
      console.log('Booking created successfully:', data)

      toast.dismiss(loadingToast)
      toast.success("Booking confirmed! We'll see you soon!")

      setSubmitted(true)
      setForm({ name: '', email: '', phone: '', date: '', time: '', message: '' })
    } catch (err) {
      console.error('Error creating booking:', err)
      toast.dismiss(loadingToast)
      toast.error('Could not create booking. Please try again.')
      setError('There was a problem submitting your booking. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className='bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded'>
        Thank you! Your booking has been received. We'll be in touch soon.
      </div>
    )
  }

  return (
    <form
      className='flex flex-col gap-4 w-[75vw] max-w-4xl mx-auto mt-16 bg-white/90 dark:bg-gray-900/90 p-8 rounded-xl shadow-xl'
      onSubmit={handleSubmit}
    >
      <h2 className='text-2xl font-bold text-pink-700 dark:text-pink-400 mb-2'>Book a Session</h2>
      {error && <div className='text-red-600 dark:text-red-400'>{error}</div>}
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
        type='phone'
        name='phone'
        placeholder='Your Phone (optional)'
        className='p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
        value={form.phone}
        onChange={handleChange}
      />
      <input
        type='date'
        name='date'
        className='p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
        value={form.date}
        onChange={handleChange}
        required
      />
      <input
        type='time'
        name='time'
        className='p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
        value={form.time}
        onChange={handleChange}
        required
      />
      <textarea
        name='message'
        placeholder='Additional Message (optional)'
        className='p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
        rows={3}
        value={form.message}
        onChange={handleChange}
      />
      <button
        type='submit'
        className='bg-pink-600 dark:bg-pink-700 text-white font-semibold py-3 rounded-full shadow-lg hover:bg-pink-700 dark:hover:bg-pink-800 transition'
      >
        Book Now
      </button>
    </form>
  )
}

'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_URL } from '../../utils/api-config'

type Booking = {
  id: number
  name: string
  email: string
  phone: string
  date: string
  time: string
  message: string
  status: 'pending' | 'confirmed' | 'completed'
}

export default function DashboardPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchBookings = async () => {
    setLoading(true)
    setError('')
    const token = localStorage.getItem('dashboard_token')
    if (!token) {
      router.push('/dashboard/login')
      return
    }
    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.status === 401) {
        localStorage.removeItem('dashboard_token')
        router.push('/dashboard/login')
        return
      }
      const data = await res.json()
      console.log('Bookings fetched:', data)

      setBookings(data)
    } catch (err) {
      setError('Could not load bookings.')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchBookings()
    // eslint-disable-next-line
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this booking?')) return
    const token = localStorage.getItem('dashboard_token')
    try {
      const res = await fetch(`${API_URL}/api/bookings/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.status === 401) {
        localStorage.removeItem('dashboard_token')
        router.push('/dashboard/login')
        return
      }
      if (!res.ok) throw new Error('Failed to delete booking')
      setBookings(bookings.filter((b) => b.id !== id))
    } catch (err) {
      alert('Could not delete booking.')
    }
  }

  const handleStatusUpdate = async (
    id: number,
    newStatus: 'pending' | 'confirmed' | 'completed'
  ) => {
    const token = localStorage.getItem('dashboard_token')
    try {
      const res = await fetch(`${API_URL}/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.status === 401) {
        localStorage.removeItem('dashboard_token')
        router.push('/dashboard/login')
        return
      }
      if (!res.ok) throw new Error('Failed to update booking status')
      setBookings(bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b)))
    } catch (err) {
      alert('Could not update booking status.')
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16'>
      <h1 className='text-3xl font-bold mb-8 text-pink-700 dark:text-pink-400'>
        Trainer Dashboard
      </h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className='text-red-600 dark:text-red-400'>{error}</div>
      ) : bookings.length === 0 ? (
        <div>No bookings yet.</div>
      ) : (
        <div className='overflow-x-auto w-full max-w-4xl'>
          <table className='min-w-full bg-white dark:bg-gray-900 rounded-xl shadow-xl'>
            <thead>
              <tr>
                <th className='py-2 px-4 border-b dark:border-gray-700'>Name</th>
                <th className='py-2 px-4 border-b dark:border-gray-700'>Email</th>
                <th className='py-2 px-4 border-b dark:border-gray-700'>Phone</th>
                <th className='py-2 px-4 border-b dark:border-gray-700'>Date</th>
                <th className='py-2 px-4 border-b dark:border-gray-700'>Time</th>
                <th className='py-2 px-4 border-b dark:border-gray-700'>Message</th>
                <th className='py-2 px-4 border-b dark:border-gray-700'>Status</th>
                <th className='py-2 px-4 border-b dark:border-gray-700'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className='py-2 px-4 border-b dark:border-gray-700'>{b.name}</td>
                  <td className='py-2 px-4 border-b dark:border-gray-700'>{b.email}</td>
                  <td className='py-2 px-4 border-b dark:border-gray-700'>{b.phone}</td>
                  <td className='py-2 px-4 border-b dark:border-gray-700'>{b.date}</td>
                  <td className='py-2 px-4 border-b dark:border-gray-700'>{b.time}</td>
                  <td className='py-2 px-4 border-b dark:border-gray-700'>{b.message}</td>
                  <td className='py-2 px-4 border-b dark:border-gray-700'>
                    <select
                      value={b.status}
                      onChange={(e) =>
                        handleStatusUpdate(
                          b.id,
                          e.target.value as 'pending' | 'confirmed' | 'completed'
                        )
                      }
                      className='bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1'
                    >
                      <option value='pending'>Pending</option>
                      <option value='confirmed'>Confirmed</option>
                      <option value='completed'>Completed</option>
                    </select>
                  </td>
                  <td className='py-2 px-4 border-b dark:border-gray-700'>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className='bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

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
        <div className='w-full max-w-5xl px-4'>
          {/* Desktop Table View */}
          <div className='hidden lg:block overflow-x-auto'>
            <table className='min-w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl'>
              <thead className='bg-gray-50 dark:bg-gray-700'>
                <tr>
                  <th className='py-3 px-4 text-left'>Name</th>
                  <th className='py-3 px-4 text-left'>Contact</th>
                  <th className='py-3 px-4 text-left'>Date</th>
                  <th className='py-3 px-4 text-left'>Time</th>
                  <th className='py-3 px-4 text-left'>Status</th>
                  <th className='py-3 px-4 text-left'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td className='py-3 px-4'>{b.name}</td>
                    <td className='py-3 px-4'>
                      <div>{b.email}</div>
                      <div>{b.phone}</div>
                    </td>
                    <td className='py-3 px-4'>{b.date}</td>
                    <td className='py-3 px-4'>{b.time}</td>
                    <td className='py-3 px-4'>
                      <select
                        value={b.status}
                        onChange={(e) => handleStatusUpdate(b.id, e.target.value as any)}
                        className='bg-transparent border border-gray-300 dark:border-gray-600 rounded px-2 py-1'
                      >
                        <option value='pending'>Pending</option>
                        <option value='confirmed'>Confirmed</option>
                        <option value='completed'>Completed</option>
                      </select>
                    </td>
                    <td className='py-3 px-4'>
                      <button
                        onClick={() => handleDelete(b.id)}
                        className='bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1 rounded-md transition-colors'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className='block lg:hidden space-y-4'>
            {bookings.map((b) => (
              <div key={b.id} className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4'>
                <div className='flex justify-between items-start'>
                  <div>
                    <p className='font-bold text-lg text-pink-700 dark:text-pink-400'>{b.name}</p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      {b.date} at {b.time}
                    </p>
                  </div>
                  <select
                    value={b.status}
                    onChange={(e) => handleStatusUpdate(b.id, e.target.value as any)}
                    className='bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm'
                  >
                    <option value='pending'>Pending</option>
                    <option value='confirmed'>Confirmed</option>
                    <option value='completed'>Completed</option>
                  </select>
                </div>
                <div className='mt-4 border-t pt-4 dark:border-gray-700'>
                  <p className='text-sm'>
                    <span className='font-semibold'>Email:</span> {b.email}
                  </p>
                  <p className='text-sm'>
                    <span className='font-semibold'>Phone:</span> {b.phone}
                  </p>
                  {b.message && (
                    <p className='text-sm mt-2 italic bg-gray-50 dark:bg-gray-700 p-2 rounded'>
                      "{b.message}"
                    </p>
                  )}
                </div>
                <div className='mt-4 flex justify-end'>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className='bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-md text-sm transition-colors'
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

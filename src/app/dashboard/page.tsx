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
    <div className='min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 pt-24 pb-12'>
      <h1 className='text-4xl font-extrabold mb-8 text-gray-800 dark:text-gray-100'>
        Trainer Dashboard
      </h1>
      {loading ? (
        <div className='text-gray-500 dark:text-gray-400'>Loading...</div>
      ) : error ? (
        <div className='text-red-600 dark:text-red-400'>{error}</div>
      ) : bookings.length === 0 ? (
        <div className='text-gray-500 dark:text-gray-400'>No bookings yet.</div>
      ) : (
        <div className='w-full max-w-6xl px-4'>
          {/* Desktop Table View */}
          <div className='hidden lg:block overflow-x-auto'>
            <table className='min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md'>
              <thead className='bg-gray-100 dark:bg-gray-700'>
                <tr>
                  <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                    Name
                  </th>
                  <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                    Contact
                  </th>
                  <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                    Date & Time
                  </th>
                  <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                    Status
                  </th>
                  <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                {bookings.map((b) => (
                  <tr key={b.id} className='hover:bg-gray-50 dark:hover:bg-gray-700'>
                    <td className='py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                      {b.name}
                    </td>
                    <td className='py-4 px-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>
                      <div>{b.email}</div>
                      <div>{b.phone}</div>
                    </td>
                    <td className='py-4 px-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>
                      {b.date} at {b.time}
                    </td>
                    <td className='py-4 px-4 whitespace-nowrap'>
                      <select
                        value={b.status}
                        onChange={(e) => handleStatusUpdate(b.id, e.target.value as any)}
                        className='text-sm rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:ring-pink-500 focus:border-pink-500'
                      >
                        <option value='pending'>Pending</option>
                        <option value='confirmed'>Confirmed</option>
                        <option value='completed'>Completed</option>
                      </select>
                    </td>
                    <td className='py-4 px-4 whitespace-nowrap text-sm font-medium'>
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
              <div key={b.id} className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
                <div className='flex justify-between items-start mb-4'>
                  <div>
                    <p className='font-bold text-lg text-gray-900 dark:text-white'>{b.name}</p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      {b.date} at {b.time}
                    </p>
                  </div>
                  <select
                    value={b.status}
                    onChange={(e) => handleStatusUpdate(b.id, e.target.value as any)}
                    className='text-sm rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:ring-pink-500 focus:border-pink-500'
                  >
                    <option value='pending'>Pending</option>
                    <option value='confirmed'>Confirmed</option>
                    <option value='completed'>Completed</option>
                  </select>
                </div>
                <div className='border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2'>
                  <p className='text-sm text-gray-700 dark:text-gray-300'>
                    <span className='font-semibold text-gray-900 dark:text-white'>Email:</span>{' '}
                    {b.email}
                  </p>
                  <p className='text-sm text-gray-700 dark:text-gray-300'>
                    <span className='font-semibold text-gray-900 dark:text-white'>Phone:</span>{' '}
                    {b.phone}
                  </p>
                  {b.message && (
                    <p className='text-sm mt-2 italic bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-gray-600 dark:text-gray-400'>
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

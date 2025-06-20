'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { API_URL } from '../../../utils/api-config'

type Booking = {
  id: number
  name: string
  email: string
  date: string
  time: string
  message: string
  phone: string
  status: 'pending' | 'confirmed' | 'completed'
}

export default function ClientDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('client_token')
    if (!token) {
      toast.error('Please log in to view your bookings')
      router.push('/client/login')
      return
    }

    const loadingToast = toast.loading('Loading your bookings...')

    fetch(`${API_URL}/api/client/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          toast.dismiss(loadingToast)
          toast.error('Session expired. Please log in again')
          localStorage.removeItem('client_token')
          router.push('/client/login')
          return []
        }
        return res.json()
      })
      .then((data) => {
        setBookings(data)
        setLoading(false)
        toast.dismiss(loadingToast)
        if (data.length === 0) {
          toast('No bookings found. Ready to schedule your first session?', {
            icon: '📅',
          })
        }
      })
      .catch((err) => {
        console.error('Error fetching bookings:', err)
        toast.dismiss(loadingToast)
        toast.error('Could not load your bookings')
        setError('Could not load your bookings')
        setLoading(false)
      })
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('client_token')
    localStorage.removeItem('client_name')
    toast.success('Logged out successfully')
    router.push('/client/login')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header Section */}
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold text-pink-700 dark:text-pink-400'>My Bookings</h1>
        </div>

        {/* Content Section */}
        <div className='bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-xl p-6'>
          {loading ? (
            <div className='text-center py-8'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto'></div>
            </div>
          ) : error ? (
            <div className='text-red-600 dark:text-red-400 text-center py-8'>{error}</div>
          ) : bookings.length === 0 ? (
            <div className='text-center py-8 text-gray-600 dark:text-gray-400'>
              No bookings yet. Ready to schedule your first session?
            </div>
          ) : (
            <div className='overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                  <thead className='bg-gray-50 dark:bg-gray-800'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                        Date & Time
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                        Status
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                        Contact
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                        Message
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700'>
                    {bookings.map((b) => (
                      <tr
                        key={b.id}
                        className='hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
                      >
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                            {new Date(b.date).toLocaleDateString()}
                          </div>
                          <div className='text-sm text-gray-500 dark:text-gray-400'>{b.time}</div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              b.status
                            )}`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm text-gray-900 dark:text-gray-100'>{b.phone}</div>
                          <div className='text-sm text-gray-500 dark:text-gray-400'>{b.email}</div>
                        </td>
                        <td className='px-6 py-4'>
                          <div className='text-sm text-gray-900 dark:text-gray-100 max-w-xs truncate'>
                            {b.message || '-'}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

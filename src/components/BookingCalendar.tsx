'use client'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { motion, AnimatePresence } from 'framer-motion'
import { API_URL } from '../utils/api-config'

type Booking = {
  id: number
  name: string
  email: string
  date: string // YYYY-MM-DD
  time: string
  message: string
  phone: string
  status: 'pending' | 'confirmed' | 'completed'
}

export function BookingCalendar() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('dashboard_token')
    fetch(`${API_URL}/api/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data))
  }, [])

  // Get bookings for the selected date
  const bookingsForDate = selectedDate
    ? bookings.filter((b) => dayjs(b.date).isSame(dayjs(selectedDate), 'day'))
    : []

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
      case 'confirmed':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
      case 'completed':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
    }
  }

  return (
    <div className='flex flex-col lg:flex-row gap-8 items-start w-full max-w-6xl mx-auto'>
      <div className='w-full lg:w-auto'>
        <div className='bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl'>
          <Calendar
            onChange={(value) => {
              if (value instanceof Date) {
                setSelectedDate(value)
              } else if (Array.isArray(value) && value[0] instanceof Date) {
                setSelectedDate(value[0])
              } else {
                setSelectedDate(null)
              }
            }}
            value={selectedDate}
            tileContent={({ date, view }) => {
              if (
                Array.isArray(bookings) &&
                bookings.some(
                  (b) =>
                    b.date && dayjs(b.date).isValid() && dayjs(b.date).isSame(dayjs(date), 'day')
                )
              ) {
                return (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className='block w-2 h-2 rounded-full bg-pink-500 mx-auto mt-1'
                  />
                )
              }
              return null
            }}
            className='custom-calendar'
          />
        </div>
      </div>
      <div className='flex-1 w-full'>
        <div className='bg-white/95 dark:bg-gray-900/95 p-6 rounded-2xl shadow-xl'>
          <h3 className='text-2xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-pink-400 dark:from-pink-400 dark:to-pink-200 text-transparent bg-clip-text'>
            {selectedDate
              ? `Bookings for ${dayjs(selectedDate).format('MMMM D, YYYY')}`
              : 'Select a date to view bookings'}
          </h3>
          <AnimatePresence mode='wait'>
            {bookingsForDate.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className='text-gray-500 dark:text-gray-400 text-center py-8'
              >
                No bookings scheduled for this date.
              </motion.div>
            ) : (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='space-y-4'
              >
                {bookingsForDate.map((booking) => (
                  <motion.li
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className='p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200'
                  >
                    <div className='flex flex-wrap gap-4 items-start justify-between mb-4'>
                      <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center'>
                          <span className='text-pink-600 dark:text-pink-400 text-lg font-semibold'>
                            {booking.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className='font-semibold text-gray-900 dark:text-gray-100'>
                            {booking.name}
                          </h4>
                          <p className='text-sm text-gray-500 dark:text-gray-400'>
                            {booking.email}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div className='space-y-2 text-sm'>
                      <div className='flex items-center gap-2'>
                        <svg
                          className='w-4 h-4 text-gray-400'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                        <span className='text-gray-600 dark:text-gray-300'>{booking.time}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <svg
                          className='w-4 h-4 text-gray-400'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                          />
                        </svg>
                        <span className='text-gray-600 dark:text-gray-300'>{booking.phone}</span>
                      </div>
                      {booking.message && (
                        <div className='flex items-start gap-2 mt-2'>
                          <svg
                            className='w-4 h-4 text-gray-400 mt-1'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
                            />
                          </svg>
                          <p className='text-gray-600 dark:text-gray-300'>{booking.message}</p>
                        </div>
                      )}
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BookingCalendar } from '@/components/BookingCalendar'

export default function TrainerCalendarPage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('dashboard_token')
    if (!token) {
      router.push('/dashboard/login')
    }
  }, [router])

  return (
    <div className='container mx-auto p-4 pt-24'>
      <h1 className='text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100'>
        Full Booking Calendar
      </h1>
      <div className='bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md'>
        <BookingCalendar />
      </div>
    </div>
  )
}

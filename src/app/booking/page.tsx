import { BookingForm } from '../../components/BookingForm'

export default function BookingPage() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <BookingForm />
    </div>
  )
}

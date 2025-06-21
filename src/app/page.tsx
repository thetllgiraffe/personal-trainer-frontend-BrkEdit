'use client'

import { useState, useEffect } from 'react'
import { Testimonials } from '../components/Testimonials'
import { BookingForm } from '../components/BookingForm'
import { motion } from 'framer-motion'
import Image from 'next/image'
import emailjs from '@emailjs/browser'

export default function Home() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isTrainer, setIsTrainer] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if user is logged in as trainer
    const token = localStorage.getItem('dashboard_token')
    setIsTrainer(!!token)

    // Initialize EmailJS
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '')
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('') // Clear any previous errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    console.log(form, 'form')
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          from_name: form.name,
          reply_to: form.email,
          message: form.message,
          to_name: 'Elroy K',
          time: new Date().toLocaleString(),
        }
      )

      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setError('Failed to send message. Please try again later.')
      console.error('Email error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10'></div>

      <div className='relative flex flex-col items-center px-4'>
        {/* Hero Section with Trainer Image */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='relative w-full max-w-7xl mx-auto mt-24 mb-32'
        >
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div className='text-left z-10'>
              <h1 className='text-6xl font-black mb-6 bg-gradient-to-r from-pink-600 to-blue-600 dark:from-pink-400 dark:to-blue-400 text-transparent bg-clip-text leading-tight'>
                Transform Your Life with Personal Training
              </h1>
              <p className='text-xl text-gray-700 dark:text-gray-200 mb-10 leading-relaxed'>
                Achieve your fitness goals with expert guidance, personalized plans, and unwavering
                support.
              </p>
              <motion.a
                href='#contact'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='inline-block px-10 py-4 bg-gradient-to-r from-pink-600 to-pink-500 dark:from-pink-500 dark:to-pink-400 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300'
              >
                Start Your Journey
              </motion.a>
            </div>
            <div className='relative h-[600px] rounded-2xl overflow-hidden shadow-2xl'>
              <Image
                src='https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b'
                alt='Professional trainer'
                fill
                style={{ objectFit: 'cover' }}
                className='hover:scale-105 transition-transform duration-500'
                priority
              />
            </div>
          </div>
        </motion.section>

        {/* About Section with Trainer Images */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          id='about'
          className='w-full max-w-7xl mx-auto mb-32'
        >
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div className='grid grid-cols-2 gap-4 h-[500px]'>
              <div className='relative h-full rounded-2xl overflow-hidden'>
                <Image
                  src='https://images.unsplash.com/photo-1574680096145-d05b474e2155'
                  alt='Trainer helping client'
                  fill
                  style={{ objectFit: 'cover' }}
                  className='hover:scale-105 transition-transform duration-500'
                />
              </div>
              <div className='grid gap-4'>
                <div className='relative h-[240px] rounded-2xl overflow-hidden'>
                  <Image
                    src='https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5'
                    alt='Trainer demonstrating exercise'
                    fill
                    style={{ objectFit: 'cover' }}
                    className='hover:scale-105 transition-transform duration-500'
                  />
                </div>
                <div className='relative h-[240px] rounded-2xl overflow-hidden'>
                  <Image
                    src='https://images.unsplash.com/photo-1599058945522-28d584b6f0ff'
                    alt='Training session'
                    fill
                    style={{ objectFit: 'cover' }}
                    className='hover:scale-105 transition-transform duration-500'
                  />
                </div>
              </div>
            </div>
            <div className='bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-2xl p-10 relative overflow-hidden'>
              <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent'></div>
              <div className='relative z-10'>
                <h2 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200 text-transparent bg-clip-text mb-6'>
                  About Me
                </h2>
                <p className='text-gray-700 dark:text-gray-200 text-lg leading-relaxed mb-6'>
                  Hi! I'm{' '}
                  <span className='font-semibold text-pink-600 dark:text-pink-400'>
                    [Your Name]
                  </span>
                  , a certified personal trainer with over 10 years of experience helping clients
                  achieve their fitness dreams.
                </p>
                <p className='text-gray-700 dark:text-gray-200 text-lg leading-relaxed mb-6'>
                  My approach combines science-backed training, nutrition guidance, and motivational
                  coaching to ensure you get real, lasting results.
                </p>
                <p className='text-gray-700 dark:text-gray-200 text-lg leading-relaxed'>
                  Whether you're a beginner or an athlete, I'll create a plan tailored just for you!
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='w-full max-w-6xl mx-auto mb-32'
        >
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                title: '1-on-1 Coaching',
                description: 'Personalized sessions tailored to your unique goals and lifestyle.',
                icon: '💪',
                gradient: 'from-blue-600 to-blue-400',
                image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
              },
              {
                title: 'Nutrition Guidance',
                description: 'Custom meal plans and ongoing support for optimal results.',
                icon: '🥗',
                gradient: 'from-pink-600 to-pink-400',
                image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
              },
              {
                title: 'Progress Tracking',
                description: 'Track your achievements and stay motivated every step of the way.',
                icon: '📈',
                gradient: 'from-green-600 to-green-400',
                image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c',
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className='bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-xl overflow-hidden group'
              >
                <div className='relative h-48 w-full'>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className='group-hover:scale-105 transition-transform duration-500'
                  />
                </div>
                <div className='p-8 relative'>
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>
                  <div className='relative z-10'>
                    <span className='text-4xl mb-4 block'>{service.icon}</span>
                    <h2
                      className={`text-2xl font-bold bg-gradient-to-r ${service.gradient} text-transparent bg-clip-text mb-4`}
                    >
                      {service.title}
                    </h2>
                    <p className='text-gray-700 dark:text-gray-200'>{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='w-full'
        >
          <Testimonials />
        </motion.div>

        {/* Booking Form Section */}
        <section id='booking' className='w-full max-w-4xl mt-16 scroll-mt-24'>
          <h2 className='text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text'>
            Book Your Session
          </h2>
          <BookingForm />
        </section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          id='contact'
          className='w-full max-w-2xl mx-auto mt-32 mb-24'
        >
          <div className='bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-2xl p-10 relative overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent'></div>
            <div className='relative z-10'>
              <h2 className='text-4xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 dark:from-pink-400 dark:to-pink-200 text-transparent bg-clip-text mb-6'>
                Let's Connect
              </h2>
              <p className='text-gray-700 dark:text-gray-200 text-lg mb-8'>
                Ready to start your fitness journey? Drop me a message and let's make it happen!
              </p>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='bg-green-50 dark:bg-green-900/30 p-6 rounded-xl border border-green-200 dark:border-green-800'
                >
                  <p className='text-green-600 dark:text-green-400 font-medium text-center text-lg'>
                    Thanks for reaching out! I'll get back to you soon. 🎉
                  </p>
                </motion.div>
              ) : (
                <form className='space-y-6' onSubmit={handleSubmit}>
                  {error && (
                    <div className='bg-red-50 dark:bg-red-900/30 p-4 rounded-lg border border-red-200 dark:border-red-800'>
                      <p className='text-red-600 dark:text-red-400 text-sm'>{error}</p>
                    </div>
                  )}
                  <div className='space-y-4'>
                    <input
                      type='text'
                      name='name'
                      placeholder='Your Name'
                      className='w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500 transition-shadow duration-200'
                      value={form.name}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                    <input
                      type='email'
                      name='email'
                      placeholder='Your Email'
                      className='w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500 transition-shadow duration-200'
                      value={form.email}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                    <textarea
                      name='message'
                      placeholder='Your Message'
                      className='w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500 transition-shadow duration-200'
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <motion.button
                    type='submit'
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className={`w-full py-4 bg-gradient-to-r from-pink-600 to-pink-500 dark:from-pink-500 dark:to-pink-400 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
                      loading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg
                          className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                          ></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  )
}
// Note: Replace [Your Name] with your actual name in the About section.
// This code is a simple personal trainer landing page built with React and Tailwind CSS.
// It includes a dark mode toggle, hero section, about section, services section, and contact form.
// The contact form uses local state to manage form inputs and submission status.
// The page is responsive and uses Tailwind CSS for styling.
// Ensure you have Tailwind CSS set up in your project for the styles to work correctly.
// You can further enhance this page by adding animations, more sections, or integrating with a backend for form submission.
// Make sure to test the dark mode toggle and form submission functionality.

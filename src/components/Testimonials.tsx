'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Testimonial = {
  id: number
  name: string
  role: string
  content: string
  image?: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Fitness Enthusiast',
    content:
      "Working with this trainer has been transformative. In just 3 months, I've seen incredible improvements in my strength and overall fitness.",
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Mike Chen',
    role: 'Marathon Runner',
    content:
      'The personalized training program helped me achieve my best marathon time yet. The attention to detail and support is outstanding.',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Davis',
    role: 'Yoga Practitioner',
    content:
      'I appreciate how the training sessions are tailored to my goals. The mix of strength training and flexibility work is perfect.',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    rating: 5,
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className='py-20 px-4'>
      <div className='max-w-6xl mx-auto'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-4xl font-bold text-center mb-16 bg-gradient-to-r from-pink-600 to-pink-400 dark:from-pink-400 dark:to-pink-200 text-transparent bg-clip-text'
        >
          What My Clients Say
        </motion.h2>

        <div className='relative'>
          <div className='overflow-hidden'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className='flex flex-col md:flex-row items-center gap-8 bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-xl p-8 relative overflow-hidden'
              >
                <div className='absolute inset-0 bg-gradient-to-br from-pink-500/5 to-blue-500/5 dark:from-pink-800/10 dark:to-blue-800/10'></div>
                <div className='relative z-10 flex-1 text-center md:text-left'>
                  <div className='flex items-center justify-center md:justify-start gap-2 mb-4'>
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <span key={i} className='text-yellow-400 text-xl'>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <blockquote className='text-xl text-gray-700 dark:text-gray-200 italic mb-6'>
                    "{testimonials[currentIndex].content}"
                  </blockquote>
                  <div className='flex items-center justify-center md:justify-start gap-4'>
                    {testimonials[currentIndex].image && (
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className='w-16 h-16 rounded-full border-2 border-pink-200 dark:border-pink-800'
                      />
                    )}
                    <div>
                      <h3 className='font-bold text-gray-900 dark:text-gray-100 text-lg'>
                        {testimonials[currentIndex].name}
                      </h3>
                      <p className='text-pink-600 dark:text-pink-400'>
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className='flex justify-center gap-4 mt-8'>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className='p-2 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400 hover:bg-pink-200 dark:hover:bg-pink-800 transition-colors'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className='p-2 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400 hover:bg-pink-200 dark:hover:bg-pink-800 transition-colors'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </motion.button>
          </div>

          {/* Dots indicator */}
          <div className='flex justify-center gap-2 mt-4'>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-pink-600 dark:bg-pink-400 w-4'
                    : 'bg-pink-200 dark:bg-pink-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

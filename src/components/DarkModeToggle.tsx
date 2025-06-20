'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function DarkModeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full p-3 shadow-lg transition-colors'
      aria-label='Toggle dark mode'
    >
      {theme === 'dark' ? (
        <span role='img' aria-label='Light mode'>
          🌞
        </span>
      ) : (
        <span role='img' aria-label='Dark mode'>
          🌙
        </span>
      )}
    </button>
  )
}

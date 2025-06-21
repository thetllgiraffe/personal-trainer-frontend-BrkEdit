'use client'

import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '../components/Navbar'
import { DarkModeToggle } from '@/components/DarkModeToggle'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'next-themes'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {}
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Navbar />
          <div className='pt-10'>{children}</div> {/* pt-20 = 5rem = 80px */}
          <DarkModeToggle />
          <Toaster
            position='top-right'
            toastOptions={{
              duration: 3000,
              className: '',
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
                padding: '16px',
                borderRadius: '8px',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )


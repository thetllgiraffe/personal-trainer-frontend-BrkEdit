import { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import './patterns.css'
import { Providers } from './providers'
import { NavbarWrapper } from '../components/NavbarWrapper'
import { DarkModeToggle } from '@/components/DarkModeToggle'
import { Toaster } from 'react-hot-toast'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'TrainerPro - Personal Training Platform',
  description: 'Book your personal training sessions and achieve your fitness goals',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <NavbarWrapper />
          <div className='pt-16'>{children}</div>
          <DarkModeToggle />
          <Toaster
            position='top-right'
            toastOptions={{
              duration: 3000,
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
                padding: '16px',
                borderRadius: '8px',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}

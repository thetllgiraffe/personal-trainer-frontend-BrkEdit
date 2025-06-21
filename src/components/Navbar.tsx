'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import styles from './Navbar.module.css'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [trainerLoggedIn, setTrainerLoggedIn] = useState(false)
  const [clientLoggedIn, setClientLoggedIn] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setTrainerLoggedIn(!!localStorage.getItem('dashboard_token'))
    setClientLoggedIn(!!localStorage.getItem('client_token'))
  }, [pathname])

  const handleTrainerLogout = () => {
    localStorage.removeItem('dashboard_token')
    setTrainerLoggedIn(false)
    router.push('/dashboard/login')
  }

  const handleClientLogout = () => {
    localStorage.removeItem('client_token')
    localStorage.removeItem('client_name')
    setClientLoggedIn(false)
    router.push('/client/login')
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href='/' className={styles.logo}>
          TrainerPro
        </Link>

        {/* Desktop Menu */}
        <div className={styles.desktop_menu}>
          <Link href='/' className={styles.nav_link}>
            Home
          </Link>
          <Link href='/booking' className={styles.nav_link}>
            Reservations
          </Link>
          {trainerLoggedIn && (
            <Link href='/dashboard' className={styles.nav_link}>
              Trainer Dashboard
            </Link>
          )}
          {clientLoggedIn && (
            <Link href='/client/dashboard' className={styles.nav_link}>
              My Bookings
            </Link>
          )}
          {trainerLoggedIn ? (
            <button onClick={handleTrainerLogout} className={styles.auth_button}>
              Trainer Logout
            </button>
          ) : clientLoggedIn ? (
            <button onClick={handleClientLogout} className={styles.auth_button}>
              Client Logout
            </button>
          ) : (
            <div className={styles.auth_buttons}>
              <Link href='/dashboard/login' className={styles.auth_button}>
                Trainer Login
              </Link>
              <Link href='/client/login' className={styles.auth_button}>
                Client Login
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className={styles.menu_button}>
          <svg
            className={styles.menu_icon}
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            {menuOpen ? <path d='M6 18L18 6M6 6l12 12' /> : <path d='M4 6h16M4 12h16M4 18h16' />}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobile_menu}>
          <Link href='/' className={styles.menu_item} onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href='/booking' className={styles.menu_item} onClick={() => setMenuOpen(false)}>
            Reservations
          </Link>
          {trainerLoggedIn && (
            <Link href='/dashboard' className={styles.menu_item} onClick={() => setMenuOpen(false)}>
              Trainer Dashboard
            </Link>
          )}
          {clientLoggedIn && (
            <Link
              href='/client/dashboard'
              className={styles.menu_item}
              onClick={() => setMenuOpen(false)}
            >
              My Bookings
            </Link>
          )}
          <div className={styles.mobile_auth}>
            {trainerLoggedIn ? (
              <button onClick={handleTrainerLogout} className={styles.auth_button}>
                Trainer Logout
              </button>
            ) : clientLoggedIn ? (
              <button onClick={handleClientLogout} className={styles.auth_button}>
                Client Logout
              </button>
            ) : (
              <>
                <Link
                  href='/dashboard/login'
                  className={styles.auth_button}
                  onClick={() => setMenuOpen(false)}
                >
                  Trainer Login
                </Link>
                <Link
                  href='/client/login'
                  className={styles.auth_button}
                  onClick={() => setMenuOpen(false)}
                >
                  Client Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

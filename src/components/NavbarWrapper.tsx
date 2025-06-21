'use client'

import { Navbar } from './Navbar'
import { useEffect, useState } from 'react'

export function NavbarWrapper() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return <>{isClient && <Navbar />}</>
}

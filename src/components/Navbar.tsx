'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { name: "About", path: "/about" },
  { name: "Media", path: "/media" },
  { name: "Sponsors", path: "/sponsors" },
  { name: "Submit", path: "/submit" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      padding: '1rem 2rem',
      background: '#000000cc',
      color: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      {navItems.map(({ name, path }) => (
        <Link
          key={path}
          href={path}
          style={{
            color: pathname === path ? '#90caf9' : 'white',
            fontWeight: pathname === path ? 'bold' : 'normal',
            textDecoration: 'none',
            fontSize: '1.1rem',
          }}
        >
          {name}
        </Link>
      ))}
    </nav>
  )
}


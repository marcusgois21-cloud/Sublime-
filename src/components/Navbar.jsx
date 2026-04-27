import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Início', href: '#hero' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Contato', href: '#agendamento' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-glass py-3' : 'py-6'
        }`}
        style={scrolled ? {
          background: 'rgba(10,10,10,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(201,168,76,0.1)',
        } : {}}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#hero" className="group" style={{ cursor: 'none' }}>
            <span
              className="font-script text-3xl gold-text-gradient block leading-none"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              Sublime Beauty
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '11px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,235,0.7)',
                    textDecoration: 'none',
                    cursor: 'none',
                    transition: 'color 0.3s ease',
                    position: 'relative',
                  }}
                  onMouseEnter={e => e.target.style.color = '#c9a84c'}
                  onMouseLeave={e => e.target.style.color = 'rgba(245,240,235,0.7)'}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block btn-primary"
            style={{ borderRadius: '0', cursor: 'none', textDecoration: 'none' }}
          >
            Agendar
          </a>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            style={{ background: 'none', border: 'none', cursor: 'none' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '24px',
                  height: '1px',
                  background: '#c9a84c',
                  transition: 'all 0.3s ease',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translate(4px, 4px)'
                    : i === 2 ? 'rotate(-45deg) translate(4px, -4px)'
                    : 'scaleX(0)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(10,10,10,0.97)',
              zIndex: 49,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
            }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '2.5rem',
                  fontWeight: 300,
                  color: '#f5f0eb',
                  textDecoration: 'none',
                  cursor: 'none',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="https://wa.me/5500000000000"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="btn-primary mt-4"
              style={{ textDecoration: 'none', cursor: 'none' }}
              onClick={() => setMenuOpen(false)}
            >
              Agendar agora
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

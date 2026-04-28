import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Landing from './pages/Landing'
import Register from './pages/Register'
import Success from './pages/Success'
import Admin from './pages/Admin'
import Confetti from './components/Confetti'
import ParticlesBg from './components/ParticlesBg'
import { useGuests } from './hooks/useGuests'
import './index.css'

const VIEWS = { LANDING: 'landing', REGISTER: 'register', SUCCESS: 'success', ADMIN: 'admin' }

// Secret: type "admx" anywhere to open admin
function useAdminShortcut(onTrigger) {
  const [buf, setBuf] = useState('')
  const handler = (e) => {
    const next = (buf + e.key).slice(-4)
    setBuf(next)
    if (next === 'admx') onTrigger()
  }
  return { onKeyDown: handler }
}

export default function App() {
  const [view, setView] = useState(VIEWS.LANDING)
  const [lastGuest, setLastGuest] = useState({ name: '', phone: '' })
  const { guests, addGuest, removeGuest, clearAll } = useGuests()
  const adminShortcut = useAdminShortcut(() => setView(VIEWS.ADMIN))

  const handleSuccess = (name, phone) => {
    addGuest(name, phone)
    setLastGuest({ name, phone })
    setView(VIEWS.SUCCESS)
  }

  const pageVariants = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
    exit:    { opacity: 0, y: -24, transition: { duration: 0.25 } },
  }

  return (
    <div
      tabIndex={0}
      onKeyDown={adminShortcut.onKeyDown}
      style={{ outline: 'none', minHeight: '100vh', position: 'relative' }}
    >
      <ParticlesBg />
      <Confetti active={view === VIEWS.LANDING} count={40} />

      {/* Admin quick link — invisible, bottom-right */}
      <button
        onClick={() => setView(VIEWS.ADMIN)}
        style={{
          position: 'fixed', bottom: '1rem', right: '1rem',
          background: 'transparent', border: 'none',
          width: '36px', height: '36px', borderRadius: '50%',
          cursor: 'pointer', zIndex: 100, opacity: 0.15,
          fontSize: '18px', color: '#fff',
          transition: 'opacity 0.3s',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
        onMouseLeave={e => e.currentTarget.style.opacity = '0.15'}
        title="Painel ADM"
        aria-label="Painel de administração"
      >
        ⚙
      </button>

      <AnimatePresence mode="wait">
        {view === VIEWS.LANDING && (
          <motion.div key="landing" {...pageVariants}>
            <Landing onRegister={() => setView(VIEWS.REGISTER)} />
          </motion.div>
        )}
        {view === VIEWS.REGISTER && (
          <motion.div key="register" {...pageVariants}>
            <Register onSuccess={handleSuccess} onBack={() => setView(VIEWS.LANDING)} />
          </motion.div>
        )}
        {view === VIEWS.SUCCESS && (
          <motion.div key="success" {...pageVariants}>
            <Success name={lastGuest.name} onHome={() => setView(VIEWS.LANDING)} />
          </motion.div>
        )}
        {view === VIEWS.ADMIN && (
          <motion.div key="admin" {...pageVariants}>
            <Admin
              guests={guests}
              onRemove={removeGuest}
              onClear={clearAll}
              onBack={() => setView(VIEWS.LANDING)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

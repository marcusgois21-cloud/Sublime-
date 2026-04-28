import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const PARTY_DATE = new Date('2025-07-19T20:00:00')

function useCountdown(target) {
  const calc = () => {
    const diff = target - Date.now()
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    }
  }
  const [t, setT] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

function Digit({ value, label }) {
  return (
    <div style={{ textAlign: 'center', minWidth: '70px' }}>
      <motion.div
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{
          fontFamily: "'Black Ops One', cursive",
          fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
          background: 'linear-gradient(135deg, #f0abfc, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
        }}
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <div style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: '10px',
        letterSpacing: '3px',
        color: 'rgba(255,255,255,0.4)',
        textTransform: 'uppercase',
        marginTop: '6px',
      }}>
        {label}
      </div>
    </div>
  )
}

const organizers = ['Matheus Pena', 'Pedro Santana', 'Rafael', 'Bernardo', 'Lucca']

export default function Landing({ onRegister }) {
  const { d, h, m, s } = useCountdown(PARTY_DATE)

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      position: 'relative',
      zIndex: 1,
      textAlign: 'center',
    }}>
      {/* Glow blob */}
      <div style={{
        position: 'fixed', top: '20%', left: '50%',
        transform: 'translateX(-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', bottom: '10%', right: '10%',
        width: '300px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(236,72,153,0.12) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 18px',
          background: 'rgba(168,85,247,0.12)',
          border: '1px solid rgba(168,85,247,0.35)',
          borderRadius: '999px',
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '12px',
          letterSpacing: '3px',
          color: '#c084fc',
          textTransform: 'uppercase',
          marginBottom: '2rem',
        }}
      >
        <span style={{ fontSize: '8px' }}>●</span>
        Acesso Exclusivo
        <span style={{ fontSize: '8px' }}>●</span>
      </motion.div>

      {/* PROJETO X */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
        style={{ marginBottom: '0.5rem' }}
      >
        <div style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
          letterSpacing: '6px',
          color: 'rgba(255,255,255,0.45)',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}>
          você foi convidado para o
        </div>

        <h1
          className="animate-float"
          style={{
            fontFamily: "'Black Ops One', cursive",
            fontSize: 'clamp(5rem, 20vw, 13rem)',
            lineHeight: 0.9,
            letterSpacing: '-2px',
            background: 'linear-gradient(135deg, #f0abfc 0%, #a855f7 40%, #7c3aed 70%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 30px rgba(168,85,247,0.6)) drop-shadow(0 0 80px rgba(124,58,237,0.4))',
            userSelect: 'none',
          }}
        >
          PROJETO<br />X
        </h1>
      </motion.div>

      {/* Aniversário de Marcus */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ marginBottom: '2.5rem' }}
      >
        <div style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
          fontWeight: 600,
          letterSpacing: '3px',
          color: 'rgba(255,255,255,0.7)',
          textTransform: 'uppercase',
        }}>
          Aniversário de{' '}
          <span style={{
            background: 'linear-gradient(90deg, #f0abfc, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Marcus
          </span>
        </div>
      </motion.div>

      {/* Countdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ marginBottom: '3rem' }}
      >
        <div style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '11px',
          letterSpacing: '3px',
          color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
          marginBottom: '1.2rem',
        }}>
          Contagem Regressiva
        </div>
        <div style={{
          display: 'flex',
          gap: 'clamp(1rem, 4vw, 2.5rem)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Digit value={d} label="dias" />
          <span style={{ color: 'rgba(168,85,247,0.6)', fontSize: '2rem', fontFamily: "'Black Ops One'" }}>:</span>
          <Digit value={h} label="horas" />
          <span style={{ color: 'rgba(168,85,247,0.6)', fontSize: '2rem', fontFamily: "'Black Ops One'" }}>:</span>
          <Digit value={m} label="min" />
          <span style={{ color: 'rgba(168,85,247,0.6)', fontSize: '2rem', fontFamily: "'Black Ops One'" }}>:</span>
          <Digit value={s} label="seg" />
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        style={{ marginBottom: '3rem' }}
      >
        <button
          className="btn-primary animate-pulse-ring"
          onClick={onRegister}
          style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', padding: '16px clamp(28px, 6vw, 52px)' }}
        >
          🎉 Confirmar Presença
        </button>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          color: 'rgba(255,255,255,0.3)',
          marginTop: '12px',
          letterSpacing: '0.5px',
        }}>
          Vagas limitadas · Seja rápido
        </div>
      </motion.div>

      {/* Organizers */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          paddingTop: '2rem',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <div style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '10px',
          letterSpacing: '3px',
          color: 'rgba(255,255,255,0.25)',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          Organização
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
          {['Marcus', ...organizers].map((name, i) => (
            <span
              key={name}
              style={{
                padding: '4px 14px',
                background: i === 0
                  ? 'rgba(168,85,247,0.2)'
                  : 'rgba(255,255,255,0.05)',
                border: `1px solid ${i === 0 ? 'rgba(168,85,247,0.4)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '999px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                color: i === 0 ? '#c084fc' : 'rgba(255,255,255,0.5)',
              }}
            >
              {i === 0 ? '🎂 ' : ''}{name}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

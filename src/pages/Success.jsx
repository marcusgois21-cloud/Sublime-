import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function launchConfetti(container) {
  const COLORS = ['#a855f7','#ec4899','#f59e0b','#10b981','#3b82f6','#fbbf24','#fb7185','#f0abfc']
  for (let i = 0; i < 120; i++) {
    const el = document.createElement('div')
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]
    const size = 6 + Math.random() * 10
    const left = Math.random() * 100
    const delay = Math.random() * 1.5
    const duration = 2.5 + Math.random() * 2.5
    el.style.cssText = `
      position:absolute; left:${left}%; top:-20px;
      width:${size}px; height:${size}px;
      background:${color};
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      animation: confetti-fall ${duration}s ${delay}s ease-in forwards;
      opacity:0;
    `
    container.appendChild(el)
  }
}

export default function Success({ name, onHome }) {
  const confettiRef = useRef(null)

  useEffect(() => {
    if (confettiRef.current) {
      launchConfetti(confettiRef.current)
    }
  }, [])

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
      overflow: 'hidden',
    }}>
      {/* Confetti burst */}
      <div ref={confettiRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 2, overflow: 'hidden' }} />

      <div style={{
        position: 'fixed', inset: 0,
        background: 'radial-gradient(ellipse at 50% 40%, rgba(124,58,237,0.2) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 10 }}
        style={{ width: '100%', maxWidth: '480px', position: 'relative', zIndex: 3 }}
      >
        {/* Emoji */}
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1.2, 1.2, 1.2, 1] }}
          transition={{ delay: 0.3, duration: 1 }}
          style={{ fontSize: 'clamp(4rem, 15vw, 7rem)', marginBottom: '1rem', display: 'block' }}
        >
          🎉
        </motion.div>

        <h1 style={{
          fontFamily: "'Black Ops One', cursive",
          fontSize: 'clamp(1.8rem, 6vw, 3rem)',
          background: 'linear-gradient(135deg, #f0abfc, #a855f7, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '1rem',
          lineHeight: 1.2,
        }}>
          VOCÊ ESTÁ<br />CONFIRMADO!
        </h1>

        <div style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)',
          color: 'rgba(255,255,255,0.75)',
          marginBottom: '0.6rem',
          fontWeight: 500,
        }}>
          Bem-vindo ao Projeto X,
        </div>
        <div style={{
          fontFamily: "'Black Ops One', cursive",
          fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
          background: 'linear-gradient(90deg, #f0abfc, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '2rem',
        }}>
          {name}!
        </div>

        {/* Info card */}
        <div style={{
          background: 'rgba(168,85,247,0.08)',
          border: '1px solid rgba(168,85,247,0.25)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #a855f7, transparent)' }} />
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '11px', letterSpacing: '3px', color: '#c084fc', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Detalhes do Evento
          </div>
          {[
            { icon: '📅', label: 'Data', value: '19 de Julho · 2025' },
            { icon: '🎂', label: 'Aniversariante', value: 'Marcus' },
            { icon: '🔮', label: 'Evento', value: 'Projeto X' },
          ].map(({ icon, label, value }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontFamily: "'Inter'", fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{icon} {label}</span>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '14px', fontWeight: 600, color: '#fff' }}>{value}</span>
            </div>
          ))}
          <div style={{ marginTop: '1rem', fontFamily: "'Inter'", fontSize: '12px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
            Os organizadores entrarão em contato com mais detalhes sobre o local e horário. Fique ligado!
          </div>
        </div>

        <button className="btn-primary" onClick={onHome} style={{ width: '100%', padding: '14px' }}>
          ← Voltar ao Início
        </button>
      </motion.div>
    </div>
  )
}

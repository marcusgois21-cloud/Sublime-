import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Register({ onSuccess, onBack }) {
  const [form, setForm] = useState({ name: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const formatPhone = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 2)  return digits
    if (digits.length <= 7)  return `(${digits.slice(0,2)}) ${digits.slice(2)}`
    if (digits.length <= 11) return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`
    return val
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = 'Digite seu nome completo'
    const digits = form.phone.replace(/\D/g, '')
    if (digits.length < 10)
      e.phone = 'Número inválido — ex: (11) 99999-9999'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    onSuccess(form.name, form.phone)
  }

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
    }}>
      <div style={{
        position: 'fixed', top: '30%', left: '50%',
        transform: 'translateX(-50%)',
        width: '500px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '460px' }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            fontFamily: "'Black Ops One', cursive",
            fontSize: 'clamp(3rem, 10vw, 5rem)',
            background: 'linear-gradient(135deg, #f0abfc, #a855f7, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 20px rgba(168,85,247,0.5))',
            lineHeight: 1,
            marginBottom: '0.5rem',
          }}>
            PROJETO X
          </div>
          <div style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: 'clamp(1rem, 3vw, 1.3rem)',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            Confirmar Presença
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(168,85,247,0.2)',
          borderRadius: '12px',
          padding: 'clamp(1.5rem, 5vw, 2.5rem)',
          boxShadow: '0 0 40px rgba(124,58,237,0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* top glow line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: 'linear-gradient(90deg, transparent, #a855f7, #ec4899, transparent)',
          }} />

          <form onSubmit={handleSubmit} noValidate>
            {/* Nome */}
            <div style={{ marginBottom: '1.4rem' }}>
              <label style={{
                display: 'block',
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '11px',
                letterSpacing: '2.5px',
                color: '#c084fc',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}>
                Seu Nome
              </label>
              <input
                type="text"
                placeholder="Como te chamam?"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                autoComplete="name"
              />
              {errors.name && (
                <div style={{ color: '#f87171', fontSize: '12px', marginTop: '6px', fontFamily: "'Inter'" }}>
                  ⚠ {errors.name}
                </div>
              )}
            </div>

            {/* Celular */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '11px',
                letterSpacing: '2.5px',
                color: '#c084fc',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}>
                Número de Celular
              </label>
              <input
                type="tel"
                placeholder="(11) 99999-9999"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: formatPhone(e.target.value) }))}
                autoComplete="tel"
              />
              {errors.phone && (
                <div style={{ color: '#f87171', fontSize: '12px', marginTop: '6px', fontFamily: "'Inter'" }}>
                  ⚠ {errors.phone}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{
                width: '100%',
                fontSize: '1rem',
                padding: '15px',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <svg style={{ animation: 'spin-slow 1s linear infinite', width: 18, height: 18 }} viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Confirmando...
                </span>
              ) : '🎉 Confirmar Agora'}
            </button>
          </form>
        </div>

        {/* Back */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button
            onClick={onBack}
            className="btn-secondary"
            style={{ fontSize: '13px', padding: '8px 20px' }}
          >
            ← Voltar
          </button>
        </div>
      </motion.div>
    </div>
  )
}

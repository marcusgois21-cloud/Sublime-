import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Phone, PartyPopper, ArrowLeft, AlertCircle, Loader2, Sparkles } from 'lucide-react'

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
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    onSuccess(form.name, form.phone)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1.5rem', position: 'relative', zIndex: 1,
    }}>
      <div style={{ position: 'fixed', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '400px', background: 'radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '460px' }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            fontFamily: "'Black Ops One', cursive",
            fontSize: 'clamp(2.5rem, 9vw, 4.5rem)',
            background: 'linear-gradient(160deg, #fff 0%, #f0abfc 25%, #a855f7 60%, #ec4899 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 0 20px rgba(168,85,247,0.5))',
            lineHeight: 1, marginBottom: '0.4rem',
          }}>
            PROJETO X
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Sparkles size={13} color="#a855f7" />
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '12px', letterSpacing: '3px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
              Confirmar Presença
            </span>
            <Sparkles size={13} color="#a855f7" />
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(168,85,247,0.2)', borderRadius: '16px',
          padding: 'clamp(1.5rem, 5vw, 2.5rem)',
          boxShadow: '0 0 50px rgba(124,58,237,0.12)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #a855f7, #ec4899, transparent)' }} />

          <form onSubmit={handleSubmit} noValidate>
            {/* Nome */}
            <div style={{ marginBottom: '1.4rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'Rajdhani', sans-serif", fontSize: '11px', letterSpacing: '2.5px', color: '#c084fc', textTransform: 'uppercase', marginBottom: '10px' }}>
                <User size={12} /> Seu Nome
              </label>
              <input type="text" placeholder="Como te chamam?" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} autoComplete="name" />
              {errors.name && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#f87171', fontSize: '12px', marginTop: '6px', fontFamily: "'Inter'" }}>
                  <AlertCircle size={12} /> {errors.name}
                </div>
              )}
            </div>

            {/* Celular */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'Rajdhani', sans-serif", fontSize: '11px', letterSpacing: '2.5px', color: '#c084fc', textTransform: 'uppercase', marginBottom: '10px' }}>
                <Phone size={12} /> Número de Celular
              </label>
              <input type="tel" placeholder="(11) 99999-9999" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: formatPhone(e.target.value) }))} autoComplete="tel" />
              {errors.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#f87171', fontSize: '12px', marginTop: '6px', fontFamily: "'Inter'" }}>
                  <AlertCircle size={12} /> {errors.phone}
                </div>
              )}
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', fontSize: '1rem', padding: '15px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', opacity: loading ? 0.75 : 1 }}>
              {loading
                ? <><Loader2 size={18} style={{ animation: 'spin-slow 0.8s linear infinite' }} /> Confirmando...</>
                : <><PartyPopper size={18} /> Confirmar Agora <Sparkles size={15} /></>
              }
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button onClick={onBack} className="btn-secondary" style={{ fontSize: '13px', padding: '9px 22px', display: 'inline-flex', alignItems: 'center', gap: '7px', borderRadius: '8px' }}>
            <ArrowLeft size={14} /> Voltar
          </button>
        </div>
      </motion.div>
    </div>
  )
}

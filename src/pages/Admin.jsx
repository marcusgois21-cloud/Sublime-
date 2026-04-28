import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ADMIN_PASSWORD = 'projetox2025'

function exportCSV(guests) {
  const header = 'Nome,Celular,Inscrito em\n'
  const rows = guests.map(g => `"${g.name}","${g.phone}","${g.registeredAt}"`).join('\n')
  const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'projeto-x-convidados.csv'
  a.click()
  URL.revokeObjectURL(url)
}

function LoginScreen({ onLogin }) {
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pwd === ADMIN_PASSWORD) {
      onLogin()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem', position: 'relative', zIndex: 1,
    }}>
      <div style={{
        position: 'fixed', inset: 0,
        background: 'radial-gradient(ellipse at 50% 40%, rgba(124,58,237,0.12) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%', maxWidth: '380px', textAlign: 'center' }}
      >
        <div style={{
          fontFamily: "'Black Ops One', cursive",
          fontSize: '3rem',
          background: 'linear-gradient(135deg, #f0abfc, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.5rem',
          filter: 'drop-shadow(0 0 15px rgba(168,85,247,0.5))',
        }}>
          ADM
        </div>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '11px', letterSpacing: '3px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '2rem' }}>
          Painel de Controle · Projeto X
        </div>

        <motion.div
          animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${error ? 'rgba(248,113,113,0.5)' : 'rgba(168,85,247,0.2)'}`,
            borderRadius: '12px',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #a855f7, transparent)' }} />

          <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
            <label style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '11px', letterSpacing: '2.5px', color: '#c084fc', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              🔐 Senha de Acesso
            </label>
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                placeholder="••••••••••••"
                value={pwd}
                onChange={e => setPwd(e.target.value)}
                autoFocus
              />
              {error && (
                <div style={{ color: '#f87171', fontSize: '12px', marginTop: '8px', fontFamily: "'Inter'" }}>
                  ⚠ Senha incorreta
                </div>
              )}
              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', marginTop: '1.2rem', padding: '13px' }}
              >
                Entrar no Painel
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function Admin({ guests, onRemove, onClear, onBack }) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [search, setSearch] = useState('')
  const [confirmClear, setConfirmClear] = useState(false)

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />

  const filtered = guests.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.phone.includes(search)
  )

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div style={{
        position: 'fixed', inset: 0,
        background: 'radial-gradient(ellipse at 20% 20%, rgba(124,58,237,0.1) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(6,0,15,0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(168,85,247,0.15)',
        padding: '1rem 1.5rem',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={onBack} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }}>
              ← Sair
            </button>
            <div>
              <div style={{ fontFamily: "'Black Ops One', cursive", fontSize: '1.4rem', background: 'linear-gradient(135deg, #f0abfc, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                PROJETO X · ADM
              </div>
              <div style={{ fontFamily: "'Inter'", fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>
                {guests.length} inscrição{guests.length !== 1 ? 'ões' : ''} registrada{guests.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => exportCSV(guests)}
              className="btn-secondary"
              style={{ fontSize: '12px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              ⬇ Exportar CSV
            </button>
            <button
              onClick={() => setConfirmClear(true)}
              style={{
                background: 'rgba(248,113,113,0.1)',
                border: '1px solid rgba(248,113,113,0.3)',
                borderRadius: '4px',
                color: '#f87171',
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '12px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '8px 16px',
                cursor: 'pointer',
              }}
            >
              🗑 Limpar Tudo
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1.5rem' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '🎉', label: 'Total de Convidados', value: guests.length },
            { icon: '📅', label: 'Hoje', value: guests.filter(g => g.registeredAt.startsWith(new Date().toLocaleDateString('pt-BR'))).length },
            { icon: '🔥', label: 'Último Inscrito', value: guests[0]?.name.split(' ')[0] || '—' },
          ].map(({ icon, label, value }) => (
            <div key={label} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(168,85,247,0.15)',
              borderRadius: '10px',
              padding: '1rem',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{icon}</div>
              <div style={{ fontFamily: "'Black Ops One', cursive", fontSize: '1.5rem', background: 'linear-gradient(135deg, #f0abfc, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {value}
              </div>
              <div style={{ fontFamily: "'Inter'", fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px', marginTop: '2px' }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="search"
            placeholder="🔍  Buscar por nome ou celular..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ marginBottom: 0 }}
          />
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', fontFamily: "'Rajdhani', sans-serif", fontSize: '1.2rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '2px', textTransform: 'uppercase' }}>
            {guests.length === 0 ? '🎈 Nenhuma inscrição ainda' : '🔍 Nenhum resultado'}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <AnimatePresence>
              {filtered.map((guest, i) => (
                <motion.div
                  key={guest.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ delay: i * 0.03 }}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(168,85,247,0.12)',
                    borderRadius: '8px',
                    padding: '1rem 1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
                    {/* Avatar */}
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Black Ops One', cursive",
                      fontSize: '1rem', color: '#fff', flexShrink: 0,
                    }}>
                      {guest.name.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {guest.name}
                      </div>
                      <div style={{ fontFamily: "'Inter'", fontSize: '13px', color: '#a855f7', marginTop: '2px' }}>
                        📱 {guest.phone}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                    <div style={{ fontFamily: "'Inter'", fontSize: '11px', color: 'rgba(255,255,255,0.25)', textAlign: 'right' }}>
                      {guest.registeredAt}
                    </div>
                    <button
                      onClick={() => onRemove(guest.id)}
                      style={{
                        background: 'none', border: '1px solid rgba(248,113,113,0.2)',
                        borderRadius: '4px', color: 'rgba(248,113,113,0.6)',
                        cursor: 'pointer', padding: '4px 10px', fontSize: '12px',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.1)'; e.currentTarget.style.color = '#f87171' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'rgba(248,113,113,0.6)' }}
                    >
                      ✕
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Confirm Clear Modal */}
      <AnimatePresence>
        {confirmClear && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 50,
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
              backdropFilter: 'blur(10px)',
            }}
            onClick={() => setConfirmClear(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#0f0020',
                border: '1px solid rgba(248,113,113,0.4)',
                borderRadius: '12px',
                padding: '2rem',
                maxWidth: '400px',
                width: '100%',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
              <div style={{ fontFamily: "'Black Ops One', cursive", fontSize: '1.5rem', color: '#f87171', marginBottom: '0.8rem' }}>
                Tem Certeza?
              </div>
              <div style={{ fontFamily: "'Inter'", fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Esta ação removerá <strong style={{ color: '#fff' }}>todas as {guests.length} inscrições</strong> permanentemente.
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => setConfirmClear(false)} className="btn-secondary" style={{ flex: 1 }}>
                  Cancelar
                </button>
                <button
                  onClick={() => { onClear(); setConfirmClear(false) }}
                  style={{
                    flex: 1, background: 'rgba(248,113,113,0.15)',
                    border: '1px solid rgba(248,113,113,0.5)',
                    borderRadius: '4px', color: '#f87171',
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: '14px', fontWeight: 700, letterSpacing: '1px',
                    textTransform: 'uppercase', padding: '12px', cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  Limpar Tudo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

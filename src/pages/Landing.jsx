import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Crown, Star, Sparkles, Zap, Calendar, Clock,
  MapPin, Ticket, ChevronDown, PartyPopper, Music,
  Flame, Shield, Users, Lock,
} from 'lucide-react'

const PARTY_DATE = new Date('2026-05-30T19:30:00')

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

/* ── Bloco de dígito do countdown ── */
function Digit({ value, label }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        position: 'relative',
        width: 'clamp(64px, 16vw, 90px)',
        height: 'clamp(64px, 16vw, 90px)',
        background: 'rgba(168,85,247,0.07)',
        border: '1px solid rgba(168,85,247,0.3)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 20px rgba(168,85,247,0.15), inset 0 1px 0 rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}>
        {/* top shimmer line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.8), transparent)',
        }} />
        {/* mid divider */}
        <div style={{
          position: 'absolute', top: '50%', left: '8%', right: '8%', height: '1px',
          background: 'rgba(0,0,0,0.4)',
          zIndex: 2,
        }} />
        <motion.span
          key={value}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.18 }}
          style={{
            fontFamily: "'Black Ops One', cursive",
            fontSize: 'clamp(1.6rem, 5vw, 2.6rem)',
            background: 'linear-gradient(180deg, #f0abfc 0%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
            position: 'relative',
            zIndex: 3,
          }}
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </div>
      <div style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: '9px',
        letterSpacing: '3px',
        color: 'rgba(255,255,255,0.35)',
        textTransform: 'uppercase',
        marginTop: '8px',
      }}>
        {label}
      </div>
    </div>
  )
}

/* ── Card de organizador ── */
const ORG_COLORS = [
  { from: '#fbbf24', to: '#f59e0b', glow: 'rgba(251,191,36,0.35)' },  // gold – Marcus
  { from: '#a855f7', to: '#7c3aed', glow: 'rgba(168,85,247,0.3)' },
  { from: '#ec4899', to: '#db2777', glow: 'rgba(236,72,153,0.3)' },
  { from: '#3b82f6', to: '#2563eb', glow: 'rgba(59,130,246,0.3)' },
  { from: '#10b981', to: '#059669', glow: 'rgba(16,185,129,0.3)' },
  { from: '#f97316', to: '#ea580c', glow: 'rgba(249,115,22,0.3)' },
]

function OrgCard({ name, index, isBirthday }) {
  const [hovered, setHovered] = useState(false)
  const c = ORG_COLORS[index % ORG_COLORS.length]
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 + index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: hovered
          ? `rgba(${isBirthday ? '251,191,36' : '168,85,247'},0.1)`
          : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? c.from + '88' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '16px',
        padding: '1.2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        cursor: 'default',
        transition: 'all 0.3s ease',
        boxShadow: hovered ? `0 0 24px ${c.glow}` : 'none',
        flex: '1 1 120px',
        minWidth: '110px',
        maxWidth: '160px',
      }}
    >
      {/* Avatar ring */}
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: '-3px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
          opacity: hovered ? 1 : 0.5,
          transition: 'opacity 0.3s',
        }} />
        <div style={{
          position: 'relative',
          width: '52px', height: '52px',
          borderRadius: '50%',
          background: '#06000f',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '2px',
        }}>
          <span style={{
            fontFamily: "'Black Ops One', cursive",
            fontSize: '1rem',
            background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {initials}
          </span>
        </div>

        {isBirthday && (
          <div style={{
            position: 'absolute', top: '-6px', right: '-6px',
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            borderRadius: '50%',
            width: '20px', height: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 10px rgba(251,191,36,0.6)',
          }}>
            <Crown size={11} color="#000" strokeWidth={2.5} />
          </div>
        )}
      </div>

      {/* Name */}
      <div style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontWeight: 700,
        fontSize: '0.82rem',
        letterSpacing: '0.5px',
        color: hovered ? '#fff' : 'rgba(255,255,255,0.7)',
        textAlign: 'center',
        lineHeight: 1.2,
        transition: 'color 0.3s',
      }}>
        {name}
      </div>

      {/* Role badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '4px',
        padding: '2px 8px',
        background: `linear-gradient(135deg, ${c.from}22, ${c.to}22)`,
        border: `1px solid ${c.from}44`,
        borderRadius: '999px',
        fontSize: '9px',
        fontFamily: "'Rajdhani', sans-serif",
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        color: c.from,
      }}>
        {isBirthday
          ? <><Crown size={8} />&nbsp;Aniversariante</>
          : <><Star size={8} />&nbsp;Organizador</>
        }
      </div>
    </motion.div>
  )
}

const ALL_ORGS = [
  { name: 'Marcus', isBirthday: true },
  { name: 'Matheus Pena', isBirthday: false },
  { name: 'Pedro Santana', isBirthday: false },
  { name: 'Rafael', isBirthday: false },
  { name: 'Bernardo', isBirthday: false },
  { name: 'Lucca', isBirthday: false },
]

export default function Landing({ onRegister }) {
  const { d, h, m, s } = useCountdown(PARTY_DATE)

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(5rem, 8vw, 7rem) 1.5rem clamp(3rem, 5vw, 4rem)',
      position: 'relative',
      zIndex: 1,
      textAlign: 'center',
    }}>
      {/* Ambient glows */}
      <div style={{ position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '500px', background: 'radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '5%', right: '5%', width: '350px', height: '350px', background: 'radial-gradient(ellipse, rgba(236,72,153,0.14) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', top: '50%', left: '0%', width: '250px', height: '400px', background: 'radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* ── TOP BADGE ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ marginBottom: '2rem' }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '7px 20px',
          background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(236,72,153,0.1))',
          border: '1px solid rgba(168,85,247,0.4)',
          borderRadius: '999px',
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '11px', letterSpacing: '3px', color: '#c084fc',
          textTransform: 'uppercase',
          boxShadow: '0 0 20px rgba(168,85,247,0.15)',
        }}>
          <Lock size={11} />
          Acesso Exclusivo
          <Sparkles size={11} />
        </div>
      </motion.div>

      {/* ── PROJETO X HERO ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 14 }}
        style={{ marginBottom: '0.4rem', position: 'relative' }}
      >
        <div style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 'clamp(0.75rem, 1.8vw, 1rem)',
          letterSpacing: '8px',
          color: 'rgba(255,255,255,0.38)',
          textTransform: 'uppercase',
          marginBottom: '0.4rem',
        }}>
          você foi convidado para o
        </div>

        {/* X with spinning ring */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          {/* Outer spinning ring */}
          <div className="animate-spin-slow" style={{
            position: 'absolute',
            inset: '-20px',
            borderRadius: '50%',
            border: '1px solid rgba(168,85,247,0.2)',
            borderTopColor: 'rgba(168,85,247,0.7)',
            borderRightColor: 'rgba(236,72,153,0.5)',
            pointerEvents: 'none',
          }} />
          {/* Inner counter-spin ring */}
          <div style={{
            animation: 'spin-slow 8s linear infinite reverse',
            position: 'absolute',
            inset: '-8px',
            borderRadius: '50%',
            border: '1px solid rgba(236,72,153,0.15)',
            borderBottomColor: 'rgba(236,72,153,0.5)',
            pointerEvents: 'none',
          }} />

          <h1
            className="animate-float"
            style={{
              fontFamily: "'Black Ops One', cursive",
              fontSize: 'clamp(7rem, 26vw, 17rem)',
              lineHeight: 0.85,
              letterSpacing: '-4px',
              background: 'linear-gradient(160deg, #fff 0%, #f0abfc 20%, #a855f7 50%, #7c3aed 75%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(168,85,247,0.7)) drop-shadow(0 0 100px rgba(124,58,237,0.5))',
              userSelect: 'none',
              position: 'relative',
            }}
          >
            X
          </h1>
        </div>

        <div style={{
          fontFamily: "'Black Ops One', cursive",
          fontSize: 'clamp(1.4rem, 5vw, 3rem)',
          letterSpacing: '6px',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(168,85,247,0.8), rgba(255,255,255,0.5))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginTop: '-0.2rem',
        }}>
          PROJETO X
        </div>
      </motion.div>

      {/* ── ANIVERSÁRIO DE MARCUS ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.42 }}
        style={{ marginBottom: '2.5rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.6))' }} />
          <div style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: 'clamp(0.95rem, 2.8vw, 1.35rem)',
            fontWeight: 600,
            letterSpacing: '4px',
            color: 'rgba(255,255,255,0.6)',
            textTransform: 'uppercase',
          }}>
            Aniversário de
          </div>
          <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, rgba(168,85,247,0.6), transparent)' }} />
        </div>
        <div style={{
          fontFamily: "'Black Ops One', cursive",
          fontSize: 'clamp(2rem, 7vw, 4rem)',
          background: 'linear-gradient(90deg, #fbbf24, #f0abfc, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 15px rgba(251,191,36,0.4))',
          letterSpacing: '2px',
          marginTop: '4px',
        }}>
          Marcus
        </div>
      </motion.div>

      {/* ── EVENT INFO PILLS ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.52 }}
        style={{
          display: 'flex', flexWrap: 'wrap', gap: '10px',
          justifyContent: 'center', marginBottom: '2.5rem',
        }}
      >
        {[
          { icon: <Calendar size={14} />, text: '30 de Maio · 2026' },
          { icon: <Clock size={14} />, text: '19:30h' },
          { icon: <Ticket size={14} />, text: 'Convite Exclusivo' },
        ].map(({ icon, text }) => (
          <div key={text} style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            padding: '7px 16px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '999px',
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '13px', fontWeight: 600, letterSpacing: '1px',
            color: 'rgba(255,255,255,0.65)',
          }}>
            <span style={{ color: '#a855f7' }}>{icon}</span>
            {text}
          </div>
        ))}
      </motion.div>

      {/* ── COUNTDOWN ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ marginBottom: '3rem' }}
      >
        {/* Título */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '6px', marginBottom: '1.2rem',
        }}>
          <Zap size={12} color="#a855f7" />
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '10px', letterSpacing: '3px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
            Contagem Regressiva
          </span>
          <Zap size={12} color="#a855f7" />
        </div>

        {/* Container visual do countdown */}
        <div style={{
          background: 'rgba(168,85,247,0.05)',
          border: '1px solid rgba(168,85,247,0.18)',
          borderRadius: '20px',
          padding: 'clamp(1.2rem, 4vw, 2rem) clamp(1rem, 4vw, 2rem)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* shimmer top */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #a855f7, #ec4899, transparent)' }} />

          {/* Dígitos */}
          <div style={{
            display: 'flex', gap: 'clamp(8px, 3vw, 18px)',
            alignItems: 'center', justifyContent: 'center',
            marginBottom: '1.4rem',
          }}>
            <Digit value={d} label="dias" />
            <span style={{ color: 'rgba(168,85,247,0.7)', fontFamily: "'Black Ops One', cursive", fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', lineHeight: 1, marginBottom: '20px' }}>:</span>
            <Digit value={h} label="horas" />
            <span style={{ color: 'rgba(168,85,247,0.7)', fontFamily: "'Black Ops One', cursive", fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', lineHeight: 1, marginBottom: '20px' }}>:</span>
            <Digit value={m} label="min" />
            <span style={{ color: 'rgba(168,85,247,0.7)', fontFamily: "'Black Ops One', cursive", fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', lineHeight: 1, marginBottom: '20px' }}>:</span>
            <Digit value={s} label="seg" />
          </div>

          {/* Separador */}
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.25), transparent)', marginBottom: '1rem' }} />

          {/* Data e hora dentro do box */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 'clamp(10px, 3vw, 22px)', flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <Calendar size={13} color="#a855f7" />
              <span style={{
                fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
                fontSize: 'clamp(12px, 2.5vw, 14px)', letterSpacing: '2px',
                color: 'rgba(255,255,255,0.6)',
              }}>
                30 de Maio · 2026
              </span>
            </div>
            <div style={{ width: '1px', height: '14px', background: 'rgba(168,85,247,0.4)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <Clock size={13} color="#ec4899" />
              <span style={{
                fontFamily: "'Black Ops One', cursive",
                fontSize: 'clamp(12px, 2.5vw, 15px)', letterSpacing: '2px',
                background: 'linear-gradient(90deg, #f0abfc, #ec4899)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                19:30H
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── CTA BUTTON ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.72 }}
        style={{ marginBottom: '4rem' }}
      >
        <button
          className="btn-primary animate-pulse-ring"
          onClick={onRegister}
          style={{
            fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
            padding: '17px clamp(32px, 7vw, 60px)',
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            borderRadius: '8px',
          }}
        >
          <PartyPopper size={18} />
          Confirmar Presença
          <Sparkles size={16} />
        </button>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '6px', marginTop: '12px',
        }}>
          <Flame size={11} color="rgba(255,255,255,0.25)" />
          <span style={{ fontFamily: "'Inter'", fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.5px' }}>
            Vagas limitadas · Garanta a sua
          </span>
          <Flame size={11} color="rgba(255,255,255,0.25)" />
        </div>
      </motion.div>

      {/* ── ORGANIZERS SECTION ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.82 }}
        style={{ width: '100%', maxWidth: '680px' }}
      >
        {/* Section header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '14px',
          marginBottom: '1.6rem',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.4))' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={13} color="#a855f7" />
            <span style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '10px', letterSpacing: '4px',
              color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase',
            }}>
              Equipe Organizadora
            </span>
            <Shield size={13} color="#a855f7" />
          </div>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(168,85,247,0.4), transparent)' }} />
        </div>

        {/* Cards wrapper */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(168,85,247,0.12)',
          borderRadius: '20px',
          padding: 'clamp(1.2rem, 3vw, 1.8rem)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* corner glow */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.5), rgba(236,72,153,0.5), transparent)',
          }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.2), transparent)' }} />

          {/* Marcus spotlight */}
          <div style={{ marginBottom: '1.2rem' }}>
            <OrgCard name="Marcus" index={0} isBirthday />
          </div>

          {/* Other organizers */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '10px',
            justifyContent: 'center',
          }}>
            {ALL_ORGS.slice(1).map((org, i) => (
              <OrgCard key={org.name} name={org.name} index={i + 1} isBirthday={false} />
            ))}
          </div>

          {/* Footer */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '6px', marginTop: '1.4rem',
            paddingTop: '1.2rem',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}>
            <Users size={12} color="rgba(255,255,255,0.2)" />
            <span style={{
              fontFamily: "'Inter'", fontSize: '11px',
              color: 'rgba(255,255,255,0.2)', letterSpacing: '0.5px',
            }}>
              {ALL_ORGS.length} pessoas nessa missão
            </span>
            <Music size={12} color="rgba(255,255,255,0.2)" />
          </div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{ marginTop: '2.5rem' }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'rgba(168,85,247,0.4)' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </div>
  )
}

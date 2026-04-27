import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function ServiceCard({ icon, title, subtitle, description, delay = 0 }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    setTilt({
      x: ((y - cy) / cy) * -12,
      y: ((x - cx) / cx) * 12,
    })
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        padding: '2.5rem 2rem',
        background: hovered
          ? 'rgba(255,255,255,0.07)'
          : 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.35)' : 'rgba(201,168,76,0.1)'}`,
        borderRadius: '2px',
        cursor: 'none',
        transformStyle: 'preserve-3d',
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.1s ease, border-color 0.3s, background 0.3s' : 'transform 0.5s ease, border-color 0.3s, background 0.3s',
        overflow: 'hidden',
      }}
    >
      {/* Dynamic glow */}
      {hovered && (
        <div style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          left: `${glowPos.x}%`,
          top: `${glowPos.y}%`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          transition: 'none',
        }} />
      )}

      {/* Icon */}
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(201,168,76,0.08)',
          border: '1px solid rgba(201,168,76,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          fontSize: '1.8rem',
          transform: hovered ? 'translateZ(20px) scale(1.1)' : 'translateZ(0)',
          transition: 'transform 0.3s ease',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {icon}
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, transform: hovered ? 'translateZ(10px)' : 'none', transition: 'transform 0.3s ease' }}>
        <div style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '10px',
          letterSpacing: '2.5px',
          color: '#c9a84c',
          textTransform: 'uppercase',
          marginBottom: '8px',
        }}>
          {subtitle}
        </div>

        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.7rem',
          fontWeight: 400,
          color: '#f5f0eb',
          marginBottom: '1rem',
          lineHeight: 1.2,
        }}>
          {title}
        </h3>

        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '13px',
          fontWeight: 300,
          lineHeight: 1.8,
          color: 'rgba(245,240,235,0.55)',
          marginBottom: '1.8rem',
        }}>
          {description}
        </p>

        <a
          href="#agendamento"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '11px',
            letterSpacing: '2px',
            color: '#c9a84c',
            textDecoration: 'none',
            textTransform: 'uppercase',
            cursor: 'none',
            transition: 'gap 0.3s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.gap = '14px'}
          onMouseLeave={e => e.currentTarget.style.gap = '8px'}
        >
          Saiba mais
          <span style={{ display: 'inline-block', transition: 'transform 0.3s' }}>→</span>
        </a>
      </div>

      {/* Bottom shimmer line */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: hovered ? '0' : '50%',
        right: hovered ? '0' : '50%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
        transition: 'left 0.4s ease, right 0.4s ease',
      }} />
    </motion.div>
  )
}

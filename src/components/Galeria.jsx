import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const galleryItems = [
  { id: 1, label: 'Volume Russo', category: 'Cílios', gradient: 'linear-gradient(135deg, #1a1208 0%, #2a1a08 50%, #1a0f08 100%)', accent: '#c9a84c' },
  { id: 2, label: 'Design Perfeito', category: 'Sobrancelhas', gradient: 'linear-gradient(135deg, #0f0f14 0%, #1a1520 50%, #0f0c14 100%)', accent: '#d4b896' },
  { id: 3, label: 'Skincare Premium', category: 'Produtos', gradient: 'linear-gradient(135deg, #14100a 0%, #1f1508 50%, #14100a 100%)', accent: '#e8c87a' },
  { id: 4, label: 'Coleção Exclusiva', category: 'Joias', gradient: 'linear-gradient(135deg, #120d0a 0%, #1c1208 50%, #120d0a 100%)', accent: '#f2d7c0' },
  { id: 5, label: 'Mega Volume', category: 'Cílios', gradient: 'linear-gradient(135deg, #0a0a14 0%, #141420 50%, #0a0a14 100%)', accent: '#c9a84c' },
  { id: 6, label: 'Henna Premium', category: 'Sobrancelhas', gradient: 'linear-gradient(135deg, #140d08 0%, #1f1408 50%, #140d08 100%)', accent: '#d4b896' },
]

export default function Galeria() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const isDragging = useRef(false)
  const startX = useRef(0)

  const goTo = (index) => {
    setDirection(index > active ? 1 : -1)
    setActive(index)
  }

  const next = () => goTo((active + 1) % galleryItems.length)
  const prev = () => goTo((active - 1 + galleryItems.length) % galleryItems.length)

  const handleDragStart = (e) => {
    isDragging.current = true
    startX.current = e.clientX || e.touches?.[0]?.clientX || 0
  }

  const handleDragEnd = (e) => {
    if (!isDragging.current) return
    isDragging.current = false
    const endX = e.clientX || e.changedTouches?.[0]?.clientX || 0
    const diff = startX.current - endX
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev()
    }
  }

  return (
    <section
      id="galeria"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 9rem) 2rem',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #0d0b08 50%, #0a0a0a 100%)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '1.5rem' }}
          >
            <span style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, transparent, #c9a84c)' }} />
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '11px', letterSpacing: '4px', color: '#c9a84c', textTransform: 'uppercase' }}>
              Galeria
            </span>
            <span style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, #c9a84c, transparent)' }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 300,
              color: '#f5f0eb',
              lineHeight: 1.1,
            }}
          >
            Resultados que
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #c9a84c, #e8c87a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              falam por si.
            </em>
          </motion.h2>
        </div>

        {/* 3D Carousel */}
        <div
          style={{ position: 'relative', height: 'clamp(320px, 50vw, 500px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          {galleryItems.map((item, i) => {
            const offset = i - active
            const absDist = Math.abs(offset)

            const isActive = offset === 0
            const isVisible = absDist <= 2

            if (!isVisible) return null

            const xPos = offset * 55
            const scale = isActive ? 1 : 1 - absDist * 0.12
            const zIndex = 10 - absDist
            const opacity = isActive ? 1 : 1 - absDist * 0.3
            const rotateY = offset * 8

            return (
              <motion.div
                key={item.id}
                onClick={() => !isActive && goTo(i)}
                animate={{
                  x: `${xPos}%`,
                  scale,
                  opacity,
                  rotateY,
                  zIndex,
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  width: 'clamp(200px, 28vw, 340px)',
                  height: '100%',
                  borderRadius: '2px',
                  background: item.gradient,
                  border: `1px solid ${isActive ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.1)'}`,
                  cursor: isActive ? 'none' : 'pointer',
                  overflow: 'hidden',
                  transformOrigin: 'center',
                  boxShadow: isActive ? '0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(201,168,76,0.1)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  padding: '2rem',
                }}
              >
                {/* Inner glow */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(ellipse at 50% 30%, ${item.accent}22 0%, transparent 65%)`,
                  pointerEvents: 'none',
                }} />

                {/* Decorative circles */}
                <div style={{
                  position: 'absolute',
                  top: '30%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  border: `1px solid ${item.accent}33`,
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute',
                  top: '30%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  border: `1px solid ${item.accent}55`,
                  pointerEvents: 'none',
                }} />

                {/* Symbol */}
                <div style={{
                  position: 'absolute',
                  top: '25%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: '2rem',
                  color: `${item.accent}99`,
                }}>
                  ✦
                </div>

                {/* Info */}
                <div style={{
                  position: 'relative',
                  zIndex: 2,
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '10px',
                    letterSpacing: '2.5px',
                    color: item.accent,
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                    opacity: isActive ? 1 : 0.7,
                  }}>
                    {item.category}
                  </div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.4rem',
                    fontWeight: 400,
                    color: '#f5f0eb',
                    opacity: isActive ? 1 : 0.7,
                  }}>
                    {item.label}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginTop: '3rem' }}>
          <button
            onClick={prev}
            style={{
              background: 'none',
              border: '1px solid rgba(201,168,76,0.3)',
              color: '#c9a84c',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              cursor: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.target.style.background = 'rgba(201,168,76,0.1)'; e.target.style.borderColor = '#c9a84c' }}
            onMouseLeave={e => { e.target.style.background = 'none'; e.target.style.borderColor = 'rgba(201,168,76,0.3)' }}
          >
            ←
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            {galleryItems.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === active ? '24px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: i === active ? '#c9a84c' : 'rgba(201,168,76,0.3)',
                  border: 'none',
                  cursor: 'none',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            style={{
              background: 'none',
              border: '1px solid rgba(201,168,76,0.3)',
              color: '#c9a84c',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              cursor: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.target.style.background = 'rgba(201,168,76,0.1)'; e.target.style.borderColor = '#c9a84c' }}
            onMouseLeave={e => { e.target.style.background = 'none'; e.target.style.borderColor = 'rgba(201,168,76,0.3)' }}
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}

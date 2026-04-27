import { motion } from 'framer-motion'

const posts = [
  { gradient: 'linear-gradient(135deg, #1a1208, #2a1a08)', icon: '✦', label: 'Cílios Perfeitos' },
  { gradient: 'linear-gradient(135deg, #0f0f14, #1a1520)', icon: '◈', label: 'Sobrancelha Design' },
  { gradient: 'linear-gradient(135deg, #14100a, #1f1508)', icon: '◇', label: 'Skincare Ritual' },
  { gradient: 'linear-gradient(135deg, #120d0a, #1c1208)', icon: '✧', label: 'Joias Exclusivas' },
  { gradient: 'linear-gradient(135deg, #0a1014, #081520)', icon: '✦', label: 'Mega Volume' },
  { gradient: 'linear-gradient(135deg, #140a0f, #200f18)', icon: '◈', label: 'Henna Premium' },
]

export default function Instagram() {
  return (
    <section
      id="instagram"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 9rem) 2rem',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #0e0c09 50%, #0a0a0a 100%)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4rem)' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '1.5rem' }}
          >
            <span style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, transparent, #c9a84c)' }} />
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '11px', letterSpacing: '4px', color: '#c9a84c', textTransform: 'uppercase' }}>
              Instagram
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
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              fontWeight: 300,
              color: '#f5f0eb',
              lineHeight: 1.15,
              marginBottom: '1.2rem',
            }}
          >
            Acompanhe nossos
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #c9a84c, #e8c87a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              resultados incríveis.
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '14px',
              fontWeight: 300,
              color: 'rgba(245,240,235,0.5)',
              marginBottom: '2rem',
              lineHeight: 1.8,
            }}
          >
            Cada transformação é uma obra de arte. Siga-nos para inspiração diária.
          </motion.p>

          <motion.a
            href="https://instagram.com/sublimebeauty"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '2px',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              cursor: 'none',
              fontWeight: 500,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @sublimebeauty
          </motion.a>
        </div>

        {/* Grid of posts */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '4px',
        }} className="insta-grid">
          {posts.map((post, i) => (
            <motion.a
              key={i}
              href="https://instagram.com/sublimebeauty"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.04, zIndex: 10 }}
              style={{
                display: 'block',
                aspectRatio: '1/1',
                background: post.gradient,
                border: '1px solid rgba(201,168,76,0.08)',
                cursor: 'none',
                position: 'relative',
                overflow: 'hidden',
                textDecoration: 'none',
              }}
            >
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}>
                <span style={{ fontSize: '1.5rem', color: 'rgba(201,168,76,0.4)' }}>{post.icon}</span>
              </div>

              {/* Hover overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(10,10,10,0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.3s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0'}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1rem', color: '#c9a84c', marginBottom: '6px' }}>✦</div>
                  <div style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '9px',
                    letterSpacing: '1.5px',
                    color: '#f5f0eb',
                    textTransform: 'uppercase',
                  }}>{post.label}</div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <style>{`
        .insta-grid { grid-template-columns: repeat(6, 1fr); }
        @media (max-width: 768px) {
          .insta-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .insta-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}

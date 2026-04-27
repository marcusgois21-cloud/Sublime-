import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Sobre() {
  const { ref, isVisible } = useScrollReveal(0.2)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      id="sobre"
      ref={containerRef}
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 9rem) 2rem',
        background: '#0a0a0a',
        overflow: 'hidden',
      }}
    >
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '700px',
        background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}
          ref={ref}
          className="sobre-grid"
        >
          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative' }}
          >
            {/* Main image frame */}
            <div style={{
              position: 'relative',
              aspectRatio: '4/5',
              overflow: 'hidden',
              borderRadius: '2px',
            }}>
              <motion.div
                style={{ y: imageY, height: '115%', width: '100%', position: 'absolute', top: '-7.5%' }}
              >
                {/* Placeholder for image - elegant gradient */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(160deg, #1a1410 0%, #2a1f10 30%, #1a1208 60%, #0f0d09 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Decorative pattern */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `radial-gradient(circle at 30% 30%, rgba(201,168,76,0.12) 0%, transparent 50%),
                      radial-gradient(circle at 70% 70%, rgba(242,215,192,0.08) 0%, transparent 50%)`,
                  }} />
                  <span
                    style={{
                      fontFamily: "'Great Vibes', cursive",
                      fontSize: '5rem',
                      color: 'rgba(201,168,76,0.3)',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    Sublime
                  </span>
                </div>
              </motion.div>

              {/* Gold frame overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                border: '1px solid rgba(201,168,76,0.2)',
                pointerEvents: 'none',
              }} />

              {/* Corner accents */}
              {[
                { top: '16px', left: '16px' },
                { top: '16px', right: '16px' },
                { bottom: '16px', left: '16px' },
                { bottom: '16px', right: '16px' },
              ].map((pos, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  ...pos,
                  width: '24px',
                  height: '24px',
                  borderTop: i < 2 ? '1px solid #c9a84c' : 'none',
                  borderBottom: i >= 2 ? '1px solid #c9a84c' : 'none',
                  borderLeft: i % 2 === 0 ? '1px solid #c9a84c' : 'none',
                  borderRight: i % 2 === 1 ? '1px solid #c9a84c' : 'none',
                }} />
              ))}
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                bottom: '-24px',
                right: '-24px',
                width: '140px',
                height: '140px',
                background: 'rgba(10,10,10,0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                boxShadow: '0 20px 60px rgba(201,168,76,0.15)',
              }}
            >
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '2.2rem',
                fontWeight: 500,
                background: 'linear-gradient(135deg, #c9a84c, #e8c87a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1,
              }}>3+</span>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '9px',
                letterSpacing: '1.5px',
                color: 'rgba(245,240,235,0.5)',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}>Anos de<br />excelência</span>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.5rem' }}>
              <span style={{
                width: '40px', height: '1px',
                background: 'linear-gradient(90deg, #c9a84c, transparent)',
              }} />
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '11px',
                letterSpacing: '3px',
                color: '#c9a84c',
                textTransform: 'uppercase',
              }}>Nossa História</span>
            </div>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
              fontWeight: 300,
              lineHeight: 1.15,
              color: '#f5f0eb',
              marginBottom: '2rem',
            }}>
              Onde a beleza
              <br />
              <em style={{
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #c9a84c, #e8c87a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>encontra a arte.</em>
            </h2>

            {[
              'A Sublime Beauty nasceu de uma paixão genuína pelo cuidado feminino — a crença de que cada mulher merece se sentir extraordinária, todos os dias.',
              'Mais do que um espaço de beleza, somos um refúgio de sofisticação. Cada procedimento é pensado para realçar o que há de mais único em você, com técnicas exclusivas e produtos de altíssima qualidade.',
              'Porque beleza de verdade vai além da aparência. É sobre confiança, autoestima e o prazer de olhar no espelho e se apaixonar pelo que vê.',
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '14px',
                  fontWeight: 300,
                  lineHeight: 1.9,
                  color: 'rgba(245,240,235,0.6)',
                  marginBottom: '1.2rem',
                }}
              >
                {text}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{
                marginTop: '2.5rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(201,168,76,0.15)',
                display: 'flex',
                gap: '3rem',
              }}
            >
              {[
                { n: '500+', l: 'Clientes' },
                { n: '100%', l: 'Qualidade' },
                { n: '5★', l: 'Avaliações' },
              ].map(({ n, l }) => (
                <div key={n}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '2rem',
                    fontWeight: 500,
                    background: 'linear-gradient(135deg, #c9a84c, #e8c87a)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>{n}</div>
                  <div style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '10px',
                    letterSpacing: '1.5px',
                    color: 'rgba(245,240,235,0.4)',
                    textTransform: 'uppercase',
                    marginTop: '4px',
                  }}>{l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sobre-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  )
}

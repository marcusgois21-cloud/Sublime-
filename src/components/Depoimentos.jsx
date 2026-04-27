import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    name: 'Isabela Ferreira',
    role: 'Empresária',
    text: 'A experiência na Sublime Beauty é simplesmente incrível. Fui fazer extensão de cílios e saí completamente transformada. A atenção ao detalhe e o cuidado com a cliente são incomparáveis. Me senti única!',
    stars: 5,
    initial: 'I',
  },
  {
    name: 'Camila Rodrigues',
    role: 'Designer',
    text: 'Minha sobrancelha nunca ficou tão perfeita. A profissional analisou meu rosto e criou um design que realçou todos os meus traços. É arte, não é técnica. Super recomendo para quem busca exclusividade.',
    stars: 5,
    initial: 'C',
  },
  {
    name: 'Letícia Santos',
    role: 'Advogada',
    text: 'Os produtos que comprei são de qualidade excepcional. O cuidado na escolha de cada item da linha é evidente. Além disso, o ambiente é sofisticado e acolhedor. Voltarei com certeza!',
    stars: 5,
    initial: 'L',
  },
  {
    name: 'Marina Costa',
    role: 'Médica',
    text: 'Comprei joias incríveis que completaram perfeitamente meu estilo. Peças únicas, delicadas e com acabamento impecável. A Sublime Beauty é referência em tudo o que faz. Minha loja favorita!',
    stars: 5,
    initial: 'M',
  },
]

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#c9a84c', fontSize: '14px' }}>★</span>
      ))}
    </div>
  )
}

export default function Depoimentos() {
  const [active, setActive] = useState(0)

  return (
    <section
      id="depoimentos"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 9rem) 2rem',
        background: '#0a0a0a',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '400px',
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
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
              Depoimentos
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
            O que nossas
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #c9a84c, #e8c87a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              clientes dizem.
            </em>
          </motion.h2>
        </div>

        {/* Main testimonial */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: '2px',
              padding: 'clamp(2rem, 5vw, 3.5rem)',
              marginBottom: '2rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative quote mark */}
            <div style={{
              position: 'absolute',
              top: '1rem',
              left: '2rem',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '8rem',
              color: 'rgba(201,168,76,0.06)',
              lineHeight: 1,
              userSelect: 'none',
            }}>
              "
            </div>

            {/* Shimmer top border */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
            }} />

            <Stars count={testimonials[active].stars} />

            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.7,
              color: 'rgba(245,240,235,0.85)',
              margin: '1.5rem 0 2rem',
              position: 'relative',
              zIndex: 1,
            }}>
              "{testimonials[active].text}"
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #c9a84c, #e8c87a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.3rem',
                color: '#0a0a0a',
                fontWeight: 500,
                flexShrink: 0,
              }}>
                {testimonials[active].initial}
              </div>
              <div>
                <div style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#f5f0eb',
                }}>
                  {testimonials[active].name}
                </div>
                <div style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '11px',
                  color: 'rgba(201,168,76,0.7)',
                  letterSpacing: '1px',
                }}>
                  {testimonials[active].role}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Thumbnail buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {testimonials.map((t, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.05 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 16px',
                background: i === active ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${i === active ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '2px',
                cursor: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: i === active
                  ? 'linear-gradient(135deg, #c9a84c, #e8c87a)'
                  : 'rgba(201,168,76,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1rem',
                color: i === active ? '#0a0a0a' : 'rgba(245,240,235,0.6)',
                fontWeight: 500,
                transition: 'all 0.3s ease',
              }}>
                {t.initial}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '11px',
                  color: i === active ? '#f5f0eb' : 'rgba(245,240,235,0.5)',
                  fontWeight: 500,
                }}>
                  {t.name.split(' ')[0]}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}

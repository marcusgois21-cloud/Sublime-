import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    icon: '☎',
    title: 'Atendimento',
    description: 'Primeiro contato personalizado para entender seus desejos e tirar todas as dúvidas. Nossa equipe está pronta para te receber com carinho.',
  },
  {
    num: '02',
    icon: '◉',
    title: 'Avaliação',
    description: 'Análise completa do seu perfil facial, tipo de pele e preferências estéticas para criar um tratamento 100% personalizado.',
  },
  {
    num: '03',
    icon: '✦',
    title: 'Procedimento',
    description: 'Execução do procedimento com técnica apurada, materiais premium e toda a atenção que você merece em um ambiente exclusivo.',
  },
  {
    num: '04',
    icon: '◈',
    title: 'Resultado Final',
    description: 'Saia transformada e radiante. Acompanhamento pós-procedimento e dicas para manter sua beleza por muito mais tempo.',
  },
]

export default function Experiencia() {
  return (
    <section
      id="experiencia"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 9rem) 2rem',
        background: '#0a0a0a',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '-10%',
        transform: 'translateY(-50%)',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '1.5rem' }}
          >
            <span style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, transparent, #c9a84c)' }} />
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '11px', letterSpacing: '4px', color: '#c9a84c', textTransform: 'uppercase' }}>
              Experiência Sublime
            </span>
            <span style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, #c9a84c, transparent)' }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 300,
              color: '#f5f0eb',
              lineHeight: 1.1,
            }}
          >
            Do primeiro olhar
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #c9a84c, #e8c87a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              à transformação.
            </em>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Connecting line desktop */}
          <div style={{
            position: 'absolute',
            top: '48px',
            left: '12.5%',
            right: '12.5%',
            height: '1px',
            background: 'linear-gradient(90deg, rgba(201,168,76,0.1), rgba(201,168,76,0.4), rgba(201,168,76,0.1))',
          }} className="timeline-line" />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
          }} className="timeline-grid">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{ textAlign: 'center', position: 'relative' }}
              >
                {/* Step icon circle */}
                <motion.div
                  whileHover={{ scale: 1.1, boxShadow: '0 0 40px rgba(201,168,76,0.4)' }}
                  style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: '50%',
                    background: 'rgba(201,168,76,0.06)',
                    border: '1px solid rgba(201,168,76,0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 2rem',
                    position: 'relative',
                    cursor: 'none',
                    transition: 'box-shadow 0.3s ease',
                  }}
                >
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.2rem',
                    color: '#e8c87a',
                    lineHeight: 1,
                    marginBottom: '2px',
                  }}>
                    {step.icon}
                  </span>
                  <span style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '9px',
                    letterSpacing: '2px',
                    color: 'rgba(201,168,76,0.7)',
                    textTransform: 'uppercase',
                  }}>
                    {step.num}
                  </span>

                  {/* Rotating ring */}
                  <div
                    className="animate-spin-slow"
                    style={{
                      position: 'absolute',
                      inset: '-6px',
                      borderRadius: '50%',
                      border: '1px solid transparent',
                      borderTopColor: 'rgba(201,168,76,0.4)',
                      borderRightColor: 'rgba(201,168,76,0.1)',
                    }}
                  />
                </motion.div>

                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: '#f5f0eb',
                  marginBottom: '1rem',
                }}>
                  {step.title}
                </h3>

                <p style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '12px',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: 'rgba(245,240,235,0.5)',
                  maxWidth: '220px',
                  margin: '0 auto',
                }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .timeline-line {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .timeline-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

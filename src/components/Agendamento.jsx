import { useState } from 'react'
import { motion } from 'framer-motion'

const services = [
  'Extensão de Cílios — Fio a Fio',
  'Extensão de Cílios — Volume Russo',
  'Extensão de Cílios — Mega Volume',
  'Design de Sobrancelhas',
  'Henna de Sobrancelhas',
  'Laminação de Sobrancelhas',
  'Consultoria de Produtos',
  'Compra de Joias/Acessórios',
]

export default function Agendamento() {
  const [form, setForm] = useState({ nome: '', servico: '', mensagem: '' })

  const handleWhatsApp = (e) => {
    e.preventDefault()
    const msg = encodeURIComponent(
      `Olá! Gostaria de agendar na Sublime Beauty.\n\nNome: ${form.nome}\nServiço: ${form.servico}\n\n${form.mensagem}`
    )
    window.open(`https://wa.me/5500000000000?text=${msg}`, '_blank')
  }

  return (
    <section
      id="agendamento"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 9rem) 2rem',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #0e0b07 50%, #0a0a0a 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 4rem)' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '1.5rem' }}
          >
            <span style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, transparent, #c9a84c)' }} />
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '11px', letterSpacing: '4px', color: '#c9a84c', textTransform: 'uppercase' }}>
              Agendar
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
              marginBottom: '1.2rem',
            }}
          >
            Seu próximo
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #c9a84c, #e8c87a, #f2d7c0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              glow começa aqui.
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
              lineHeight: 1.8,
              maxWidth: '500px',
              margin: '0 auto',
            }}
          >
            Preencha o formulário e entraremos em contato pelo WhatsApp para confirmar seu horário.
          </motion.p>
        </div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid rgba(201,168,76,0.15)',
            borderRadius: '2px',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
          }} />

          <form onSubmit={handleWhatsApp}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }} className="form-grid">
              {/* Name */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '10px',
                  letterSpacing: '2px',
                  color: 'rgba(201,168,76,0.7)',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}>
                  Seu Nome
                </label>
                <input
                  type="text"
                  required
                  placeholder="Como posso te chamar?"
                  value={form.nome}
                  onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(201,168,76,0.15)',
                    borderRadius: '2px',
                    padding: '14px 16px',
                    color: '#f5f0eb',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '13px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    cursor: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.15)'}
                />
              </div>

              {/* Service */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '10px',
                  letterSpacing: '2px',
                  color: 'rgba(201,168,76,0.7)',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}>
                  Serviço Desejado
                </label>
                <select
                  required
                  value={form.servico}
                  onChange={e => setForm(f => ({ ...f, servico: e.target.value }))}
                  style={{
                    width: '100%',
                    background: '#111',
                    border: '1px solid rgba(201,168,76,0.15)',
                    borderRadius: '2px',
                    padding: '14px 16px',
                    color: form.servico ? '#f5f0eb' : 'rgba(245,240,235,0.35)',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '13px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    cursor: 'none',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.15)'}
                >
                  <option value="" disabled>Selecione um serviço</option>
                  {services.map(s => <option key={s} value={s} style={{ background: '#111', color: '#f5f0eb' }}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* Message */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '10px',
                letterSpacing: '2px',
                color: 'rgba(201,168,76,0.7)',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}>
                Mensagem (opcional)
              </label>
              <textarea
                rows={4}
                placeholder="Alguma preferência, dúvida ou informação adicional?"
                value={form.mensagem}
                onChange={e => setForm(f => ({ ...f, mensagem: e.target.value }))}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  borderRadius: '2px',
                  padding: '14px 16px',
                  color: '#f5f0eb',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '13px',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'border-color 0.3s ease',
                  cursor: 'none',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.15)'}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary"
                style={{
                  cursor: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '12px',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Enviar pelo WhatsApp
              </motion.button>

              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '11px',
                color: 'rgba(245,240,235,0.3)',
              }}>
                Resposta em até 2 horas
              </span>
            </div>
          </form>
        </motion.div>

        {/* Info cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '2rem' }}
          className="info-grid"
        >
          {[
            { icon: '⏰', label: 'Horário', value: 'Seg–Sáb, 9h–19h' },
            { icon: '📍', label: 'Localização', value: 'Sua cidade, Brasil' },
            { icon: '✦', label: 'Agendamento', value: 'Direto pelo WhatsApp' },
          ].map(({ icon, label, value }) => (
            <div
              key={label}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(201,168,76,0.1)',
                borderRadius: '2px',
                padding: '1.2rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#c9a84c' }}>{icon}</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '9px', letterSpacing: '1.5px', color: 'rgba(201,168,76,0.6)', textTransform: 'uppercase', marginBottom: '4px' }}>{label}</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '12px', color: 'rgba(245,240,235,0.7)' }}>{value}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .form-grid { grid-template-columns: 1fr 1fr; }
        .info-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 600px) {
          .form-grid { grid-template-columns: 1fr !important; }
          .info-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

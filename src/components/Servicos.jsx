import { motion } from 'framer-motion'
import ServiceCard from './ServiceCard'

const services = [
  {
    icon: '✦',
    subtitle: 'Extensão',
    title: 'Cílios Perfeitos',
    description: 'Transforme seu olhar com extensões de cílios fio a fio, volume russo e mega volume. Técnica exclusiva para um resultado natural e duradouro.',
  },
  {
    icon: '◈',
    subtitle: 'Design',
    title: 'Sobrancelhas',
    description: 'Design de sobrancelhas personalizado ao seu rosto. Henna, micropigmentação e laminação para sobrancelhas perfeitas que emolduram o olhar.',
  },
  {
    icon: '◇',
    subtitle: 'Linha Premium',
    title: 'Produtos de Beleza',
    description: 'Curadoria de produtos de alta performance para skincare, maquiagem e cuidados com os cílios. Marcas exclusivas selecionadas com rigor.',
  },
  {
    icon: '✧',
    subtitle: 'Coleção',
    title: 'Joias & Acessórios',
    description: 'Joias delicadas e acessórios exclusivos que complementam sua beleza. Peças únicas para adicionar sofisticação ao seu look.',
  },
]

export default function Servicos() {
  return (
    <section
      id="servicos"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 9rem) 2rem',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #0e0c09 50%, #0a0a0a 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.3) 30%, rgba(201,168,76,0.5) 50%, rgba(201,168,76,0.3) 70%, transparent 100%)',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '1.5rem' }}
          >
            <span style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, transparent, #c9a84c)' }} />
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '11px',
              letterSpacing: '4px',
              color: '#c9a84c',
              textTransform: 'uppercase',
            }}>Nossos Serviços</span>
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
              marginBottom: '1.2rem',
            }}
          >
            Cada detalhe,
            <em style={{
              fontStyle: 'italic',
              display: 'block',
              background: 'linear-gradient(135deg, #c9a84c, #e8c87a, #f2d7c0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              uma arte.
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '14px',
              fontWeight: 300,
              color: 'rgba(245,240,235,0.5)',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: 1.8,
            }}
          >
            Serviços exclusivos pensados para realçar o que há de mais único em cada mulher.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
        }}>
          {services.map((service, i) => (
            <ServiceCard key={service.title} {...service} delay={i * 0.1} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: '4rem' }}
        >
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ textDecoration: 'none', cursor: 'none' }}
          >
            Agendar agora
          </a>
        </motion.div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.3) 30%, rgba(201,168,76,0.5) 50%, rgba(201,168,76,0.3) 70%, transparent 100%)',
      }} />
    </section>
  )
}

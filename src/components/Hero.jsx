import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function HeroOrb({ mouseX, mouseY }) {
  const meshRef = useRef()
  const ring1 = useRef()
  const ring2 = useRef()
  const ring3 = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.12
      meshRef.current.rotation.x = Math.sin(t * 0.25) * 0.08
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouseX * 0.4, 0.03)
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouseY * 0.4, 0.03)
    }
    if (ring1.current) {
      ring1.current.rotation.z = t * 0.18
      ring1.current.rotation.x = Math.PI / 2.5 + Math.sin(t * 0.2) * 0.08
    }
    if (ring2.current) {
      ring2.current.rotation.z = -t * 0.12
      ring2.current.rotation.y = t * 0.1
    }
    if (ring3.current) {
      ring3.current.rotation.x = t * 0.08
      ring3.current.rotation.z = -t * 0.2
    }
  })

  const smallSpheres = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2
    const r = 1.9
    return {
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * 0.25 * r,
      z: Math.sin(angle) * r,
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8}>
      <group>
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.3, 128, 128]} />
          <MeshDistortMaterial
            color="#b8943f"
            emissive="#6b4f10"
            emissiveIntensity={0.4}
            metalness={0.95}
            roughness={0.05}
            distort={0.2}
            speed={1.5}
          />
        </mesh>

        <mesh ref={ring1}>
          <torusGeometry args={[2.0, 0.012, 16, 120]} />
          <meshStandardMaterial color="#e8c87a" emissive="#c9a84c" emissiveIntensity={0.6} metalness={1} roughness={0} />
        </mesh>

        <mesh ref={ring2}>
          <torusGeometry args={[2.4, 0.007, 16, 120]} />
          <meshStandardMaterial color="#c9a84c" emissive="#c9a84c" emissiveIntensity={0.3} metalness={1} roughness={0} transparent opacity={0.5} />
        </mesh>

        <mesh ref={ring3}>
          <torusGeometry args={[1.65, 0.006, 16, 100]} />
          <meshStandardMaterial color="#f2d7c0" emissive="#e8c87a" emissiveIntensity={0.4} metalness={1} roughness={0} transparent opacity={0.7} />
        </mesh>

        {smallSpheres.map((pos, i) => (
          <mesh key={i} position={[pos.x, pos.y, pos.z]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshStandardMaterial color="#f2d7c0" emissive="#e8c87a" emissiveIntensity={1.5} metalness={1} roughness={0} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

function GoldenParticles() {
  const count = 200
  const ref = useRef()
  const positions = useRef(new Float32Array(count * 3))

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 14
      positions.current[i * 3 + 1] = (Math.random() - 0.5) * 14
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions.current, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#e8c87a" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

const textVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { delay: i * 0.15 + 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  })
}

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 60% at 60% 50%, rgba(201,168,76,0.06) 0%, transparent 70%), #0a0a0a',
      }}
    >
      {/* Ambient gradient blobs */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-20%', left: '-10%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(242,215,192,0.05) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(60px)',
        }} />
      </div>

      {/* 3D Canvas */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        width: '55%',
        height: '100%',
        pointerEvents: 'none',
      }}>
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={3} color="#e8c87a" />
          <pointLight position={[-3, -3, 3]} intensity={1.5} color="#c9a84c" />
          <pointLight position={[0, 6, -2]} intensity={2} color="#f2d7c0" />
          <spotLight position={[2, 8, 2]} intensity={4} color="#e8c87a" angle={0.3} penumbra={1} />

          <HeroOrb mouseX={mousePos.x} mouseY={mousePos.y} />
          <GoldenParticles />

          <Stars radius={40} depth={30} count={500} factor={2} saturation={0} fade speed={0.3} />
        </Canvas>
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', paddingTop: '6rem' }}>
        <div style={{ maxWidth: '560px' }}>
          <motion.div
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            style={{ marginBottom: '1.5rem' }}
          >
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '11px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#c9a84c',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{ width: '30px', height: '1px', background: 'linear-gradient(90deg, #c9a84c, transparent)' }} />
              Experiência Premium de Beleza
              <span style={{ width: '30px', height: '1px', background: 'linear-gradient(90deg, transparent, #c9a84c)' }} />
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(3.2rem, 7vw, 5.5rem)',
              fontWeight: 300,
              lineHeight: 1.05,
              color: '#f5f0eb',
              marginBottom: '1.5rem',
            }}
          >
            Sublime é
            <br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #c9a84c 0%, #e8c87a 50%, #f2d7c0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              se sentir única.
            </em>
          </motion.h1>

          <motion.p
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.8,
              color: 'rgba(245,240,235,0.65)',
              marginBottom: '2.5rem',
              maxWidth: '440px',
            }}
          >
            Beleza, autoestima e sofisticação em cada detalhe. Uma experiência exclusiva criada para você brilhar com autenticidade.
          </motion.p>

          <motion.div
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary magnetic-btn"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Agendar no WhatsApp
            </a>
            <a
              href="#servicos"
              className="btn-secondary magnetic-btn"
              style={{ textDecoration: 'none', cursor: 'none' }}
            >
              Ver serviços
            </a>
          </motion.div>

          <motion.div
            custom={4}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', gap: '3rem', marginTop: '4rem' }}
          >
            {[
              { num: '500+', label: 'Clientes satisfeitas' },
              { num: '5★', label: 'Avaliação média' },
              { num: '3 anos', label: 'De experiência' },
            ].map((stat) => (
              <div key={stat.num}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '2rem',
                  fontWeight: 500,
                  background: 'linear-gradient(135deg, #c9a84c, #e8c87a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {stat.num}
                </div>
                <div style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '10px',
                  letterSpacing: '1px',
                  color: 'rgba(245,240,235,0.4)',
                  textTransform: 'uppercase',
                  marginTop: '4px',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '9px',
          letterSpacing: '3px',
          color: 'rgba(201,168,76,0.6)',
          textTransform: 'uppercase',
        }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, #c9a84c, transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}

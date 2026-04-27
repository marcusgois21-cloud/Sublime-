import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, Stars, Ring, Torus } from '@react-three/drei'
import * as THREE from 'three'

function GoldenSphere() {
  const meshRef = useRef()
  const ringRef = useRef()
  const ring2Ref = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.1
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.2
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.2) * 0.1
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.15
      ring2Ref.current.rotation.y = Math.PI / 4 + Math.cos(t * 0.25) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
      <group>
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.2, 64, 64]} />
          <MeshDistortMaterial
            color="#c9a84c"
            emissive="#8b6914"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.1}
            distort={0.25}
            speed={2}
            envMapIntensity={1}
          />
        </mesh>

        <mesh ref={ringRef} position={[0, 0, 0]}>
          <torusGeometry args={[1.8, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#e8c87a"
            emissive="#c9a84c"
            emissiveIntensity={0.5}
            metalness={1}
            roughness={0}
          />
        </mesh>

        <mesh ref={ring2Ref} position={[0, 0, 0]}>
          <torusGeometry args={[2.1, 0.008, 16, 100]} />
          <meshStandardMaterial
            color="#c9a84c"
            emissive="#c9a84c"
            emissiveIntensity={0.3}
            metalness={1}
            roughness={0}
            transparent
            opacity={0.6}
          />
        </mesh>

        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const r = 1.6
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * r, Math.sin(angle) * r * 0.3, Math.sin(angle) * r * 0.7]}
            >
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshStandardMaterial
                color="#f2d7c0"
                emissive="#e8c87a"
                emissiveIntensity={1}
                metalness={1}
                roughness={0}
              />
            </mesh>
          )
        })}
      </group>
    </Float>
  )
}

function Particles() {
  const count = 120
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = 2.5 + Math.random() * 2
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  const pointsRef = useRef()

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#e8c87a"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

export default function GoldenOrb() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#e8c87a" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#c9a84c" />
      <pointLight position={[0, 5, -3]} intensity={1.5} color="#f2d7c0" />
      <spotLight position={[0, 8, 0]} intensity={3} color="#e8c87a" angle={0.4} penumbra={1} />

      <GoldenSphere />
      <Particles />

      <Stars
        radius={30}
        depth={20}
        count={300}
        factor={2}
        saturation={0}
        fade
        speed={0.5}
      />
    </Canvas>
  )
}

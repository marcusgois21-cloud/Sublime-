import { useEffect, useRef } from 'react'

const COLORS = ['#a855f7','#ec4899','#f59e0b','#10b981','#3b82f6','#f0abfc','#fbbf24','#fb7185']
const SHAPES = ['circle','square','triangle']

export default function Confetti({ active = true, count = 60 }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!active || !ref.current) return
    const container = ref.current
    container.innerHTML = ''

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div')
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
      const size = 6 + Math.random() * 10
      const left = Math.random() * 100
      const delay = Math.random() * 4
      const duration = 3 + Math.random() * 4

      el.style.cssText = `
        position:absolute;
        left:${left}%;
        top:-20px;
        width:${size}px;
        height:${size}px;
        background:${color};
        border-radius:${shape === 'circle' ? '50%' : shape === 'square' ? '2px' : '0'};
        clip-path:${shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'};
        animation: confetti-fall ${duration}s ${delay}s ease-in infinite;
        opacity:0;
      `
      container.appendChild(el)
    }
  }, [active, count])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    />
  )
}

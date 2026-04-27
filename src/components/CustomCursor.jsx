import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })
  const followerPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }

    const animate = () => {
      followerPosRef.current.x += (posRef.current.x - followerPosRef.current.x) * 0.12
      followerPosRef.current.y += (posRef.current.y - followerPosRef.current.y) * 0.12
      follower.style.left = followerPosRef.current.x + 'px'
      follower.style.top = followerPosRef.current.y + 'px'
      rafRef.current = requestAnimationFrame(animate)
    }

    const onEnterBtn = () => {
      cursor.style.width = '6px'
      cursor.style.height = '6px'
      follower.style.width = '60px'
      follower.style.height = '60px'
      follower.style.borderColor = 'rgba(201,168,76,0.9)'
    }
    const onLeaveBtn = () => {
      cursor.style.width = '10px'
      cursor.style.height = '10px'
      follower.style.width = '36px'
      follower.style.height = '36px'
      follower.style.borderColor = 'rgba(201,168,76,0.6)'
    }

    window.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(animate)

    const btns = document.querySelectorAll('button, a, [data-cursor]')
    btns.forEach(b => {
      b.addEventListener('mouseenter', onEnterBtn)
      b.addEventListener('mouseleave', onLeaveBtn)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      btns.forEach(b => {
        b.removeEventListener('mouseenter', onEnterBtn)
        b.removeEventListener('mouseleave', onLeaveBtn)
      })
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={followerRef} className="custom-cursor-follower" />
    </>
  )
}

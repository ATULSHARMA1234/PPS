import { useEffect, useRef } from 'react'

export default function RevealSection({ children, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
        }
      })
    }, { threshold: 0.1 })

    if (ref.current) {
      ref.current.classList.add('reveal')
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  )
}

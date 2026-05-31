'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingActions() {
  const [visible, setVisible] = useState(false)
  const [atTop, setAtTop]     = useState(true)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setVisible(y > 500)
      setAtTop(y < 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3"
        >
          {/* Back to top */}
          <motion.button
            onClick={scrollTop}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-full bg-white border border-[#e5e5e5]
              shadow-[0_4px_20px_rgba(0,0,0,0.12)] flex items-center justify-center
              text-[#555] hover:text-[#e06f46] hover:border-[#e06f46] transition-colors"
            title="Về đầu trang"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </motion.button>

          {/* Floating CTA */}
          <motion.a
            href="#lien-he"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2.5 bg-[#e06f46] hover:bg-[#c45a33] text-white
              px-5 py-3.5 rounded-full font-semibold text-[13px]
              shadow-[0_6px_28px_rgba(224,111,70,0.45)] transition-colors"
          >
            {/* Phone icon */}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            Nhận Báo Giá
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSettings } from '@/components/SettingsProvider'

function calc(targetStr: string) {
  const target = new Date(targetStr)
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-[#1a1a1a] text-white font-bold text-2xl md:text-3xl w-16 md:w-20 h-14 md:h-16
          flex items-center justify-center rounded-lg tabular-nums tracking-tight
          shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
        suppressHydrationWarning
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <span className="text-[10px] text-[#888] mt-1.5 tracking-[2px] uppercase font-medium">
        {label}
      </span>
    </div>
  )
}

export default function CountdownTimer() {
  const settings = useSettings()
  const targetStr = settings.open_date_time || '2026-06-27T08:00:00'
  const [time, setTime] = useState(() => calc(targetStr))

  useEffect(() => {
    setTime(calc(targetStr))
    const id = setInterval(() => setTime(calc(targetStr)), 1000)
    return () => clearInterval(id)
  }, [targetStr])

  return (
    <div className="bg-[#fdf6f3] border border-[#f0d5c8] rounded-xl px-5 py-5 mb-6">
      <div className="flex items-center gap-2 mb-4">
        {/* Fire icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#e06f46">
          <path d="M12 23a7.5 7.5 0 01-5.138-12.963C8.204 8.774 11.5 6.5 11 1.5c6 4 9 8 3 14 1 0 2.5 0 3-1.5.5 1 .5 2-.5 3.5A7.5 7.5 0 0112 23z"/>
        </svg>
        <span className="text-[12px] font-bold text-[#e06f46] tracking-[2px] uppercase">
          {settings.open_title}
        </span>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <Digit value={time.days}    label="Ngày"   />
        <span className="text-[#ccc] text-2xl font-light pb-5">:</span>
        <Digit value={time.hours}   label="Giờ"    />
        <span className="text-[#ccc] text-2xl font-light pb-5">:</span>
        <Digit value={time.minutes} label="Phút"   />
        <span className="text-[#ccc] text-2xl font-light pb-5">:</span>
        <Digit value={time.seconds} label="Giây"   />

        <div className="ml-auto hidden sm:block text-right">
          <p className="text-[11px] text-[#aaa] mb-0.5">Ngày mở bán dự kiến</p>
          <p className="font-bold text-[#1a1a1a] text-[15px]">
            {settings.open_date.split('-').reverse().join('/')}
          </p>
          <a href="#lien-he"
            className="inline-block mt-2 bg-[#e06f46] hover:bg-[#c45a33] text-white
              text-[11px] font-bold px-3 py-1.5 rounded transition-colors tracking-wide">
            Đặt Chỗ Ngay →
          </a>
        </div>
      </div>
    </div>
  )
}

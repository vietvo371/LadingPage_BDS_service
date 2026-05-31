'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

type Stat = {
  end: number
  decimals?: number
  suffix?: string
  prefix?: string
  label: string
  sub?: string
}

const STATS: Stat[] = [
  { end: 93.9, decimals: 1, suffix: ' ha',    label: 'Tổng Diện Tích',    sub: 'Quy mô đại đô thị' },
  { end: 7100, suffix: ' tỷ', prefix: '',     label: 'Tổng Vốn Đầu Tư',  sub: 'Đồng VN' },
  { end: 14.4, decimals: 1, suffix: '%',      label: 'Mật Độ Xây Dựng',  sub: 'Cảnh quan chiếm 85.6%' },
  { end: 1111, suffix: '+',                   label: 'Sản Phẩm',          sub: 'Đa dạng loại hình' },
]

function useCounter(end: number, decimals = 0, inView: boolean) {
  const [val, setVal] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    const duration = 1800
    const steps    = 60
    const step     = duration / steps
    let current    = 0

    const timer = setInterval(() => {
      current += end / steps
      if (current >= end) {
        setVal(end)
        clearInterval(timer)
      } else {
        setVal(parseFloat(current.toFixed(decimals)))
      }
    }, step)

    return () => clearInterval(timer)
  }, [inView, end, decimals])

  return val
}

function StatCard({ stat }: { stat: Stat }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const val    = useCounter(stat.end, stat.decimals, inView)

  return (
    <div ref={ref} className="text-center py-2">
      <div className="text-3xl md:text-4xl font-bold text-[#1a1a1a] tabular-nums leading-tight">
        {stat.prefix ?? ''}
        {stat.decimals
          ? val.toFixed(stat.decimals)
          : Math.floor(val).toLocaleString('vi-VN')}
        <span className="text-[#e06f46]">{stat.suffix}</span>
      </div>
      <p className="text-[13px] font-semibold text-[#1a1a1a] mt-2">{stat.label}</p>
      <p className="text-[11px] text-[#aaa] mt-0.5">{stat.sub}</p>
    </div>
  )
}

export default function CounterStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#ebebeb] border border-[#ebebeb] rounded-xl overflow-hidden mb-8">
      {STATS.map(s => (
        <div key={s.label} className="bg-white px-4 py-5">
          <StatCard stat={s} />
        </div>
      ))}
    </div>
  )
}

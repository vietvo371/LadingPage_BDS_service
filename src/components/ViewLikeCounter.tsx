'use client'
import { useEffect, useState } from 'react'

// Giả lập base views (thay bằng API thật khi có backend)
const BASE_VIEWS = 1248
const BASE_LIKES = 87

export default function ViewLikeCounter() {
  const [views,  setViews]  = useState(BASE_VIEWS)
  const [likes,  setLikes]  = useState(BASE_LIKES)
  const [liked,  setLiked]  = useState(false)
  const [bounce, setBounce] = useState(false)

  useEffect(() => {
    // 1. Fetch current stats
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setViews(data.views || BASE_VIEWS)
        setLikes(data.likes || BASE_LIKES)
      })
      .catch(err => console.error('Error fetching stats:', err))

    // 2. Tăng views mỗi lần vào trang (giới hạn 1 lần/session)
    const viewed = sessionStorage.getItem('coastal_viewed')
    if (!viewed) {
      fetch('/api/stats?action=view', { method: 'POST' })
        .then(res => res.json())
        .then(data => {
          if (data.success && !data.fake) setViews(data.value)
        })
        .catch(err => console.error('Error incrementing view:', err))
      sessionStorage.setItem('coastal_viewed', '1')
    }

    // Check liked local state
    const isLiked = localStorage.getItem('coastal_liked') === '1'
    setLiked(isLiked)
  }, [])

  const handleLike = async () => {
    if (liked) {
      // Unlike
      setLiked(false)
      setLikes(prev => prev - 1)
      localStorage.setItem('coastal_liked', '0')
      
      try {
        await fetch('/api/stats?action=unlike', { method: 'POST' })
      } catch (error) {
        console.error('Error unliking:', error)
      }
    } else {
      // Like + bounce animation
      setLiked(true)
      setLikes(prev => prev + 1)
      setBounce(true)
      setTimeout(() => setBounce(false), 600)
      localStorage.setItem('coastal_liked', '1')
      
      try {
        await fetch('/api/stats?action=like', { method: 'POST' })
      } catch (error) {
        console.error('Error liking:', error)
      }
    }
  }

  return (
    <div className="flex items-center gap-5 text-[12px] text-[#888]">
      {/* Lượt xem */}
      <div className="flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5 text-[#aaa]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
        <span>{views.toLocaleString('vi-VN')} lượt xem</span>
      </div>

      {/* Divider */}
      <span className="text-[#e5e5e5]">·</span>

      {/* Lượt yêu thích — clickable */}
      <button
        onClick={handleLike}
        className={`flex items-center gap-1.5 transition-colors group
          ${liked ? 'text-[#e06f46]' : 'text-[#888] hover:text-[#e06f46]'}`}
        title={liked ? 'Bỏ yêu thích' : 'Yêu thích dự án này'}
      >
        <svg
          className={`w-3.5 h-3.5 transition-all duration-300
            ${bounce ? 'scale-150' : 'scale-100'}
            ${liked ? 'fill-[#e06f46] stroke-[#e06f46]' : 'fill-none stroke-current group-hover:stroke-[#e06f46]'}`}
          viewBox="0 0 24 24" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
        <span>{likes.toLocaleString('vi-VN')} yêu thích</span>
      </button>
    </div>
  )
}

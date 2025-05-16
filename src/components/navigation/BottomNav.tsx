"use client"

import { Home, MessageCircle, BookOpen, Play } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="bg-[#4D4D4D] border-t border-gray-700 flex justify-around p-4">
      <button 
        className={`flex flex-col items-center ${pathname === '/home' ? 'text-[#FF6B6B]' : 'text-gray-300'}`}
        onClick={() => router.push('/home')}
      >
        <Home size={20} />
        <span className="text-xs mt-1">Home</span>
      </button>
      <button 
        className={`flex flex-col items-center ${pathname === '/feed' ? 'text-[#FF6B6B]' : 'text-gray-300'}`}
        onClick={() => router.push('/feed')}
      >
        <MessageCircle size={20} />
        <span className="text-xs mt-1">Feed</span>
      </button>
      <button 
        className={`flex flex-col items-center ${pathname === '/resources' ? 'text-[#FF6B6B]' : 'text-gray-300'}`}
        onClick={() => router.push('/resources')}
      >
        <BookOpen size={20} />
        <span className="text-xs mt-1">Resources</span>
      </button>
      <button 
        className={`flex flex-col items-center ${pathname === '/fun' ? 'text-[#FF6B6B]' : 'text-gray-300'}`}
        onClick={() => router.push('/fun')}
      >
        <Play size={20} />
        <span className="text-xs mt-1">Fun</span>
      </button>
    </div>
  )
}

"use client"

import { useState, useEffect, useRef } from 'react'
import { Mic, Camera, Image as ImageIcon, Smile, Send, X, Plus, User, Home, BookOpen, Play } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Montessori badge types
type BadgeType = 'practical-life' | 'sensorial' | 'language' | 'mathematics' | 'cultural' | 'social-emotional' | 'physical';

// Badge component
const MontessoriBadge = ({ type, size = 'small', age = '0+' }: { type: BadgeType, size?: 'small' | 'medium', age?: string }) => {
  const icons = {
    'practical-life': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 5L17 7M17 7L19 9M17 7L19 5M17 7L15 9" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8.5 9C8.5 7.6 7.4 6.5 6 6.5C4.6 6.5 3.5 7.6 3.5 9C3.5 10.4 4.6 11.5 6 11.5H8.5V9Z" stroke="#FF6B6B" strokeWidth="2"/>
        <path d="M8.5 9C8.5 7.6 9.6 6.5 11 6.5C12.4 6.5 13.5 7.6 13.5 9C13.5 10.4 12.4 11.5 11 11.5H8.5V9Z" stroke="#FF6B6B" strokeWidth="2"/>
        <path d="M8.5 14.5C8.5 13.1 7.4 12 6 12C4.6 12 3.5 13.1 3.5 14.5C3.5 15.9 4.6 17 6 17H8.5V14.5Z" stroke="#FF6B6B" strokeWidth="2"/>
        <path d="M8.5 14.5C8.5 13.1 9.6 12 11 12C12.4 12 13.5 13.1 13.5 14.5C13.5 15.9 12.4 17 11 17H8.5V14.5Z" stroke="#FF6B6B" strokeWidth="2"/>
        <path d="M13.5 14.5C13.5 13.1 14.6 12 16 12C17.4 12 18.5 13.1 18.5 14.5C18.5 15.9 17.4 17 16 17H13.5V14.5Z" stroke="#FF6B6B" strokeWidth="2"/>
      </svg>
    ),
    'sensorial': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19" stroke="#FFD166" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 12H19" stroke="#FFD166" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="#FFD166"/>
        <circle cx="12" cy="19" r="2" fill="#FFD166"/>
        <circle cx="12" cy="5" r="2" fill="#FFD166"/>
        <circle cx="19" cy="12" r="2" fill="#FFD166"/>
        <circle cx="5" cy="12" r="2" fill="#FFD166"/>
      </svg>
    ),
    'language': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 9H16M8 13H14M8 17H11" stroke="#40BFBF" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7 5H17C18.1046 5 19 5.89543 19 7V17C19 18.1046 18.1046 19 17 19H7C5.89543 19 5 18.1046 5 17V7C5 5.89543 5.89543 5 7 5Z" stroke="#40BFBF" strokeWidth="2"/>
      </svg>
    ),
    'mathematics': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 9H19" stroke="#D99B9B" strokeWidth="2" strokeLinecap="round"/>
        <path d="M5 15H19" stroke="#D99B9B" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 5L9 19" stroke="#D99B9B" strokeWidth="2" strokeLinecap="round"/>
        <path d="M15 5L15 19" stroke="#D99B9B" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    'cultural': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" stroke="#9B59B6" strokeWidth="2"/>
        <path d="M12 4C12 4 16 8 16 12C16 16 12 20 12 20C12 20 8 16 8 12C8 8 12 4 12 4Z" stroke="#9B59B6" strokeWidth="2"/>
        <path d="M4 12H20" stroke="#9B59B6" strokeWidth="2"/>
      </svg>
    ),
    'social-emotional': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16C16 16 16 8 16 8H8C8 8 8 16 12 16Z" stroke="#40BFBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 11C10 12 11 12 12 11" stroke="#40BFBF" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="10" cy="9" r="1" fill="#40BFBF"/>
        <circle cx="14" cy="9" r="1" fill="#40BFBF"/>
        <circle cx="12" cy="12" r="9" stroke="#40BFBF" strokeWidth="2"/>
      </svg>
    ),
    'physical': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="12" r="2" stroke="#FF6B6B" strokeWidth="2"/>
        <path d="M13 6L15 7L13 8" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 16L15 17L13 18" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 14V17C8 18.1046 8.89543 19 10 19H18C19.1046 19 20 18.1046 20 17V7C20 5.89543 19.1046 5 18 5H10C8.89543 5 8 5.89543 8 7V10" stroke="#FF6B6B" strokeWidth="2"/>
      </svg>
    )
  };

  const backgrounds = {
    'practical-life': 'bg-gradient-to-r from-[#FF6B6B] to-[#FFBCAB]',
    'sensorial': 'bg-gradient-to-r from-[#FFD166] to-[#FFBCAB]',
    'language': 'bg-gradient-to-r from-[#40BFBF] to-[#D6EAF8]',
    'mathematics': 'bg-gradient-to-r from-[#D99B9B] to-[#FFD6CC]',
    'cultural': 'bg-gradient-to-r from-[#9B59B6] to-[#D2B4DE]',
    'social-emotional': 'bg-gradient-to-r from-[#40BFBF] to-[#ABEBC6]',
    'physical': 'bg-gradient-to-r from-[#FF6B6B] to-[#F8C471]'
  };

  const names = {
    'practical-life': 'Practical Life',
    'sensorial': 'Sensorial',
    'language': 'Language',
    'mathematics': 'Mathematics',
    'cultural': 'Cultural',
    'social-emotional': 'Social-Emotional',
    'physical': 'Physical'
  };

  const dimensions = size === 'small' ? 'w-8 h-8 min-w-8' : 'w-12 h-12 min-w-12';
  const innerDimensions = size === 'small' ? 'w-6 h-6' : 'w-10 h-10';
  const ageDimensions = size === 'small' ? 'w-4 h-4 text-[8px]' : 'w-5 h-5 text-[10px]';

  return (
    <div className="flex items-center">
      <div className={`relative ${dimensions} rounded-full ${backgrounds[type]} flex items-center justify-center`}>
        <div className={`${innerDimensions} rounded-full bg-white flex items-center justify-center`}>
          {icons[type]}
        </div>
        <div className={`absolute -bottom-1 -right-1 ${ageDimensions} rounded-full bg-[#4D4D4D] text-white flex items-center justify-center font-bold border border-white`}>
          {age}
        </div>
      </div>
      {size === 'medium' && (
        <span className="ml-2 text-xs font-medium">{names[type]}</span>
      )}
    </div>
  );
};

// Sample feed items - in a real app, this would come from an API
const feedItems = [
  {
    id: 1,
    text: "Emma showed great progress with her fine motor skills today! She was able to use scissors properly for the first time, cutting along straight lines with minimal assistance.",
    timestamp: "2025-05-16 01:37:40",
    images: [],
    user: "manabunagaoka",
    badges: ['practical-life', 'physical'] as BadgeType[],
    ages: ['3+', '2+']
  },
  {
    id: 2,
    text: "Lucas built an impressive tower with the wooden blocks today. He demonstrated excellent spatial awareness and patience, carefully balancing each block. This activity is helping develop his hand-eye coordination and concentration.",
    timestamp: "2025-05-15 20:30:05",
    images: [],
    user: "manabunagaoka",
    badges: ['sensorial', 'mathematics'] as BadgeType[],
    ages: ['2+', '2+']
  },
  {
    id: 3,
    text: "Our sensory bin exploration with rice and hidden objects was a big hit today! Sophia spent nearly 30 minutes fully engaged, finding all the small treasures. This activity supports tactile discrimination and concentration.",
    timestamp: "2025-05-15 18:45:33",
    images: [],
    user: "manabunagaoka",
    badges: ['sensorial', 'language'] as BadgeType[],
    ages: ['1+', '1+']
  }
];

export default function HomePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [newPost, setNewPost] = useState({ text: '', images: [] })
  const [feed, setFeed] = useState(feedItems)
  const [isEditing, setIsEditing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const currentUser = 'manabunagaoka'
  const currentTime = '2025-05-16 01:37:40'

  // AI analysis would occur here to determine appropriate badges
  const analyzeContent = (text: string): { badges: BadgeType[], ages: string[] } => {
    // This is a simplified mock of what would be an AI-based analysis
    const result: { badges: BadgeType[], ages: string[] } = {
      badges: [],
      ages: []
    };
    
    if (text.toLowerCase().includes('motor') || text.toLowerCase().includes('coordination')) {
      result.badges.push('physical');
      result.ages.push('1+');
    }
    
    if (text.toLowerCase().includes('concentration') || text.toLowerCase().includes('focus')) {
      result.badges.push('practical-life');
      result.ages.push('2+');
    }
    
    if (text.toLowerCase().includes('spill') || text.toLowerCase().includes('pour')) {
      result.badges.push('practical-life');
      result.ages.push('3+');
    }
    
    // If no badges were assigned, default to practical life
    if (result.badges.length === 0) {
      result.badges.push('practical-life');
      result.ages.push('2+');
    }
    
    return result;
  };

  const handleVoiceRecording = () => {
    // Simulate voice-to-text transcription
    setIsRecording(true)
    setTimeout(() => {
      setNewPost({
        ...newPost,
        text: "Noah did a wonderful job with his practical life exercises today. He practiced pouring water between containers and managed to do it with minimal spills. His concentration is really improving!"
      })
      setIsRecording(false)
      setIsEditing(true)
    }, 2000)
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost({
      ...newPost,
      text: e.target.value
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, this would handle actual file uploads
    // For this demo, we'll just simulate adding random placeholder images
    if (e.target.files && e.target.files.length > 0) {
      setNewPost({
        ...newPost,
        images: [...newPost.images, "/api/placeholder/600/400"]
      })
    }
  }

  const handlePost = () => {
    if (newPost.text.trim()) {
      const analysis = analyzeContent(newPost.text);
      
      const newFeedItem = {
        id: feed.length + 1,
        text: newPost.text,
        timestamp: currentTime,
        images: newPost.images,
        user: currentUser,
        badges: analysis.badges,
        ages: analysis.ages
      }

      setFeed([newFeedItem, ...feed])
      setNewPost({ text: '', images: [] })
      setIsEditing(false)
    }
  }

  const removeImage = (index: number) => {
    setNewPost({
      ...newPost,
      images: newPost.images.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header - White with subtle Coral Red accents */}
      <div className="bg-white p-4 flex justify-between items-center shadow-sm border-b border-[#FF6B6B]">
        <div className="flex items-center">
          <div className="h-10 w-auto mr-3 rounded-md overflow-hidden relative">
            <img 
              src="/images/indabacarelogo.jpg" 
              alt="Indaba Care Logo" 
              className="h-10 w-auto object-contain" 
              onError={(e) => e.currentTarget.src = "/api/placeholder/50/50"} 
            />
          </div>
          <h1 className="font-bold text-xl text-[#4D4D4D]">Indaba Care</h1>
        </div>
        <div className="flex items-center">
          <User size={20} className="mr-2 text-[#4D4D4D]" />
          <span className="text-[#4D4D4D]">{currentUser}</span>
        </div>
      </div>
      
      {/* Content - Instagram-like Feed */}
      <div className="flex-1 overflow-auto pb-20">
        {/* New Post Editor (if editing) */}
        {isEditing && (
          <div className="bg-white p-4 mb-4 border-b border-gray-200">
            <div className="mb-3">
              <textarea
                className="w-full border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-1 focus:ring-[#FF6B6B] min-h-[100px]"
                placeholder="What's happening with your child today?"
                value={newPost.text}
                onChange={handleTextChange}
              />
            </div>
            
            {/* Uploaded Images Preview */}
            {newPost.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {newPost.images.map((img, index) => (
                  <div key={index} className="relative">
                    <img src={img} alt="Upload preview" className="w-20 h-20 object-cover rounded" />
                    <button 
                      className="absolute -top-2 -right-2 bg-[#FF6B6B] rounded-full p-1 text-white"
                      onClick={() => removeImage(index)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <button 
                  className="p-2 text-gray-500 hover:text-[#FF6B6B]"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon size={20} />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  multiple
                />
                <button className="p-2 text-gray-500 hover:text-[#FF6B6B]">
                  <Camera size={20} />
                </button>
                <button className="p-2 text-gray-500 hover:text-[#FF6B6B]">
                  <Smile size={20} />
                </button>
              </div>
              
              <button 
                className="bg-[#FF6B6B] text-white px-4 py-2 rounded-full font-medium flex items-center"
                onClick={handlePost}
              >
                <Send size={16} className="mr-1" />
                Post
              </button>
            </div>
          </div>
        )}
        
        {/* Feed Items */}
        {feed.map(item => (
          <div key={item.id} className="bg-white mb-4 border-b border-gray-200">
            {/* Post Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#FFD6CC] flex items-center justify-center">
                  <User size={20} className="text-[#FF6B6B]" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-[#4D4D4D]">{item.user}</p>
                  <p className="text-xs text-gray-500">{item.timestamp}</p>
                </div>
              </div>
            </div>

            {/* Post Text */}
            <div className="px-4 pb-2">
              <p className="text-[#4D4D4D]">{item.text}</p>
            </div>

            {/* Montessori Badge Indicators - No labels */}
            <div className="px-4 pb-4 flex flex-wrap gap-2">
              <div className="flex space-x-2">
                {item.badges.map((badge, index) => (
                  <MontessoriBadge key={index} type={badge} age={item.ages[index]} />
                ))}
              </div>
            </div>
            
            {/* Post Images - not displayed for simplicity as requested */}
          </div>
        ))}
      </div>

      {/* Voice Recording FAB */}
      {!isEditing && (
        <button 
          className="fixed right-4 bottom-20 w-14 h-14 rounded-full bg-[#FF6B6B] text-white flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-colors"
          onClick={handleVoiceRecording}
        >
          <Mic size={24} />
        </button>
      )}

      {/* Text Entry FAB */}
      {!isEditing && (
        <button 
          className="fixed right-4 bottom-36 w-14 h-14 rounded-full bg-[#40BFBF] text-white flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-colors"
          onClick={() => setIsEditing(true)}
        >
          <Plus size={24} />
        </button>
      )}

      {/* Voice Recording Modal */}
      {isRecording && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-11/12 max-w-md rounded-lg overflow-hidden">
            <div className="bg-[#FF6B6B] p-4 text-white flex justify-between items-center">
              <h3 className="font-medium">Voice Recording</h3>
              <button 
                onClick={() => setIsRecording(false)}
                className="text-white hover:text-gray-200"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-[#FF6B6B] bg-opacity-20 flex items-center justify-center animate-pulse">
                  <Mic size={32} className="text-[#FF6B6B]" />
                </div>
              </div>
              
              <div className="mb-4 bg-gray-50 p-3 rounded-lg min-h-[100px] border border-gray-200">
                <p className="text-gray-500">Listening... speak now</p>
              </div>
              
              <button 
                className="w-full bg-[#FF6B6B] text-white py-2 rounded-lg font-medium"
                onClick={() => setIsRecording(false)}
              >
                Stop Recording
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation - Mobile style with Coral Red theme */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#4D4D4D] flex justify-around py-3 px-4 shadow-lg">
        <button className="flex flex-col items-center">
          <Home size={20} className="text-[#FF6B6B]" />
          <span className="text-xs mt-1 text-white">Home</span>
        </button>
        <button 
          className="flex flex-col items-center text-gray-300"
          onClick={() => router.push('/fun')}
        >
          <Play size={20} />
          <span className="text-xs mt-1">Fun</span>
        </button>
        <button 
          className="flex flex-col items-center text-gray-300"
          onClick={() => router.push('/resources')}
        >
          <BookOpen size={20} />
          <span className="text-xs mt-1">Resources</span>
        </button>
      </div>
    </div>
  )
}

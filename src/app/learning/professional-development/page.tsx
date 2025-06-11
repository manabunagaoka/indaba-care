'use client';

import { useState, useEffect } from 'react';
import { Home, BookOpen, Play, Settings, ArrowLeft } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import UserMenu from '../../../components/UserMenu';

// Last updated by manabunagaoka: 2025-06-11 13:10:20

// Define Indaba Care color palette
const COLORS = {
  darkGray: "#4D4D4D",
  coralRed: "#FF6B6B",      // Messages
  brightTeal: "#40BFBF",    // Resources
  sunshineYellow: "#FFD166", // Learning
  hubPurple: "#9B59B6"      // Hub
};

export default function ProfessionalDevelopmentPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('learning');
  
  // Set initial active tab based on pathname
  useEffect(() => {
    if (pathname?.startsWith('/messages')) setActiveTab('messages');
    else if (pathname?.startsWith('/resources')) setActiveTab('resources');
    else if (pathname?.startsWith('/learning')) setActiveTab('learning');
    else if (pathname?.startsWith('/hub')) setActiveTab('hub');
  }, [pathname]);
  
  // Function to handle tab navigation with immediate feedback
  const navigateToTab = (tab) => {
    setActiveTab(tab); // Immediately update the active tab
    sessionStorage.setItem('majorTabSwitch', 'true');
    
    // Navigate to the appropriate route
    switch (tab) {
      case 'messages':
        router.push('/messages');
        break;
      case 'resources':
        router.push('/resources');
        break;
      case 'learning':
        router.push('/learning');
        break;
      case 'hub':
        router.push('/hub');
        break;
      default:
        break;
    }
  };
  
  // Handle back navigation to learning page
  const handleBackToLearning = () => {
    router.push('/learning');
  };
  
  const ProfessionalIcon = () => (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 15C15.866 15 19 11.866 19 8V0H5V8C5 11.866 8.13401 15 12 15Z" stroke="#9B59B6" strokeWidth="2"/>
      <path d="M19 4H21C21.5523 4 22 4.44772 22 5V7C22 9.76142 19.7614 12 17 12H12" stroke="#9B59B6" strokeWidth="2" strokeLinecap="round"/>
      <path d="M5 4H3C2.44772 4 2 4.44772 2 5V7C2 9.76142 4.23858 12 7 12H12" stroke="#9B59B6" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 15V17" stroke="#9B59B6" strokeWidth="2" strokeLinecap="round"/>
      <path d="M9 21H15" stroke="#9B59B6" strokeWidth="2" strokeLinecap="round"/>
      <path d="M9 17H15" stroke="#9B59B6" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  // Custom Navigation Bar Component
  const BottomNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-[#4D4D4D] flex w-full shadow-lg">
      {/* Messages Button */}
      <button 
        className="flex flex-col items-center justify-center flex-1 py-3"
        onClick={() => navigateToTab('messages')}
      >
        <Home 
          size={20} 
          style={{ color: activeTab === 'messages' ? COLORS.coralRed : '#d1d5db' }}
        />
        <span 
          style={{ color: activeTab === 'messages' ? 'white' : '#d1d5db' }}
          className="text-xs mt-1"
        >
          Messages
        </span>
      </button>
      
      {/* Resources Button */}
      <button 
        className="flex flex-col items-center justify-center flex-1 py-3"
        onClick={() => navigateToTab('resources')}
      >
        <Play 
          size={20}
          style={{ color: activeTab === 'resources' ? COLORS.brightTeal : '#d1d5db' }}
        />
        <span 
          style={{ color: activeTab === 'resources' ? 'white' : '#d1d5db' }}
          className="text-xs mt-1"
        >
          Resources
        </span>
      </button>
      
      {/* Learning Button */}
      <button 
        className="flex flex-col items-center justify-center flex-1 py-3"
        onClick={() => navigateToTab('learning')}
      >
        <BookOpen 
          size={20}
          style={{ color: activeTab === 'learning' ? COLORS.sunshineYellow : '#d1d5db' }}
        />
        <span 
          style={{ color: activeTab === 'learning' ? 'white' : '#d1d5db' }}
          className="text-xs mt-1"
        >
          Learning
        </span>
      </button>
      
      {/* Hub Button */}
      <button 
        className="flex flex-col items-center justify-center flex-1 py-3"
        onClick={() => navigateToTab('hub')}
      >
        <Settings 
          size={20} 
          style={{ color: activeTab === 'hub' ? COLORS.hubPurple : '#d1d5db' }}
        />
        <span 
          style={{ color: activeTab === 'hub' ? 'white' : '#d1d5db' }}
          className="text-xs mt-1"
        >
          Hub
        </span>
      </button>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header with logo and user */}
      <div className="bg-white p-4 flex justify-between items-center shadow-sm border-b border-[#FFD166]">
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
        <UserMenu />
      </div>
      
      {/* Page Header with Back Button */}
      <div className="bg-white p-4 border-b flex items-center">
        <button 
          onClick={handleBackToLearning}
          className="mr-2 text-gray-500 hover:text-[#4D4D4D] transition-colors"
          aria-label="Back to learning resources"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-[#4D4D4D]">Professional Development</h1>
      </div>
      
      {/* Coming Soon Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-r from-[#9B59B6] to-[#D2B4DE]">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <ProfessionalIcon />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-[#4D4D4D]">Professional Development</h2>
          <p className="text-gray-600 mb-6">
            Enhance your skills as a childcare provider with professional guidelines, communication strategies, and career advancement tools.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-[#4D4D4D]">
              This module is currently in development. Check back soon for updates!
            </p>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
}
'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import UserMenu from '../../../components/UserMenu';

// Last updated by manabunagaoka: 2025-06-11 13:00:55
export default function EarthStewardshipPage() {
  const router = useRouter();
  
  // Simplified back handler - our layout now detects direction automatically
  const handleBack = () => {
    router.push('/learning');
  };
  
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
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
          onClick={handleBack} 
          className="mr-3 text-gray-500 hover:text-[#4D4D4D]"
          aria-label="Back to learning resources"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-[#4D4D4D]">Earth Stewardship</h1>
      </div>
      
      {/* Course content */}
      <div className="flex-1 overflow-auto p-4 bg-gradient-to-r from-[#40BFBF] to-[#ABEBC6] bg-opacity-10">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <div className="rounded-full bg-[#40BFBF20] p-3 mr-4">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#40BFBF" strokeWidth="2"/>
                <path d="M12 2C13.3132 3.90042 14 6.36521 14 9C14 11.6348 13.3132 14.0996 12 16M12 2C10.6868 3.90042 10 6.36521 10 9C10 11.6348 10.6868 14.0996 12 16M12 2C6.47715 2 2 6.47715 2 12M12 2C17.5228 2 22 6.47715 22 12M12 16C6.47715 16 2 19.5 2 12M12 16C17.5228 16 22 19.5 22 12M2 12H22" stroke="#40BFBF" strokeWidth="2"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#4D4D4D]">Earth Stewardship</h2>
          </div>
          
          <p className="text-gray-700 mb-6">
            Guide children to develop a meaningful connection with nature and learn sustainable practices through hands-on activities. This course covers environmental awareness, gardening with children, and incorporating nature into daily routines.
          </p>
          
          <div className="bg-[#40BFBF10] p-4 rounded-lg mb-6">
            <h3 className="font-medium text-lg mb-2 text-[#40BFBF]">Course Overview</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Introduction to Earth Stewardship</li>
              <li>Gardening with Children</li>
              <li>Nature-Based Activities</li>
              <li>Sustainable Practices at Home</li>
            </ul>
          </div>
          
          <div className="flex justify-center">
            <button className="bg-[#40BFBF] text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors">
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
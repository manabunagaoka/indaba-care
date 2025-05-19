'use client';

import { useState } from 'react';
import { ArrowLeft, User, Home, BookOpen, Play, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ComingSoonPage({
  title,
  description,
  icon,
  gradientClass
}) {
  const router = useRouter();
  const currentUser = 'manabunagaoka';
  const currentTime = '2025-05-19 13:33:28';
  
  const handleBackToResourcesCatalog = () => {
    // Store that we're going back for the animation
    sessionStorage.setItem('resourceNavDirection', 'left-to-right');
    router.push('/resources');
  };

  return (
    <div className="slide-in-right">
      <div className="flex flex-col h-screen bg-gray-50">
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
          <div className="flex items-center">
            <User size={20} className="mr-2 text-[#4D4D4D]" />
            <span className="text-[#4D4D4D]">{currentUser}</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-white p-4 border-b flex items-center">
          <button
            onClick={handleBackToResourcesCatalog}
            className="mr-2 text-gray-500 hover:text-[#4D4D4D] transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-[#4D4D4D]">{title}</h1>
        </div>

        {/* Coming Soon Content - Made scrollable */}
        <div className="flex-1 overflow-auto p-4">
          <div className="max-w-md w-full mx-auto py-4">
            <div className={`${gradientClass} p-6 rounded-2xl shadow-md flex flex-col items-center text-center mb-8`}>
              <div className="bg-white rounded-full p-4 w-24 h-24 flex items-center justify-center mb-6 shadow-md">
                {icon}
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">Coming Soon</h2>
              <p className="text-white opacity-90 mb-6">{description}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h3 className="font-medium text-lg text-[#4D4D4D] mb-4">What to expect in this module:</h3>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="bg-gray-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <Clock size={16} className="text-[#4D4D4D]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#4D4D4D]">Comprehensive Curriculum</h4>
                    <p className="text-sm text-gray-600">We're developing in-depth content with expert contributors for this topic.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-gray-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <Clock size={16} className="text-[#4D4D4D]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#4D4D4D]">Interactive Learning</h4>
                    <p className="text-sm text-gray-600">Practical activities and engaging multimedia content to enhance your learning experience.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-gray-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <Clock size={16} className="text-[#4D4D4D]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#4D4D4D]">Downloadable Resources</h4>
                    <p className="text-sm text-gray-600">Templates, guides, and references you can use in your daily practice.</p>
                  </div>
                </li>
              </ul>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-700">Would you like to receive a notification when this module is available?</p>
                <div className="mt-3">
                  <button className="w-full bg-[#FFD166] text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors">
                    Notify Me
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#4D4D4D] flex justify-around py-3 px-4 shadow-lg">
          <button 
            className="flex flex-col items-center text-gray-300"
            onClick={() => {
              sessionStorage.setItem('majorTabSwitch', 'true');
              router.push('/home');
            }}
          >
            <Home size={20} />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button 
            className="flex flex-col items-center text-gray-300"
            onClick={() => {
              sessionStorage.setItem('majorTabSwitch', 'true');
              router.push('/fun');
            }}
          >
            <Play size={20} />
            <span className="text-xs mt-1">Fun</span>
          </button>
          <button 
            className="flex flex-col items-center"
            onClick={() => router.push('/resources')}
          >
            <BookOpen size={20} className="text-[#FFD166]" />
            <span className="text-xs mt-1 text-white">Resources</span>
          </button>
        </div>
      </div>
    </div>
  );
}

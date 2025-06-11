'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CourseCard } from '../../components/CourseCard';
import UserMenu from '../../components/UserMenu';

export default function LearningPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleCardClick = (path: string) => {
    // Store the navigation direction before navigating
    localStorage.setItem('pageTransitionDirection', 'forward');
    router.push(path);
  };

  // Original complete courses array with all 7 courses
  const courses = [
    {
      id: 'montessori',
      title: 'Montessori Developmental Milestones',
      description: 'Learn about child development through the Montessori lens with comprehensive milestone categories and practical implementation guides.',
      bgColor: 'bg-gradient-to-r from-[#4D4D4D] to-[#757575]',
      lessonCount: 7,
      isPremium: true,
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 2V22" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 7L21 17" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 7L3 17" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'nutrition',
      title: 'Nutrition & Meal Preparation',
      description: 'Practical guidance for preparing nutritious, age-appropriate meals and fostering healthy eating habits in children.',
      bgColor: 'bg-gradient-to-r from-[#FF6B6B] to-[#FFBCAB]',
      lessonCount: 5,
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 8H19C20.1046 8 21 8.89543 21 10V21M18 8H6M18 8V21M6 8H5C3.89543 8 3 8.89543 3 10V21M6 8V21M3 21H21M6 21H18" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8V6M12 6V4M12 6H9M12 6H15" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'earth-stewardship',
      title: 'Earth Stewardship',
      description: 'Guide children to develop a meaningful connection with nature and learn sustainable practices through hands-on activities.',
      bgColor: 'bg-gradient-to-r from-[#40BFBF] to-[#ABEBC6]',
      lessonCount: 4,
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#40BFBF" strokeWidth="2"/>
          <path d="M12 2C13.3132 3.90042 14 6.36521 14 9C14 11.6348 13.3132 14.0996 12 16M12 2C10.6868 3.90042 10 6.36521 10 9C10 11.6348 10.6868 14.0996 12 16M12 2C6.47715 2 2 6.47715 2 12M12 2C17.5228 2 22 6.47715 22 12M12 16C6.47715 16 2 19.5 2 12M12 16C17.5228 16 22 19.5 22 12M2 12H22" stroke="#40BFBF" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 'professional-development',
      title: 'Nanny Professional Development',
      description: 'Enhance your skills as a childcare provider with professional guidelines, communication strategies, and career advancement tools.',
      bgColor: 'bg-gradient-to-r from-[#9B59B6] to-[#D2B4DE]',
      lessonCount: 6,
      isPremium: true,
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15C15.866 15 19 11.866 19 8V0H5V8C5 11.866 8.13401 15 12 15Z" stroke="#9B59B6" strokeWidth="2"/>
          <path d="M19 4H21C21.5523 4 22 4.44772 22 5V7C22 9.76142 19.7614 12 17 12H12" stroke="#9B59B6" strokeWidth="2" strokeLinecap="round"/>
          <path d="M5 4H3C2.44772 4 2 4.44772 2 5V7C2 9.76142 4.23858 12 7 12H12" stroke="#9B59B6" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 15V17" stroke="#9B59B6" strokeWidth="2" strokeLinecap="round"/>
          <path d="M9 21H15" stroke="#9B59B6" strokeWidth="2" strokeLinecap="round"/>
          <path d="M9 17H15" stroke="#9B59B6" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: 'sleep-toileting',
      title: 'Sleep & Toileting Guide',
      description: 'Evidence-based approaches for supporting healthy sleep habits and developmentally appropriate toileting independence.',
      bgColor: 'bg-gradient-to-r from-[#D99B9B] to-[#FFD6CC]',
      lessonCount: 3,
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 11H21M3 11C3 15.4183 6.58172 19 11 19H13C17.4183 19 21 15.4183 21 11M3 11V9C3 7.89543 3.89543 7 5 7H19C20.1046 7 21 7.89543 21 9V11" stroke="#D99B9B" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 19V22" stroke="#D99B9B" strokeWidth="2" strokeLinecap="round"/>
          <path d="M8 22H16" stroke="#D99B9B" strokeWidth="2" strokeLinecap="round"/>
          <path d="M18 2L14 6" stroke="#D99B9B" strokeWidth="2" strokeLinecap="round"/>
          <path d="M2 6H8" stroke="#D99B9B" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: 'time-management',
      title: 'Time Management for Caregivers',
      description: 'Strategies to effectively balance childcare responsibilities, household management, and personal well-being.',
      bgColor: 'bg-gradient-to-r from-[#FFD166] to-[#FFBCAB]',
      lessonCount: 4,
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#FFD166" strokeWidth="2"/>
          <path d="M12 6V12L16 14" stroke="#FFD166" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'observation',
      title: 'Observation Workshop',
      description: 'Learn to observe children objectively, document development, and use observations to support individual growth.',
      bgColor: 'bg-gradient-to-r from-[#40BFBF] to-[#D6EAF8]',
      lessonCount: 3,
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" stroke="#40BFBF" strokeWidth="2"/>
          <path d="M20.188 10.9343C20.5762 11.4056 20.7703 11.6412 20.7703 12C20.7703 12.3588 20.5762 12.5944 20.188 13.0657C18.7679 14.7899 15.6357 18 12 18C8.36427 18 5.23206 14.7899 3.81197 13.0657C3.42381 12.5944 3.22973 12.3588 3.22973 12C3.22973 11.6412 3.42381 11.4056 3.81197 10.9343C5.23206 9.21014 8.36427 6 12 6C15.6357 6 18.7679 9.21014 20.188 10.9343Z" stroke="#40BFBF" strokeWidth="2"/>
        </svg>
      )
    }
  ];

  // Filter courses based on search term
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
        <UserMenu />
      </div>

      {/* Page Header with Search */}
      <div className="bg-white p-4 border-b flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#4D4D4D]">Learning Resources</h1>
        
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full py-1.5 pl-8 pr-3 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FFD166] text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-2.5 top-2 text-gray-400" size={16} />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="flex-1 overflow-auto pb-20 px-4 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course) => (
            <div key={course.id}>
              <CourseCard
                title={course.title}
                description={course.description}
                icon={course.icon}
                bgColor={course.bgColor}
                href={`/learning/${course.id}`}
                lessonCount={course.lessonCount}
                isPremium={course.isPremium}
                onClick={() => handleCardClick(`/learning/${course.id}`)}
              />
            </div>
          ))}
        </div>
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No courses found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
      
      {/* Bottom navigation removed as it's now in a layout component */}
    </div>
  );
}
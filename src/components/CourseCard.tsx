'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Star } from 'lucide-react';

interface CourseCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  href: string;
  lessonCount: number;
  isPremium?: boolean;
  onClick?: () => void;
}

export const CourseCard = ({
  title,
  description,
  icon,
  bgColor,
  href,
  lessonCount,
  isPremium = false,
  onClick
}: CourseCardProps) => {
  // If onClick is provided, use a div instead of Link
  if (onClick) {
    return (
      <div 
        className={`rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer`}
        onClick={onClick}
      >
        <div className={`${bgColor} p-5 flex justify-between items-start`}>
          <div className="bg-white rounded-full p-2">
            {icon}
          </div>
          
          {isPremium && (
            <div className="bg-white text-[#F5B041] rounded-full p-1 flex items-center text-xs">
              <Star size={14} className="mr-1 fill-[#F5B041] text-[#F5B041]" />
              Premium
            </div>
          )}
        </div>
        
        <div className="p-4 bg-white">
          <h3 className="font-semibold text-[#4D4D4D] mb-2">{title}</h3>
          <p className="text-gray-500 text-sm mb-3 line-clamp-2">{description}</p>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">{lessonCount} lessons</span>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
        </div>
      </div>
    );
  }
  
  // Default behavior with Link
  return (
    <Link href={href} passHref>
      <div className={`rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer`}>
        <div className={`${bgColor} p-5 flex justify-between items-start`}>
          <div className="bg-white rounded-full p-2">
            {icon}
          </div>
          
          {isPremium && (
            <div className="bg-white text-[#F5B041] rounded-full p-1 flex items-center text-xs">
              <Star size={14} className="mr-1 fill-[#F5B041] text-[#F5B041]" />
              Premium
            </div>
          )}
        </div>
        
        <div className="p-4 bg-white">
          <h3 className="font-semibold text-[#4D4D4D] mb-2">{title}</h3>
          <p className="text-gray-500 text-sm mb-3 line-clamp-2">{description}</p>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">{lessonCount} lessons</span>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
        </div>
      </div>
    </Link>
  );
};
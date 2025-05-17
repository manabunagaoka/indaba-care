import Link from 'next/link';
import { ReactNode } from 'react';

type CourseCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  bgColor: string;
  href: string;
  lessonCount: number;
  isPremium?: boolean;
};

export const CourseCard = ({
  title,
  description,
  icon,
  bgColor,
  href,
  lessonCount,
  isPremium = false
}: CourseCardProps) => {
  return (
    <Link href={href} className="block h-full">
      <div className={`h-full rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-md ${isPremium ? 'border-l-4 border-l-[#FFD166]' : ''}`}>
        <div className={`${bgColor} p-6 flex items-start`}>
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 shadow-sm">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white mb-1">{title}</h3>
            <p className="text-sm text-white/80 line-clamp-2">{description}</p>
          </div>
        </div>
        <div className="p-4 bg-white flex justify-between items-center">
          <span className="text-sm text-gray-500">{lessonCount} lessons</span>
          {isPremium && (
            <span className="text-xs bg-[#FFD166] text-[#4D4D4D] px-2 py-1 rounded-full font-medium">
              Premium
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
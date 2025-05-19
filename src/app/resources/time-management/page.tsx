'use client';

import ComingSoonPage from '../coming-soon-template';

export default function TimeManagementPage() {
  const TimeIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#FFD166" strokeWidth="2"/>
      <path d="M12 6V12L16 14" stroke="#FFD166" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <ComingSoonPage 
      title="Time Management for Caregivers" 
      description="Strategies to effectively balance childcare responsibilities, household management, and personal well-being."
      icon={<TimeIcon />}
      gradientClass="bg-gradient-to-r from-[#FFD166] to-[#FFBCAB]"
    />
  );
}

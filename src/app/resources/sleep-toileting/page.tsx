'use client';

import ComingSoonPage from '../coming-soon-template';

export default function SleepToiletingPage() {
  const SleepIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 11H21M3 11C3 15.4183 6.58172 19 11 19H13C17.4183 19 21 15.4183 21 11M3 11V9C3 7.89543 3.89543 7 5 7H19C20.1046 7 21 7.89543 21 9V11" stroke="#D99B9B" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 19V22" stroke="#D99B9B" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 22H16" stroke="#D99B9B" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 2L14 6" stroke="#D99B9B" strokeWidth="2" strokeLinecap="round"/>
      <path d="M2 6H8" stroke="#D99B9B" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  return (
    <ComingSoonPage 
      title="Sleep & Toileting Guide" 
      description="Evidence-based approaches for supporting healthy sleep habits and developmentally appropriate toileting independence."
      icon={<SleepIcon />}
      gradientClass="bg-gradient-to-r from-[#D99B9B] to-[#FFD6CC]"
    />
  );
}

'use client';

import ComingSoonPage from '../coming-soon-template';

export default function ProfessionalDevelopmentPage() {
  const ProfessionalIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 15C15.866 15 19 11.866 19 8V0H5V8C5 11.866 8.13401 15 12 15Z" stroke="#9B59B6" strokeWidth="2"/>
      <path d="M19 4H21C21.5523 4 22 4.44772 22 5V7C22 9.76142 19.7614 12 17 12H12" stroke="#9B59B6" strokeWidth="2" strokeLinecap="round"/>
      <path d="M5 4H3C2.44772 4 2 4.44772 2 5V7C2 9.76142 4.23858 12 7 12H12" stroke="#9B59B6" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 15V17" stroke="#9B59B6" strokeWidth="2" strokeLinecap="round"/>
      <path d="M9 21H15" stroke="#9B59B6" strokeWidth="2" strokeLinecap="round"/>
      <path d="M9 17H15" stroke="#9B59B6" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  return (
    <ComingSoonPage 
      title="Professional Development" 
      description="Enhance your skills as a childcare provider with professional guidelines, communication strategies, and career advancement tools."
      icon={<ProfessionalIcon />}
      gradientClass="bg-gradient-to-r from-[#9B59B6] to-[#D2B4DE]"
    />
  );
}

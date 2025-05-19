'use client';

import ComingSoonPage from '../coming-soon-template';

export default function EarthStewardshipPage() {
  const EarthIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#40BFBF" strokeWidth="2"/>
      <path d="M12 2C13.3132 3.90042 14 6.36521 14 9C14 11.6348 13.3132 14.0996 12 16M12 2C10.6868 3.90042 10 6.36521 10 9C10 11.6348 10.6868 14.0996 12 16M12 2C6.47715 2 2 6.47715 2 12M12 2C17.5228 2 22 6.47715 22 12M12 16C6.47715 16 2 19.5 2 12M12 16C17.5228 16 22 19.5 22 12M2 12H22" stroke="#40BFBF" strokeWidth="2"/>
    </svg>
  );

  return (
    <ComingSoonPage 
      title="Earth Stewardship" 
      description="A comprehensive guide to helping children develop a meaningful connection with nature through sustainable practices and outdoor exploration."
      icon={<EarthIcon />}
      gradientClass="bg-gradient-to-r from-[#40BFBF] to-[#ABEBC6]"
    />
  );
}

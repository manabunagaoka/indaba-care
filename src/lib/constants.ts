// Montessori areas of development
export const MONTESSORI_AREAS = [
  { id: 'practical', name: 'Practical Life', color: 'emerald' },
  { id: 'sensorial', name: 'Sensorial', color: 'yellow' },
  { id: 'language', name: 'Language', color: 'teal' },
  { id: 'math', name: 'Mathematics', color: 'mauve' },
  { id: 'cultural', name: 'Cultural', color: 'coral' }
];

// Color mapping helper
export const getColorClass = (area: string, element: string): string => {
  const colorMap: Record<string, Record<string, string>> = {
    practical: {
      bg: 'bg-emerald-100',
      text: 'text-[#4D4D4D]',
      border: 'border-emerald-200',
      hover: 'hover:bg-emerald-200'
    },
    sensorial: {
      bg: 'bg-[#FFD166] bg-opacity-20', 
      text: 'text-[#4D4D4D]',
      border: 'border-[#FFD166]',
      hover: 'hover:bg-[#FFD166] hover:bg-opacity-30'
    },
    language: {
      bg: 'bg-[#40BFBF] bg-opacity-20',
      text: 'text-[#4D4D4D]',
      border: 'border-[#40BFBF]',
      hover: 'hover:bg-[#40BFBF] hover:bg-opacity-30'
    },
    math: {
      bg: 'bg-[#D99B9B] bg-opacity-20',
      text: 'text-[#4D4D4D]',
      border: 'border-[#D99B9B]',
      hover: 'hover:bg-[#D99B9B] hover:bg-opacity-30'
    },
    cultural: {
      bg: 'bg-[#FF6B6B] bg-opacity-20',
      text: 'text-[#4D4D4D]',
      border: 'border-[#FF6B6B]',
      hover: 'hover:bg-[#FF6B6B] hover:bg-opacity-30'
    }
  };

  return colorMap[area]?.[element] || colorMap.practical[element];
};

// Sample data items for demonstration
export const recentMilestones = [
  {
    id: 1,
    icon: "🧸",
    name: "Today's Highlights",
    message: "Emma took her first steps today! Click to see the milestone moment",
    areas: ['practical'],
    areaName: "Practical Life",
    timestamp: "2025-05-15 22:00:29",
    user: "manabunagaoka"
  },
  {
    id: 2,
    icon: "🍎",
    name: "Nutrition Updates",
    message: "Lucas tried avocado today and enjoyed it mixed with banana",
    areas: ['practical'],
    areaName: "Practical Life",
    timestamp: "2025-05-15 20:30:12",
    user: "manabunagaoka"
  },
  {
    id: 3,
    icon: "📝",
    name: "Learning Activities",
    message: "Color sorting activity - Sophia can now identify red, blue and yellow",
    areas: ['sensorial', 'language'],
    areaName: "Sensorial & Language",
    timestamp: "2025-05-15 18:45:33",
    user: "manabunagaoka"
  }
];

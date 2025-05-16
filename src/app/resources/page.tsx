"use client"

import { useState } from 'react'
import { Home, BookOpen, Play, Search, User, ChevronDown, ChevronUp } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Badge component for Montessori areas
const MontessoriBadge = ({ type, title, description, age, isExpanded, onToggle }) => {
  const backgrounds = {
    'practical-life': 'bg-gradient-to-r from-[#FF6B6B] to-[#FFBCAB]',
    'sensorial': 'bg-gradient-to-r from-[#FFD166] to-[#FFBCAB]',
    'language': 'bg-gradient-to-r from-[#40BFBF] to-[#D6EAF8]',
    'mathematics': 'bg-gradient-to-r from-[#D99B9B] to-[#FFD6CC]',
    'cultural': 'bg-gradient-to-r from-[#9B59B6] to-[#D2B4DE]',
    'social-emotional': 'bg-gradient-to-r from-[#40BFBF] to-[#ABEBC6]',
    'physical': 'bg-gradient-to-r from-[#FF6B6B] to-[#F8C471]'
  };

  const images = {
    'practical-life': '/images/practical_life_skills.jpg',
    'sensorial': '/images/sensorial_development.jpg',
    'language': '/images/language_development.jpg',
    'mathematics': '/images/mathematics_development.jpg',
    'cultural': '/images/cultural_studies.jpg',
    'social-emotional': '/images/social_emotional_development.jpg',
    'physical': '/images/physical_development.jpg',
  };

  const icons = {
    'practical-life': (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 5L17 7M17 7L19 9M17 7L19 5M17 7L15 9" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8.5 9C8.5 7.6 7.4 6.5 6 6.5C4.6 6.5 3.5 7.6 3.5 9C3.5 10.4 4.6 11.5 6 11.5H8.5V9Z" stroke="#FF6B6B" strokeWidth="2"/>
        <path d="M8.5 9C8.5 7.6 9.6 6.5 11 6.5C12.4 6.5 13.5 7.6 13.5 9C13.5 10.4 12.4 11.5 11 11.5H8.5V9Z" stroke="#FF6B6B" strokeWidth="2"/>
        <path d="M8.5 14.5C8.5 13.1 7.4 12 6 12C4.6 12 3.5 13.1 3.5 14.5C3.5 15.9 4.6 17 6 17H8.5V14.5Z" stroke="#FF6B6B" strokeWidth="2"/>
        <path d="M8.5 14.5C8.5 13.1 9.6 12 11 12C12.4 12 13.5 13.1 13.5 14.5C13.5 15.9 12.4 17 11 17H8.5V14.5Z" stroke="#FF6B6B" strokeWidth="2"/>
        <path d="M13.5 14.5C13.5 13.1 14.6 12 16 12C17.4 12 18.5 13.1 18.5 14.5C18.5 15.9 17.4 17 16 17H13.5V14.5Z" stroke="#FF6B6B" strokeWidth="2"/>
      </svg>
    ),
    'sensorial': (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19" stroke="#FFD166" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 12H19" stroke="#FFD166" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="#FFD166"/>
        <circle cx="12" cy="19" r="2" fill="#FFD166"/>
        <circle cx="12" cy="5" r="2" fill="#FFD166"/>
        <circle cx="19" cy="12" r="2" fill="#FFD166"/>
        <circle cx="5" cy="12" r="2" fill="#FFD166"/>
      </svg>
    ),
    'language': (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 9H16M8 13H14M8 17H11" stroke="#40BFBF" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7 5H17C18.1046 5 19 5.89543 19 7V17C19 18.1046 18.1046 19 17 19H7C5.89543 19 5 18.1046 5 17V7C5 5.89543 5.89543 5 7 5Z" stroke="#40BFBF" strokeWidth="2"/>
      </svg>
    ),
    'mathematics': (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 9H19" stroke="#D99B9B" strokeWidth="2" strokeLinecap="round"/>
        <path d="M5 15H19" stroke="#D99B9B" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 5L9 19" stroke="#D99B9B" strokeWidth="2" strokeLinecap="round"/>
        <path d="M15 5L15 19" stroke="#D99B9B" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    'cultural': (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" stroke="#9B59B6" strokeWidth="2"/>
        <path d="M12 4C12 4 16 8 16 12C16 16 12 20 12 20C12 20 8 16 8 12C8 8 12 4 12 4Z" stroke="#9B59B6" strokeWidth="2"/>
        <path d="M4 12H20" stroke="#9B59B6" strokeWidth="2"/>
      </svg>
    ),
    'social-emotional': (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16C16 16 16 8 16 8H8C8 8 8 16 12 16Z" stroke="#40BFBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 11C10 12 11 12 12 11" stroke="#40BFBF" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="10" cy="9" r="1" fill="#40BFBF"/>
        <circle cx="14" cy="9" r="1" fill="#40BFBF"/>
        <circle cx="12" cy="12" r="9" stroke="#40BFBF" strokeWidth="2"/>
      </svg>
    ),
    'physical': (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="12" r="2" stroke="#FF6B6B" strokeWidth="2"/>
        <path d="M13 6L15 7L13 8" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 16L15 17L13 18" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 14V17C8 18.1046 8.89543 19 10 19H18C19.1046 19 20 18.1046 20 17V7C20 5.89543 19.1046 5 18 5H10C8.89543 5 8 5.89543 8 7V10" stroke="#FF6B6B" strokeWidth="2"/>
      </svg>
    )
  };

  const content = {
    'practical-life': {
      explanation: "Practical Life activities help children develop independence, concentration, coordination, and a sense of order. These activities prepare children for future learning by building fine motor skills, sequencing abilities, and confidence in handling everyday tasks.",
      milestones: [
        "<strong>1-2 years:</strong> Shows interest in self-care, helps with dressing, assists in simple cleanup",
        "<strong>2-3 years:</strong> Washes hands independently, carries objects carefully, sorts items",
        "<strong>3-4 years:</strong> Completes dressing independently, prepares simple snacks, cleans up after activities",
        "<strong>4-5 years:</strong> Manages bathroom needs independently, pours liquids without spilling, displays table manners",
        "<strong>5-6 years:</strong> Prepares simple meals, organizes personal belongings, manages time for tasks"
      ]
    },
    'sensorial': {
      explanation: "Sensorial activities help children develop, refine, and classify sensory impressions. Through exploration of specially designed materials, children learn to distinguish differences in dimension, color, sound, texture, smell, and taste, creating a foundation for more complex learning.",
      milestones: [
        "<strong>0-1 year:</strong> Responds to sensory stimulation, follows moving objects, explores objects with mouth",
        "<strong>1-2 years:</strong> Matches identical objects, explores different textures, responds to musical sounds",
        "<strong>2-3 years:</strong> Sorts by single attribute (size, color), identifies basic shapes, recognizes contrasting sounds",
        "<strong>3-4 years:</strong> Grades objects by size, recognizes variations in color shades, discriminates similar sounds",
        "<strong>4-6 years:</strong> Detects subtle sensorial differences, combines multiple sensory inputs, describes sensory experiences verbally"
      ]
    },
    'language': {
      explanation: "Language development in Montessori encompasses listening, speaking, writing, and reading. Montessori language activities begin with enriching vocabulary and communication, then progress to phonetics, word building, and eventually reading and written expression.",
      milestones: [
        "<strong>0-1 year:</strong> Responds to voice, babbles, recognizes familiar names, shows interest in books",
        "<strong>1-2 years:</strong> Uses 10-50+ words, follows simple directions, identifies pictures in books",
        "<strong>2-3 years:</strong> Speaks in simple sentences, listens to stories, understands picture sequences",
        "<strong>3-4 years:</strong> Recognizes letter sounds, traces sandpaper letters, builds vocabulary rapidly",
        "<strong>4-5 years:</strong> Begins word building with movable alphabet, recognizes simple words, writes letters",
        "<strong>5-6 years:</strong> Reads simple books, writes phrases and sentences, expresses ideas in writing"
      ]
    },
    'mathematics': {
      explanation: "Montessori mathematics moves from concrete to abstract, using specialized materials that help children visualize mathematical concepts. Beginning with quantity recognition, children progress to symbol association, operations, and eventually abstract mathematical thinking.",
      milestones: [
        "<strong>2-3 years:</strong> Counts orally to 10, recognizes quantities 1-3, sorts by basic attributes",
        "<strong>3-4 years:</strong> Counts objects with one-to-one correspondence, recognizes numerals 1-10, understands sequence",
        "<strong>4-5 years:</strong> Forms numbers with beads, understands place value, performs simple addition with manipulatives",
        "<strong>5-6 years:</strong> Works with decimal system, understands operations, explores geometry and measurement"
      ]
    },
    'cultural': {
      explanation: "Cultural studies in Montessori introduce children to the wider world beyond themselves. This area encompasses geography, science, history, art, and music, helping children develop an understanding and appreciation of their place in the universe and human culture.",
      milestones: [
        "<strong>3-4 years:</strong> Shows interest in natural world, identifies land and water forms, participates in art and music",
        "<strong>4-5 years:</strong> Names continents, observes scientific phenomena, creates art with purpose",
        "<strong>5-6 years:</strong> Recognizes countries and cultures, conducts simple experiments, understands basic time concepts"
      ]
    },
    'social-emotional': {
      explanation: "Social-emotional development focuses on how children understand their own feelings and those of others. This area includes developing independence, self-regulation, grace and courtesy, cooperation, and conflict resolution skills, laying the foundation for emotional intelligence.",
      milestones: [
        "<strong>0-1 year:</strong> Forms secure attachments, expresses basic emotions, responds to others' emotions",
        "<strong>1-2 years:</strong> Shows independence in simple tasks, engages in parallel play, displays empathy",
        "<strong>2-3 years:</strong> Follows classroom ground rules, takes turns, uses words to express feelings",
        "<strong>3-4 years:</strong> Works independently, develops friendships, resolves minor conflicts with guidance",
        "<strong>4-5 years:</strong> Demonstrates self-regulation, shows empathy, cooperates in group activities",
        "<strong>5-6 years:</strong> Resolves conflicts independently, respects others' space and work, shows leadership"
      ]
    },
    'physical': {
      explanation: "Physical development encompasses both gross and fine motor skills. In Montessori education, movement is considered essential not just for physical health but for cognitive development. Activities are designed to refine coordination, balance, spatial awareness, and motor planning.",
      milestones: [
        "<strong>0-1 year:</strong> Develops head control, sits independently, crawls, pulls to stand, reaches for objects",
        "<strong>1-2 years:</strong> Walks independently, climbs stairs, uses pincer grasp, manipulates simple tools",
        "<strong>2-3 years:</strong> Jumps with both feet, pedals tricycle, strings large beads, uses scissors",
        "<strong>3-4 years:</strong> Balances on one foot, throws and catches a ball, holds pencil with tripod grip",
        "<strong>4-5 years:</strong> Skips, hops on one foot, cuts along a line, traces shapes, ties shoes",
        "<strong>5-6 years:</strong> Coordinates complex movements, shows refined handwriting, masters physical challenges"
      ]
    },
  };

  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm mb-4 border border-gray-100">
      <div 
        className="flex items-center p-4 cursor-pointer justify-between"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <div className={`w-16 h-16 ${backgrounds[type]} rounded-full flex items-center justify-center mr-4 relative flex-shrink-0`}>
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              {icons[type]}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#4D4D4D] text-white flex items-center justify-center text-xs font-bold border border-white">
              {age}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-[#4D4D4D]">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        {isExpanded ? 
          <ChevronUp size={20} className="text-gray-400" /> : 
          <ChevronDown size={20} className="text-gray-400" />
        }
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4">
          {/* Image Section - Updated with 3:2 aspect ratio container */}
          <div className="mb-4 rounded-lg overflow-hidden">
            <div className="relative w-full aspect-[3/2]">
              <img 
                src={images[type]} 
                alt={`${title} development`}
                className="absolute inset-0 w-full h-full object-cover object-center"
                onError={(e) => {
                  console.error(`Failed to load image: ${images[type]}`);
                  e.currentTarget.src = "/api/placeholder/600/400";
                }}
              />
            </div>
          </div>
          
          <p className="text-[#4D4D4D] mb-4 text-sm leading-relaxed">
            {content[type].explanation}
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-[#4D4D4D] mb-2">Key Milestones by Age:</h4>
            <ul className="list-none pl-0 space-y-2">
              {content[type].milestones.map((milestone, index) => (
                <li key={index} className="text-sm text-gray-600 pl-4 relative">
                  <span className="absolute left-0 top-1 text-[#FF6B6B]">•</span>
                  <span dangerouslySetInnerHTML={{ __html: milestone }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState('sensorial');
  const router = useRouter();
  const currentUser = 'manabunagaoka';
  const currentTime = '2025-05-16 02:25:03';

  const toggleCategory = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory('');
    } else {
      setExpandedCategory(category);
    }
  };

  // Montessori developmental areas
  const developmentalAreas = [
    { type: 'sensorial', title: 'Sensorial', description: 'Developing and refining the five senses', age: '0+' },
    { type: 'language', title: 'Language', description: 'Communication, vocabulary, reading and writing', age: '0+' },
    { type: 'social-emotional', title: 'Social-Emotional', description: 'Independence, self-regulation and social skills', age: '0+' },
    { type: 'physical', title: 'Physical Development', description: 'Gross motor, fine motor and movement skills', age: '0+' },
    { type: 'practical-life', title: 'Practical Life', description: 'Self-care, environment care, and everyday skills', age: '1+' },
    { type: 'mathematics', title: 'Mathematics', description: 'Numeracy, operations, and mathematical concepts', age: '2+' },
    { type: 'cultural', title: 'Cultural Studies', description: 'Geography, science, history, art and music', age: '3+' }
  ];
  
  // Filter based on search term
  const filteredAreas = developmentalAreas.filter(area => 
    area.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header - White with subtle Yellow accents */}
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
      <div className="bg-white p-4 text-center border-b">
        <h1 className="text-xl font-bold text-[#4D4D4D]">Montessori Developmental Milestones</h1>
        <p className="text-sm text-gray-600 mt-1 px-4">
          Track your child's development through the Montessori lens with our comprehensive milestone categories.
        </p>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-white border-b">
        <div className="relative">
          <input
            type="text"
            placeholder="Search developmental areas..."
            className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FFD166]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Developmental Areas */}
      <div className="flex-1 overflow-auto pb-20 px-4 pt-4">
        {filteredAreas.map(area => (
          <MontessoriBadge
            key={area.type}
            type={area.type}
            title={area.title}
            description={area.description}
            age={area.age}
            isExpanded={expandedCategory === area.type}
            onToggle={() => toggleCategory(area.type)}
          />
        ))}
        
        <div className="text-center text-xs text-gray-500 mt-4 mb-8">
          Remember that each child develops at their own pace. These milestones serve as guides rather than rigid expectations.
        </div>
      </div>

      {/* Fixed Bottom Navigation - Mobile style with Yellow accent for Resources */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#4D4D4D] flex justify-around py-3 px-4 shadow-lg">
        <button 
          className="flex flex-col items-center text-gray-300"
          onClick={() => router.push('/home')}
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button 
          className="flex flex-col items-center text-gray-300"
          onClick={() => router.push('/fun')}
        >
          <Play size={20} />
          <span className="text-xs mt-1">Fun</span>
        </button>
        <button className="flex flex-col items-center">
          <BookOpen size={20} className="text-[#FFD166]" />
          <span className="text-xs mt-1 text-white">Resources</span>
        </button>
      </div>
    </div>
  )
}

'use client';

import { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import UserMenu from '../../../components/UserMenu';

// Last updated by manabunagaoka: 2025-06-11 12:47:51
const MilestoneBadge = ({ type, title, description, age, isExpanded, onToggle }) => {
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
      explanation: "Practical Life activities help children develop independence, concentration, coordination, and a sense of order. These activities involve real-life tasks like cleaning, food preparation, and self-care, which prepare children for future learning by building fine motor skills, sequencing abilities, and confidence. As noted in the Montessori approach, these activities connect the child to their environment and foster responsibility.",
      roleOfAdult: "The adult should present activities with clear, precise movements using minimal language, allowing the child to observe first and then try independently. Guide only when needed, and honor the child's need for repetition. Analyze movements to break them down into logical, sequential steps the child can follow.",
      preparedEnvironment: "Arrange practical life materials on low, accessible shelves with all needed items together. Use child-sized, real tools whenever possible (small pitchers, brushes, sponges). Materials should be attractive, culturally relevant, and designed for the child's success with built-in control of error.",
      milestones: [
        "<strong>1-2 years:</strong> Shows interest in self-care, helps with dressing, assists in simple cleanup",
        "<strong>2-3 years:</strong> Washes hands independently, carries objects carefully, sorts items",
        "<strong>3-4 years:</strong> Completes dressing independently, prepares simple snacks, cleans up after activities",
        "<strong>4-5 years:</strong> Manages bathroom needs independently, pours liquids without spilling, displays table manners",
        "<strong>5-6 years:</strong> Prepares simple meals, organizes personal belongings, manages time for tasks"
      ]
    },
    'sensorial': {
      explanation: "Sensorial activities help children develop, refine, and classify sensory impressions. As the training manual emphasizes, all learning comes through the senses, and Montessori sensorial materials isolate specific qualities (dimension, color, texture, sound, etc.) to help children order and make sense of these impressions. These materials have a built-in control of error and prepare the child's mind for more complex learning in mathematics, language, and cultural studies.",
      roleOfAdult: "Present materials with minimal language, allowing the child to focus on the sensory quality being explored. Give clear, three-period lessons to help associate language with sensory experiences. First, name the quality ('This is rough'); second, recognize it ('Show me rough'); third, recall the word ('What is this?').",
      preparedEnvironment: "Provide a range of sensory experiences beyond formal materials: nature walks, cooking activities, music, art, and texture explorations. Arrange materials from simple to complex, concrete to abstract, and by sensory property (visual, tactile, auditory, etc.).",
      milestones: [
        "<strong>0-1 year:</strong> Responds to sensory stimulation, follows moving objects, explores objects with mouth",
        "<strong>1-2 years:</strong> Matches identical objects, explores different textures, responds to musical sounds",
        "<strong>2-3 years:</strong> Sorts by single attribute (size, color), identifies basic shapes, recognizes contrasting sounds",
        "<strong>3-4 years:</strong> Grades objects by size, recognizes variations in color shades, discriminates similar sounds",
        "<strong>4-6 years:</strong> Detects subtle sensorial differences, combines multiple sensory inputs, describes sensory experiences verbally"
      ]
    },
    'language': {
      explanation: "Language development in Montessori encompasses listening, speaking, writing, and reading in a sequential approach. As highlighted in the training manual, children are born with an innate capacity to acquire language, especially during the sensitive period from birth to 6 years. Language development follows a pattern from receptive language (understanding) to expressive language (speaking), and from concrete experiences to abstract representation in writing and reading.",
      roleOfAdult: "The adult should provide rich, precise language in everyday interactions, using correct terminology rather than baby talk. Read quality books daily, engage in meaningful conversations, and model active listening. Use the three-period lesson technique for introducing new vocabulary, and always connect language to concrete experiences and objects.",
      preparedEnvironment: "Surround the child with language-rich experiences: books, conversation, songs, rhymes, and storytelling. Reduce background noise to help children focus on language sounds. Include materials that isolate specific language skills, such as sound games for phonemic awareness and sandpaper letters for connecting sounds to symbols.",
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
      explanation: "Montessori mathematics moves from concrete to abstract, using specialized materials that help children visualize mathematical concepts. As the training manual explains, the child's mathematical mind naturally seeks order, precision, and abstraction. Montessori materials make abstract concepts tangible by allowing the child to literally hold quantities and operations in their hands, building a deep understanding before moving to symbolic representation.",
      roleOfAdult: "Present materials sequentially, ensuring mastery before moving to more complex concepts. Allow ample time for exploration and repetition. Connect mathematical concepts to everyday life through counting, measuring, and comparing. Introduce mathematical language precisely, helping children move from concrete understanding to abstract symbols.",
      preparedEnvironment: "Include counting and mathematical thinking in daily activities: setting the table, measuring ingredients, noticing patterns in nature. Offer concrete materials before introducing symbols. Arrange mathematical materials sequentially, isolating concepts like quantity, symbol, decimal system, and operations.",
      milestones: [
        "<strong>2-3 years:</strong> Counts orally to 10, recognizes quantities 1-3, sorts by basic attributes",
        "<strong>3-4 years:</strong> Counts objects with one-to-one correspondence, recognizes numerals 1-10, understands sequence",
        "<strong>4-5 years:</strong> Forms numbers with beads, understands place value, performs simple addition with manipulatives",
        "<strong>5-6 years:</strong> Works with decimal system, understands operations, explores geometry and measurement"
      ]
    },
    'cultural': {
      explanation: "Cultural studies in Montessori introduce children to the wider world beyond themselves. This area encompasses geography, science, history, art, and music, helping children develop an understanding and appreciation of their place in the universe and human culture. As emphasized in the training manual's Earth Stewardship section, these studies help children develop respect for diversity and a sense of responsibility for our planet.",
      roleOfAdult: "Foster curiosity about the natural world and different cultures. Connect children to nature through direct experiences as outlined in Day 18-19 of the manual. Share music, art, and cultural celebrations with enthusiasm and respect. Help children see connections between different areas of study and develop a sense of wonder about the universe.",
      preparedEnvironment: "Include objects from nature, simple science experiments, maps, globes, cultural items, musical instruments, and art materials. Create opportunities for exploration, not memorization. Incorporate elements from the child's own culture while introducing diverse perspectives. Include practical activities that foster care for the environment and living things.",
      milestones: [
        "<strong>3-4 years:</strong> Shows interest in natural world, identifies land and water forms, participates in art and music",
        "<strong>4-5 years:</strong> Names continents, observes scientific phenomena, creates art with purpose",
        "<strong>5-6 years:</strong> Recognizes countries and cultures, conducts simple experiments, understands basic time concepts"
      ]
    },
    'social-emotional': {
      explanation: "Social-emotional development focuses on how children understand their own feelings and those of others. This area includes developing independence, self-regulation, grace and courtesy, cooperation, and conflict resolution skills. The manual emphasizes that social-emotional skills develop through freedom within limits, leading to self-discipline and inner control. These skills form the foundation for emotional intelligence and healthy relationships.",
      roleOfAdult: "Model respectful communication and emotional regulation. As Day 9 explains, teach grace and courtesy explicitly through brief lessons on social behaviors like greetings, offering help, and resolving conflicts. Support children in developing self-discipline by providing consistent boundaries while respecting their growing independence. Create an atmosphere of calm, respect, and empathy.",
      preparedEnvironment: "Create opportunities for collaboration, shared responsibility, and mixed-age interactions. Ensure the environment communicates respect for all through its organization and aesthetics. Include materials that help children identify and express emotions appropriately. Establish clear ground rules that protect the rights of individuals and the community.",
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
      explanation: "Physical development encompasses both gross and fine motor skills, extensively covered in Days 4 and 5 of the training manual. In Montessori education, movement is considered essential not just for physical health but for cognitive development. Activities are designed to refine coordination, balance, spatial awareness, and motor planning. As Montessori observed, movement and cognition are closely entwined, and physical activity enhances learning across all areas.",
      roleOfAdult: "Observe the child's movement patterns and offer appropriate challenges based on their developmental stage. Allow for sufficient outdoor time and freedom of movement indoors. Model and demonstrate techniques for fine motor skills without taking over for the child. Understand the progression of movement from involuntary to voluntary, from gross to fine motor control.",
      preparedEnvironment: "Create space for movement both indoors and outdoors. Include opportunities for climbing, balancing, carrying, pushing, pulling, and fine motor work. Ensure materials are child-sized and allow for independence. Provide specifically designed activities that isolate and refine particular movements, gradually increasing in difficulty as skills develop.",
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

  // Each accordion item is independently managed with its own animation
  return (
    <div id={`milestone-${type}`} className="accordion-container mb-6">
      {/* Card Header - Always visible */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
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
            <ChevronUp size={20} className="text-gray-400 transition-transform duration-300" /> : 
            <ChevronDown size={20} className="text-gray-400 transition-transform duration-300" />
          }
        </div>
      </div>
      
      {/* Animated Content Panel */}
      <div 
        className={`mt-1 overflow-hidden bg-white rounded-lg shadow-sm border border-gray-100 ${
          isExpanded ? "animate-slideDown" : "hidden"
        }`}
      >
        {/* Image Section */}
        <div className="w-full aspect-[3/2]">
          <img 
            src={images[type]} 
            alt={`${title} development`}
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Text Content */}
        <div className="p-4">
          <div className="mb-4">
            <h4 className="font-medium text-[#4D4D4D] mb-2">Explanation:</h4>
            <p className="text-[#4D4D4D] text-sm leading-relaxed">
              {content[type].explanation}
            </p>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-[#4D4D4D] mb-2">Role of the Adult:</h4>
            <p className="text-[#4D4D4D] text-sm leading-relaxed">
              {content[type].roleOfAdult}
            </p>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-[#4D4D4D] mb-2">Prepared Environment:</h4>
            <p className="text-[#4D4D4D] text-sm leading-relaxed">
              {content[type].preparedEnvironment}
            </p>
          </div>
          
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
      </div>
    </div>
  );
};

export default function MontessoriPage() {
  const [searchTerm, setSearchTerm] = useState('');
  // Using a Set to track multiple expanded categories
  const [expandedCategories, setExpandedCategories] = useState(new Set(['practical-life']));
  const router = useRouter();
  
  // Define COLORS for consistent use throughout the component
  const COLORS = {
    darkGray: "#4D4D4D",
    coralRed: "#FF6B6B",
    resourcesTeal: "#40BFBF",
    highlight: "#FFD166",
    hubPurple: "#9B59B6"
  };
  
  // Toggle specific category without affecting others
  const toggleCategory = (category) => {
    // Create a new Set from the current expanded categories
    const newExpanded = new Set(expandedCategories);
    
    // Toggle this category
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
      
      // Scroll to the newly opened category (without affecting others)
      setTimeout(() => {
        document.getElementById(`milestone-${category}`)?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
    
    // Update state
    setExpandedCategories(newExpanded);
  };

  // Handle back navigation with transition
  const handleBackToLearning = (e) => {
    if (e) e.preventDefault();
    
    // Set the direction to back before navigating
    localStorage.setItem('pageTransitionDirection', 'back');
    console.log('Setting direction to back');
    
    // Add a small delay to ensure localStorage is set
    setTimeout(() => {
      router.push('/learning');
    }, 50);
  };

  // Montessori developmental areas - reordered as per request
  const developmentalAreas = [
    { type: 'practical-life', title: 'Practical Life', description: 'Self-care, environment care, and everyday skills', age: '1+' },
    { type: 'sensorial', title: 'Sensorial', description: 'Developing and refining the five senses', age: '0+' },
    { type: 'language', title: 'Language', description: 'Communication, vocabulary, reading and writing', age: '0+' },
    { type: 'mathematics', title: 'Mathematics', description: 'Numeracy, operations, and mathematical concepts', age: '2+' },
    { type: 'cultural', title: 'Cultural Studies', description: 'Geography, science, history, art and music', age: '3+' },
    { type: 'social-emotional', title: 'Social-Emotional', description: 'Independence, self-regulation and social skills', age: '0+' },
    { type: 'physical', title: 'Physical Development', description: 'Gross motor, fine motor and movement skills', age: '0+' }
  ];
  
  // Filter based on search term
  const filteredAreas = developmentalAreas.filter(area => 
    area.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Add custom animation to global styles */}
      <style jsx global>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
      
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
        <UserMenu />
      </div>

      {/* Page Header with Search - Condensed to save space */}
      <div className="bg-white p-4 border-b flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={handleBackToLearning}
            className="mr-2 text-gray-500 hover:text-[#4D4D4D] transition-colors"
            aria-label="Back to learning resources"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-[#4D4D4D]">Montessori Developmental Milestones</h1>
        </div>
        
        {/* Search moved to right side and made smaller */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search areas..."
            className="w-full py-1.5 pl-8 pr-3 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FFD166] text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-2.5 top-2 text-gray-400" size={16} />
        </div>
      </div>

      {/* Developmental Areas */}
      <div className="flex-1 overflow-auto pb-20 px-4 pt-4">
        {filteredAreas.map(area => (
          <MilestoneBadge
            key={area.type}
            type={area.type}
            title={area.title}
            description={area.description}
            age={area.age}
            isExpanded={expandedCategories.has(area.type)}
            onToggle={() => toggleCategory(area.type)}
          />
        ))}
        
        <div className="text-center text-xs text-gray-500 mt-4 mb-8">
          Remember that each child develops at their own pace. These milestones serve as guides rather than rigid expectations.
        </div>
      </div>
    </div>
  );
}
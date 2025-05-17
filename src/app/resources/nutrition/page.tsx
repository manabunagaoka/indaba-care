"use client"

import { useState } from 'react'
import { Home, BookOpen, Play, Search, User, ChevronDown, ChevronUp, ArrowLeft, CheckCircle, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Sample lesson content for the Nutrition Fundamentals module
const NutritionFundamentalsLesson = () => {
  return (
    <div className="lesson-content">
      <h3 className="text-lg font-medium text-[#4D4D4D] mb-4">Fundamentals of Nutrition</h3>
      
      <div className="mb-6">
        <h4 className="font-medium text-[#4D4D4D] mb-2">Introduction</h4>
        <p className="text-sm text-gray-600 mb-4">
          Welcome to the Fundamentals of Nutrition module. In this lesson, we'll explore the essential components of nutrition
          and how they support a child's growth and development. As mentioned in Day 16 of the CoRE Nanny Training Manual,
          understanding these basics is crucial for providing nutritious meals that support physical growth, brain development,
          immune function, and overall health.
        </p>
        <p className="text-sm text-gray-600">
          As a Montessori nanny, your role is to model healthy eating habits and provide nutritious options while respecting
          the child's growing independence.
        </p>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium text-[#4D4D4D] mb-2">Components of Food</h4>
        <p className="text-sm text-gray-600 mb-2">
          From the training manual, we know that a well-balanced diet includes several important components:
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h5 className="font-medium text-sm mb-2">Carbohydrates</h5>
          <p className="text-sm text-gray-600 mb-2">
            Carbohydrates are a primary energy source for growing children. They can be divided into:
          </p>
          <ul className="list-none pl-0 space-y-1">
            <li className="text-sm text-gray-600 pl-4 relative">
              <span className="absolute left-0 top-1 text-[#FF6B6B]">•</span>
              <strong>Complex carbohydrates:</strong> Whole grains, vegetables, legumes (slower energy release)
            </li>
            <li className="text-sm text-gray-600 pl-4 relative">
              <span className="absolute left-0 top-1 text-[#FF6B6B]">•</span>
              <strong>Simple carbohydrates:</strong> Fruits, milk, honey, table sugar (faster energy release)
            </li>
          </ul>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h5 className="font-medium text-sm mb-2">Proteins</h5>
          <p className="text-sm text-gray-600 mb-2">
            Essential for growth and repair, proteins help build muscles, bones, and support brain development and immune function.
          </p>
          <ul className="list-none pl-0 space-y-1">
            <li className="text-sm text-gray-600 pl-4 relative">
              <span className="absolute left-0 top-1 text-[#FF6B6B]">•</span>
              <strong>Animal sources:</strong> Meat, fish, eggs, dairy
            </li>
            <li className="text-sm text-gray-600 pl-4 relative">
              <span className="absolute left-0 top-1 text-[#FF6B6B]">•</span>
              <strong>Plant sources:</strong> Beans, lentils, tofu, nuts, seeds
            </li>
          </ul>
        </div>
        
        {/* Note: Full lesson would include more content on fats, vitamins, minerals, etc. */}
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium text-[#4D4D4D] mb-2">The Planetary Plate</h4>
        <p className="text-sm text-gray-600 mb-4">
          As discussed on Day 16 of the training, the planetary plate concept helps visualize balanced nutrition:
        </p>
        <div className="w-full mb-4 bg-white rounded-lg p-4 border border-gray-200 flex justify-center">
          <div className="w-48 h-48 rounded-full border-4 border-[#FFD166] relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border-2 border-dashed border-[#FF6B6B] flex items-center justify-center">
                <p className="text-center text-sm font-medium text-gray-500">Planetary Plate<br/>Model</p>
              </div>
            </div>
            
            {/* Plate sections */}
            <div className="absolute top-2 right-8 w-16 h-5 bg-green-100 rounded-t-full rotate-45 flex items-center justify-center">
              <span className="text-[9px] text-green-700 rotate-45">Vegetables</span>
            </div>
            <div className="absolute top-8 left-8 w-16 h-5 bg-amber-100 rounded-t-full -rotate-45 flex items-center justify-center">
              <span className="text-[9px] text-amber-700 -rotate-45">Grains</span>
            </div>
            <div className="absolute bottom-8 right-8 w-16 h-5 bg-red-100 rounded-b-full -rotate-45 flex items-center justify-center">
              <span className="text-[9px] text-red-700 -rotate-45">Protein</span>
            </div>
            <div className="absolute bottom-2 left-8 w-16 h-5 bg-purple-100 rounded-b-full rotate-45 flex items-center justify-center">
              <span className="text-[9px] text-purple-700 rotate-45">Fruits</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          The planetary plate shows appropriate proportions of different food groups for a balanced meal. Half the plate should 
          be vegetables and fruits, with more emphasis on vegetables. One quarter should be whole grains, and one quarter 
          protein-rich foods.
        </p>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium text-[#4D4D4D] mb-2">Reflection Activity</h4>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            Take a moment to consider a typical meal you might prepare for a child in your care:
          </p>
          <ol className="list-decimal pl-4 space-y-2 text-sm text-gray-600">
            <li>What food groups are represented?</li>
            <li>Does it follow the planetary plate model?</li>
            <li>What adjustments might you make to create better balance?</li>
          </ol>
          <div className="mt-3 p-3 bg-white rounded border border-blue-100">
            <textarea 
              className="w-full h-20 p-2 border border-gray-200 rounded text-sm" 
              placeholder="Write your reflection here..."
            ></textarea>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-4 justify-center mt-8">
        <button className="bg-gray-200 text-gray-600 py-2 px-5 rounded-full font-medium shadow-sm hover:bg-gray-300 transition-colors">
          Previous Section
        </button>
        <button className="bg-[#FFD166] text-white py-2 px-5 rounded-full font-medium shadow-sm hover:bg-[#FFC13D] transition-colors">
          Next Section
        </button>
      </div>
    </div>
  );
};

// Nutrition Icon from catalog card
const NutritionIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8H19C20.1046 8 21 8.89543 21 10V21M18 8H6M18 8V21M6 8H5C3.89543 8 3 8.89543 3 10V21M6 8V21M3 21H21M6 21H18" stroke="#FF8C42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8V6M12 6V4M12 6H9M12 6H15" stroke="#FF8C42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Module Card Component that can be expanded to show a preview of the lesson
const ModuleCard = ({ moduleId, courseId, title, description, duration, completed, isExpanded, onToggle }) => {
  // Dynamically generate background gradient based on courseId
  const backgrounds = {
    'nutrition': 'bg-gradient-to-r from-[#FF8C42] to-[#FFC09F]',
    'earth-stewardship': 'bg-gradient-to-r from-[#73D2DE] to-[#A8E6CF]',
    'professional-dev': 'bg-gradient-to-r from-[#6A0572] to-[#AB83A1]',
    'sleep-toileting': 'bg-gradient-to-r from-[#8675A9] to-[#C3B1E1]',
    'time-management': 'bg-gradient-to-r from-[#FF9A8B] to-[#FF6B6B]',
    'observation': 'bg-gradient-to-r from-[#1E96FC] to-[#A2D6F9]'
  };
  
  return (
    <div id={`module-${moduleId}`} className="accordion-container mb-6">
      {/* Card Header - Always visible */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div 
          className="flex items-center p-4 cursor-pointer justify-between" 
          onClick={onToggle}
        >
          <div className="flex items-center">
            <div className={`w-16 h-16 ${backgrounds[courseId] || 'bg-gradient-to-r from-[#FFD166] to-[#FFBCAB]'} rounded-full flex items-center justify-center mr-4 relative flex-shrink-0`}>
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <NutritionIcon />
              </div>
              {completed && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold border border-white">
                  <CheckCircle size={14} />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-[#4D4D4D]">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex mr-4 text-xs text-gray-500 items-center">
              <Clock size={14} className="mr-1" />
              <span>{duration}</span>
            </div>
            {isExpanded ? 
              <ChevronUp size={20} className="text-gray-400 transition-transform duration-300" /> : 
              <ChevronDown size={20} className="text-gray-400 transition-transform duration-300" />
            }
          </div>
        </div>
      </div>
      
      {/* Animated Content Panel - Preview of the module content */}
      <div 
        className={`mt-1 overflow-hidden bg-white rounded-lg shadow-sm border border-gray-100 ${
          isExpanded ? "animate-slideDown" : "hidden"
        }`}
      >
        {moduleId === 'nutrition-fundamentals' ? (
          <div className="p-4">
            <div className="mb-4">
              <h4 className="font-medium text-[#4D4D4D] mb-2">Module Preview:</h4>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600 italic">
                  "Understanding the components of nutrition is essential for providing meals that support a child's development. 
                  This module explores carbohydrates, proteins, fats, vitamins, and minerals, and how they contribute to overall health."
                </p>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-[#4D4D4D] mb-2">What You'll Learn:</h4>
              <ul className="list-none pl-0 space-y-2">
                <li className="text-sm text-gray-600 pl-4 relative">
                  <span className="absolute left-0 top-1 text-[#FF6B6B]">•</span>
                  The essential components of nutrition and their roles in child development
                </li>
                <li className="text-sm text-gray-600 pl-4 relative">
                  <span className="absolute left-0 top-1 text-[#FF6B6B]">•</span>
                  The planetary plate concept for creating balanced meals
                </li>
                <li className="text-sm text-gray-600 pl-4 relative">
                  <span className="absolute left-0 top-1 text-[#FF6B6B]">•</span>
                  Appropriate portion sizes for different age groups
                </li>
                <li className="text-sm text-gray-600 pl-4 relative">
                  <span className="absolute left-0 top-1 text-[#FF6B6B]">•</span>
                  How to read food labels and identify quality ingredients
                </li>
              </ul>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-[#4D4D4D] mb-2">Module Includes:</h4>
              <ul className="list-none pl-0 space-y-2">
                <li className="text-sm text-gray-600 pl-4 relative">
                  <span className="absolute left-0 top-1 text-[#FFD166]">•</span>
                  Interactive lessons with visuals
                </li>
                <li className="text-sm text-gray-600 pl-4 relative">
                  <span className="absolute left-0 top-1 text-[#FFD166]">•</span>
                  Reflection activities
                </li>
                <li className="text-sm text-gray-600 pl-4 relative">
                  <span className="absolute left-0 top-1 text-[#FFD166]">•</span>
                  Knowledge check quiz
                </li>
                <li className="text-sm text-gray-600 pl-4 relative">
                  <span className="absolute left-0 top-1 text-[#FFD166]">•</span>
                  Downloadable resources
                </li>
              </ul>
            </div>
            
            <div className="flex justify-center">
              <button className="bg-[#FFD166] text-white py-2 px-8 rounded-full font-medium shadow-sm hover:bg-[#FFC13D] transition-colors">
                Start Module
              </button>
            </div>
          </div>
        ) : (
          // For other modules, just show a simplified preview
          <div className="p-4">
            <div className="mb-4">
              <h4 className="font-medium text-[#4D4D4D] mb-2">What You'll Learn:</h4>
              <ul className="list-none pl-0 space-y-2">
                <li className="text-sm text-gray-600 pl-4 relative">
                  <span className="absolute left-0 top-1 text-[#FF6B6B]">•</span>
                  Key concepts related to {title}
                </li>
                <li className="text-sm text-gray-600 pl-4 relative">
                  <span className="absolute left-0 top-1 text-[#FF6B6B]">•</span>
                  Practical strategies based on Montessori principles
                </li>
                <li className="text-sm text-gray-600 pl-4 relative">
                  <span className="absolute left-0 top-1 text-[#FF6B6B]">•</span>
                  Age-appropriate application techniques
                </li>
              </ul>
            </div>
            
            <div className="flex justify-center">
              <button className="bg-[#FFD166] text-white py-2 px-8 rounded-full font-medium shadow-sm hover:bg-[#FFC13D] transition-colors">
                {completed ? "Review Module" : "Start Module"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Page to display the lesson content when a module is selected
const LessonPage = ({ handleBackToModules }) => {
  const router = useRouter();
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Add custom animation to global styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
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
        <div className="flex items-center">
          <User size={20} className="mr-2 text-[#4D4D4D]" />
          <span className="text-[#4D4D4D]">manabunagaoka</span>
        </div>
      </div>

      {/* Page Header with back button - no icon */}
      <div className="bg-white p-4 border-b flex items-center">
        <button 
          onClick={handleBackToModules}
          className="mr-2 text-gray-500 hover:text-[#4D4D4D] transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-[#4D4D4D]">Nutrition & Meal Preparation</h1>
      </div>
      
      {/* Lesson Content */}
      <div className="flex-1 overflow-auto py-4 px-4 md:px-8 animate-fadeIn">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <NutritionFundamentalsLesson />
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
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
        <button 
          className="flex flex-col items-center"
          onClick={() => router.push('/resources')}
        >
          <BookOpen size={20} className="text-[#FFD166]" />
          <span className="text-xs mt-1 text-white">Resources</span>
        </button>
      </div>
    </div>
  );
};

export default function NutritionCourse() {
  const [expandedModules, setExpandedModules] = useState(new Set(['nutrition-fundamentals']));
  const [showingLesson, setShowingLesson] = useState(false);
  const router = useRouter();
  
  // Toggle specific module expansion
  const toggleModule = (moduleId) => {
    // Create a new Set from the current expanded modules
    const newExpanded = new Set(expandedModules);
    
    // Toggle this module
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
      
      // Scroll to the newly opened module
      setTimeout(() => {
        document.getElementById(`module-${moduleId}`)?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
    
    // Update state
    setExpandedModules(newExpanded);
  };
  
  // Example modules for Nutrition course
  const nutritionModules = [
    {
      id: 'nutrition-fundamentals',
      title: 'Fundamentals of Nutrition',
      description: 'Understanding nutrition components and balanced meals',
      duration: '45 mins',
      completed: false
    },
    {
      id: 'nutrition-practices',
      title: 'Healthy Food Practices',
      description: 'Whole foods, cultural considerations, and mindful eating',
      duration: '35 mins',
      completed: false
    },
    {
      id: 'nutrition-children',
      title: 'Involving Children in Food Preparation',
      description: 'Age-appropriate activities and kitchen safety',
      duration: '40 mins',
      completed: false
    },
    {
      id: 'meal-planning',
      title: 'Meal Planning & Preparation',
      description: 'Creating nutritious weekly meal plans and efficient preparation',
      duration: '50 mins',
      completed: false
    },
    {
      id: 'food-allergies',
      title: 'Food Allergies & Restrictions',
      description: 'Managing food allergies, intolerances, and dietary preferences',
      duration: '30 mins',
      completed: false
    }
  ];
  
  // When user clicks on the "Preview Lesson" or "Start Module" button
  const handleOpenLesson = () => {
    setShowingLesson(true);
  };
  
  // When user clicks back from the lesson to the modules view
  const handleBackToModules = () => {
    setShowingLesson(false);
  };
  
  // If showing a lesson, render the lesson page
  if (showingLesson) {
    return <LessonPage handleBackToModules={handleBackToModules} />;
  }

  // Otherwise, show the course modules view
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
        <div className="flex items-center">
          <User size={20} className="mr-2 text-[#4D4D4D]" />
          <span className="text-[#4D4D4D]">manabunagaoka</span>
        </div>
      </div>

      {/* Page Header with back button and no icon */}
      <div className="bg-white p-4 border-b flex items-center">
        <button 
          onClick={() => router.push('/resources')}
          className="mr-2 text-gray-500 hover:text-[#4D4D4D] transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-[#4D4D4D]">Nutrition & Meal Preparation</h1>
      </div>

      {/* All content in a scrollable container */}
      <div className="flex-1 overflow-auto pb-20">
        {/* Course Modules - moved up, overview now inline */}
        <div className="p-4">
          {/* Course overview with larger icon and distinct background */}
          <div className="bg-gradient-to-r from-orange-50 to-white p-4 rounded-lg shadow-sm border-2 border-[#FF8C42] mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full mr-4 flex items-center justify-center shadow-md border-2 border-[#FF8C42]">
                <NutritionIcon />
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <h2 className="text-lg font-medium text-[#4D4D4D]">Course Overview</h2>
                  <div className="ml-3 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs">In Progress</div>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="mr-3">Intermediate</span>
                  <span>2-3 hours total</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Learn about child nutrition, healthy food practices, and how to involve children in food preparation 
                  based on Montessori principles as outlined in the CoRE Nanny Training Manual.
                </p>
              </div>
            </div>
          </div>
          
          <h2 className="text-lg font-medium text-[#4D4D4D] mb-4">Course Modules</h2>
          
          {/* Display nutrition modules */}
          {nutritionModules.map(module => (
            <ModuleCard
              key={module.id}
              moduleId={module.id}
              courseId="nutrition"
              title={module.title}
              description={module.description}
              duration={module.duration}
              completed={module.completed}
              isExpanded={expandedModules.has(module.id)}
              onToggle={() => toggleModule(module.id)}
            />
          ))}
          
          <div className="text-center text-xs text-gray-500 mt-4 mb-8">
            Complete all modules to earn your Nutrition & Meal Preparation certificate.
          </div>
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
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
        <button 
          className="flex flex-col items-center"
          onClick={() => router.push('/resources')}
        >
          <BookOpen size={20} className="text-[#FFD166]" />
          <span className="text-xs mt-1 text-white">Resources</span>
        </button>
      </div>
    </div>
  );
}
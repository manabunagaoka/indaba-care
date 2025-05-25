"use client"

import { useState } from 'react'
import { Home, BookOpen, Play, Tag, Search, Filter, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import UserMenu from '../../components/UserMenu'

// Types
type Activity = {
  id: number
  title: string
  description: string
  ageRange: string
  category: string
  duration: string
  materials: string[]
  image: string
}

// Sample activities data with correct image paths
const activitiesData: Activity[] = [
  {
    id: 1,
    title: "Pouring Station",
    description: "Set up a pouring station with different sized containers and water or rice. This helps children develop fine motor skills, concentration, and hand-eye coordination.",
    ageRange: "2-4 years",
    category: "Practical Life",
    duration: "15-30 minutes",
    materials: ["Various containers", "Pitcher", "Tray", "Towel", "Water or rice"],
    image: "/images/activities/pouring_station.jpg"
  },
  {
    id: 2,
    title: "Sensory Sound Bottles",
    description: "Create bottles filled with different materials to produce various sounds. Children can match sounds, order by volume, or simply explore the auditory experience.",
    ageRange: "1-3 years",
    category: "Sensorial",
    duration: "20-30 minutes",
    materials: ["Clear bottles", "Various filling materials", "Glue for sealing"],
    image: "/images/activities/sound_bottles.jpg"
  },
  {
    id: 3,
    title: "Nature Scavenger Hunt",
    description: "Create a simple scavenger hunt in your yard or local park. Look for items like specific leaves, rocks, flowers, or insects to encourage observation skills.",
    ageRange: "3-6 years",
    category: "Cultural",
    duration: "30-45 minutes",
    materials: ["Small basket or bag", "Picture checklist", "Magnifying glass (optional)"],
    image: "/images/activities/nature_hunt.jpg"
  },
  {
    id: 4,
    title: "Number Rod Counting",
    description: "Use rods of increasing length to introduce counting and numerical concepts. This visual and tactile approach helps children understand quantities.",
    ageRange: "3-5 years",
    category: "Mathematics",
    duration: "15-20 minutes",
    materials: ["Montessori number rods or homemade equivalent", "Number cards"],
    image: "/images/activities/number_rods.jpg"
  },
  {
    id: 5,
    title: "Vegetable Washing & Preparation",
    description: "Let children wash and help prepare vegetables for a meal. This activity promotes independence, practical skills, and healthy eating habits.",
    ageRange: "2-6 years",
    category: "Practical Life",
    duration: "20-30 minutes",
    materials: ["Child-safe knife", "Vegetables", "Small bowl", "Water", "Towel"],
    image: "/images/activities/vegetable_washing.jpg"
  },
  {
    id: 6,
    title: "Sandpaper Letters",
    description: "Introduce alphabet letters through touch by using sandpaper letters. This multi-sensory approach helps with letter recognition and phonetic sounds.",
    ageRange: "3-5 years",
    category: "Language",
    duration: "10-15 minutes",
    materials: ["Sandpaper letters", "Tray"],
    image: "/images/activities/sandpaper_letters.jpg"
  }
];

export default function FunPage() {
  const [activities, setActivities] = useState(activitiesData)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedAge, setSelectedAge] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const router = useRouter()
  
  // Filter activities based on selected category and age
  const filteredActivities = activities.filter(activity => {
    if (selectedCategory && activity.category !== selectedCategory) return false;
    if (selectedAge) {
      // Simple age filtering logic - would be more sophisticated in a real app
      if (selectedAge === "0-2" && !activity.ageRange.includes("1") && !activity.ageRange.includes("2")) return false;
      if (selectedAge === "3-4" && !activity.ageRange.includes("3") && !activity.ageRange.includes("4")) return false;
      if (selectedAge === "5-6" && !activity.ageRange.includes("5") && !activity.ageRange.includes("6")) return false;
    }
    return true;
  });

  const categories = ["Practical Life", "Sensorial", "Language", "Mathematics", "Cultural"];
  const ageRanges = ["0-2", "3-4", "5-6"];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header with logo and user menu */}
      <div className="bg-white p-4 flex justify-between items-center border-b">
        <div className="flex items-center">
          <div className="h-12 w-auto mr-3 flex items-center">
            <img 
              src="/images/indabacarelogo.jpg" 
              alt="Indaba Care Logo" 
              className="h-10 w-auto object-contain" 
            />
            <h1 className="font-bold text-2xl text-[#4D4D4D] ml-2">Indaba Care</h1>
          </div>
        </div>
        <UserMenu />
      </div>

      {/* Title and Search */}
      <div className="p-4 bg-white border-b flex flex-wrap justify-between items-center">
        <h2 className="text-3xl font-bold text-[#4D4D4D]">Fun Activities</h2>
        <div className="relative flex-grow max-w-md ml-4">
          <input
            type="text"
            placeholder="Search activities..."
            className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#40BFBF]"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Filter button and dropdown */}
      <div className="py-2 px-4 bg-white border-b">
        <div className="relative">
          <button 
            className="flex items-center py-1 px-3 bg-gray-100 rounded-full text-sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={14} className="text-gray-500 mr-1" />
            <span className="text-gray-500">Filter</span>
            <ChevronDown size={16} className="ml-1 text-gray-500" />
          </button>
          
          {showFilters && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10">
              <div className="mb-4">
                <h3 className="font-medium text-sm mb-2 text-gray-700">Category:</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`py-1 px-3 rounded-full text-xs ${
                        selectedCategory === category 
                          ? 'bg-[#40BFBF] text-white' 
                          : 'bg-gray-100 text-gray-500'
                      }`}
                      onClick={() => setSelectedCategory(selectedCategory === category ? "" : category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-sm mb-2 text-gray-700">Age Range:</h3>
                <div className="flex flex-wrap gap-2">
                  {ageRanges.map(age => (
                    <button
                      key={age}
                      className={`py-1 px-3 rounded-full text-xs ${
                        selectedAge === age 
                          ? 'bg-[#40BFBF] text-white' 
                          : 'bg-gray-100 text-gray-500'
                      }`}
                      onClick={() => setSelectedAge(selectedAge === age ? "" : age)}
                    >
                      {age} years
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Activities List */}
      <div className="flex-1 overflow-auto pb-20 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredActivities.map(activity => (
            <div 
              key={activity.id} 
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100"
            >
              <div className="w-full h-80 bg-gray-200">
                <img 
                  src={activity.image} 
                  alt={activity.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => e.currentTarget.src = "/api/placeholder/300/200"}
                />
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-[#4D4D4D]">{activity.title}</h3>
                  <span className="bg-[#40BFBF] bg-opacity-20 text-[#40BFBF] text-xs px-2 py-0.5 rounded">
                    {activity.ageRange}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">
                  {activity.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-600 flex items-center">
                    <Tag size={12} className="mr-1" />
                    {activity.category}
                  </span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-600">
                    {activity.duration}
                  </span>
                </div>
                
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-gray-500 mb-1">Materials needed:</h4>
                  <ul className="text-xs text-gray-600 pl-4 list-disc">
                    {activity.materials.map((material, idx) => (
                      <li key={idx}>{material}</li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  className="w-full mt-2 py-2 bg-gray-300 text-gray-600 rounded-lg font-medium text-sm cursor-not-allowed opacity-70"
                  disabled={true}
                >
                  View Details (Coming Soon)
                </button>
              </div>
            </div>
          ))}
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
        <button className="flex flex-col items-center">
          <Play size={20} className="text-[#40BFBF]" />
          <span className="text-xs mt-1 text-white">Fun</span>
        </button>
        <button 
          className="flex flex-col items-center text-gray-300"
          onClick={() => router.push('/resources')}
        >
          <BookOpen size={20} />
          <span className="text-xs mt-1">Resources</span>
        </button>
      </div>
    </div>
  )
}
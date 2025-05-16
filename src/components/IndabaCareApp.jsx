import React, { useState, useRef, useEffect } from 'react';
import { Bell, ChevronLeft, Search, MessageCircle, Home, Menu, Send, Image, 
  Smile, Paperclip, User, Calendar, Camera, Info, Star, Mic, BookOpen, 
  Play, Award, X, Edit2, MoreVertical, CheckCircle, Filter } from 'lucide-react';

const IndabaCareApp = () => {
  const [activeScreen, setActiveScreen] = useState('home');
  const [activeNewsItem, setActiveNewsItem] = useState(null);
  const [selectedMilestoneTab, setSelectedMilestoneTab] = useState('all');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingText, setRecordingText] = useState('');
  const [activeResourceCategory, setActiveResourceCategory] = useState('all');
  const [activeFunTab, setActiveFunTab] = useState('activities');
  
  // Montessori areas of development - appropriate for 0-6 year olds
  const montessoriAreas = [
    { id: 'practical', name: 'Practical Life', color: 'emerald' },
    { id: 'sensorial', name: 'Sensorial', color: 'yellow' },
    { id: 'language', name: 'Language', color: 'teal' },
    { id: 'math', name: 'Mathematics', color: 'mauve' },
    { id: 'cultural', name: 'Cultural', color: 'coral' }
  ];
  
  // Sample data for chat items with Montessori principles - adjusted for 0-6 age range
  const chatItems = [
    {
      id: 1,
      icon: "🧸",
      name: "Today's Highlights",
      message: "Emma took her first steps today! Click to see the milestone moment",
      time: "2:45 PM",
      unread: 2,
      montessoriAreas: ['practical'],
      ageGroup: '10-12 months',
      content: {
        title: "Emma's First Steps!",
        image: "/api/placeholder/400/240",
        text: "Today was a breakthrough moment for Emma! She took her first independent steps while reaching for her favorite teddy bear. She managed to take 4 steps before sitting down with a big smile. These early walking attempts typically happen between 9-12 months, and Emma is right on track at 10 months! Look at how proud she is in the video. We celebrated this milestone with lots of clapping and encouragement.",
        montessoriPrinciples: [
          "Movement and development of independence",
          "Freedom within limits in a prepared environment",
          "Learning through natural discovery and exploration"
        ],
        milestoneDetails: {
          area: "Practical Life & Movement",
          skill: "Gross Motor Development",
          nextSteps: "Once walking becomes more stable, we'll introduce activities that encourage balance while moving, such as carrying very light objects."
        },
        tips: [
          "Create safe walking spaces by removing obstacles",
          "Encourage practice but don't force it",
          "Proper footwear is important - barefoot is best for developing balance"
        ],
        activities: "Tomorrow we'll try some assisted walking in the garden if weather permits."
      }
    },
    {
      id: 2,
      icon: "🍎",
      name: "Nutrition Updates",
      message: "New meal plan & Lucas tried avocado today with success!",
      time: "1:30 PM",
      unread: 1,
      montessoriAreas: ['practical'],
      ageGroup: '12-18 months',
      content: {
        title: "Weekly Nutrition Update",
        image: "/api/placeholder/400/240",
        text: "Lucas had a breakthrough with avocado today! After several previous attempts, he finally enjoyed it when mixed with a bit of banana. He ate about 3 tablespoons total. This is great news as avocados provide healthy fats essential for brain development. His appetite has been excellent all week, and he's showing more interest in self-feeding.",
        montessoriPrinciples: [
          "Developing independence through self-feeding",
          "Sensory exploration of different textures and tastes",
          "Practical life skills during mealtime"
        ],
        milestoneDetails: {
          area: "Practical Life",
          skill: "Self-feeding & Food Exploration",
          nextSteps: "We'll continue to introduce child-sized utensils and practice with the small pitcher for pouring water."
        },
        weeklyMenu: [
          "Monday: Oatmeal with apple, Chicken soup, Yogurt with berries",
          "Tuesday: Banana pancakes, Vegetable pasta, Cottage cheese with peach",
          "Wednesday: Egg with toast, Fish with sweet potato, Apple sauce"
        ],
        notes: "We're still working on introducing more green vegetables. Any tips from home that might help?"
      }
    },
    {
      id: 3,
      icon: "📝",
      name: "Learning Activities",
      message: "Today's sensory play and new vocabulary words learned",
      time: "11:15 AM",
      unread: 0,
      montessoriAreas: ['sensorial', 'language'],
      ageGroup: '2-3 years',
      content: {
        title: "Daily Learning Activities Report",
        image: "/api/placeholder/400/240",
        text: "We had a wonderful morning with our color exploration sensory bin! Sophia spent nearly 30 minutes sorting different colored objects and naming the colors. She's now consistently identifying red, blue, and yellow without prompting. During our reading time, she pointed to pictures and named several animals unprompted. Her vocabulary is expanding rapidly!",
        montessoriPrinciples: [
          "Isolation of qualities (focusing on colors)",
          "Indirect preparation for later learning",
          "Language enrichment through concrete experiences"
        ],
        milestoneDetails: {
          area: "Sensorial & Language",
          skill: "Color Recognition & Vocabulary Development",
          nextSteps: "We'll introduce color matching work next week and continue to expand vocabulary with three-period lessons."
        },
        newWords: ["Elephant", "Splash", "Empty", "More"],
        tomorrowPlan: "Tomorrow we'll introduce a simple counting activity with colored blocks and continue our animal theme with some movement activities that mimic different animals."
      }
    },
    {
      id: 4,
      icon: "😴",
      name: "Nap & Sleep Patterns",
      message: "Noah had a longer afternoon nap, bedtime suggestions",
      time: "4:20 PM",
      unread: 0,
      montessoriAreas: ['practical'],
      ageGroup: '18-24 months',
      content: {
        title: "Sleep & Rest Update",
        image: "/api/placeholder/400/240",
        text: "Noah had an unusual sleep pattern today. His morning nap was shorter (only 30 minutes instead of his usual hour), but he compensated with a longer afternoon nap (1.5 hours). He seemed well-rested and in good spirits throughout the day. Since he napped longer in the afternoon, you might find he's a bit more energetic at bedtime tonight. Perhaps adding an extra wind-down activity could help transition to sleep more smoothly.",
        montessoriPrinciples: [
          "Respecting natural rhythms of the child",
          "Creating order in the environment and routine",
          "Supporting independence in sleep preparation"
        ],
        milestoneDetails: {
          area: "Practical Life",
          skill: "Self-regulation & Rest Patterns",
          nextSteps: "We're working on a consistent pre-nap routine where Noah helps prepare his rest space."
        },
        sleepTips: [
          "Consider pushing bedtime 15 minutes later tonight",
          "Extra calm reading time might help transition",
          "Keep the room slightly cooler than usual"
        ]
      }
    },
    {
      id: 5,
      icon: "🔢",
      name: "Mathematics Exploration",
      message: "Maya practiced counting with the number rods today",
      time: "3:15 PM",
      unread: 2,
      montessoriAreas: ['math'],
      ageGroup: '3-4 years',
      content: {
        title: "Mathematics Development Update",
        image: "/api/placeholder/400/240",
        text: "Maya showed great interest in the number rods today! She carefully arranged them in sequence from 1-10 and practiced counting each section. She's demonstrating a clear understanding of the relationship between quantity and the numerical symbol. This concrete experience with the rods is building a strong foundation for later mathematical concepts.",
        montessoriPrinciples: [
          "Concrete to abstract learning progression",
          "Sensorial experience with mathematical concepts",
          "Control of error built into materials"
        ],
        milestoneDetails: {
          area: "Mathematics",
          skill: "Number Sequence & Quantity Recognition",
          nextSteps: "We'll introduce sandpaper numbers next week to connect the symbol with the quantity experience."
        },
        activities: "At home, you might count steps while walking or count pieces of fruit during snack time to reinforce these concepts naturally."
      }
    },
    {
      id: 6,
      icon: "🌎",
      name: "Cultural Studies",
      message: "Our continent exploration continues with Australia today!",
      time: "1:45 PM",
      unread: 1,
      montessoriAreas: ['cultural'],
      ageGroup: '4-5 years',
      content: {
        title: "Cultural Studies - Continents",
        image: "/api/placeholder/400/240",
        text: "Today we continued our continent studies with Australia! We located it on our puzzle map, looked at pictures of iconic Australian landmarks, and learned about some unique animals like kangaroos, koalas, and platypuses. The children were fascinated by the animals that carry their babies in pouches. We also listened to didgeridoo music and tried making similar sounds with cardboard tubes.",
        montessoriPrinciples: [
          "Global citizenship and cultural awareness",
          "Moving from concrete to abstract concepts",
          "Exploring through multiple sensory experiences"
        ],
        milestoneDetails: {
          area: "Cultural Studies",
          skill: "Geography & Cultural Awareness",
          nextSteps: "We'll continue exploring Australia tomorrow with traditional art patterns and some simple food tasting."
        },
        activities: "You might like to look for some Australian children's books at the library this weekend to extend this interest."
      }
    },
    {
      id: 7,
      icon: "👶",
      name: "Infant Development",
      message: "Leo is showing interest in grasping objects",
      time: "10:30 AM",
      unread: 0,
      montessoriAreas: ['sensorial'],
      ageGroup: '3-6 months',
      content: {
        title: "Infant Development Update",
        image: "/api/placeholder/400/240",
        text: "Leo is making wonderful progress with his grasping skills! Today he intentionally reached for and successfully grabbed the hanging wooden rings on his activity gym. His hand-eye coordination is developing nicely. He spent about 15 minutes focused on these attempts, showing impressive concentration for his age.",
        montessoriPrinciples: [
          "Development of concentration",
          "Refinement of movement and coordination",
          "Indirect preparation for later fine motor skills"
        ],
        milestoneDetails: {
          area: "Sensorial & Movement",
          skill: "Eye-Hand Coordination & Grasping",
          nextSteps: "We'll continue to offer various textured objects within reach to encourage grasping and sensory exploration."
        },
        activities: "You might try placing different textured objects just within his reach during tummy time at home."
      }
    },
    {
      id: 8,
      icon: "🧩",
      name: "Problem Solving Skills",
      message: "Oliver completed his first 12-piece puzzle independently!",
      time: "2:25 PM",
      unread: 0,
      montessoriAreas: ['sensorial', 'math'],
      ageGroup: '5-6 years',
      content: {
        title: "Cognitive Development - Problem Solving",
        image: "/api/placeholder/400/240",
        text: "Oliver achieved a significant milestone today by completing a 12-piece wooden puzzle completely independently! He showed remarkable persistence when pieces didn't fit immediately, trying different orientations rather than getting frustrated. This demonstrates developing executive function skills and spatial awareness.",
        montessoriPrinciples: [
          "Independence in problem-solving",
          "Control of error built into materials",
          "Developing concentration and persistence"
        ],
        milestoneDetails: {
          area: "Cognitive Development",
          skill: "Spatial Reasoning & Logical Problem Solving",
          nextSteps: "We'll gradually introduce puzzles with more pieces and more complex patterns to continue challenging his spatial reasoning."
        },
        activities: "Games like Tangrams or pattern blocks would be excellent activities to extend this interest at home."
      }
    }
  ];

  // Sample resources data
  const resources = [
    {
      id: 1,
      title: "Practical Life at Home",
      summary: "Simple ways to incorporate Montessori practical life into daily routines",
      area: "practical",
      ageRange: "1-3 years",
      thumbnail: "/api/placeholder/150/150",
      favorite: true
    },
    {
      id: 2,
      title: "Sensory Exploration Bins",
      summary: "How to create engaging sensory activities for tactile development",
      area: "sensorial",
      ageRange: "0-2 years",
      thumbnail: "/api/placeholder/150/150",
      favorite: false
    },
    {
      id: 3,
      title: "Language Development Milestones",
      summary: "Understanding language acquisition stages and supporting growth",
      area: "language",
      ageRange: "1-4 years",
      thumbnail: "/api/placeholder/150/150",
      favorite: true
    },
    {
      id: 4,
      title: "Pre-Math Concepts",
      summary: "Activities that build mathematical thinking before formal learning",
      area: "math",
      ageRange: "2-4 years",
      thumbnail: "/api/placeholder/150/150",
      favorite: false
    },
    {
      id: 5,
      title: "Cultural Awareness for Toddlers",
      summary: "Age-appropriate ways to introduce global awareness",
      area: "cultural",
      ageRange: "3-6 years",
      thumbnail: "/api/placeholder/150/150",
      favorite: false
    }
  ];

  // Sample activities and workshops
  const activities = [
    {
      id: 1,
      title: "Pouring Exercise",
      type: "activity",
      summary: "Practice fine motor skills with simple pouring activities",
      area: "practical",
      ageRange: "2-3 years",
      duration: "15 min",
      difficulty: "Easy",
      thumbnail: "/api/placeholder/150/150"
    },
    {
      id: 2,
      title: "Texture Matching",
      type: "activity",
      summary: "Sensorial activity to develop tactile discrimination",
      area: "sensorial",
      ageRange: "2-4 years",
      duration: "20 min",
      difficulty: "Medium",
      thumbnail: "/api/placeholder/150/150"
    },
    {
      id: 3,
      title: "Understanding Montessori at Home",
      type: "workshop",
      summary: "Learn how to create a Montessori-inspired home environment",
      duration: "45 min",
      progress: 60,
      modules: 5,
      thumbnail: "/api/placeholder/150/150"
    },
    {
      id: 4,
      title: "Supporting Language Development",
      type: "workshop",
      summary: "Techniques for fostering language skills in early childhood",
      duration: "30 min",
      progress: 0,
      modules: 3,
      thumbnail: "/api/placeholder/150/150"
    }
  ];

  // Helper function for color mapping
  const getColorClass = (area, element) => {
    const colorMap = {
      practical: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        hover: 'hover:bg-emerald-100'
      },
      sensorial: {
        bg: 'bg-yellow-50',
        text: 'text-yellow-700',
        border: 'border-yellow-200',
        hover: 'hover:bg-yellow-100'
      },
      language: {
        bg: 'bg-teal-50',
        text: 'text-teal-700',
        border: 'border-teal-200',
        hover: 'hover:bg-teal-100'
      },
      math: {
        bg: 'bg-pink-50',
        text: 'text-pink-700',
        border: 'border-pink-200',
        hover: 'hover:bg-pink-100'
      },
      cultural: {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        hover: 'hover:bg-red-100'
      }
    };

    return colorMap[area]?.[element] || colorMap.practical[element];
  };

  // Voice recording modal
  const renderVoiceModal = () => {
    if (!isRecording) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-11/12 max-w-md rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-teal-500 p-4 text-white flex justify-between items-center">
            <h3 className="font-medium">Voice Recording</h3>
            <button 
              onClick={() => setIsRecording(false)}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-5">
            <div className="flex justify-center mb-4">
              <div className={`w-20 h-20 rounded-full bg-red-100 flex items-center justify-center ${isRecording ? 'animate-pulse' : ''}`}>
                <Mic size={32} className="text-red-500" />
              </div>
            </div>
            
            <div className="mb-4 bg-gray-50 p-3 rounded-lg min-h-[100px] border border-gray-200">
              <p className="text-gray-500">{recordingText || "Listening... speak now"}</p>
            </div>
            
            <div className="flex space-x-3 mb-4">
              <button className="flex-1 flex items-center justify-center bg-red-500 text-white py-2 rounded-lg">
                <Mic size={18} className="mr-2" />
                {recordingText ? "Re-record" : "Stop Recording"}
              </button>
              
              {recordingText && (
                <button className="flex-1 flex items-center justify-center bg-gray-800 text-white py-2 rounded-lg">
                  <Edit2 size={18} className="mr-2" />
                  Edit Text
                </button>
              )}
            </div>
            
            <div>
              <p className="text-gray-700 font-medium mb-2">Category:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {montessoriAreas.map(area => (
                  <button 
                    key={area.id}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getColorClass(area.id, 'bg')} ${getColorClass(area.id, 'text')}`}
                  >
                    {area.name}
                  </button>
                ))}
              </div>
              
              {recordingText && (
                <button className="w-full bg-red-500 text-white py-2 rounded-lg font-medium">
                  Post Update
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFeed = () => (
    <div className="flex flex-col h-full bg-peach-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-coral-600 to-teal-500 p-4 shadow-sm flex justify-between items-center">
        <div className="flex items-center">
          <div className="font-bold text-xl flex items-center text-white">
            <img src="/images/indabacarelogo.jpg" alt="Indaba Care Logo" className="h-10 w-auto mr-2 rounded-md" onError={(e) => e.target.src = "/api/placeholder/40/40"} />
            Indaba Care
          </div>
        </div>
        <div className="flex space-x-4">
          <Bell size={20} className="text-white" />
          <Menu size={20} className="text-white" />
        </div>
      </div>
      
      {/* Search */}
      <div className="bg-white p-4 border-b border-gray-100">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <Search size={16} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search updates and conversations" 
            className="bg-transparent border-none focus:outline-none ml-2 text-sm w-full"
          />
        </div>
      </div>
      
      {/* Montessori Area Filter */}
      <div className="bg-white p-3 border-b border-gray-200 overflow-x-auto">
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
              selectedMilestoneTab === 'all' 
                ? 'bg-coral-500 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setSelectedMilestoneTab('all')}
          >
            All Updates
          </button>
          {montessoriAreas.map(area => (
            <button
              key={area.id}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex items-center ${
                selectedMilestoneTab === area.id 
                  ? `bg-${area.color}-500 text-white` 
                  : `${getColorClass(area.id, 'bg')} ${getColorClass(area.id, 'text')}`
              }`}
              onClick={() => setSelectedMilestoneTab(area.id)}
            >
              {area.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Chat Items */}
      <div className="flex-1 overflow-auto">
        {chatItems
          .filter(item => selectedMilestoneTab === 'all' || item.montessoriAreas.includes(selectedMilestoneTab))
          .map(item => (
            <div 
              key={item.id} 
              className="flex items-start p-4 border-b border-gray-100 bg-peach-100 hover:bg-peach-200 cursor-pointer mb-2 mx-2 rounded-lg shadow-sm"
              onClick={() => {
                setActiveNewsItem(item);
                setActiveScreen('newsDetail');
              }}
            >
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-xl">
                {item.icon}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <span className="text-xs text-gray-500">{item.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1 truncate">{item.message}</p>
                <div className="flex mt-2 flex-wrap">
                  {item.montessoriAreas.map((area, index) => {
                    const areaObj = montessoriAreas.find(a => a.id === area);
                    return (
                      <span 
                        key={index}
                        className={`mr-2 mb-1 text-xs px-2 py-0.5 rounded-full ${getColorClass(area, 'bg')} ${getColorClass(area, 'text')}`}
                      >
                        {areaObj.name}
                      </span>
                    );
                  })}
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {item.ageGroup}
                  </span>
                </div>
              </div>
              {item.unread > 0 && (
                <div className="w-5 h-5 bg-coral-500 rounded-full flex items-center justify-center ml-2">
                  <span className="text-xs text-white">{item.unread}</span>
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Voice Recording FAB */}
      <button 
        className="fixed right-4 bottom-20 w-14 h-14 rounded-full bg-coral-500 text-white flex items-center justify-center shadow-lg hover:bg-coral-600 transition-colors"
        onClick={() => {
          setIsRecording(true);
          setRecordingText('');
        }}
      >
        <Mic size={24} />
      </button>
    </div>
  );

  const renderNewsDetail = () => {
    if (!activeNewsItem) return null;
    
    return (
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-coral-500 to-teal-500 p-4 text-white flex items-center">
          <ChevronLeft 
            size={24} 
            className="cursor-pointer" 
            onClick={() => setActiveScreen('feed')}
          />
          <h1 className="ml-4 font-medium">{activeNewsItem.name}</h1>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto p-4 bg-peach-50">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {activeNewsItem.content.title}
            </h2>
            
            {/* Age Group & Montessori Areas */}
            <div className="flex flex-wrap mb-4">
              <span className="mr-2 mb-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                Age: {activeNewsItem.ageGroup}
              </span>
              {activeNewsItem.montessoriAreas.map((area, index) => {
                return (
                  <span 
                    key={index} 
                    className={`mr-2 mb-2 px-3 py-1 rounded-full text-xs ${getColorClass(area, 'bg')} ${getColorClass(area, 'text')}`}
                  >
                    {montessoriAreas.find(a => a.id === area).name}
                  </span>
                );
              })}
            </div>
            
            <div className="rounded-lg overflow-hidden mb-4">
              <img 
                src={activeNewsItem.content.image} 
                alt={activeNewsItem.content.title}
                className="w-full h-48 object-cover"
              />
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              {activeNewsItem.content.text}
            </p>
          </div>
          
          {/* Montessori Milestone Details */}
          {activeNewsItem.content.milestoneDetails && (
            <div className="bg-peach-100 p-4 rounded-lg mb-4 border-l-4 border-coral-400 relative mt-4 shadow-sm">
              <h3 className="font-medium text-gray-800 mb-2">Montessori Developmental Milestone</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium text-gray-700">Area: </span>
                  <span className="text-gray-700">{activeNewsItem.content.milestoneDetails.area}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Skill: </span>
                  <span className="text-gray-700">{activeNewsItem.content.milestoneDetails.skill}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Next Development Steps: </span>
                  <span className="text-gray-700">{activeNewsItem.content.milestoneDetails.nextSteps}</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Montessori Principles Applied */}
          {activeNewsItem.content.montessoriPrinciples && (
            <div className="bg-yellow-50 p-4 rounded-lg mb-4 relative shadow-sm">
              <h3 className="font-medium text-gray-800 mb-2">Montessori Principles Applied</h3>
              <ul className="list-disc pl-5">
                {activeNewsItem.content.montessoriPrinciples.map((principle, index) => (
                  <li key={index} className="text-gray-700 mb-1">{principle}</li>
                ))}
              </ul>
            </div>
          )}
          
          {activeNewsItem.content.tips && (
            <div className="bg-teal-50 p-4 rounded-lg mb-4 relative shadow-sm">
              <h3 className="font-medium text-gray-800 mb-2">Helpful Tips:</h3>
              <ul className="list-disc pl-5">
                {activeNewsItem.content.tips.map((tip, index) => (
                  <li key={index} className="text-gray-700 mb-1">{tip}</li>
                ))}
              </ul>
            </div>
          )}
          
          {activeNewsItem.content.weeklyMenu && (
            <div className="border border-gray-200 rounded-lg p-4 mb-4 relative shadow-sm bg-white">
              <h3 className="font-medium text-gray-800 mb-2">Weekly Menu Plan:</h3>
              <ul className="space-y-2">
                {activeNewsItem.content.weeklyMenu.map((item, index) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
          )}
          
          {activeNewsItem.content.newWords && (
            <div className="mb-4 relative bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-800 mb-2">New Words Learned:</h3>
              <div className="flex flex-wrap">
                {activeNewsItem.content.newWords.map((word, index) => (
                  <span 
                    key={index} 
                    className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {activeNewsItem.content.sleepTips && (
            <div className="bg-mauve-50 p-4 rounded-lg mb-4 relative shadow-sm">
              <h3 className="font-medium text-gray-800 mb-2">Tonight's Sleep Recommendations:</h3>
              <ul className="list-disc pl-5">
                {activeNewsItem.content.sleepTips.map((tip, index) => (
                  <li key={index} className="text-gray-700 mb-1">{tip}</li>
                ))}
              </ul>
            </div>
          )}
          
          {activeNewsItem.content.tomorrowPlan && (
            <div className="bg-white p-4 rounded-lg mt-4 relative shadow-sm">
              <h3 className="font-medium text-gray-800 mb-2">Tomorrow's Plan:</h3>
              <p className="text-gray-700">{activeNewsItem.content.tomorrowPlan}</p>
            </div>
          )}
          
          {activeNewsItem.content.activities && (
            <div className="bg-white p-4 rounded-lg mt-4 relative shadow-sm">
              <h3 className="font-medium text-gray-800 mb-2">Suggested Activities:</h3>
              <p className="text-gray-700">{activeNewsItem.content.activities}</p>
            </div>
          )}
          
          {activeNewsItem.content.notes && (
            <div className="bg-yellow-50 p-4 rounded-lg mt-4 relative shadow-sm">
              <h3 className="font-medium text-amber-700 mb-2">Notes & Questions:</h3>
              <p className="text-gray-700">{activeNewsItem.content.notes}</p>
            </div>
          )}
        </div>
        
        {/* Comment Input */}
        <div className="p-3 border-t border-gray-200 bg-white">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
            <input 
              type="text" 
              placeholder="Add a comment or question..." 
              className="bg-transparent border-none focus:outline-none text-sm flex-1"
            />
            <div className="flex space-x-2 ml-2">
              <Smile size={18} className="text-gray-400 cursor-pointer" />
              <Paperclip size={18} className="text-gray-400 cursor-pointer" />
              <Camera size={18} className="text-gray-400 cursor-pointer" />
              <Send size={18} className="text-coral-500 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHome = () => (
    <div className="flex flex-col h-full bg-peach-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-coral-500 to-teal-500 p-6 flex flex-col items-center text-white">
        <div className="font-bold text-2xl flex items-center mb-4">
          <img src="/images/indabacarelogo.jpg" alt="Indaba Care Logo" className="h-12 w-auto mr-3 rounded-md" onError={(e) => e.target.src = "/api/placeholder/50/50"} />
          Indaba Care
        </div>
        <p className="text-center text-white mb-4">
          Connecting parents and caregivers through the Montessori journey
        </p>
        <button className="bg-white text-coral-500 px-4 py-2 rounded-full font-medium text-sm hover:bg-coral-50 transition-colors">
          Connect with Your Child's Caregiver
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Quick Stats */}
        <div className="bg-white p-4 m-4 rounded-lg shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-3">Today's Overview</h2>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-peach-100 p-3 rounded-lg flex flex-col items-center">
              <span className="text-2xl mb-1 text-gray-800">4</span>
              <span className="text-xs text-gray-600">Activities</span>
            </div>
            <div className="bg-teal-50 p-3 rounded-lg flex flex-col items-center">
              <span className="text-2xl mb-1 text-gray-800">2</span>
              <span className="text-xs text-gray-600">Meals</span>
            </div>
            <div className="bg-mauve-100 p-3 rounded-lg flex flex-col items-center">
              <span className="text-2xl mb-1 text-gray-800">3</span>
              <span className="text-xs text-gray-600">Updates</span>
            </div>
          </div>
        </div>
        
        {/* Recent Milestones */}
        <div className="bg-white p-4 m-4 rounded-lg shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-3">Recent Milestones</h2>
          <div className="space-y-3">
            {chatItems.slice(0, 3).map(item => (
              <div key={item.id} className="flex border-b border-gray-100 pb-3">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-xl">
                  {item.icon}
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.message}</p>
                  <div className="flex mt-1">
                    {item.montessoriAreas.map((area, index) => (
                      <span 
                        key={index}
                        className={`mr-2 text-xs px-2 py-0.5 rounded-full ${getColorClass(area, 'bg')} ${getColorClass(area, 'text')}`}
                      >
                        {montessoriAreas.find(a => a.id === area).name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <button 
              className="w-full text-coral-500 text-center py-2 font-medium text-sm hover:text-coral-600 transition-colors"
              onClick={() => setActiveScreen('feed')}
            >
              View All Updates
            </button>
          </div>
        </div>
        
        {/* Montessori Resources */}
        <div className="bg-white p-4 m-4 rounded-lg shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-3">Montessori Resources</h2>
          <div className="space-y-3">
            <div className="bg-emerald-50 p-3 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer">
              <h3 className="font-medium text-gray-800">Practical Life Activities at Home</h3>
              <p className="text-sm text-gray-700 mt-1">Simple ways to incorporate Montessori practical life skills into your daily routine.</p>
            </div>
            <div className="bg-teal-50 p-3 rounded-lg hover:bg-teal-100 transition-colors cursor-pointer">
              <h3 className="font-medium text-gray-800">Language Development Guide</h3>
              <p className="text-sm text-gray-700 mt-1">How to support your child's language acquisition using Montessori principles.</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg hover:bg-yellow-100 transition-colors cursor-pointer">
              <h3 className="font-medium text-gray-800">Prepared Environment Tips</h3>
              <p className="text-sm text-gray-700 mt-1">Creating a Montessori-inspired space that encourages independence and learning.</p>
            </div>

            <button 
              className="w-full text-coral-500 text-center py-2 font-medium text-sm hover:text-coral-600 transition-colors"
              onClick={() => setActiveScreen('resources')}
            >
              Explore Resources
            </button>
          </div>
        </div>

        {/* Daily Milestone Celebration */}
        <div className="bg-yellow-50 p-4 m-4 rounded-lg shadow-sm border-l-4 border-yellow-400">
          <div className="flex items-start">
            <div className="mr-3 bg-yellow-100 p-2 rounded-full">
              <Award size={24} className="text-yellow-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800 mb-1">Today's Milestone!</h2>
              <p className="text-sm text-gray-700">Emma took her first steps today! This important gross motor skill typically develops between 9-12 months.</p>
              <button
                className="mt-2 text-sm font-medium text-coral-500 hover:text-coral-600"
                onClick={() => {
                  setActiveNewsItem(chatItems[0]);
                  setActiveScreen('newsDetail');
                }}
              >
                View Details →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Recording FAB */}
      <button 
        className="fixed right-4 bottom-20 w-14 h-14 rounded-full bg-coral-500 text-white flex items-center justify-center shadow-lg hover:bg-coral-600 transition-colors"
        onClick={() => {
          setIsRecording(true);
          setRecordingText('');
        }}
      >
        <Mic size={24} />
      </button>
    </div>
  );
  
  const renderResources = () => (
    <div className="flex flex-col h-full bg-peach-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-coral-500 to-teal-500 p-4 shadow-sm flex items-center justify-between">
        <div className="font-bold text-xl text-white flex items-center">
          <BookOpen size={20} className="mr-2" />
          Resources
        </div>
        <div className="flex items-center">
          <Search size={20} className="text-white mr-4" />
          <Filter size={20} className="text-white" />
        </div>
      </div>
      
      {/* Filter tabs */}
      <div className="bg-white p-2 border-b border-gray-200 overflow-x-auto">
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
              activeResourceCategory === 'all' 
                ? 'bg-coral-500 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setActiveResourceCategory('all')}
          >
            All Resources
          </button>
          {montessoriAreas.map(area => (
            <button
              key={area.id}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                activeResourceCategory === area.id 
                  ? `bg-${area.color}-500 text-white` 
                  : `${getColorClass(area.id, 'bg')} ${getColorClass(area.id, 'text')}`
              }`}
              onClick={() => setActiveResourceCategory(area.id)}
            >
              {area.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Resources List */}
      <div className="flex-1 overflow-auto p-4">
        {resources
          .filter(resource => activeResourceCategory === 'all' || resource.area === activeResourceCategory)
          .map(resource => (
            <div key={resource.id} className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
              <div className="flex p-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                  <img 
                    src={resource.thumbnail} 
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-800">{resource.title}</h3>
                    <Star 
                      size={18} 
                      className={resource.favorite ? "text-yellow-400 fill-current" : "text-gray-300"} 
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{resource.summary}</p>
                  <div className="flex mt-2">
                    <span className={`mr-2 text-xs px-2 py-0.5 rounded-full ${getColorClass(resource.area, 'bg')} ${getColorClass(resource.area, 'text')}`}>
                      {montessoriAreas.find(a => a.id === resource.area).name}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {resource.ageRange}
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100 p-3 bg-gray-50 flex justify-between">
                <button className="text-coral-500 text-sm font-medium">Read More</button>
                <button className="text-gray-500 text-sm">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          ))}
      </div>
      
      {/* Voice Search FAB */}
      <button 
        className="fixed right-4 bottom-20 w-14 h-14 rounded-full bg-coral-500 text-white flex items-center justify-center shadow-lg hover:bg-coral-600 transition-colors"
        onClick={() => {
          setIsRecording(true);
          setRecordingText('');
        }}
      >
        <Mic size={24} />
      </button>
    </div>
  );

  const renderFunSection = () => (
    <div className="flex flex-col h-full bg-peach-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-coral-500 to-teal-500 p-4 shadow-sm">
        <div className="font-bold text-xl text-white flex items-center justify-center">
          <Play size={20} className="mr-2" />
          Fun & Learning
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium text-sm ${
              activeFunTab === 'activities' 
                ? 'text-coral-500 border-b-2 border-coral-500' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveFunTab('activities')}
          >
            Child Activities
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium text-sm ${
              activeFunTab === 'workshops' 
                ? 'text-coral-500 border-b-2 border-coral-500' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveFunTab('workshops')}
          >
            Adult Workshops
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <h2 className="font-semibold text-gray-800 mb-3">
          {activeFunTab === 'activities' ? 'Recommended Activities' : 'Recommended Workshops'}
        </h2>
        
        {activities
          .filter(item => activeFunTab === 'activities' ? item.type === 'activity' : item.type === 'workshop')
          .map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
              <div className="flex p-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.summary}</p>
                  
                  {item.type === 'activity' ? (
                    <div className="flex flex-wrap mt-2">
                      <span className={`mr-2 mb-1 text-xs px-2 py-0.5 rounded-full ${getColorClass(item.area, 'bg')} ${getColorClass(item.area, 'text')}`}>
                        {montessoriAreas.find(a => a.id === item.area).name}
                      </span>
                      <span className="mr-2 mb-1 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                        {item.ageRange}
                      </span>
                      <span className="mr-2 mb-1 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                        {item.duration}
                      </span>
                      <span className="mb-1 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                        {item.difficulty}
                      </span>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>{item.duration} • {item.modules} modules</span>
                        <span>{item.progress}% complete</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-teal-500 h-1.5 rounded-full" 
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t border-gray-100 p-3 bg-gray-50 flex justify-between">
                <button className="text-coral-500 text-sm font-medium">
                  {item.type === 'activity' ? 'View Activity' : 'Continue Learning'}
                </button>
                <button className="text-gray-500 text-sm">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          ))}
          
        {activeFunTab === 'workshops' && (
          <div className="bg-peach-100 p-4 rounded-lg shadow-sm">
            <h3 className="flex items-center font-medium text-gray-800 mb-2">
              <Award size={18} className="mr-2 text-coral-500" />
              Completed Courses
            </h3>
            <p className="text-sm text-gray-600">You've completed 2 out of 5 available workshops. Keep learning to earn your certificates!</p>
            <button className="mt-3 text-coral-500 font-medium text-sm">View Certificates</button>
          </div>
        )}
      </div>
    </div>
  );

  // Render the active screen
  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'home':
        return renderHome();
      case 'feed':
        return renderFeed();
      case 'resources':
        return renderResources();
      case 'fun':
        return renderFunSection();
      case 'newsDetail':
        return renderNewsDetail();
      default:
        return renderHome();
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col bg-white min-h-screen">
      <div className="flex-1 flex flex-col">
        {renderActiveScreen()}
      </div>
      
      {/* Only show nav if not in detail view */}
      {activeScreen !== 'newsDetail' && (
        <div className="bg-gray-800 border-t border-gray-700 flex justify-around p-4">
          <button 
            className={`flex flex-col items-center ${activeScreen === 'home' ? 'text-coral-500' : 'text-gray-300'}`}
            onClick={() => setActiveScreen('home')}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button 
            className={`flex flex-col items-center ${activeScreen === 'feed' ? 'text-coral-500' : 'text-gray-300'}`}
            onClick={() => setActiveScreen('feed')}
          >
            <MessageCircle size={24} />
            <span className="text-xs mt-1">Feed</span>
          </button>
          <button 
            className={`flex flex-col items-center ${activeScreen === 'resources' ? 'text-coral-500' : 'text-gray-300'}`}
            onClick={() => setActiveScreen('resources')}
          >
            <BookOpen size={24} />
            <span className="text-xs mt-1">Resources</span>
          </button>
          <button 
            className={`flex flex-col items-center ${activeScreen === 'fun' ? 'text-coral-500' : 'text-gray-300'}`}
            onClick={() => setActiveScreen('fun')}
          >
            <Play size={24} />
            <span className="text-xs mt-1">Fun</span>
          </button>
        </div>
      )}

      {/* Voice Recording Modal */}
      {renderVoiceModal()}
    </div>
  );
};

export default IndabaCareApp;
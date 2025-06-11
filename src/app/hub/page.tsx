'use client';

import { useState, useEffect } from 'react';
import { Search, Calendar, BookOpen, Plus, Home, Play, Settings, MessageCircle, Camera, Music, ShoppingBag, Zap, ArrowLeft, Clock, MapPin } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import UserMenu from '../../components/UserMenu';

// Last updated by manabunagaoka: 2025-06-11 14:05:10

// Define Indaba Care color palette
const COLORS = {
  darkGray: "#4D4D4D",
  coralRed: "#FF6B6B",      // Messages
  brightTeal: "#40BFBF",    // Resources
  sunshineYellow: "#FFD166", // Learning
  hubPurple: "#9B59B6"      // Hub
};

// AppButton Component - Square smartphone-style app button
function AppButton({ 
  title, 
  icon, 
  onClick,
  isExternal = false
}) {
  return (
    <div 
      className="flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 group"
      onClick={onClick}
    >
      {/* App Icon */}
      <div className="mb-2 group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      
      {/* App Name */}
      <span className="text-gray-800 text-xs font-medium text-center px-1 leading-tight">
        {title}
      </span>
    </div>
  );
}

// External app icons - filling the entire square
const WhatsAppIcon = () => (
  <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
    <MessageCircle className="w-8 h-8 text-white" fill="currentColor" />
  </div>
);

const InstagramIcon = () => (
  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg relative">
    <div className="w-10 h-10 border-2 border-white rounded-lg flex items-center justify-center">
      <div className="w-3 h-3 bg-white rounded-full"></div>
    </div>
    <div className="absolute top-2 right-2 w-3 h-3 border-2 border-white rounded-full"></div>
  </div>
);

const TikTokIcon = () => (
  <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shadow-lg relative">
    <div className="relative">
      <div className="w-4 h-6 bg-red-500 rounded-sm transform -rotate-12 absolute -left-1"></div>
      <div className="w-4 h-6 bg-blue-400 rounded-sm transform rotate-12 absolute right-0 top-1"></div>
      <div className="w-4 h-6 bg-white rounded-sm relative z-10"></div>
    </div>
  </div>
);

const FacebookIcon = () => (
  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
    <div className="text-white font-bold text-2xl">f</div>
  </div>
);

const ChatGPTIcon = () => (
  <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
    <div className="text-white font-bold text-lg">AI</div>
  </div>
);

const AmazonIcon = () => (
  <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg relative">
    <div className="text-black font-bold text-xl">a</div>
    <div className="absolute bottom-2 left-2 right-2 h-0.5 bg-orange-600 rounded-full"></div>
  </div>
);

// Calendar app icon
const CalendarIcon = () => (
  <div className="w-14 h-14 bg-white rounded-2xl shadow-lg border border-gray-200 relative overflow-hidden">
    <div className="bg-red-500 h-3 w-full"></div>
    <div className="p-1">
      <div className="text-xs text-gray-600 text-center mb-1">JUN</div>
      <div className="text-lg font-bold text-center text-black">11</div>
    </div>
    <div className="absolute top-1 left-3 w-1 h-4 bg-gray-400 rounded-full"></div>
    <div className="absolute top-1 right-3 w-1 h-4 bg-gray-400 rounded-full"></div>
  </div>
);

// Album app icon
const AlbumIcon = () => (
  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-1 bg-white rounded-xl p-1">
      <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-pink-300 rounded-lg relative">
        <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-100 rounded-full"></div>
        <div className="absolute bottom-1 left-1 w-3 h-1 bg-green-400 rounded-full"></div>
        <div className="absolute bottom-2 right-2 w-1 h-2 bg-blue-400 rounded-full"></div>
      </div>
    </div>
  </div>
);

// Add App placeholder icon
const AddAppIcon = () => (
  <div className="w-14 h-14 border-2 border-dashed border-gray-400 rounded-2xl flex items-center justify-center bg-gray-100">
    <Plus className="w-8 h-8 text-gray-400" strokeWidth={2} />
  </div>
);

// Calendar App Component
function CalendarApp({ onBack }) {
  const events = [
    { id: 1, time: '9:00 AM', title: 'Morning Routine with Emma', type: 'routine', location: 'Home', color: 'bg-blue-500' },
    { id: 2, time: '10:30 AM', title: 'Sensorial Activities', type: 'activity', location: 'Play Room', color: 'bg-purple-500' },
    { id: 3, time: '12:00 PM', title: 'Lunch Preparation', type: 'practical', location: 'Kitchen', color: 'bg-green-500' },
    { id: 4, time: '2:00 PM', title: 'Dr. Johnson - Emma\'s Checkup', type: 'appointment', location: 'Pediatric Center', color: 'bg-red-500' },
    { id: 5, time: '4:00 PM', title: 'Park Visit', type: 'outdoor', location: 'Central Park', color: 'bg-yellow-500' }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 flex justify-between items-center shadow-sm border-b border-[#9B59B6]">
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

      {/* App Header */}
      <div className="bg-white p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-[#4D4D4D]" />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-xl">
              <Calendar className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#4D4D4D]">Calendar</h1>
              <p className="text-sm text-gray-600">June 2025</p>
            </div>
          </div>
        </div>
        
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-blue-600 transition-colors">
          <Plus size={16} />
          Add Event
        </button>
      </div>

      {/* Today's Events */}
      <div className="flex-1 overflow-auto p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Today's Schedule - June 11
          </h2>
          <p className="text-sm text-gray-600">{events.length} events planned</p>
        </div>

        <div className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className={`w-3 h-3 ${event.color} rounded-full mt-2 flex-shrink-0`}></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{event.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      event.type === 'routine' ? 'bg-blue-100 text-blue-700' :
                      event.type === 'activity' ? 'bg-purple-100 text-purple-700' :
                      event.type === 'practical' ? 'bg-green-100 text-green-700' :
                      event.type === 'appointment' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Add Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-blue-700 font-medium hover:bg-blue-100 transition-colors">
            + Add Routine
          </button>
          <button className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-purple-700 font-medium hover:bg-purple-100 transition-colors">
            + Add Activity
          </button>
        </div>
      </div>
    </div>
  );
}

// Album App Component
function AlbumApp({ onBack }) {
  const montessoriAreas = [
    {
      id: 'practical',
      name: 'Practical Life',
      description: 'Spooning, pouring, food prep, cleaning',
      color: 'bg-green-500',
      lightColor: 'bg-green-100',
      textColor: 'text-green-700',
      items: [
        { name: 'Pouring Water Set', image: '🥤', status: 'available' },
        { name: 'Cleaning Cloths', image: '🧽', status: 'in-use' },
        { name: 'Food Prep Tools', image: '🔪', status: 'available' },
        { name: 'Spooning Activity', image: '🥄', status: 'needs-cleaning' }
      ]
    },
    {
      id: 'sensorial',
      name: 'Sensorial',
      description: 'Pink Tower, Color Boxes, Geometric Solids',
      color: 'bg-purple-500',
      lightColor: 'bg-purple-100',
      textColor: 'text-purple-700',
      items: [
        { name: 'Pink Tower', image: '🗼', status: 'available' },
        { name: 'Color Boxes', image: '🎨', status: 'available' },
        { name: 'Geometric Solids', image: '🔷', status: 'in-use' },
        { name: 'Texture Fabrics', image: '🧶', status: 'available' }
      ]
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      description: 'Numerals & Counters, Bead Stairs, Boards',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-100',
      textColor: 'text-blue-700',
      items: [
        { name: 'Number Rods', image: '📏', status: 'available' },
        { name: 'Bead Stairs', image: '📿', status: 'available' },
        { name: 'Counting Boards', image: '🔢', status: 'in-use' },
        { name: 'Numerals & Counters', image: '🧮', status: 'available' }
      ]
    },
    {
      id: 'language',
      name: 'Language',
      description: 'Sandpaper Letters, Moveable Alphabet',
      color: 'bg-yellow-500',
      lightColor: 'bg-yellow-100',
      textColor: 'text-yellow-700',
      items: [
        { name: 'Sandpaper Letters', image: '📝', status: 'available' },
        { name: 'Moveable Alphabet', image: '🔤', status: 'available' },
        { name: 'Phonogram Cards', image: '📋', status: 'in-use' },
        { name: 'Reading Books', image: '📚', status: 'available' }
      ]
    },
    {
      id: 'culture',
      name: 'Culture',
      description: 'Geography, Botany, Zoology, Art, Music',
      color: 'bg-red-500',
      lightColor: 'bg-red-100',
      textColor: 'text-red-700',
      items: [
        { name: 'World Map Puzzle', image: '🗺️', status: 'available' },
        { name: 'Botany Cards', image: '🌿', status: 'available' },
        { name: 'Animal Figurines', image: '🦁', status: 'in-use' },
        { name: 'Musical Instruments', image: '🎵', status: 'available' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'in-use': return 'bg-blue-100 text-blue-800';
      case 'needs-cleaning': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 flex justify-between items-center shadow-sm border-b border-[#9B59B6]">
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

      {/* App Header */}
      <div className="bg-white p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-[#4D4D4D]" />
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-2 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#4D4D4D]">Toolkit Album</h1>
                <p className="text-sm text-gray-600">Montessori Materials Organizer</p>
              </div>
            </div>
          </div>
          
          <button className="bg-[#9B59B6] text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-[#8E44AD] transition-colors">
            <Plus size={16} />
            Add Item
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {/* Overview Table */}
        <div className="bg-white rounded-xl shadow-sm border mb-6">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Montessori Areas Overview</h2>
            <p className="text-sm text-gray-600">Organize your toolkit by developmental domains</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-700">Area</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Example Contents/Materials</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {montessoriAreas.map((area, index) => (
                  <tr key={area.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 ${area.color} rounded-full`}></div>
                        <span className="font-medium text-gray-800">{area.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 text-sm">{area.description}</td>
                    <td className="p-4">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        {area.items.length} items
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
            <div className="text-2xl font-bold text-green-600">
              {montessoriAreas.reduce((acc, area) => 
                acc + area.items.filter(item => item.status === 'available').length, 0
              )}
            </div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
            <div className="text-2xl font-bold text-blue-600">
              {montessoriAreas.reduce((acc, area) => 
                acc + area.items.filter(item => item.status === 'in-use').length, 0
              )}
            </div>
            <div className="text-sm text-gray-600">In Use</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
            <div className="text-2xl font-bold text-orange-600">
              {montessoriAreas.reduce((acc, area) => 
                acc + area.items.filter(item => item.status === 'needs-cleaning').length, 0
              )}
            </div>
            <div className="text-sm text-gray-600">Needs Attention</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Hub Page
export default function HubPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('hub');
  const [currentApp, setCurrentApp] = useState(null); // Track which app is open
  
  // Set initial active tab based on pathname
  useEffect(() => {
    if (pathname?.startsWith('/messages')) setActiveTab('messages');
    else if (pathname?.startsWith('/resources')) setActiveTab('resources');
    else if (pathname?.startsWith('/learning')) setActiveTab('learning');
    else if (pathname?.startsWith('/hub')) setActiveTab('hub');
  }, [pathname]);
  
  // Function to handle tab navigation with immediate feedback
  const navigateToTab = (tab) => {
    setActiveTab(tab); // Immediately update the active tab
    sessionStorage.setItem('majorTabSwitch', 'true');
    
    // Navigate to the appropriate route
    switch (tab) {
      case 'messages':
        router.push('/messages');
        break;
      case 'resources':
        router.push('/resources');
        break;
      case 'learning':
        router.push('/learning');
        break;
      case 'hub':
        router.push('/hub');
        break;
      default:
        break;
    }
  };

  const handleAppClick = (appId, isExternal = false, url = null) => {
    if (appId === 'add-app') {
      console.log('Opening app selection/addition interface');
      // You could navigate to an app store or selection page here
      // router.push('/hub/add-app');
      return;
    }
    
    if (appId === 'calendar') {
      setCurrentApp('calendar');
      return;
    }
    
    if (appId === 'album') {
      setCurrentApp('album');
      return;
    }
    
    if (isExternal && url) {
      window.open(url, '_blank');
    } else {
      console.log(`Opening ${appId}`);
      router.push(`/hub/${appId}`);
    }
  };

  // App definitions
  const apps = [
    {
      id: 'calendar',
      title: 'Calendar',
      icon: <CalendarIcon />,
      isExternal: false
    },
    {
      id: 'album',
      title: 'Album',
      icon: <AlbumIcon />,
      isExternal: false
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      icon: <WhatsAppIcon />,
      isExternal: true,
      url: 'https://web.whatsapp.com'
    },
    {
      id: 'instagram',
      title: 'Instagram',
      icon: <InstagramIcon />,
      isExternal: true,
      url: 'https://instagram.com'
    },
    {
      id: 'tiktok',
      title: 'TikTok',
      icon: <TikTokIcon />,
      isExternal: true,
      url: 'https://tiktok.com'
    },
    {
      id: 'facebook',
      title: 'Facebook',
      icon: <FacebookIcon />,
      isExternal: true,
      url: 'https://facebook.com'
    },
    {
      id: 'chatgpt',
      title: 'ChatGPT',
      icon: <ChatGPTIcon />,
      isExternal: true,
      url: 'https://chat.openai.com'
    },
    {
      id: 'amazon',
      title: 'Amazon',
      icon: <AmazonIcon />,
      isExternal: true,
      url: 'https://amazon.com'
    },
    {
      id: 'add-app',
      title: 'Add App',
      icon: <AddAppIcon />,
      isExternal: false
    }
  ];

  // Filter apps based on search term
  const filteredApps = apps.filter(app => 
    app.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render the appropriate app
  if (currentApp === 'calendar') {
    return <CalendarApp onBack={() => setCurrentApp(null)} />;
  }
  
  if (currentApp === 'album') {
    return <AlbumApp onBack={() => setCurrentApp(null)} />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 flex justify-between items-center shadow-sm border-b border-[#9B59B6]">
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

      {/* Page Header with Search */}
      <div className="bg-white p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-[#4D4D4D]">Hub</h1>
          <div className="bg-[#9B59B6]/10 text-[#9B59B6] px-2 py-1 rounded-full text-xs font-medium">
            {filteredApps.length} Apps
          </div>
        </div>
        
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search apps..."
            className="w-full py-1.5 pl-8 pr-3 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#9B59B6] text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-2.5 top-2 text-gray-400" size={16} />
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-white px-4 py-3 border-b flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#FFD166] rounded-full"></div>
          <span className="text-gray-600">2 calendar events today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#40BFBF] rounded-full"></div>
          <span className="text-gray-600">3 new photos in album</span>
        </div>
      </div>

      {/* Apps Grid - Smartphone Style */}
      <div className="flex-1 overflow-auto pb-20 px-6 pt-6">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {filteredApps.map((app) => (
            <AppButton
              key={app.id}
              title={app.title}
              icon={app.icon}
              isExternal={app.isExternal}
              onClick={() => handleAppClick(app.id, app.isExternal, app.url)}
            />
          ))}
        </div>
        
        {filteredApps.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No apps found</h3>
            <p className="text-gray-500">No apps match "{searchTerm}"</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search terms</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation - With consistent styling for all buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#4D4D4D] flex w-full shadow-lg">
        {/* Messages Button */}
        <button 
          className="flex flex-col items-center justify-center flex-1 py-3"
          onClick={() => navigateToTab('messages')}
        >
          <Home 
            size={20} 
            style={{ color: activeTab === 'messages' ? COLORS.coralRed : '#d1d5db' }}
          />
          <span 
            style={{ color: activeTab === 'messages' ? 'white' : '#d1d5db' }}
            className="text-xs mt-1"
          >
            Messages
          </span>
        </button>
        
        {/* Resources Button */}
        <button 
          className="flex flex-col items-center justify-center flex-1 py-3"
          onClick={() => navigateToTab('resources')}
        >
          <Play 
            size={20}
            style={{ color: activeTab === 'resources' ? COLORS.brightTeal : '#d1d5db' }}
          />
          <span 
            style={{ color: activeTab === 'resources' ? 'white' : '#d1d5db' }}
            className="text-xs mt-1"
          >
            Resources
          </span>
        </button>
        
        {/* Learning Button */}
        <button 
          className="flex flex-col items-center justify-center flex-1 py-3"
          onClick={() => navigateToTab('learning')}
        >
          <BookOpen 
            size={20}
            style={{ color: activeTab === 'learning' ? COLORS.sunshineYellow : '#d1d5db' }}
          />
          <span 
            style={{ color: activeTab === 'learning' ? 'white' : '#d1d5db' }}
            className="text-xs mt-1"
          >
            Learning
          </span>
        </button>
        
        {/* Hub Button */}
        <button 
          className="flex flex-col items-center justify-center flex-1 py-3"
          onClick={() => navigateToTab('hub')}
        >
          <Settings 
            size={20} 
            style={{ color: activeTab === 'hub' ? COLORS.hubPurple : '#d1d5db' }}
          />
          <span 
            style={{ color: activeTab === 'hub' ? 'white' : '#d1d5db' }}
            className="text-xs mt-1"
          >
            Hub
          </span>
        </button>
      </div>
    </div>
  );
}
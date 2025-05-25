'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut } from 'lucide-react';

export default function UserMenu() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState('Guest');
  const router = useRouter();

  // Get user info from localStorage
  useEffect(() => {
    const userName = localStorage.getItem('indaba_user_name') || 'Guest';
    setCurrentUser(userName);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('indaba_logged_in');
    localStorage.removeItem('indaba_user_name');
    localStorage.removeItem('indaba_user_type');
    localStorage.removeItem('indaba_profile_complete');
    router.push('/auth');
  };

  return (
    <div className="flex items-center relative">
      <div 
        className="flex items-center cursor-pointer"
        onClick={() => setShowUserMenu(!showUserMenu)}
      >
        <User size={20} className="mr-2 text-[#4D4D4D]" />
        <span className="text-[#4D4D4D]">{currentUser}</span>
      </div>
      
      {/* Full Settings Menu Dropdown */}
      {showUserMenu && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 min-w-80 max-h-96 overflow-y-auto">
          <div className="p-4">
            {/* User Info Header */}
            <div className="border-b-2 border-gray-100 pb-4 mb-4">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-[#FFD6CC] rounded-full flex items-center justify-center mr-3">
                  <User size={20} className="text-[#FF6B6B]" />
                </div>
                <div>
                  <p className="font-semibold text-[#4D4D4D]">{currentUser}</p>
                  <p className="text-sm text-gray-600">Caregiver</p>
                </div>
              </div>
              <div className="bg-[#FFD6CC] p-3 rounded-lg text-sm text-[#4D4D4D]">
                <p><strong>Email:</strong> guest@indabacare.com</p>
                <p><strong>Location:</strong> Cape Town</p>
              </div>
            </div>

            {/* Profile Settings */}
            <div className="border-b border-gray-100 pb-4 mb-4">
              <h3 className="font-semibold text-sm text-gray-700 mb-3">Profile Settings</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <User size={16} className="text-[#FF6B6B] mr-3" />
                  <span className="text-sm text-[#4D4D4D]">Edit Profile</span>
                </button>
                <button className="w-full flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#40BFBF] mr-3">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                  <span className="text-sm text-[#4D4D4D]">Change Photo</span>
                </button>
                <button className="w-full flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#FFD166] mr-3">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                  <span className="text-sm text-[#4D4D4D]">Notifications</span>
                </button>
              </div>
            </div>

            {/* Account Settings */}
            <div className="border-b border-gray-100 pb-4 mb-4">
              <h3 className="font-semibold text-sm text-gray-700 mb-3">Account Settings</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#9B59B6] mr-3">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.15a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                  <span className="text-sm text-[#4D4D4D]">Privacy Settings</span>
                </button>
                <button className="w-full flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#40BFBF] mr-3">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <circle cx="12" cy="16" r="1"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <span className="text-sm text-[#4D4D4D]">Security</span>
                </button>
                <button className="w-full flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#FFD166] mr-3">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="8.5" cy="7" r="4"/>
                    <polyline points="17,11 19,13 23,9"/>
                  </svg>
                  <span className="text-sm text-[#4D4D4D]">Family & Children</span>
                </button>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
            >
              <LogOut size={16} className="mr-3" />
              Log Out
            </button>
          </div>
        </div>
      )}

      {/* Click outside to close menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  );
}
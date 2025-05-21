"use client";

import React, { useState, useRef, ChangeEvent, MouseEvent } from 'react';
import { Mic, Camera, Send, X, Plus, User, Home, BookOpen, Play, Calendar, Bell, Video } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Post types
type PostType = 'admin' | 'employer' | 'nanny' | 'subscription';

// Post interface
interface Post {
  id: number;
  text: string;
  timestamp: string;
  images: string[];
  videos: string[];
  user: string;
  userRole: string;
  type: PostType;
  isImportant?: boolean;
}

// Schedule event interface
interface ScheduleEvent {
  id: number;
  title: string;
  start: string;
  end: string;
  day: string;
  color: string;
}

// Milestone interface
interface Milestone {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  color: string;
}

// New post interface
interface NewPost {
  text: string;
  images: string[];
  videos: string[];
}

// Define Indaba Care color palette as CSS variables for consistent use
const COLORS = {
  // Primary Colors
  darkGray: "#4D4D4D",
  coralRed: "#FF6B6B",
  softPeach: "#FFBCAB",
  
  // Secondary Colors
  lightPink: "#FFD6CC",
  mauvePink: "#D99B9B",
  
  // Accent Colors
  brightTeal: "#40BFBF",
  sunshineYellow: "#FFD166",
  
  // Additional Colors
  purple: "#9B59B6",
  lightPurple: "#D2B4DE",
  lightBlue: "#D6EAF8",
  lightGreen: "#ABEBC6",
  lightOrange: "#F8C471"
};

// Development Path Icon Component for Milestones
const PathIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3" />
    <circle cx="18" cy="18" r="3" />
    <path d="M6 9v3a3 3 0 0 0 3 3h6" />
    <line x1="9" y1="12" x2="18" y2="12" />
  </svg>
);

// Image Icon Component
const ImageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

// Smile Icon Component
const SmileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

// Sample feed items with different types
const sampleFeedItems: Post[] = [
  {
    id: 1,
    text: "IMPORTANT: We're excited to announce our upcoming parent-educator conference on May 25th. Please check your email for schedule details and confirmation. Contact us if you haven't received your invitation.",
    timestamp: "2025-05-16 10:30:00",
    images: ["/api/placeholder/600/400"],
    videos: [],
    user: "Indaba Admin",
    userRole: "Administrator",
    type: 'admin',
    isImportant: true
  },
  {
    id: 2,
    text: "Emma showed great progress with her fine motor skills today! She was able to use scissors properly for the first time, cutting along straight lines with minimal assistance.",
    timestamp: "2025-05-16 01:37:40",
    images: [],
    videos: [],
    user: "manabunagaoka",
    userRole: "Caregiver",
    type: 'nanny'
  },
  {
    id: 3,
    text: "Lucas built an impressive tower with the wooden blocks today. He demonstrated excellent spatial awareness and patience, carefully balancing each block. This activity is helping develop his hand-eye coordination and concentration.",
    timestamp: "2025-05-15 20:30:05",
    images: ["/api/placeholder/600/400"],
    videos: [],
    user: "manabunagaoka",
    userRole: "Caregiver",
    type: 'nanny'
  },
  {
    id: 4,
    text: "Our sensory bin exploration with rice and hidden objects was a big hit today! Sophia spent nearly 30 minutes fully engaged, finding all the small treasures. This activity supports tactile discrimination and concentration.",
    timestamp: "2025-05-15 18:45:33",
    images: [],
    videos: [],
    user: "manabunagaoka",
    userRole: "Caregiver",
    type: 'nanny'
  },
  {
    id: 5,
    text: "You've been subscribed to the Early Literacy Program! Each week, you'll receive age-appropriate book recommendations and literacy activities to enjoy with your child.",
    timestamp: "2025-05-15 15:20:15",
    images: ["/api/placeholder/600/400"],
    videos: [],
    user: "Indaba Services",
    userRole: "Service",
    type: 'subscription'
  },
  {
    id: 6,
    text: "We need to discuss changing the pickup schedule for next week. Can we arrange a call tomorrow afternoon?",
    timestamp: "2025-05-15 14:10:22",
    images: [],
    videos: [],
    user: "parentuser123",
    userRole: "Parent",
    type: 'employer'
  }
];

// Sample schedule data for MVP testing
const sampleScheduleData: ScheduleEvent[] = [
  {
    id: 1,
    title: "Morning Drop-off",
    start: "8:00 AM",
    end: "8:30 AM",
    day: "Today",
    color: COLORS.coralRed
  },
  {
    id: 2,
    title: "Afternoon Pickup",
    start: "5:00 PM",
    end: "5:30 PM",
    day: "Today",
    color: COLORS.brightTeal
  },
  {
    id: 3,
    title: "Parent-Teacher Meeting",
    start: "3:00 PM",
    end: "4:00 PM",
    day: "Tomorrow",
    color: COLORS.sunshineYellow
  },
  {
    id: 4,
    title: "Special Activity: Art Class",
    start: "10:00 AM",
    end: "11:30 AM",
    day: "May 21",
    color: COLORS.purple
  }
];

// Sample milestones data for MVP testing
const sampleMilestones: Milestone[] = [
  {
    id: 1,
    title: "Fine Motor Skills",
    description: "Emma can now use scissors properly",
    date: "May 16, 2025",
    category: "Physical Development",
    color: COLORS.coralRed
  },
  {
    id: 2,
    title: "Language Development",
    description: "Lucas is using complete sentences consistently",
    date: "May 14, 2025",
    category: "Communication",
    color: COLORS.brightTeal
  },
  {
    id: 3,
    title: "Social Skills",
    description: "Sophia is sharing toys with other children",
    date: "May 10, 2025",
    category: "Social-Emotional",
    color: COLORS.purple
  },
  {
    id: 4,
    title: "Mathematics",
    description: "Noah can count to 20 without assistance",
    date: "May 8, 2025",
    category: "Cognitive Development",
    color: COLORS.mauvePink
  }
];

export default function HomePage() {
  // Separate states for different modals and functionality
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(false);
  const [isMilestonesOpen, setIsMilestonesOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  // Post data state
  const [newPost, setNewPost] = useState<NewPost>({ text: '', images: [], videos: [] });
  const [feed, setFeed] = useState<Post[]>(sampleFeedItems);
  
  // Input refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  
  // User info
  const currentUser = 'manabunagaoka';
  const currentTime = new Date().toISOString().replace('T', ' ').substring(0, 19);

  // Get avatar background color based on user type
  const getAvatarStyle = (type: PostType): React.CSSProperties => {
    switch(type) {
      case 'admin':
        return {
          backgroundColor: COLORS.softPeach
        };
      case 'subscription':
        return {
          backgroundColor: COLORS.lightBlue
        };
      case 'employer':
        return {
          backgroundColor: COLORS.lightPurple
        };
      default:
        return {
          backgroundColor: COLORS.lightPink
        };
    }
  };

  // Get icon color based on user type
  const getIconColor = (type: PostType): string => {
    switch(type) {
      case 'admin':
        return COLORS.coralRed;
      case 'subscription':
        return COLORS.brightTeal;
      case 'employer':
        return COLORS.purple;
      default:
        return COLORS.coralRed;
    }
  };

  const handleVoiceRecording = (): void => {
    // Start recording without setting any other states
    setIsRecording(true);
  };
  
  const handleStopRecording = (): void => {
    // Just close the recording modal
    setIsRecording(false);
  };
  
  const handleRecordingComplete = (): void => {
    // This simulates successful voice recording completion
    setNewPost({
      ...newPost,
      text: "Noah did a wonderful job with his practical life exercises today. He practiced pouring water between containers and managed to do it with minimal spills. His concentration is really improving!"
    });
    setIsRecording(false);
    setIsEditing(true);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setNewPost({
      ...newPost,
      text: e.target.value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // For MVP, just simulate adding placeholder images
    if (e.target.files && e.target.files.length > 0) {
      setNewPost({
        ...newPost,
        images: [...newPost.images, "/api/placeholder/600/400"]
      });
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // For MVP, just simulate adding placeholder videos
    if (e.target.files && e.target.files.length > 0) {
      setNewPost({
        ...newPost,
        videos: [...newPost.videos, "/api/placeholder/400/300"]
      });
    }
  };

  const handlePost = (): void => {
    if (newPost.text.trim()) {
      const newFeedItem: Post = {
        id: feed.length + 1,
        text: newPost.text,
        timestamp: currentTime,
        images: newPost.images,
        videos: newPost.videos,
        user: currentUser,
        userRole: "Caregiver",
        type: 'nanny'
      };

      setFeed([newFeedItem, ...feed]);
      setNewPost({ text: '', images: [], videos: [] });
      setIsEditing(false);
    }
  };

  const removeImage = (index: number): void => {
    setNewPost({
      ...newPost,
      images: newPost.images.filter((_, i) => i !== index)
    });
  };

  const removeVideo = (index: number): void => {
    setNewPost({
      ...newPost,
      videos: newPost.videos.filter((_, i) => i !== index)
    });
  };

  const handleScheduleOpen = (): void => {
    setIsScheduleOpen(true);
  };

  const handleMilestonesOpen = (): void => {
    setIsMilestonesOpen(true);
  };

  // Get post background color based on post type
  const getPostBackgroundStyle = (type: PostType): React.CSSProperties => {
    switch(type) {
      case 'admin':
        return {
          backgroundColor: '#FFF3F3',
          borderLeft: `4px solid ${COLORS.coralRed}`
        };
      case 'subscription':
        return {
          backgroundColor: '#EBF9F9',
          borderLeft: `4px solid ${COLORS.brightTeal}`
        };
      case 'employer':
        return {
          backgroundColor: '#F5F0FA',
          borderLeft: `4px solid ${COLORS.purple}`
        };
      default:
        return {
          backgroundColor: '#FFFFFF'
        };
    }
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    borderBottom: `1px solid ${COLORS.coralRed}`
  };

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.darkGray,
    display: 'flex',
    justifyContent: 'space-around',
    padding: '0.75rem 1rem',
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 10
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header - White with Coral Red accents */}
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ height: '2.5rem', marginRight: '0.75rem', borderRadius: '0.375rem', overflow: 'hidden', position: 'relative' }}>
            <img 
              src="/images/indabacarelogo.jpg" 
              alt="Indaba Care Logo" 
              style={{ height: '2.5rem', width: 'auto', objectFit: 'contain' }}
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.src = "/api/placeholder/50/50";
              }} 
            />
          </div>
          <h1 style={{ fontWeight: 'bold', fontSize: '1.25rem', color: COLORS.darkGray }}>Indaba Care</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <User size={20} style={{ marginRight: '0.5rem', color: COLORS.darkGray }} />
          <span style={{ color: COLORS.darkGray }}>{currentUser}</span>
        </div>
      </div>
      
      {/* Content - Simplified Feed */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '6rem' }}>
        {/* New Post Editor (if editing) */}
        {isEditing && (
          <div style={{ backgroundColor: 'white', padding: '1rem', marginBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ marginBottom: '0.75rem' }}>
              <textarea
                style={{ 
                  width: '100%', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '0.5rem', 
                  padding: '0.75rem', 
                  resize: 'none', 
                  minHeight: '100px',
                  outline: 'none'
                }}
                placeholder="What's happening with your child today?"
                value={newPost.text}
                onChange={handleTextChange}
              />
            </div>
            
            {/* Uploaded Images Preview */}
            {newPost.images.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <h4 style={{ width: '100%', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Photos:</h4>
                {newPost.images.map((img, index) => (
                  <div key={`img-${index}`} style={{ position: 'relative' }}>
                    <img src={img} alt="Upload preview" style={{ width: '5rem', height: '5rem', objectFit: 'cover', borderRadius: '0.25rem' }} />
                    <button 
                      style={{ 
                        position: 'absolute', 
                        top: '-0.5rem', 
                        right: '-0.5rem', 
                        backgroundColor: COLORS.coralRed, 
                        borderRadius: '9999px', 
                        padding: '0.25rem', 
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      onClick={() => removeImage(index)}
                      type="button"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Uploaded Videos Preview */}
            {newPost.videos.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <h4 style={{ width: '100%', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Videos:</h4>
                {newPost.videos.map((video, index) => (
                  <div key={`video-${index}`} style={{ position: 'relative' }}>
                    <div style={{ width: '6rem', height: '6rem', backgroundColor: '#e5e7eb', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Video size={24} style={{ color: '#6b7280' }} />
                    </div>
                    <button 
                      style={{ 
                        position: 'absolute', 
                        top: '-0.5rem', 
                        right: '-0.5rem', 
                        backgroundColor: COLORS.coralRed, 
                        borderRadius: '9999px', 
                        padding: '0.25rem', 
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      onClick={() => removeVideo(index)}
                      type="button"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  style={{ padding: '0.5rem', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer' }}
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                >
                  <ImageIcon />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  multiple
                />
                <button 
                  style={{ padding: '0.5rem', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer' }}
                  onClick={() => videoInputRef.current?.click()}
                  type="button"
                >
                  <Video size={20} />
                </button>
                <input 
                  type="file" 
                  ref={videoInputRef} 
                  style={{ display: 'none' }} 
                  accept="video/*" 
                  onChange={handleVideoUpload}
                  multiple
                />
                <button 
                  style={{ padding: '0.5rem', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer' }}
                  type="button"
                >
                  <Camera size={20} />
                </button>
                <button 
                  style={{ padding: '0.5rem', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer' }}
                  type="button"
                >
                  <SmileIcon />
                </button>
              </div>
              
              <button 
                style={{ 
                  backgroundColor: COLORS.coralRed, 
                  color: 'white', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '9999px', 
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onClick={handlePost}
                type="button"
              >
                <Send size={16} style={{ marginRight: '0.25rem' }} />
                Post
              </button>
            </div>
          </div>
        )}
        
        {/* Feed Items - Simplified without badges */}
        {feed.map(item => (
          <div key={item.id} style={{ ...getPostBackgroundStyle(item.type), marginBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
            {/* Post Header */}
            <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  ...getAvatarStyle(item.type), 
                  width: '2.5rem', 
                  height: '2.5rem', 
                  borderRadius: '9999px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  {item.type === 'admin' ? <Bell size={20} style={{ color: getIconColor(item.type) }} /> : 
                   item.type === 'subscription' ? <BookOpen size={20} style={{ color: getIconColor(item.type) }} /> : 
                   <User size={20} style={{ color: getIconColor(item.type) }} />}
                </div>
                <div style={{ marginLeft: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ fontWeight: '500', color: COLORS.darkGray }}>{item.user}</p>
                    {item.isImportant && (
                      <span style={{ 
                        marginLeft: '0.5rem', 
                        padding: '0 0.5rem', 
                        fontSize: '0.75rem', 
                        backgroundColor: '#fee2e2', 
                        color: '#b91c1c', 
                        borderRadius: '9999px',
                        lineHeight: '1.25rem'
                      }}>Important</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>{item.timestamp}</p>
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af', margin: '0 0.25rem' }}>•</span>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>{item.userRole}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Post Text */}
            <div style={{ padding: '0 1rem 0.5rem 1rem' }}>
              <p style={{ color: COLORS.darkGray }}>{item.text}</p>
            </div>
            
            {/* Post Images */}
            {item.images.length > 0 && (
              <div style={{ padding: '0 1rem 0.5rem 1rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {item.images.map((img, index) => (
                    <img 
                      key={index} 
                      src={img} 
                      alt="Post content" 
                      style={{ maxHeight: '14rem', borderRadius: '0.5rem', objectFit: 'cover' }} 
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Post Videos */}
            {item.videos.length > 0 && (
              <div style={{ padding: '0 1rem 1rem 1rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {item.videos.map((video, index) => (
                    <div key={index} style={{ position: 'relative', borderRadius: '0.5rem', overflow: 'hidden' }}>
                      <div style={{ width: '100%', height: '12rem', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Play size={48} style={{ color: '#6b7280' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div style={{ padding: '0 1rem 1rem 1rem' }}>
              {/* Action buttons like comment, emoji reactions could go here */}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Buttons - Ensure they always appear when not editing */}
      
      {/* Milestones Button */}
      {!isEditing && (
        <div 
          style={{
            position: 'fixed',
            right: '1rem',
            bottom: '272px',
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '9999px',
            backgroundColor: COLORS.purple,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            zIndex: 20,
            cursor: 'pointer'
          }}
          onClick={handleMilestonesOpen}
        >
          <PathIcon />
        </div>
      )}
      
      {/* Calendar/Schedule Button */}
      {!isEditing && (
        <div 
          style={{
            position: 'fixed',
            right: '1rem',
            bottom: '204px',
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '9999px',
            backgroundColor: COLORS.sunshineYellow,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            zIndex: 20,
            cursor: 'pointer'
          }}
          onClick={handleScheduleOpen}
        >
          <Calendar size={24} />
        </div>
      )}
      
      {/* Voice Recording Button */}
      {!isEditing && (
        <div 
          style={{
            position: 'fixed',
            right: '1rem',
            bottom: '136px',
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '9999px',
            backgroundColor: COLORS.coralRed,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            zIndex: 20,
            cursor: 'pointer'
          }}
          onClick={handleVoiceRecording}
        >
          <Mic size={24} />
        </div>
      )}

      {/* Text Entry Button */}
      {!isEditing && (
        <div 
          style={{
            position: 'fixed',
            right: '1rem',
            bottom: '68px',
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '9999px',
            backgroundColor: COLORS.brightTeal,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            zIndex: 20,
            cursor: 'pointer'
          }}
          onClick={() => setIsEditing(true)}
        >
          <Plus size={24} />
        </div>
      )}

      {/* Voice Recording Modal - Updated with separate cancel and done buttons */}
      {isRecording && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          zIndex: 50, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          backgroundColor: 'rgba(0, 0, 0, 0.5)' 
        }}>
          <div style={{ backgroundColor: 'white', width: '91.666667%', maxWidth: '28rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
            <div style={{ backgroundColor: COLORS.coralRed, padding: '1rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontWeight: '500' }}>Voice Recording</h3>
              <button 
                onClick={handleStopRecording}
                style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}
                type="button"
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <div style={{ 
                  width: '5rem', 
                  height: '5rem', 
                  borderRadius: '9999px', 
                  backgroundColor: `${COLORS.coralRed}33`, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  animation: 'pulse 2s infinite'
                }}>
                  <Mic size={32} style={{ color: COLORS.coralRed }} />
                </div>
              </div>
              
              <div style={{ 
                marginBottom: '1rem', 
                backgroundColor: '#f9fafb', 
                padding: '0.75rem', 
                borderRadius: '0.5rem', 
                minHeight: '100px', 
                border: '1px solid #e5e7eb' 
              }}>
                <p style={{ color: '#6b7280' }}>Listening... speak now</p>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  style={{ 
                    flex: 1,
                    backgroundColor: '#f3f4f6', 
                    color: '#374151', 
                    padding: '0.5rem 0', 
                    borderRadius: '0.5rem', 
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onClick={handleStopRecording}
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  style={{ 
                    flex: 1,
                    backgroundColor: COLORS.coralRed, 
                    color: 'white', 
                    padding: '0.5rem 0', 
                    borderRadius: '0.5rem', 
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onClick={handleRecordingComplete}
                  type="button"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal - Placeholder for FullCalendar integration */}
      {isScheduleOpen && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          zIndex: 50, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          backgroundColor: 'rgba(0, 0, 0, 0.5)' 
        }}>
          <div style={{ backgroundColor: 'white', width: '91.666667%', maxWidth: '28rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
            <div style={{ backgroundColor: COLORS.sunshineYellow, padding: '1rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontWeight: '500' }}>Schedule</h3>
              <button 
                onClick={() => setIsScheduleOpen(false)}
                style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}
                type="button"
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{ padding: '1.25rem' }}>
              <div style={{ backgroundColor: '#f9fafb', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', marginBottom: '1rem' }}>
                <p style={{ textAlign: 'center', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>May 2025</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.25rem', marginBottom: '1rem' }}>
                  <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#6b7280' }}>Su</div>
                  <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#6b7280' }}>Mo</div>
                  <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#6b7280' }}>Tu</div>
                  <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#6b7280' }}>We</div>
                  <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#6b7280' }}>Th</div>
                  <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#6b7280' }}>Fr</div>
                  <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#6b7280' }}>Sa</div>
                  
                  {/* Calendar days - simplified for MVP */}
                  {Array.from({ length: 31 }, (_, i) => (
                    <div 
                      key={i} 
                      style={{ 
                        textAlign: 'center', 
                        padding: '0.25rem 0', 
                        fontSize: '0.75rem',
                        color: i + 1 === 19 ? 'white' : '#374151',
                        backgroundColor: i + 1 === 19 ? COLORS.sunshineYellow : 'transparent',
                        borderRadius: i + 1 === 19 ? '9999px' : '0'
                      }}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                
                <div style={{ marginTop: '1rem', borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
                  <h4 style={{ fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Upcoming Events</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {sampleScheduleData.map(event => (
                      <div key={event.id} style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', backgroundColor: 'white', borderRadius: '0.25rem', border: '1px solid #e5e7eb' }}>
                        <div style={{ width: '0.5rem', height: '100%', backgroundColor: event.color, borderRadius: '0.25rem', marginRight: '0.5rem' }}></div>
                        <div>
                          <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>{event.title}</p>
                          <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>{event.day}: {event.start} - {event.end}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <button 
                style={{ 
                  width: '100%', 
                  backgroundColor: COLORS.sunshineYellow, 
                  color: 'white', 
                  padding: '0.5rem 0', 
                  borderRadius: '0.5rem', 
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => setIsScheduleOpen(false)}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Milestones Modal */}
      {isMilestonesOpen && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          zIndex: 50, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          backgroundColor: 'rgba(0, 0, 0, 0.5)' 
        }}>
          <div style={{ backgroundColor: 'white', width: '91.666667%', maxWidth: '28rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
            <div style={{ backgroundColor: COLORS.purple, padding: '1rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontWeight: '500' }}>Development Journey</h3>
              <button 
                onClick={() => setIsMilestonesOpen(false)}
                style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}
                type="button"
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{ padding: '1.25rem' }}>
              <div style={{ backgroundColor: '#f9fafb', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {sampleMilestones.map(milestone => (
                    <div 
                      key={milestone.id} 
                      style={{ 
                        backgroundColor: 'white', 
                        padding: '0.75rem', 
                        borderRadius: '0.5rem', 
                        border: '1px solid #e5e7eb', 
                        borderLeft: `4px solid ${milestone.color}`, 
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' 
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h4 style={{ fontWeight: '500', fontSize: '0.875rem' }}>{milestone.title}</h4>
                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{milestone.date}</span>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#374151', marginTop: '0.25rem' }}>{milestone.description}</p>
                      <span style={{ 
                        display: 'inline-block', 
                        marginTop: '0.5rem', 
                        padding: '0.25rem 0.5rem', 
                        backgroundColor: '#f3f4f6', 
                        fontSize: '0.75rem', 
                        borderRadius: '9999px' 
                      }}>
                        {milestone.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                style={{ 
                  width: '100%', 
                  backgroundColor: COLORS.purple, 
                  color: 'white', 
                  padding: '0.5rem 0', 
                  borderRadius: '0.5rem', 
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => setIsMilestonesOpen(false)}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation */}
      <nav style={navStyle}>
        <Link href="/home" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}>
          <Home size={20} style={{ color: COLORS.coralRed }} />
          <span style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: 'white' }}>Home</span>
        </Link>
        <Link href="/fun" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}>
          <Play size={20} style={{ color: '#d1d5db' }} />
          <span style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: '#d1d5db' }}>Fun</span>
        </Link>
        <Link href="/resources" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}>
          <BookOpen size={20} style={{ color: '#d1d5db' }} />
          <span style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: '#d1d5db' }}>Resources</span>
        </Link>
      </nav>
    </div>
  );
}
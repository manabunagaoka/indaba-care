"use client"

import { useState } from 'react'
import { Mic, X, Edit2 } from 'lucide-react'
import { MONTESSORI_AREAS } from '@/lib/constants'

interface VoiceRecorderProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (text: string, category: string) => void;
}

export default function VoiceRecorder({ 
  isOpen = false, 
  onClose = () => {}, 
  onSubmit = () => {}
}: VoiceRecorderProps) {
  const [recordingText, setRecordingText] = useState('')
  const [isRecording, setIsRecording] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  
  const handleStopRecording = () => {
    setIsRecording(false)
    // Simulate voice-to-text result
    setRecordingText('Emma made significant progress with hand-eye coordination today during our bead stringing activity. She was able to thread 5 large beads without assistance.')
  }
  
  const handleEditText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRecordingText(e.target.value)
  }
  
  const handleSubmit = () => {
    if (recordingText.trim()) {
      onSubmit(recordingText, selectedCategory)
      setRecordingText('')
      setSelectedCategory('')
      onClose()
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-11/12 max-w-md rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#FF6B6B] to-[#40BFBF] p-4 text-white flex justify-between items-center">
          <h3 className="font-medium">Voice Recording</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-5">
          <div className="flex justify-center mb-4">
            <div className={`w-20 h-20 rounded-full ${isRecording ? 'bg-[#FF6B6B]' : 'bg-[#D99B9B]'} bg-opacity-20 flex items-center justify-center ${isRecording ? 'animate-pulse' : ''}`}>
              <Mic size={32} className={`${isRecording ? 'text-[#FF6B6B]' : 'text-[#D99B9B]'}`} />
            </div>
          </div>
          
          <div className="mb-4 bg-gray-50 p-3 rounded-lg min-h-[100px] border border-gray-200">
            {isRecording ? (
              <p className="text-gray-500">Listening... speak now</p>
            ) : (
              <textarea 
                className="w-full h-full min-h-[100px] bg-transparent border-none focus:outline-none resize-none text-[#4D4D4D]"
                value={recordingText}
                onChange={handleEditText}
                placeholder="Your recorded message will appear here..."
              />
            )}
          </div>
          
          {isRecording ? (
            <button 
              className="w-full bg-[#FF6B6B] text-white py-2 rounded-lg font-medium"
              onClick={handleStopRecording}
            >
              Stop Recording
            </button>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-[#4D4D4D] font-medium mb-2">Category:</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {MONTESSORI_AREAS.map(area => (
                    <button 
                      key={area.id}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedCategory === area.id 
                          ? 'bg-[#FF6B6B] text-white' 
                          : 'bg-gray-100 text-[#4D4D4D]'
                      }`}
                      onClick={() => setSelectedCategory(area.id)}
                    >
                      {area.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  className="flex-1 flex items-center justify-center bg-[#FF6B6B] text-white py-2 rounded-lg"
                  onClick={handleSubmit}
                >
                  Post Update
                </button>
                
                <button 
                  className="flex-1 flex items-center justify-center bg-[#4D4D4D] text-white py-2 rounded-lg"
                  onClick={() => {
                    setIsRecording(true);
                    setRecordingText('');
                  }}
                >
                  Re-record
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

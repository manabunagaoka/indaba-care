'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AuthPage() {
  const router = useRouter();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [currentStep, setCurrentStep] = useState('login');
  const [userType, setUserType] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIsInitialRender(false);
  }, []);

  // Redesigned splash screen with better timing and shorter progress bar
  const SplashScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [progressComplete, setProgressComplete] = useState(false);
    
    // Use a much shorter duration for the progress bar
    const progressDuration = 1500; // 1.5 seconds for progress bar
    
    useEffect(() => {
      // Progress bar animation
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          // When progress reaches 100%, mark it as complete
          if (newProgress >= 100) {
            setProgressComplete(true);
            clearInterval(interval);
          }
          return newProgress > 100 ? 100 : newProgress;
        });
      }, progressDuration / 100);
      
      // Separate timer for navigation - much longer to allow for the "beat" after completion
      const timer = setTimeout(() => {
        onComplete();
      }, 4500); // 4.5 seconds total for the entire splash screen
      
      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }, [onComplete]);

    return (
      <motion.div 
        className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50" 
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: progressComplete ? 0 : 1, // Only fade when progress is complete
          transition: { 
            delay: 3.2, // Long delay after progress completes (the "beat")
            duration: 1.5  // Very slow fade out (1.5 seconds)
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            transition: { duration: 0.5 }
          }}
          className="flex flex-col items-center"
        >
          {/* Logo */}
          <div className="mb-6">
            <img 
              src="/images/indabacarelogo.jpg" 
              alt="Indaba Care Logo" 
              className="w-[150px] h-[150px] object-contain rounded-full"
            />
          </div>
          
          <motion.h1 
            className="text-3xl font-bold text-[#4D4D4D] mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.3, duration: 0.5 }
            }}
          >
            Indaba Care
          </motion.h1>
          
          <motion.p 
            className="text-[#FF6B6B] text-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { delay: 0.6, duration: 0.5 }
            }}
          >
            Transforming Childcare, Together.
          </motion.p>
          
          {/* Progress bar - SHORTER width */}
          <motion.div className="w-44 h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#FF6B6B]"
              initial={{ width: "0%" }}
              animate={{ 
                width: `${progress}%`,
                transition: { duration: progressDuration / 1000, ease: "linear" }
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#FFD6CC] to-[#FFBCAB] flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img 
            src="/images/indabacarelogo.jpg" 
            alt="Indaba Care Logo" 
            className="w-24 h-24 object-contain rounded-full"
          />
        </div>
        
        <h1 className="text-3xl font-bold text-[#4D4D4D] text-center mb-2">
          Welcome to Indaba Care
        </h1>
        <p className="text-[#FF6B6B] text-center mb-8">
          Transforming Childcare, Together.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => setCurrentStep('login')}
            className="w-full bg-[#FF6B6B] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#e55555] transition-colors"
          >
            Log In
          </button>
          
          <button
            onClick={() => setCurrentStep('signup')}
            className="w-full bg-transparent border-2 border-[#FF6B6B] text-[#FF6B6B] py-4 rounded-xl font-semibold text-lg hover:bg-[#FF6B6B] hover:text-white transition-colors"
          >
            Sign Up
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm font-semibold text-[#4D4D4D] text-center mb-2">
            Demo Credentials:
          </p>
          <p className="text-sm text-gray-600 text-center">
            Email: <span className="font-mono text-[#FF6B6B]">guest@indabacare.com</span><br/>
            Password: <span className="font-mono text-[#FF6B6B]">indabacare</span>
          </p>
        </div>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );

  const LoginScreen = () => {
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      
      if (email && password) {
        localStorage.setItem('indaba_logged_in', 'true');
        localStorage.setItem('indaba_user_name', 'Guest');
        // Show splash screen after successful login
        setCurrentStep('splash');
      } else {
        alert('Please enter email and password');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFD6CC] to-[#FFBCAB] flex flex-col p-6">
        <div className="flex items-center mb-8 pt-8">
          <button 
            onClick={() => setCurrentStep('welcome')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#4D4D4D]" />
          </button>
          <h2 className="text-2xl font-bold text-[#4D4D4D] ml-4">Log In</h2>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
            {/* Added logo at the top of the login screen */}
            <div className="flex justify-center mb-8">
              <img 
                src="/images/indabacarelogo.jpg" 
                alt="Indaba Care Logo" 
                className="w-24 h-24 object-contain rounded-full"
              />
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-[#4D4D4D] font-semibold mb-2">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue="guest@indabacare.com"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:border-[#FF6B6B] focus:outline-none transition-colors"
                  placeholder="guest@indabacare.com"
                  autoComplete="email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-[#4D4D4D] font-semibold mb-2">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    defaultValue="indabacare"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:border-[#FF6B6B] focus:outline-none pr-12 transition-colors"
                    placeholder="indabacare"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <button type="button" className="text-[#FF6B6B] font-semibold text-sm hover:text-[#e55555] transition-colors">
                Forgot Password?
              </button>
              
              <button
                type="submit"
                className="w-full bg-[#FF6B6B] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#e55555] transition-colors"
              >
                Log In
              </button>
              
              <p className="text-center text-[#4D4D4D]">
                Don't have an account?{' '}
                <button 
                  type="button"
                  onClick={() => setCurrentStep('signup')}
                  className="text-[#FF6B6B] font-semibold hover:text-[#e55555] transition-colors"
                >
                  Sign up
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const SignupScreen = () => {
    const handleSignup = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      
      if (userType && email && password) {
        localStorage.setItem('indaba_logged_in', 'true');
        localStorage.setItem('indaba_user_name', 'Guest');
        localStorage.setItem('indaba_user_type', userType);
        setCurrentStep('profile-setup');
      } else {
        alert('Please fill in all fields and select user type');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFD6CC] to-[#FFBCAB] flex flex-col p-6">
        <div className="flex items-center mb-8 pt-8">
          <button 
            onClick={() => setCurrentStep('welcome')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#4D4D4D]" />
          </button>
          <h2 className="text-2xl font-bold text-[#4D4D4D] ml-4">Sign Up</h2>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <p className="text-[#4D4D4D] font-semibold mb-4">I am a:</p>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setUserType('parent')}
                    className={`w-full p-4 rounded-xl border-2 transition-colors ${
                      userType === 'parent' 
                        ? 'border-[#40BFBF] bg-[#40BFBF]/10 text-[#40BFBF]' 
                        : 'border-gray-300 text-[#4D4D4D] hover:border-[#40BFBF]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Parent</span>
                      {userType === 'parent' && <Check className="w-5 h-5" />}
                    </div>
                    <p className="text-sm text-left mt-1">Looking for childcare support</p>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setUserType('nanny')}
                    className={`w-full p-4 rounded-xl border-2 transition-colors ${
                      userType === 'nanny' 
                        ? 'border-[#FF6B6B] bg-[#FF6B6B]/10 text-[#FF6B6B]' 
                        : 'border-gray-300 text-[#4D4D4D] hover:border-[#FF6B6B]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Nanny</span>
                      {userType === 'nanny' && <Check className="w-5 h-5" />}
                    </div>
                    <p className="text-sm text-left mt-1">Providing childcare services</p>
                  </button>
                </div>
              </div>
              
              <div>
                <label htmlFor="signup-email" className="block text-[#4D4D4D] font-semibold mb-2">Email</label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  defaultValue=""
                  className="w-full p-4 border border-gray-300 rounded-xl focus:border-[#FF6B6B] focus:outline-none transition-colors"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="signup-password" className="block text-[#4D4D4D] font-semibold mb-2">Password</label>
                <div className="relative">
                  <input
                    id="signup-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    defaultValue=""
                    className="w-full p-4 border border-gray-300 rounded-xl focus:border-[#FF6B6B] focus:outline-none pr-12 transition-colors"
                    placeholder="Create a password"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={!userType}
                className="w-full bg-[#FF6B6B] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#e55555] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Continue
              </button>
              
              <p className="text-center text-[#4D4D4D]">
                Already have an account?{' '}
                <button 
                  type="button"
                  onClick={() => setCurrentStep('login')}
                  className="text-[#FF6B6B] font-semibold hover:text-[#e55555] transition-colors"
                >
                  Log in
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const ProfileSetupScreen = () => {
    const handleProfileComplete = (e: React.FormEvent) => {
      e.preventDefault();
      localStorage.setItem('indaba_profile_complete', 'true');
      // Show splash and then go to home
      setCurrentStep('splash');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFD6CC] to-[#FFBCAB] flex flex-col p-6">
        <div className="flex items-center mb-8 pt-8">
          <button 
            onClick={() => setCurrentStep('signup')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#4D4D4D]" />
          </button>
          <h2 className="text-2xl font-bold text-[#4D4D4D] ml-4">Set Up Profile</h2>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md max-h-[600px] overflow-y-auto">
            <form onSubmit={handleProfileComplete} className="space-y-4">
              <div className="text-center mb-6">
                <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  userType === 'parent' ? 'bg-[#40BFBF]' : 'bg-[#FF6B6B]'
                }`}>
                  <span className="text-white text-2xl font-bold">
                    {userType === 'parent' ? 'P' : 'N'}
                  </span>
                </div>
                <p className="text-[#4D4D4D]">Complete your {userType} profile</p>
              </div>
              
              <div>
                <label htmlFor="fullname" className="block text-[#4D4D4D] font-semibold mb-2">Full Name</label>
                <input
                  id="fullname"
                  name="name"
                  type="text"
                  defaultValue=""
                  className="w-full p-3 border border-gray-300 rounded-xl focus:border-[#FF6B6B] focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-[#4D4D4D] font-semibold mb-2">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue=""
                  className="w-full p-3 border border-gray-300 rounded-xl focus:border-[#FF6B6B] focus:outline-none transition-colors"
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-[#4D4D4D] font-semibold mb-2">Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  defaultValue=""
                  className="w-full p-3 border border-gray-300 rounded-xl focus:border-[#FF6B6B] focus:outline-none transition-colors"
                  placeholder="e.g., Cape Town"
                  autoComplete="address-level1"
                />
              </div>
              
              {userType === 'nanny' && (
                <>
                  <div>
                    <label htmlFor="age" className="block text-[#4D4D4D] font-semibold mb-2">Age</label>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      defaultValue=""
                      className="w-full p-3 border border-gray-300 rounded-xl focus:border-[#FF6B6B] focus:outline-none transition-colors"
                      placeholder="Enter your age"
                      min="18"
                      max="100"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="gender" className="block text-[#4D4D4D] font-semibold mb-2">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      defaultValue=""
                      className="w-full p-3 border border-gray-300 rounded-xl focus:border-[#FF6B6B] focus:outline-none transition-colors"
                    >
                      <option value="">Select gender</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="language" className="block text-[#4D4D4D] font-semibold mb-2">Primary Language</label>
                    <input
                      id="language"
                      name="language"
                      type="text"
                      defaultValue=""
                      className="w-full p-3 border border-gray-300 rounded-xl focus:border-[#FF6B6B] focus:outline-none transition-colors"
                      placeholder="e.g., English, Afrikaans"
                    />
                  </div>
                </>
              )}
              
              <button
                type="submit"
                className="w-full bg-[#FF6B6B] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#e55555] transition-colors mt-6"
              >
                Complete Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentStep = () => {
    if (isInitialRender) {
      return <LoginScreen />;
    }

    switch (currentStep) {
      case 'splash':
        return <SplashScreen onComplete={() => router.push('/home')} />;
      case 'welcome':
        return <WelcomeScreen />;
      case 'login':
        return <LoginScreen />;
      case 'signup':
        return <SignupScreen />;
      case 'profile-setup':
        return <ProfileSetupScreen />;
      default:
        return <LoginScreen />;
    }
  };

  return <div className="min-h-screen">{renderCurrentStep()}</div>;
}
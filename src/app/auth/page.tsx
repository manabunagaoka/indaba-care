'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react';
// import SplashScreen from '@/components/SplashScreen'; // Will be available after merge

export default function AuthPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userType, setUserType] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#FFD6CC] to-[#FFBCAB] flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-[#FF6B6B] rounded-full flex items-center justify-center">
            <span className="text-white text-3xl font-bold">IC</span>
          </div>
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
        // Show splash screen then go to home
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
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-[#4D4D4D] font-semibold mb-2">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue=""
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
                    defaultValue=""
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
      // Show splash screen then go to home
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

  // Simple splash screen component (temporary until merge with main)
  const SplashStep = () => (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#2D2D2D] z-50">
      <div className="flex flex-col items-center animate-fade-in">
        <div className="mb-6">
          <div className="w-32 h-32 bg-[#FF6B6B] rounded-full flex items-center justify-center animate-scale-up">
            <span className="text-white text-4xl font-bold">IC</span>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2 animate-slide-up">
          Indaba Care
        </h1>
        
        <p className="text-[#FF6B6B] text-lg animate-slide-up-delay">
          Transforming Childcare, Together.
        </p>
        
        <div className="mt-12 w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-[#FF6B6B] animate-loading-bar"></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-up {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes loading-bar {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-scale-up {
          animation: scale-up 0.5s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out 0.3s both;
        }
        
        .animate-slide-up-delay {
          animation: slide-up 0.5s ease-out 0.6s both;
        }
        
        .animate-loading-bar {
          animation: loading-bar 2.5s ease-in-out both;
        }
      `}</style>
      
      {/* Auto redirect after animation */}
      {setTimeout(() => router.push('/home'), 3000)}
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'login':
        return <LoginScreen />;
      case 'signup':
        return <SignupScreen />;
      case 'profile-setup':
        return <ProfileSetupScreen />;
      case 'splash':
        return <SplashStep />;
      default:
        return <WelcomeScreen />;
    }
  };

  return <div className="min-h-screen">{renderCurrentStep()}</div>;
}
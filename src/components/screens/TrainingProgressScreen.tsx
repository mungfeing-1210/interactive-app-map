import React, { useEffect, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { ArrowLeft } from 'lucide-react';

const TrainingProgressScreen: React.FC = () => {
  const { navigateToScreen, userData, setUserData } = useApp();
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  const progress = ((userData.gamesCompleted || 0) / (userData.totalGames || 3)) * 100;
  const isComplete = (userData.gamesCompleted || 0) >= (userData.totalGames || 3);

  useEffect(() => {
    // Animate progress from 0 to current value
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 500);

    // Auto navigate after animation
    const navigationTimer = setTimeout(() => {
      if (isComplete) {
        navigateToScreen('goal-setting');
      } else {
        // Set next game and navigate to game intro
        setUserData({ currentGame: (userData.currentGame || 1) + 1 });
        navigateToScreen('game-intro');
      }
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(navigationTimer);
    };
  }, [navigateToScreen, userData, setUserData, progress, isComplete]);

  return (
    <div className="mobile-screen gradient-hero text-white flex flex-col h-full relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-50" />
      
      {/* Back Button */}
      <div className="absolute top-8 left-6 z-10">
        <button 
          onClick={() => navigateToScreen('game-end')}
          className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-4 animate-fade-in">
          Training Progress
        </h1>
        
        {/* Progress Indicator */}
        <p className="text-xl font-medium mb-12 opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {userData.gamesCompleted} of {userData.totalGames}
        </p>

        {/* Circular Progress */}
        <div className="relative w-48 h-48 mb-12 animate-scale-in" style={{ animationDelay: '0.4s' }}>
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="white"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - animatedProgress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-2000 ease-out"
            />
          </svg>
          
          {/* Progress Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold">
              {Math.round(animatedProgress)}%
            </span>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex space-x-3 mb-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          {Array.from({ length: userData.totalGames || 3 }, (_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index < (userData.gamesCompleted || 0) 
                  ? 'bg-white' 
                  : 'bg-white/30'
              }`}
              style={{ 
                transitionDelay: `${(index + 1) * 0.1}s` 
              }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <p className="text-lg opacity-80 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          {isComplete ? '训练完成！' : '准备下一个训练...'}
        </p>

        {/* Loading Animation */}
        <div className="mt-8 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingProgressScreen;
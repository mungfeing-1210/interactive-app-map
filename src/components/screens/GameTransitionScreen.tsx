import React, { useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';

const GameTransitionScreen: React.FC = () => {
  const { navigateToScreen, userData } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigateToScreen('game-intro');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigateToScreen]);

  const progress = ((userData.gamesCompleted || 0) / (userData.totalGames || 3)) * 100;

  return (
    <div className="mobile-screen gradient-hero text-white flex flex-col items-center justify-center p-8">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center mb-2 animate-fade-in">
        Training Progress
      </h1>
      
      {/* Progress Text */}
      <p className="text-white/80 text-lg mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        {userData.gamesCompleted} of {userData.totalGames}
      </p>

      {/* Circular Progress */}
      <div className="relative w-32 h-32 mb-12 animate-scale-in" style={{ animationDelay: '0.4s' }}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="8"
          />
          {/* Progress Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Progress Percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Loading Animation */}
      <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>

      {/* Status Text */}
      <p className="text-white/60 text-sm mt-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
        准备下一个训练...
      </p>
    </div>
  );
};

export default GameTransitionScreen;
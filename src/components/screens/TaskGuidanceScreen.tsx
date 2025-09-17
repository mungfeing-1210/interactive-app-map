import React, { useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Play } from 'lucide-react';

const TaskGuidanceScreen: React.FC = () => {
  const { navigateToScreen, setUserData } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to game introduction
      navigateToScreen('game-intro');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigateToScreen]);

  return (
    <div className="mobile-screen gradient-hero text-white flex flex-col items-center justify-center p-8">
      {/* Icon */}
      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-8 animate-bounce-in">
        <Play className="w-12 h-12" />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-4 animate-fade-in">
        Let's begin your first training
      </h1>

      {/* Subtitle */}
      <p className="text-white/80 text-center text-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
        准备开始您的认知训练之旅
      </p>

      {/* Loading Animation */}
      <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TaskGuidanceScreen;
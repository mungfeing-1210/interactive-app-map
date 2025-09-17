import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Trophy, TrendingUp, Star } from 'lucide-react';

const GameEndScreen: React.FC = () => {
  const { navigateToScreen, userData, setUserData } = useApp();

  const currentScore = userData.scores?.[userData.scores.length - 1] || 0;
  const isLastGame = (userData.gamesCompleted || 0) >= (userData.totalGames || 3);

  const handleNext = () => {
    // Always go to training progress screen for completion animation
    navigateToScreen('training-progress');
  };

  const getPerformanceMessage = (score: number) => {
    if (score >= 200) return { message: "出色的表现！", color: "text-success", icon: Trophy };
    if (score >= 150) return { message: "表现良好！", color: "text-primary", icon: Star };
    return { message: "继续努力！", color: "text-accent", icon: TrendingUp };
  };

  const performance = getPerformanceMessage(currentScore);
  const PerformanceIcon = performance.icon;

  return (
    <div className="mobile-screen bg-gradient-to-b from-blue-500 to-purple-600 flex flex-col h-full text-white">
      {/* Header */}
      <div className="pt-8 px-6">
        <button
          onClick={() => navigateToScreen('main-app')}
          className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Trophy Icon with Stars */}
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-8">
            <Trophy className="w-12 h-12" />
          </div>
          {/* Decorative Stars */}
          <div className="absolute -top-4 -right-4 w-8 h-8 text-purple-300">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          <div className="absolute -bottom-2 -left-4 w-6 h-6 text-purple-300">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-4 text-center">
          连胜1天达成
        </h1>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 w-full text-center mb-12">
          <p className="text-lg leading-relaxed">
            坚持训练是提高记忆力的关键。每天的小进步，都在为更强的大脑添砖加瓦！
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="p-8">
        <button 
          onClick={handleNext}
          className="w-full bg-white text-blue-500 font-bold py-4 rounded-2xl shadow-lg"
        >
          继续训练之旅
        </button>
      </div>
    </div>
  );
};

export default GameEndScreen;
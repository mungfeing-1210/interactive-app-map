import React, { useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { CheckCircle } from 'lucide-react';

const GameTransitionScreen: React.FC = () => {
  const { navigateToScreen, userData } = useApp();
  const completedGames = userData.gamesCompleted || 0;
  const totalGames = userData.totalGames || 3;
  const progress = (completedGames / totalGames) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      // 如果已经完成了所有游戏，导航到训练完成页面
      if (completedGames >= totalGames) {
        navigateToScreen('training-progress');
      } else {
        // 否则导航到下一个游戏的介绍页面
        navigateToScreen('game-intro');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigateToScreen, completedGames, totalGames]);

  return (
    <div className="mobile-screen bg-gradient-to-b from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center mb-2 animate-fade-in">
        训练进度
      </h1>
      
      <p className="text-white/80 text-lg mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        第 {completedGames} 个游戏 / 共 {totalGames} 个
      </p>

      {/* Progress Circle */}
      <div className="relative w-32 h-32 mb-12 animate-scale-in" style={{ animationDelay: '0.4s' }}>
        <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
        <div 
          className="absolute inset-0 rounded-full border-4 border-white transition-all duration-1000"
          style={{ 
            clipPath: `inset(0 ${100 - progress}% 0 0)`,
            transform: 'rotate(-90deg)',
            transformOrigin: 'center'
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Loading Dots */}
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>

      <p className="text-white/60 text-sm mt-6">
        准备下一个训练...
      </p>
    </div>
  );
};

export default GameTransitionScreen;
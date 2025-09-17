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
    <div className="mobile-screen bg-background flex flex-col h-full">
      {/* Header */}
      <div className="text-center p-8 pt-12 pb-6 flex-shrink-0">
        <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4 ${performance.color}`}>
          <PerformanceIcon className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          训练完成！
        </h1>
        <p className={`font-semibold ${performance.color}`}>
          {performance.message}
        </p>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-8">
        {/* Score Display */}
        <div className="card-elevated text-center mb-8">
          <h2 className="text-4xl font-bold text-primary mb-2">{currentScore}</h2>
          <p className="text-muted-foreground mb-4">您的得分</p>
          
          {/* Comparison */}
          <div className="bg-muted rounded-2xl p-4">
            <p className="text-foreground font-semibold mb-1">
              超过了 {Math.min(Math.floor((currentScore / 300) * 100), 99)}% 的用户
            </p>
            <p className="text-sm text-muted-foreground">
              基于同类型训练的历史数据
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">{currentScore}</p>
            <p className="text-xs text-muted-foreground">总分</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{Math.floor(currentScore / 10)}</p>
            <p className="text-xs text-muted-foreground">命中次数</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{userData.gamesCompleted}</p>
            <p className="text-xs text-muted-foreground">已完成</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">训练进度</span>
            <span className="text-sm text-foreground font-medium">
              {userData.gamesCompleted}/{userData.totalGames}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${((userData.gamesCompleted || 0) / (userData.totalGames || 3)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* CTA Button - Fixed at bottom */}
      <div className="p-8 pt-4 flex-shrink-0">
        <button 
          onClick={handleNext}
          className="btn-gradient w-full"
        >
          {isLastGame ? 'Complete Training' : `Next game (${(userData.gamesCompleted || 0) + 1}/${userData.totalGames})`}
        </button>
      </div>
    </div>
  );
};

export default GameEndScreen;
import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Trophy, TrendingUp, Star } from 'lucide-react';

const GameEndScreen: React.FC = () => {
  const { navigateToScreen, userData, setUserData } = useApp();

  const currentScore = userData.scores?.[userData.scores.length - 1] || 0;
  const gamesCompleted = (userData.gamesCompleted || 0) + 1; // 当前游戏已完成
  const isLastGame = gamesCompleted >= (userData.totalGames || 3);

  const handleNext = () => {
    // 更新完成状态
    setUserData({
      gamesCompleted,
      currentGame: gamesCompleted + 1 // 设置下一个游戏的编号
    });

    if (isLastGame) {
      // 如果是最后一个游戏，进入训练完成页面
      navigateToScreen('training-progress');
    } else {
      // 否则进入过渡页面，准备下一个游戏
      navigateToScreen('game-transition');
    }
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
        <div className="bg-card rounded-3xl p-6 shadow-medium text-center mb-8">
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
      </div>

      {/* CTA Button - Fixed at bottom */}
      <div className="p-8 pt-4 flex-shrink-0">
        <button 
          onClick={handleNext}
          className="btn-gradient w-full"
        >
          {isLastGame ? '完成训练' : '继续训练'}
        </button>
      </div>
    </div>
  );
};

export default GameEndScreen;
import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Trophy, Flame, Sparkles } from 'lucide-react';

const StreakCelebrationScreen: React.FC = () => {
  const { navigateToScreen } = useApp();

  const handleContinue = () => {
    navigateToScreen('main-app');
  };

  return (
    <div className="mobile-screen bg-background flex flex-col h-full">
      {/* Celebration Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Animated Trophy */}
        <div className="relative mb-8">
          <div className="w-32 h-32 gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Trophy className="w-16 h-16 text-white" />
          </div>
          {/* Sparkle effects */}
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-8 h-8 text-accent animate-bounce" />
          </div>
          <div className="absolute -bottom-2 -left-2">
            <Sparkles className="w-6 h-6 text-primary animate-bounce" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Celebration Text */}
        <h1 className="text-3xl font-bold text-foreground mb-4">恭喜！</h1>
        <h2 className="text-xl font-semibold text-primary mb-6">连胜 1 天达成</h2>
        
        <div className="bg-muted rounded-2xl p-6 mb-8 w-full max-w-sm">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Flame className="w-6 h-6 text-orange-500" />
            <span className="text-lg font-semibold text-foreground">连胜记录</span>
          </div>
          <div className="text-3xl font-bold text-primary mb-2">1</div>
          <p className="text-sm text-muted-foreground">继续保持，让连胜更长！</p>
        </div>

        <p className="text-muted-foreground mb-8 max-w-sm">
          坚持训练是提高记忆力的关键。每天的小进步，都在为更强的大脑添砖加瓦！
        </p>
      </div>

      {/* Continue Button */}
      <div className="p-8 pt-4 flex-shrink-0">
        <button onClick={handleContinue} className="btn-gradient w-full">
          继续训练之旅
        </button>
      </div>
    </div>
  );
};

export default StreakCelebrationScreen;
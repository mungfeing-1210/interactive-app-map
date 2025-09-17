import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Target, Zap, Brain } from 'lucide-react';

interface Game {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  benefits: string[];
}

const GameIntroScreen: React.FC = () => {
  const { navigateToScreen, userData, setUserData } = useApp();

  const games = [
    {
      id: 1,
      title: 'Hidden Ghosts',
      subtitle: 'MEMORY',
      description: '记住幽灵出现的位置',
      icon: Target,
      color: 'bg-primary',
      bgGradient: 'from-primary/20 to-accent/20',
      benefits: [
        '提升大脑处理速度',
        '增强认知灵活性',
        '改善日常工作表现'
      ]
    },
    {
      id: 2,
      title: 'Memory Matrix',
      subtitle: 'MEMORY', 
      description: '记住图形矩阵位置',
      icon: Brain,
      color: 'text-accent',
      bgGradient: 'from-accent/20 to-success/20',
      benefits: [
        '增强工作记忆能力',
        '提升空间记忆力',
        '改善注意力分配'
      ]
    },
    {
      id: 3,
      title: 'Speed Processing',
      subtitle: 'MEMORY',
      description: '加快信息处理和决策速度',
      icon: Zap,
      color: 'text-success',
      bgGradient: 'from-success/20 to-primary/20',
      benefits: [
        '提升反应处理速度',
        '增强决策能力',
        '改善工作效率'
      ]
    }
  ];

  const currentGame = games.find(game => game.id === userData.currentGame) || games[0];
  const IconComponent = currentGame.icon;

  const handleStart = () => {
    // Skip gameplay and go directly to game end with simulated score
    const simulatedScore = Math.floor(Math.random() * 20) + 10; // Random score between 10-30
    const newScores = [...(userData.scores || []), simulatedScore];
    const newGamesCompleted = (userData.gamesCompleted || 0) + 1;
    
    setUserData({ 
      scores: newScores,
      gamesCompleted: newGamesCompleted
    });
    
    navigateToScreen('game-end');
  };

  return (
    <div className="mobile-screen bg-background flex flex-col h-full">
      {/* Header with Back Button */}
      <div className="flex items-center pt-8 pb-4 px-6">
        <button
          onClick={() => navigateToScreen('navigation')}
          className="w-10 h-10 bg-card/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-medium hover:bg-card transition-colors border border-border"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
      </div>

      {/* Game Content */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        <div className="card-elevated">
          {/* Game Icon */}
          <div className="flex flex-col items-center pt-8 pb-6">
            <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${currentGame.bgGradient} flex items-center justify-center mb-6 ${currentGame.color}`}>
              <IconComponent className="w-12 h-12" />
            </div>

            {/* Game Title */}
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {currentGame.title}
            </h2>
            <p className="text-sm text-primary font-medium uppercase tracking-wide mb-4">
              {currentGame.subtitle}
            </p>
            <p className="text-base text-muted-foreground">
              {currentGame.description}
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-muted/50 rounded-xl mx-6 p-6 mb-6">
            <h3 className="font-semibold text-foreground mb-4">训练益处：</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {currentGame.benefits.map((benefit, index) => (
                <li key={index}>• {benefit}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Fixed Start Button */}
      <div className="absolute bottom-8 left-0 right-0 px-6">
        <button 
          onClick={handleStart}
          className="btn-gradient w-full py-4 text-lg font-semibold rounded-xl shadow-lg"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default GameIntroScreen;
import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Target, Zap, Brain } from 'lucide-react';

const GameIntroScreen: React.FC = () => {
  const { navigateToScreen, userData, setUserData } = useApp();

  const games = [
    {
      id: 1,
      title: 'Focus Challenge',
      subtitle: '注意力训练',
      description: '提升专注力和反应速度',
      icon: Target,
      color: 'text-primary',
      bgGradient: 'from-primary/20 to-accent/20'
    },
    {
      id: 2,
      title: 'Memory Matrix',
      subtitle: '记忆力训练', 
      description: '增强工作记忆和短期记忆',
      icon: Brain,
      color: 'text-accent',
      bgGradient: 'from-accent/20 to-success/20'
    },
    {
      id: 3,
      title: 'Speed Processing',
      subtitle: '处理速度训练',
      description: '加快信息处理和决策速度',
      icon: Zap,
      color: 'text-success',
      bgGradient: 'from-success/20 to-primary/20'
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
      {/* Header */}
      <div className="text-center pt-8 pb-6 px-6 flex-shrink-0">
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Game {userData.currentGame} of {userData.totalGames}
        </h1>
        <div className="flex justify-center space-x-2">
          {Array.from({ length: userData.totalGames || 3 }, (_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index < (userData.currentGame || 1) ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Game Card - Scrollable Content */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        <div className="card-elevated text-center">
          {/* Game Icon */}
          <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${currentGame.bgGradient} flex items-center justify-center mx-auto mb-6 ${currentGame.color}`}>
            <IconComponent className="w-12 h-12" />
          </div>

          {/* Game Info */}
          <h2 className="text-xl font-bold text-foreground mb-2">
            {currentGame.title}
          </h2>
          <p className="text-primary font-semibold mb-3 text-sm">
            {currentGame.subtitle}
          </p>
          <p className="text-muted-foreground mb-6 text-sm">
            {currentGame.description}
          </p>

          {/* Benefits */}
          <div className="bg-muted rounded-2xl p-4 mb-6">
            <h3 className="font-semibold text-foreground mb-3 text-sm">训练益处：</h3>
            <ul className="text-xs text-muted-foreground space-y-2">
              <li>• 提升大脑处理速度</li>
              <li>• 增强认知灵活性</li>
              <li>• 改善日常工作表现</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Fixed Start Button */}
      <div className="p-6 flex-shrink-0">
        <button 
          onClick={handleStart}
          className="btn-gradient w-full"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default GameIntroScreen;
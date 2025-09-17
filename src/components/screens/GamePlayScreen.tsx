import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Target } from 'lucide-react';

const GamePlayScreen: React.FC = () => {
  const { navigateToScreen, setUserData, userData } = useApp();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targets, setTargets] = useState<{ id: number; x: number; y: number }[]>([]);
  const [gameActive, setGameActive] = useState(true);

  // 生成随机目标
  const generateTarget = () => {
    return {
      id: Math.random(),
      x: Math.random() * 200 + 50, // 50-250px - adjusted for smaller screen
      y: Math.random() * 300 + 150, // 150-450px - adjusted for smaller screen
    };
  };

  // 初始化游戏
  useEffect(() => {
    setTargets([generateTarget()]);
  }, []);

  // 游戏计时器
  useEffect(() => {
    if (timeLeft > 0 && gameActive) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
      // 保存分数并导航到结束页面
      const newScores = [...(userData.scores || []), score];
      setUserData({ 
        scores: newScores,
        gamesCompleted: (userData.gamesCompleted || 0) + 1
      });
      setTimeout(() => {
        navigateToScreen('game-end');
      }, 1000);
    }
  }, [timeLeft, gameActive, score, userData, setUserData, navigateToScreen]);

  // 自动生成新目标
  useEffect(() => {
    if (gameActive && targets.length === 0) {
      const timer = setTimeout(() => {
        setTargets([generateTarget()]);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [targets, gameActive]);

  const handleTargetClick = (targetId: number) => {
    setScore(score + 10);
    setTargets(targets.filter(t => t.id !== targetId));
  };

  return (
    <div className="mobile-screen bg-background flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-card shadow-soft flex-shrink-0">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Score</p>
          <p className="text-xl font-bold text-primary">{score}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Time</p>
          <p className="text-xl font-bold text-foreground">{timeLeft}s</p>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-muted/50 to-background">
        {/* Instructions */}
        {gameActive && (
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-center z-10">
            <p className="text-muted-foreground mb-2 text-sm">点击出现的目标</p>
            <div className="flex items-center justify-center space-x-2 text-primary">
              <Target className="w-4 h-4" />
              <span className="text-xs">快速反应训练</span>
            </div>
          </div>
        )}

        {/* Targets */}
        {targets.map((target) => (
          <button
            key={target.id}
            onClick={() => handleTargetClick(target.id)}
            className="absolute w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-large hover:scale-110 transition-transform animate-bounce-in"
            style={{ left: target.x, top: target.y }}
          >
            <Target className="w-6 h-6" />
          </button>
        ))}

        {/* Game Over Message */}
        {!gameActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center bg-card rounded-3xl p-6 shadow-large animate-scale-in mx-4">
              <h2 className="text-xl font-bold text-foreground mb-2">时间到！</h2>
              <p className="text-muted-foreground mb-4 text-sm">正在统计您的成绩...</p>
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="p-4 flex-shrink-0">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-1000"
            style={{ width: `${((30 - timeLeft) / 30) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default GamePlayScreen;
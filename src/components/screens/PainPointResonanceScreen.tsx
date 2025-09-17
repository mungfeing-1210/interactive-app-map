import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { ChevronRight } from 'lucide-react';

const PainPointResonanceScreen: React.FC = () => {
  const { navigateToScreen, setUserData, userData } = useApp();
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([]);

  // 根据用户选择的目标动态生成痛点选项
  const getPainPointsByGoals = (goals: string[]) => {
    const painPointsMap: { [key: string]: string[] } = {
      'work': [
        '同时处理多个任务时，感到混乱',
        '长时间专注在一件事上很困难',
        '做决策时，常常犹豫不决',
        '面对复杂问题时，找不到头绪'
      ],
      'study': [
        '学习新知识时，记忆效果不佳',
        '阅读理解能力有待提升',
        '考试时容易紧张，影响发挥',
        '学习效率低，花费时间长'
      ],
      'health': [
        '感觉思维反应比以前慢了',
        '容易忘记重要的事情',
        '注意力不如以前集中',
        '担心年龄增长带来的认知下降'
      ],
      'performance': [
        '想要在各方面都有更好的表现',
        '希望思维更加敏捷清晰',
        '想要提升解决问题的能力',
        '希望在竞争中脱颖而出'
      ]
    };

    const allPainPoints = new Set<string>();
    goals?.forEach(goal => {
      painPointsMap[goal]?.forEach(point => allPainPoints.add(point));
    });

    return Array.from(allPainPoints);
  };

  const painPoints = getPainPointsByGoals(userData.goals || []);

  const togglePainPoint = (painPoint: string) => {
    setSelectedPainPoints(prev => 
      prev.includes(painPoint)
        ? prev.filter(point => point !== painPoint)
        : [...prev, painPoint]
    );
  };

  const handleContinue = () => {
    if (selectedPainPoints.length > 0) {
      setUserData({ painPoints: selectedPainPoints });
      navigateToScreen('value-confirmation');
    }
  };

  return (
    <div className="mobile-screen bg-background flex flex-col p-8">
      {/* Header */}
      <div className="text-center mb-8 mt-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          以下哪些场景让您感同身受？
        </h1>
        <p className="text-muted-foreground">
          选择您遇到过的情况
        </p>
      </div>

      {/* Pain Points Selection */}
      <div className="flex-1 space-y-4">
        {painPoints.map((painPoint, index) => {
          const isSelected = selectedPainPoints.includes(painPoint);
          
          return (
            <button
              key={index}
              onClick={() => togglePainPoint(painPoint)}
              className={`w-full p-5 rounded-2xl border-2 transition-smooth text-left ${
                isSelected
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <p className={`font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                    {painPoint}
                  </p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 transition-smooth flex items-center justify-center ${
                  isSelected ? 'border-primary bg-primary' : 'border-muted'
                }`}>
                  {isSelected && <div className="w-3 h-3 bg-white rounded-full"></div>}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA Button */}
      <button 
        onClick={handleContinue}
        disabled={selectedPainPoints.length === 0}
        className={`w-full py-4 rounded-2xl font-semibold transition-smooth flex items-center justify-center space-x-2 mt-6 ${
          selectedPainPoints.length > 0
            ? 'btn-gradient'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
        }`}
      >
        <span>确认</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default PainPointResonanceScreen;
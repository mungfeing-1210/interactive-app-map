import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { ChevronRight, Briefcase, GraduationCap, Heart, Trophy } from 'lucide-react';

const GoalSelectionScreen: React.FC = () => {
  const { navigateToScreen, setUserData } = useApp();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const goals = [
    {
      id: 'work',
      title: '提升工作表现',
      subtitle: '增强专注力和决策能力',
      icon: Briefcase,
      color: 'text-primary'
    },
    {
      id: 'study',
      title: '改善学习效果',
      subtitle: '提高记忆力和理解能力',
      icon: GraduationCap,
      color: 'text-accent'
    },
    {
      id: 'health',
      title: '保持大脑健康',
      subtitle: '预防认知能力下降',
      icon: Heart,
      color: 'text-success'
    },
    {
      id: 'performance',
      title: '提升整体表现',
      subtitle: '全面增强认知能力',
      icon: Trophy,
      color: 'text-primary-light'
    }
  ];

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId)
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleContinue = () => {
    if (selectedGoals.length > 0) {
      setUserData({ goals: selectedGoals });
      navigateToScreen('pain-point-resonance');
    }
  };

  return (
    <div className="mobile-screen bg-background flex flex-col h-full">
      {/* Header */}
      <div className="text-center p-8 pt-12 pb-6 flex-shrink-0">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          您的主要目标是什么？
        </h1>
        <p className="text-muted-foreground">
          可以选择多个选项
        </p>
      </div>

      {/* Goals Selection - Scrollable */}
      <div className="flex-1 overflow-y-auto px-8">
        <div className="space-y-4">
          {goals.map((goal) => {
            const IconComponent = goal.icon;
            const isSelected = selectedGoals.includes(goal.id);
            
            return (
              <button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={`w-full p-6 rounded-2xl border-2 transition-smooth text-left ${
                  isSelected
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ${goal.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                      {goal.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {goal.subtitle}
                    </p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 transition-smooth ${
                    isSelected ? 'border-primary bg-primary' : 'border-muted'
                  }`}>
                    {isSelected && <div className="w-full h-full bg-white rounded-full scale-50"></div>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA Button - Fixed at bottom */}
      <div className="p-8 pt-4 flex-shrink-0">
        <button 
          onClick={handleContinue}
          disabled={selectedGoals.length === 0}
          className={`w-full py-4 rounded-2xl font-semibold transition-smooth flex items-center justify-center space-x-2 ${
            selectedGoals.length > 0
              ? 'btn-gradient'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          <span>下一步</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default GoalSelectionScreen;
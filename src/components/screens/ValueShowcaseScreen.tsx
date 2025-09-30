import React, { useEffect, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Target, Zap, TrendingUp, ChevronRight } from 'lucide-react';

const ValueShowcaseScreen: React.FC = () => {
  const { navigateToScreen } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      icon: Target,
      title: '提升专注力',
      subtitle: '增强注意力，消除干扰',
      color: 'from-primary/20 to-accent/20'
    },
    {
      icon: Zap,
      title: '加快处理速度',
      subtitle: '提升大脑信息处理速度',
      color: 'from-accent/20 to-success/20'
    },
    {
      icon: TrendingUp,
      title: '改善记忆力',
      subtitle: '增强工作记忆和长期记忆',
      color: 'from-success/20 to-primary/20'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % items.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const ActiveIcon = items[activeIndex].icon;

  return (
    <div className="mobile-screen bg-background flex flex-col h-full">
      {/* 进度指示点 */}
      <div className="flex justify-center space-x-2 pt-8 pb-4 flex-shrink-0">
        {items.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-smooth ${index === activeIndex ? 'bg-primary' : 'bg-muted'}`}
          />
        ))}
      </div>

      {/* 内容 */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center animate-fade-in">
        <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${items[activeIndex].color} flex items-center justify-center mb-8 animate-scale-in`}>
          <ActiveIcon className="w-16 h-16 text-foreground" />
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-3">{items[activeIndex].title}</h2>
        <p className="text-muted-foreground text-lg">{items[activeIndex].subtitle}</p>

        {/* 小型动画条 */}
        <div className="mt-10 w-full max-w-xs h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-700"
            style={{ width: `${((activeIndex + 1) / items.length) * 100}%` }}
          />
        </div>
      </div>

      {/* CTA 按钮 */}
      <div className="p-8 pt-4 flex-shrink-0">
        <button
          onClick={() => navigateToScreen('info-collection')}
          className="btn-gradient w-full flex items-center justify-center space-x-2"
        >
          <span>继续</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ValueShowcaseScreen;



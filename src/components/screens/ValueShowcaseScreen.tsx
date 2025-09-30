import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Target, Zap, TrendingUp, ChevronRight } from 'lucide-react';

const ValueShowcaseScreen: React.FC = () => {
  const { navigateToScreen } = useApp();

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

  return (
    <div className="mobile-screen bg-background flex flex-col h-full">
      {/* 内容：三项同屏展示 */}
      <div className="flex-1 px-8 py-10 overflow-y-auto">
        <div className="grid grid-cols-1 gap-6">
          {items.map((it, idx) => {
            const Icon = it.icon;
            return (
              <div key={idx} className="bg-card rounded-3xl p-6 shadow-medium text-center animate-fade-in" style={{ animationDelay: `${idx * 0.06}s` }}>
                <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${it.color} flex items-center justify-center mb-5 animate-scale-in`}>
                  <Icon className="w-12 h-12 text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{it.title}</h3>
                <p className="text-muted-foreground">{it.subtitle}</p>
              </div>
            );
          })}
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



import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Smartphone, Play } from 'lucide-react';

const NavigationScreen: React.FC = () => {
  const { navigateToScreen } = useApp();

  const screenSteps = [
    { id: 'welcome', title: '欢迎页', screen: 'welcome' as const, category: '引导流程' },
    { id: 'value-carousel', title: '价值展示', screen: 'value-carousel' as const, category: '引导流程' },
    { id: 'info-collection', title: '信息采集', screen: 'info-collection' as const, category: '引导流程' },
    { id: 'goal-selection', title: '目标选择', screen: 'goal-selection' as const, category: '引导流程' },
    { id: 'pain-point-resonance', title: '痛点共鸣', screen: 'pain-point-resonance' as const, category: '引导流程' },
    { id: 'value-confirmation', title: '价值确认', screen: 'value-confirmation' as const, category: '引导流程' },
    { id: 'payment-wall', title: '付费墙', screen: 'payment-wall' as const, category: '支付流程' },
    { id: 'task-guidance', title: '任务指导', screen: 'task-guidance' as const, category: '游戏流程' },
    { id: 'game-intro', title: '游戏介绍', screen: 'game-intro' as const, category: '游戏流程' },
    { id: 'game-play', title: '游戏进行', screen: 'game-play' as const, category: '游戏流程' },
    { id: 'game-end', title: '游戏结束', screen: 'game-end' as const, category: '游戏流程' },
    { id: 'game-transition', title: '游戏过渡', screen: 'game-transition' as const, category: '游戏流程' },
    { id: 'training-progress', title: '训练进度', screen: 'training-progress' as const, category: '进度系统' },
    { id: 'goal-setting', title: '目标设置', screen: 'goal-setting' as const, category: '设置流程' },
    { id: 'streak-celebration', title: '连胜庆祝', screen: 'streak-celebration' as const, category: '成就系统' },
    { id: 'main-app', title: '主界面（未完成）', screen: 'main-app' as const, category: '主应用' },
    { id: 'completed-main-app', title: '主界面（已完成）', screen: 'completed-main-app' as const, category: '主应用' },
  ];

  const handleStepClick = (step: typeof screenSteps[0]) => {
    navigateToScreen(step.screen);
  };

  // Group screens by category
  const categories = screenSteps.reduce((acc, step) => {
    if (!acc[step.category]) {
      acc[step.category] = [];
    }
    acc[step.category].push(step);
    return acc;
  }, {} as Record<string, typeof screenSteps>);

  const categoryColors = {
    '引导流程': 'bg-blue-500',
    '支付流程': 'bg-orange-500',
    '游戏流程': 'bg-green-500',
    '进度系统': 'bg-purple-500',
    '设置流程': 'bg-pink-500',
    '成就系统': 'bg-yellow-500',
    '主应用': 'bg-indigo-500'
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-soft">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Smartphone className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">认知训练应用原型</h1>
          <p className="text-muted-foreground text-lg mb-6">基于PRD文档的完整移动端iOS交互原型</p>
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-primary/10 rounded-full text-primary font-medium">
            <Smartphone className="w-5 h-5" />
            <span>所有页面导航 - 点击直接访问</span>
          </div>
        </div>
      </div>

      {/* All Screens by Category */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">所有页面</h2>
          <p className="text-muted-foreground">按功能分类，点击任意页面直接体验</p>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {Object.entries(categories).map(([categoryName, steps]) => (
            <div key={categoryName}>
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-4 h-4 ${categoryColors[categoryName as keyof typeof categoryColors]} rounded-full`}></div>
                <h3 className="text-xl font-bold text-foreground">{categoryName}</h3>
                <div className="flex-1 h-px bg-border"></div>
                <span className="text-sm text-muted-foreground">{steps.length} 个页面</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className="card-interactive group cursor-pointer"
                    onClick={() => handleStepClick(step)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 ${categoryColors[categoryName as keyof typeof categoryColors]} rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform`}>
                        {steps.indexOf(step) + 1}
                      </div>
                      <Play className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    
                    <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {step.title}
                    </h4>
                    
                    <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                      {step.screen} 页面
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Access to Main Sections */}
        <div className="mt-16 p-8 bg-card rounded-3xl shadow-soft">
          <h3 className="text-lg font-bold text-foreground mb-6 text-center">快速访问主要功能</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigateToScreen('welcome')}
              className="p-4 bg-primary/10 rounded-2xl hover:bg-primary/20 transition-colors group"
            >
              <div className="text-primary font-semibold mb-2 group-hover:scale-105 transition-transform">完整引导流程</div>
              <div className="text-sm text-muted-foreground">从欢迎页开始体验</div>
            </button>
            <button
              onClick={() => navigateToScreen('game-intro')}
              className="p-4 bg-success/10 rounded-2xl hover:bg-success/20 transition-colors group"
            >
              <div className="text-success font-semibold mb-2 group-hover:scale-105 transition-transform">游戏体验</div>
              <div className="text-sm text-muted-foreground">直接体验游戏流程</div>
            </button>
            <button
              onClick={() => navigateToScreen('main-app')}
              className="p-4 bg-accent/10 rounded-2xl hover:bg-accent/20 transition-colors group"
            >
              <div className="text-accent font-semibold mb-2 group-hover:scale-105 transition-transform">主应用界面</div>
              <div className="text-sm text-muted-foreground">体验完整主功能</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationScreen;
import React, { useState } from 'react';
import { Home, GamepadIcon, User, Flame, Target, Brain, Clock, TrendingUp, Play, Award, Calendar, Bell, BarChart3, CheckCircle, Ghost, ShoppingCart, Phone, Droplet, GitMerge } from 'lucide-react';
import { Progress } from '../ui/progress';
import { useApp } from '../../contexts/AppContext';

// Today Tab Component - 每日记忆力训练中心
const TodayTab: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Daily memory training games
  const dailyMemoryGames = [
    {
      name: '隐藏的幽灵',
      description: '记住幽灵出现的位置',
      duration: '5-7 分钟',
      type: '空间记忆',
      icon: Ghost,
      color: 'bg-primary',
      completed: true,
      score: 92
    },
    {
      name: '购物清单',
      description: '记住购物清单内容',
      duration: '6-8 分钟',
      type: '序列记忆',
      icon: ShoppingCart,
      color: 'bg-accent',
      completed: true,
      score: 88
    },
    {
      name: '电话号码',
      description: '记住电话号码序列',
      duration: '4-6 分钟',
      type: '数字记忆',
      icon: Phone,
      color: 'bg-success',
      completed: true,
      score: 95
    }
  ];

  // Relaxing games
  const relaxingGames = [
    {
      name: '水排序',
      description: '将颜色分类排序',
      icon: Droplet,
      color: 'bg-blue-500'
    },
    {
      name: '连接圆点',
      description: '连接相同颜色的点',
      icon: GitMerge,
      color: 'bg-purple-500'
    },
    {
      name: '图案匹配',
      description: '找到相同的图案',
      icon: Target,
      color: 'bg-green-500'
    },
    {
      name: '色彩组合',
      description: '组合美丽的色彩',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 bg-card shadow-soft flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Flame className="w-7 h-7 text-primary" />
              <span className="text-2xl font-bold text-primary">7</span>
            </div>
          </div>
          <Bell className="w-6 h-6 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-1">今日记忆力训练</h1>
        <p className="text-muted-foreground">专注训练，保持趣味性</p>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-6 pb-4">
        {/* Completed Training Summary */}
        <div className="mb-5">
          <div 
            className="card-elevated cursor-pointer bg-gradient-to-r from-success/10 to-primary/10" 
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 bg-success/90 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground">今日训练已完成</h3>
                  <p className="text-sm text-success">平均分：92分</p>
                </div>
              </div>
              <div className={`transform transition-transform ${isCollapsed ? '' : 'rotate-180'}`}>
                ▼
              </div>
            </div>
            
            {/* Expanded content */}
            {!isCollapsed && (
              <div className="px-3 pb-3">
                <div className="mt-2 space-y-2">
                  {dailyMemoryGames.map((game, index) => {
                    const IconComponent = game.icon;
                    return (
                      <div key={index} className="flex items-center justify-between text-sm text-muted-foreground bg-muted/50 rounded-lg p-2">
                        <div className="flex items-center space-x-2">
                          <IconComponent className="w-4 h-4" />
                          <span>{game.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-success">{game.score}分</span>
                          <span className="text-success">✓</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Relaxing Games Section */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">放松游戏</h2>
          <p className="text-sm text-muted-foreground mb-4">没有分数压力，随时来一局</p>
          
          <div className="space-y-2">
            {relaxingGames.map((game, index) => {
              const IconComponent = game.icon;
              return (
                <div 
                  key={index} 
                  className="card-elevated cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center p-3 space-x-3">
                    <div className={`w-11 h-11 ${game.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-foreground">{game.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{game.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <Play className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Padding for Floating Button */}
        <div className="h-28" />
      </div>
    </div>
  );
};

// Games Tab and Profile Tab components remain the same...

const CompletedMainScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('today');

  const tabs = [
    { id: 'today', label: '今日', labelCn: '今日', icon: Home },
    { id: 'games', label: '游戏', labelCn: '游戏', icon: GamepadIcon },
    { id: 'profile', label: '我的', labelCn: '我的', icon: User }
  ];

  return (
    <div className="bg-background flex flex-col h-full">
      {/* Tab Content */}
      <div className="flex-1 overflow-hidden min-h-0">
        <TodayTab />
      </div>

      {/* Floating CTA Button */}
      <div className="absolute bottom-16 left-0 right-0 px-4 pb-4 bg-gradient-to-t from-background via-background/95 to-transparent z-20 pt-6">
        <button 
          className="btn-gradient w-full py-4 text-lg font-semibold rounded-xl shadow-lg"
        >
          开始游玩
        </button>
      </div>

      {/* Bottom Navigation - Fixed */}
      <div className="bg-card border-t border-border shadow-soft flex-shrink-0 z-10">
        <div className="flex h-16 items-center px-2">
          {/* Navigation Tabs */}
          <div className="flex flex-1 h-full">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center justify-center py-2 transition-colors ${
                    activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <IconComponent className="w-5 h-5 mb-1" />
                  <span className="text-xs font-medium leading-none">{tab.labelCn}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedMainScreen;

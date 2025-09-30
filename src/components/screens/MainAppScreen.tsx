import React, { useEffect, useState } from 'react';
import { Home, GamepadIcon, User, Flame, Target, Brain, Clock, TrendingUp, Play, Award, Calendar, Bell, BarChart3, CheckCircle, Ghost, ShoppingCart, Phone, Droplet, GitMerge } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

// Today Tab Component
const TodayTab: React.FC<{ isDemoCompleted: boolean; onToggleDemo: () => void }> = ({ isDemoCompleted, onToggleDemo }) => {
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
      completed: false
    },
    {
      name: '购物清单',
      description: '记住购物清单内容',
      duration: '6-8 分钟',
      type: '序列记忆',
      icon: ShoppingCart,
      color: 'bg-accent',
      completed: false
    },
    {
      name: '电话号码',
      description: '记住电话号码序列',
      duration: '4-6 分钟',
      type: '数字记忆',
      icon: Phone,
      color: 'bg-success',
      completed: false
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
        {!isDemoCompleted ? (
          <>
            {/* Training List */}
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-foreground mb-3">今日训练内容</h2>
              <div className="space-y-2">
                {dailyMemoryGames.map((game, index) => {
                  const IconComponent = game.icon;
                  const isFirst = index === 0;
                  
                  return (
                    <div 
                      key={index} 
                      className={`bg-card rounded-3xl p-6 shadow-medium cursor-pointer hover:bg-muted/50 transition-colors ${
                        isFirst ? 'ring-2 ring-primary/30' : ''
                      }`}
                    >
                      <div className="flex items-center p-3 space-x-3">
                        <div className={`w-11 h-11 ${game.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-medium text-foreground">{game.name}</h3>
                          <p className="text-sm text-muted-foreground truncate">{game.type}</p>
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

            {/* Locked Content Preview */}
            <div className="opacity-50">
              <h2 className="text-base font-medium text-foreground mb-2">完成训练后解锁</h2>
              <div className="bg-card rounded-3xl p-6 shadow-medium flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">放松游戏</h3>
                  <p className="text-xs text-muted-foreground">完成训练即可开始休闲模式</p>
                </div>
              </div>
            </div>

            {/* Bottom Padding for Floating Button */}
            <div className="h-28" />
          </>
        ) : (
          <>
            {/* Collapsible daily training section */}
            <div 
              className="mb-6 cursor-pointer" 
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <div className="bg-card rounded-3xl p-6 shadow-medium bg-gradient-to-r from-success/10 to-primary/10">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-success/90 rounded-2xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">今日记忆力训练</h3>
                      <p className="text-sm text-success">已完成 ✓</p>
                    </div>
                  </div>
                  <div className={`transform transition-transform ${isCollapsed ? '' : 'rotate-180'}`}>
                    ▼
                  </div>
                </div>
                
                {/* Expanded content */}
                {!isCollapsed && (
                  <div className="px-4 pb-4">
                    <div className="mt-2 space-y-3">
                      {dailyMemoryGames.map((game, index) => {
                        const IconComponent = game.icon;
                        return (
                          <div key={index} className="flex items-center space-x-3 text-sm text-muted-foreground">
                            <IconComponent className="w-4 h-4" />
                            <span>{game.name}</span>
                            <span className="text-success">✓</span>
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
              <h2 className="text-xl font-bold text-foreground mb-2">放松一下</h2>
              <p className="text-sm text-muted-foreground mb-6">没有分数压力，随时来一局</p>
              
              {/* Horizontal scrollable game list */}
              <div className="flex space-x-4 overflow-x-auto pb-6 -mx-6 px-6">
                {relaxingGames.map((game, index) => {
                  const IconComponent = game.icon;
                  return (
                    <div 
                      key={index} 
                      className="bg-card rounded-3xl p-6 shadow-medium min-w-[180px] cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br from-background to-muted/30"
                    >
                      <div className="p-5 text-center">
                        <div className={`w-16 h-16 ${game.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">{game.name}</h3>
                        <p className="text-sm text-muted-foreground">{game.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Games Tab Component
const GamesTab: React.FC = () => {
  const allMemoryGames = [
    { 
      name: '空间记忆挑战', 
      description: '记住物品位置',
      duration: '5-8分钟', 
      difficulty: '简单', 
      icon: Target, 
      color: 'bg-primary',
      bestScore: 850
    },
    { 
      name: '数字序列记忆', 
      description: '记住数字顺序',
      duration: '4-6分钟', 
      difficulty: '中等', 
      icon: Brain, 
      color: 'bg-accent',
      bestScore: 720
    },
    { 
      name: '图案匹配记忆', 
      description: '识别相同图案',
      duration: '6-10分钟', 
      difficulty: '中等', 
      icon: TrendingUp, 
      color: 'bg-success',
      bestScore: 680
    }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 bg-card flex-shrink-0">
        <h1 className="text-2xl font-bold text-foreground mb-2">记忆力游戏中心</h1>
        <p className="text-muted-foreground">自由探索，专项强化</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-4">
        {/* All Games Section */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">所有记忆力游戏</h2>
          <div className="space-y-4">
            {allMemoryGames.map((game, index) => {
              const IconComponent = game.icon;
              return (
                <div key={index} className="bg-card rounded-3xl p-6 shadow-medium">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className={`w-14 h-14 ${game.color} rounded-2xl flex items-center justify-center`}>
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{game.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{game.description}</p>
                        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                          <span>⏱ {game.duration}</span>
                          <span>• 难度: {game.difficulty}</span>
                          <span>• 最佳: {game.bestScore}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Play className="w-6 h-6 text-primary mb-1" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Tab Component
const ProfileTab: React.FC<{ isCompleted?: boolean; isBrandNew?: boolean }> = ({ isCompleted, isBrandNew }) => {
  const { userData } = useApp();
  const currentMemoryIndex = 1250; // 模拟记忆力指数
  const trainingDays = 1; // 第一天训练


  const achievements = [
    {
      title: '新手上路',
      description: '完成首次记忆力训练包',
      icon: CheckCircle,
      earned: true,
      color: 'bg-success'
    },
    {
      title: '持之以恒',
      description: '连续训练 7 天',
      icon: Flame,
      earned: false,
      color: 'bg-primary'
    },
    {
      title: '记忆新星',
      description: '记忆力指数达到 500',
      icon: Award,
      earned: false,
      color: 'bg-accent'
    }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header - 更紧凑的设计 */}
      <div className="p-4 bg-card text-center flex-shrink-0">
        <div className="w-12 h-12 gradient-hero rounded-full flex items-center justify-center mx-auto mb-2">
          <User className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-lg font-bold text-foreground">个人中心</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-4">
        {/* 新手未开始：隐藏签到与指数，显示引导卡 */}
        {isBrandNew ? (
          <div className="bg-card rounded-3xl p-6 shadow-medium mb-6">
            <h2 className="text-xl font-bold text-foreground mb-2">欢迎加入记忆力训练</h2>
            <p className="text-sm text-muted-foreground mb-4">还没有开始记录。请先在“今日”完成首次训练，我们将为你建立能力基线。</p>
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-muted-foreground" />
              <span>完成第 1 次训练后解锁签到与记忆力指数</span>
            </div>
          </div>
        ) : (
        /* 签到/连胜模块 */
        <div className="bg-card rounded-3xl p-6 shadow-medium mb-6">
          <h2 className="text-xl font-bold text-foreground text-center mb-2">训练连胜</h2>
          <p className="text-sm text-muted-foreground text-center mb-4">
            {isCompleted ? '今日训练已完成，明天继续保持！' : '在“今日”完成 3 个训练，开始点亮你的🔥连胜'}
          </p>

          {/* 周火焰指示 */}
          <div className="flex items-center justify-between max-w-sm mx-auto mt-1 mb-4 px-2">
            {['S','M','T','W','T','F','S'].map((d, idx) => (
              <div key={d} className="flex flex-col items-center w-8">
                <Flame className={`w-5 h-5 ${idx < (userData.streakDays || 0) ? 'text-primary' : 'text-muted-foreground/30'}`} />
                <span className="text-[10px] text-muted-foreground mt-1">{d}</span>
              </div>
            ))}
          </div>

          <button
            disabled={!!isCompleted}
            className={`w-full py-3 rounded-xl text-base font-semibold ${
              isCompleted ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'btn-gradient'
            }`}
          >
            {isCompleted ? '今日已完成' : '开始今日训练'}
          </button>
        </div>)

        {/* 记忆力指数（简化卡片，可点击查看趋势） */}
        {!isBrandNew && (<button
          onClick={() => navigateToScreen('training-progress')}
          className="w-full text-left bg-card rounded-3xl p-6 shadow-medium mb-6 hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">记忆力指数</h2>
              <p className="text-xs text-muted-foreground">{isCompleted ? '今日训练已完成，点击查看趋势' : '点击查看趋势'}</p>
            </div>
            <div className="text-4xl font-bold text-primary">{currentMemoryIndex}</div>
          </div>
        </button>)}

        {/* 记忆能力维度细分 - 已取消 */}

        {/* Achievement Badges */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">成就徽章</h2>
          <div className="space-y-3">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className={`bg-card rounded-3xl p-6 shadow-medium ${!achievement.earned ? 'opacity-60' : ''}`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${achievement.color} rounded-xl flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <CheckCircle className="w-5 h-5 text-success" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Screen Component
const MainAppScreen: React.FC = () => {
  const { presetActiveTab, presetIsDemoCompleted, presetIsBrandNew, clearPresets } = useApp();
  const [activeTab, setActiveTab] = useState(presetActiveTab || 'today');
  const [isDemoCompleted, setIsDemoCompleted] = useState(!!presetIsDemoCompleted);
  const [isBrandNew, setIsBrandNew] = useState(!!presetIsBrandNew);

  useEffect(() => {
    if (presetActiveTab !== undefined || presetIsDemoCompleted !== undefined || presetIsBrandNew !== undefined) {
      setActiveTab(presetActiveTab || 'today');
      setIsDemoCompleted(!!presetIsDemoCompleted);
      setIsBrandNew(!!presetIsBrandNew);
      clearPresets();
    }
  }, [presetActiveTab, presetIsDemoCompleted, presetIsBrandNew, clearPresets]);

  const tabs = [
    { id: 'today', label: '今日', labelCn: '今日', icon: Home },
    { id: 'games', label: '游戏', labelCn: '游戏', icon: GamepadIcon },
    { id: 'profile', label: '我的', labelCn: '我的', icon: User }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'today':
        return <TodayTab isDemoCompleted={isDemoCompleted} onToggleDemo={() => setIsDemoCompleted(!isDemoCompleted)} />;
      case 'games':
        return <GamesTab />;
      case 'profile':
        return <ProfileTab isCompleted={isDemoCompleted} isBrandNew={isBrandNew} />;
      default:
        return <TodayTab isDemoCompleted={isDemoCompleted} onToggleDemo={() => setIsDemoCompleted(!isDemoCompleted)} />;
    }
  };

  return (
    <div className="bg-background flex flex-col h-full">
      {/* Tab Content */}
      <div className="flex-1 overflow-hidden min-h-0">
        {renderTabContent()}
      </div>

      {/* Floating CTA Button - Only show in today tab when not completed */}
      {activeTab === 'today' && !isDemoCompleted && (
        <div className="absolute bottom-16 left-0 right-0 px-4 pb-4 bg-gradient-to-t from-background via-background/95 to-transparent z-20 pt-6">
          <button 
            onClick={() => setIsDemoCompleted(true)}
            className="btn-gradient w-full py-4 text-lg font-semibold rounded-xl shadow-lg"
          >
            开始训练
          </button>
        </div>
      )}

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
          
          {/* Demo State Toggle */}
          {activeTab === 'today' && (
            <div className="flex items-center pl-2">
              <button
                onClick={() => setIsDemoCompleted(!isDemoCompleted)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  isDemoCompleted 
                    ? 'bg-success/20 text-success hover:bg-success/30' 
                    : 'bg-primary/20 text-primary hover:bg-primary/30'
                }`}
              >
                {isDemoCompleted ? '已完成' : '未完成'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainAppScreen;
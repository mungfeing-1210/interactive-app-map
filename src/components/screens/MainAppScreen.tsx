import React, { useState } from 'react';
import { Home, GamepadIcon, User, Flame, Target, Brain, Clock, TrendingUp, Play, Award, Calendar, Bell, BarChart3, CheckCircle, Ghost, ShoppingCart, Phone, Droplet, GitMerge } from 'lucide-react';
import { Progress } from '../ui/progress';
import { useApp } from '../../contexts/AppContext';

// Today Tab Component - 每日記憶力訓練中心
const TodayTab: React.FC = () => {
  // State to track if today's training is completed and collapse state
  const [isTodayCompleted, setIsTodayCompleted] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Daily memory training games (specific games mentioned in requirements)
  const dailyMemoryGames = [
    {
      name: '隱藏的幽靈',
      description: '記住幽靈出現的位置',
      duration: '5-7 分鐘',
      type: '空間記憶',
      icon: Ghost,
      color: 'bg-primary',
      completed: false
    },
    {
      name: '購物清單',
      description: '記住購物清單內容',
      duration: '6-8 分鐘',
      type: '序列記憶',
      icon: ShoppingCart,
      color: 'bg-accent',
      completed: false
    },
    {
      name: '電話號碼',
      description: '記住電話號碼序列',
      duration: '4-6 分鐘',
      type: '數字記憶',
      icon: Phone,
      color: 'bg-success',
      completed: false
    }
  ];

  // Relaxing games for when daily training is completed
  const relaxingGames = [
    {
      name: '水排序',
      description: '將顏色分類排序',
      icon: Droplet,
      color: 'bg-blue-500'
    },
    {
      name: '連接圓點',
      description: '連接相同顏色的點',
      icon: GitMerge,
      color: 'bg-purple-500'
    },
    {
      name: '圖案匹配',
      description: '找到相同的圖案',
      icon: Target,
      color: 'bg-green-500'
    },
    {
      name: '色彩組合',
      description: '組合美麗的色彩',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const handleStartTraining = () => {
    // Simulate completing training
    setIsTodayCompleted(true);
  };

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
        <h1 className="text-2xl font-bold text-foreground mb-1">今日記憶力訓練</h1>
        <p className="text-muted-foreground">專注訓練，保持趣味性</p>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-6 pb-4">
        {!isTodayCompleted ? (
          // State 1: Training not completed
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">今日記憶力訓練</h2>
              
              <div className="space-y-4">
                {dailyMemoryGames.map((game, index) => {
                  const IconComponent = game.icon;
                  const isFirstUncompleted = index === 0 && !game.completed;
                  
                  return (
                    <div 
                      key={index} 
                      className={`card-elevated ${isFirstUncompleted ? 'ring-2 ring-primary/30 animate-pulse' : ''}`}
                    >
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className={`w-14 h-14 ${game.color} rounded-2xl flex items-center justify-center`}>
                            <IconComponent className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">{game.name}</h3>
                            <p className="text-sm text-muted-foreground mb-1">{game.description}</p>
                            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                              <span>⏱ {game.duration}</span>
                              <span>• {game.type}</span>
                              <span className="text-orange-500">待完成</span>
                            </div>
                          </div>
                        </div>
                        <Play className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main CTA */}
            <button 
              onClick={handleStartTraining}
              className="btn-gradient w-full py-4 text-lg font-semibold"
            >
              開始訓練
            </button>
          </>
        ) : (
          // State 2: Training completed
          <>
            {/* Collapsible daily training section */}
            <div 
              className="mb-6 cursor-pointer" 
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <div className="card-elevated bg-gradient-to-r from-success/10 to-primary/10">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-success/90 rounded-2xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">今日記憶力訓練</h3>
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
              <h2 className="text-xl font-bold text-foreground mb-2">放鬆一下</h2>
              <p className="text-sm text-muted-foreground mb-6">沒有分數壓力，隨時來一局</p>
              
              {/* Horizontal scrollable game list */}
              <div className="flex space-x-4 overflow-x-auto pb-6 -mx-6 px-6">
                {relaxingGames.map((game, index) => {
                  const IconComponent = game.icon;
                  return (
                    <div 
                      key={index} 
                      className="card-elevated min-w-[180px] cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br from-background to-muted/30"
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

// Games Tab Component - 記憶力遊戲中心
const GamesTab: React.FC = () => {
  const allMemoryGames = [
    { 
      name: '空間記憶挑戰', 
      description: '記住物品位置',
      duration: '5-8分鐘', 
      difficulty: '簡單', 
      icon: Target, 
      color: 'bg-primary',
      bestScore: 850
    },
    { 
      name: '數字序列記憶', 
      description: '記住數字順序',
      duration: '4-6分鐘', 
      difficulty: '中等', 
      icon: Brain, 
      color: 'bg-accent',
      bestScore: 720
    },
    { 
      name: '圖案匹配記憶', 
      description: '識別相同圖案',
      duration: '6-10分鐘', 
      difficulty: '中等', 
      icon: TrendingUp, 
      color: 'bg-success',
      bestScore: 680
    },
    { 
      name: '色彩序列記憶', 
      description: '記住顏色順序',
      duration: '3-5分鐘', 
      difficulty: '簡單', 
      icon: Clock, 
      color: 'bg-primary',
      bestScore: 920
    },
    { 
      name: '文字記憶訓練', 
      description: '記住詞語列表',
      duration: '8-12分鐘', 
      difficulty: '困難', 
      icon: Brain, 
      color: 'bg-accent',
      bestScore: 560
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
                <div key={index} className="card-elevated">
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
                          <span>• 難度: {game.difficulty}</span>
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

// Profile Tab Component - 訓練記錄與個人中心
const ProfileTab: React.FC = () => {
  const { userData } = useApp();
  
  // 模拟训练天数数据 - 在实际应用中这应该来自后端
  const trainingDays = userData.gamesCompleted || 1; // 假设每完成3个游戏算1天
  const currentMemoryIndex = 1250;
  const yesterdayScore = 1235; // 模拟昨日分数
  const scoreChange = currentMemoryIndex - yesterdayScore;
  
  // 模拟3天的分数数据用于校准期
  const calibrationScores = [1250, 1265, 1285];
  
  const memoryAbilities = [
    { name: '空間記憶', score: 85, color: 'bg-primary' },
    { name: '序列記憶', score: 78, color: 'bg-accent' },
    { name: '視覺再認', score: 92, color: 'bg-success' }
  ];

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
      earned: true,
      color: 'bg-primary'
    },
    {
      title: '记忆新星',
      description: '记忆力指数达到 500',
      icon: Award,
      earned: false,
      color: 'bg-muted'
    }
  ];

  // 渲染基準校準期介面
  const renderCalibrationInterface = () => {
    return (
      <div className="card-elevated mb-6 text-center">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">记忆力指数</h2>
          <div className="text-4xl font-bold text-primary mb-2">{currentMemoryIndex}</div>
          
          {trainingDays > 1 && (
            <div className="text-sm font-medium text-success mb-4">
              ↑ {scoreChange} vs 昨日
            </div>
          )}
          
          <div className="bg-muted/30 rounded-lg p-4 mb-4">
            <div className="flex justify-center space-x-2 mb-3">
              {[1, 2, 3].map((day) => (
                <div
                  key={day}
                  className={`w-3 h-3 rounded-full ${
                    day <= trainingDays ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {trainingDays < 3 
                ? `第${trainingDays}天训练 • 再训练${3 - trainingDays}天解锁趋势图`
                : '基准校准完成！'
              }
            </p>
          </div>
          
          <p className="text-xs text-muted-foreground">基于所有记忆力游戏的加权平均值</p>
        </div>
      </div>
    );
  };

  // 渲染完整進度曲線
  const renderProgressCurve = () => {
    return (
      <div className="card-elevated mb-6 text-center">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">记忆力指数</h2>
          <div className="text-4xl font-bold text-primary mb-2">{currentMemoryIndex}</div>
          <div className="text-sm font-medium text-success mb-4">
            ↑ {scoreChange} vs 昨日
          </div>
          
          {/* 简化的进度图 */}
          <div className="bg-gradient-to-r from-primary/20 to-primary/40 rounded-lg p-4 h-24 flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-primary mr-2" />
            <span className="text-sm text-primary font-medium">7天进步趋势</span>
          </div>
          
          <p className="text-xs text-muted-foreground">基于所有记忆力游戏的加权平均值</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 bg-card text-center flex-shrink-0">
        <div className="w-20 h-20 gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-1">训练记录与个人中心</h1>
        <p className="text-muted-foreground">量化记忆力进步，数据反馈</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-4">
        {/* Memory Index Progress - 校準期或完整曲線 */}
        {trainingDays < 3 ? renderCalibrationInterface() : renderProgressCurve()}

        {/* Memory Ability Breakdown */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">记忆能力细分</h2>
          <div className="card-elevated">
            <div className="p-6 space-y-4">
              {memoryAbilities.map((ability, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">{ability.name}</span>
                    <span className="text-sm font-bold text-primary">{ability.score}%</span>
                  </div>
                  <Progress value={ability.score} className="h-3" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Training Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="card-elevated text-center">
            <div className="p-4">
              <div className="text-2xl font-bold text-primary mb-1">21</div>
              <p className="text-sm text-muted-foreground">总训练次数</p>
            </div>
          </div>
          <div className="card-elevated text-center">
            <div className="p-4">
              <div className="text-2xl font-bold text-success mb-1">7</div>
              <p className="text-sm text-muted-foreground">连续训练天数</p>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">成就徽章</h2>
          <div className="space-y-3">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className={`card-elevated ${!achievement.earned ? 'opacity-60' : ''}`}>
                  <div className="flex items-center space-x-4 p-4">
                    <div className={`w-12 h-12 ${achievement.color} rounded-full flex items-center justify-center`}>
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

const MainAppScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('today');

  const tabs = [
    { id: 'today', label: '今日', labelCn: '今日', icon: Home },
    { id: 'games', label: '游戏', labelCn: '游戏', icon: GamepadIcon },
    { id: 'profile', label: '我的', labelCn: '我的', icon: User }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'today':
        return <TodayTab />;
      case 'games':
        return <GamesTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <TodayTab />;
    }
  };

  return (
    <div className="bg-background flex flex-col h-full">
      {/* Tab Content */}
      <div className="flex-1 overflow-hidden min-h-0">
        {renderTabContent()}
      </div>

      {/* Bottom Navigation - Fixed */}
      <div className="bg-card border-t border-border shadow-soft flex-shrink-0 z-10">
        <div className="flex h-20 items-center">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center justify-center space-y-1 transition-colors ${
                  activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="text-xs font-medium">{tab.labelCn}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainAppScreen;
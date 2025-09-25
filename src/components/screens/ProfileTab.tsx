import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { User } from 'lucide-react';

const ProfileTab: React.FC = () => {
  const { userData } = useApp();
  const currentMemoryIndex = 1250; // 模拟记忆力指数
  const trainingDays = 1; // 首次完成训练

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
        {/* 记忆力指数卡片 */}
        <div className="bg-card rounded-3xl p-6 shadow-medium mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">记忆力指数</h2>
          
          {/* 分数显示 */}
          <div className="text-4xl font-bold text-primary mb-6 text-center">
            {currentMemoryIndex}
          </div>

          {/* 校准进度指示器 */}
          <div className="bg-muted/30 rounded-xl p-4 mb-4">
            <div className="text-sm font-medium text-foreground mb-4">
              正在进行能力基准校准
            </div>
            
            {/* 进度点 */}
            <div className="flex justify-center space-x-2 mb-3">
              {[1, 2, 3].map((day) => (
                <div
                  key={day}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    day <= trainingDays 
                      ? 'bg-primary' 
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            {/* 当前进度文字 */}
            <p className="text-sm text-muted-foreground text-center mb-2">
              初始基准已记录
            </p>

            {/* 激励文案 */}
            <p className="text-sm text-muted-foreground text-center">
              很棒的开始！连续完成3天训练，即可解锁您的个性化进度曲线。
            </p>
          </div>

          {/* 底部说明 */}
          <p className="text-xs text-muted-foreground text-center">
            基于所有记忆力游戏的加权平均值
          </p>
        </div>

        {/* 预留其他两个页面的空间 */}
        <div className="h-32"></div>
      </div>
    </div>
  );
};

export default ProfileTab;

import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { X, Check, Star } from 'lucide-react';

const PaymentWallScreen: React.FC = () => {
  const { navigateToScreen, setUserData } = useApp();

  const handlePurchase = (planType: 'monthly' | 'yearly') => {
    setUserData({ isPaidUser: true });
    navigateToScreen('task-guidance');
  };

  const handleSkip = () => {
    setUserData({ isPaidUser: false });
    navigateToScreen('task-guidance');
  };

  const features = [
    '无限制访问所有高级训练',
    '个性化训练计划',
    '详细进度跟踪和分析',
    '专家指导的训练内容',
    '无广告纯净体验'
  ];

  return (
    <div className="mobile-screen bg-background flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center p-6 flex-shrink-0">
        <div></div>
        <h1 className="text-lg font-semibold text-foreground">解锁全部功能</h1>
        <button 
          onClick={handleSkip}
          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80 transition-smooth"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        {/* Hero Section */}
        <div className="mb-6">
          <div className="gradient-hero rounded-3xl p-6 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold mb-2">解锁全部高级训练</h2>
            <p className="text-white/80 text-sm">开启您的认知提升之旅</p>
          </div>
        </div>

        {/* Features List */}
        <div className="mb-6">
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-foreground font-medium text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="space-y-3 mb-6">
          {/* Yearly Plan - Popular */}
          <div className="relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
              最受欢迎
            </div>
            <button
              onClick={() => handlePurchase('yearly')}
              className="w-full p-4 rounded-2xl border-2 border-primary bg-primary/5 hover:border-primary/80 transition-smooth"
            >
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <span className="text-xl font-bold text-primary">¥298</span>
                  <span className="text-muted-foreground line-through text-sm">¥588</span>
                </div>
                <p className="text-primary font-semibold mb-1 text-sm">年度会员</p>
                <p className="text-xs text-muted-foreground">平均每月仅¥25 • 节省50%</p>
              </div>
            </button>
          </div>

          {/* Monthly Plan */}
          <button
            onClick={() => handlePurchase('monthly')}
            className="w-full p-4 rounded-2xl border-2 border-border bg-card hover:border-primary/50 transition-smooth"
          >
            <div className="text-center">
              <div className="text-xl font-bold text-foreground mb-1">¥58</div>
              <p className="text-foreground font-semibold mb-1 text-sm">月度会员</p>
              <p className="text-xs text-muted-foreground">按月付费</p>
            </div>
          </button>
        </div>
      </div>

      {/* Fixed CTA Button */}
      <div className="p-6 border-t border-border bg-card flex-shrink-0">
        <button 
          onClick={() => handlePurchase('yearly')}
          className="btn-gradient w-full mb-3"
        >
          立即解锁
        </button>
        <p className="text-center text-xs text-muted-foreground">
          7天免费试用 • 随时可取消 • 安全支付保障
        </p>
      </div>
    </div>
  );
};

export default PaymentWallScreen;
import React, { useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { CheckCircle } from 'lucide-react';

const ValueConfirmationScreen: React.FC = () => {
  const { navigateToScreen } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigateToScreen('payment-wall');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigateToScreen]);

  return (
    <div className="mobile-screen gradient-hero text-white flex flex-col items-center justify-center p-8">
      {/* Loading Animation */}
      <div className="mb-8">
        <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>

      {/* Loading Text */}
      <h1 className="text-xl font-semibold text-center mb-4 animate-fade-in">
        正在根据您的具体情况，为您生成专属计划
      </h1>

      {/* Success Message */}
      <div className="mt-8 animate-bounce-in">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <CheckCircle className="w-8 h-8 text-success" />
          <span className="text-success font-medium">分析完成</span>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm text-center">
          <p className="text-white/90 font-medium mb-2">
            87% 有类似困扰的用户在7天后感觉有提升
          </p>
          <p className="text-white/70 text-sm">
            基于您的个人情况，我们为您准备了专属训练方案
          </p>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex space-x-2 mt-8">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default ValueConfirmationScreen;
import React, { useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Loader2 } from 'lucide-react';

const ValueConfirmationScreen: React.FC = () => {
  const { navigateToScreen } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigateToScreen('payment-wall');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigateToScreen]);

  return (
    <div className="mobile-screen bg-background flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold text-center mb-12">
        正在生成您的专属计划
      </h1>

      <p className="text-base text-muted-foreground text-center mb-8">
        根据您的选择，我们正在为您定制：
      </p>

      <div className="w-full max-w-xs space-y-6 mb-12">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-5 h-5 text-primary animate-spin" />
          <span className="text-foreground">个性化训练方案</span>
        </div>
        <div className="flex items-center space-x-3">
          <Loader2 className="w-5 h-5 text-primary animate-spin" style={{ animationDelay: '0.2s' }} />
          <span className="text-foreground">难度适配系统</span>
        </div>
        <div className="flex items-center space-x-3">
          <Loader2 className="w-5 h-5 text-primary animate-spin" style={{ animationDelay: '0.4s' }} />
          <span className="text-foreground">进度追踪模块</span>
        </div>
      </div>

      <div className="bg-muted/30 rounded-xl p-4 w-full max-w-sm">
        <p className="text-center text-sm text-muted-foreground">
          92% 的用户在坚持使用方案后，记忆力测试分数提升超过 30%
        </p>
      </div>
    </div>
  );
};

export default ValueConfirmationScreen;
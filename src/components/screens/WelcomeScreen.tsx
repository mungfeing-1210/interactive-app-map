import React, { useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Brain, Users, Award } from 'lucide-react';

const WelcomeScreen: React.FC = () => {
  const { navigateToScreen } = useApp();

  return (
    <div className="mobile-screen bg-gradient-to-b from-blue-400 to-purple-500 text-white flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col items-center pt-12 pb-8 flex-shrink-0">
        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-6 animate-bounce-in">
          <Brain className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">思维助手</h1>
        <p className="text-white/80 text-center text-lg">激发你的认知潜能</p>
      </div>

      {/* Content - Social Proof */}
      <div className="flex-1 flex flex-col justify-center px-8">
        <div className="flex items-center justify-center space-x-12 text-white/90 mb-8">
          <div className="flex items-center space-x-2">
            <Users className="w-6 h-6" />
            <span className="text-sm font-medium">百万用户</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-6 h-6" />
            <span className="text-sm font-medium">专家设计</span>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <p className="text-center text-white/90 text-base leading-relaxed">
            "科学证明每天10分钟，有效提升认知能力"
          </p>
        </div>
      </div>

      {/* CTA Button - Fixed at bottom */
      }
      <div className="p-8 flex-shrink-0">
        <button 
          onClick={() => navigateToScreen('value-showcase')}
          className="w-full bg-white text-blue-500 font-bold py-4 rounded-2xl shadow-large transition-smooth hover:shadow-glow active:scale-95"
        >
          开始体验
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
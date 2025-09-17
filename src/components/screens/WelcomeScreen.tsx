import React, { useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Brain, Users, Award } from 'lucide-react';

const WelcomeScreen: React.FC = () => {
  const { navigateToScreen } = useApp();

  return (
    <div className="mobile-screen gradient-hero text-white flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col items-center pt-12 pb-8 flex-shrink-0">
        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-6 animate-bounce-in">
          <Brain className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">MindBoost</h1>
        <p className="text-white/80 text-center text-lg">Unlock Your Cognitive Potential</p>
      </div>

      {/* Content - Social Proof */}
      <div className="flex-1 flex flex-col justify-center px-8">
        <div className="flex items-center justify-center space-x-6 text-white/90 mb-6">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">100M+ Users</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span className="text-sm font-medium">Expert Designed</span>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <p className="text-center text-white/90 text-sm">
            "Scientifically proven to enhance cognitive abilities in just 10 minutes daily"
          </p>
        </div>
      </div>

      {/* CTA Button - Fixed at bottom */}
      <div className="p-8 flex-shrink-0">
        <button 
          onClick={() => navigateToScreen('value-carousel')}
          className="w-full bg-white text-primary font-bold py-4 rounded-2xl shadow-large transition-smooth hover:shadow-glow active:scale-95"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { ChevronRight } from 'lucide-react';

const InfoCollectionScreen: React.FC = () => {
  const { navigateToScreen, setUserData } = useApp();
  const [selectedAge, setSelectedAge] = useState('');

  const ageRanges = [
    '18-25', '26-35', '36-45', '46-55', '55+'
  ];

  const handleContinue = () => {
    if (selectedAge) {
      setUserData({ age: selectedAge });
      navigateToScreen('goal-selection');
    }
  };

  return (
    <div className="mobile-screen bg-background flex flex-col h-full">
      {/* Header */}
      <div className="text-center p-8 pt-12 pb-6 flex-shrink-0">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          为了给您提供更精准的训练方案
        </h1>
        <p className="text-muted-foreground">
          请告诉我们一些基本信息
        </p>
      </div>

      {/* Age Selection - Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-8">
        <div className="mb-6">
          <label className="block text-foreground font-medium mb-6">
            您的年龄段是？
          </label>
          <div className="space-y-3">
            {ageRanges.map((age) => (
              <button
                key={age}
                onClick={() => setSelectedAge(age)}
                className={`w-full p-4 rounded-2xl border-2 transition-smooth text-center ${
                  selectedAge === age
                    ? 'border-primary bg-primary/10 text-primary font-medium'
                    : 'border-border bg-card text-foreground hover:border-primary/50'
                }`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Button - Fixed at bottom */}
      <div className="p-8 pt-4 flex-shrink-0">
        <button 
          onClick={handleContinue}
          disabled={!selectedAge}
          className={`w-full py-4 rounded-2xl font-semibold transition-smooth flex items-center justify-center space-x-2 ${
            selectedAge
              ? 'btn-gradient'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          <span>继续</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default InfoCollectionScreen;
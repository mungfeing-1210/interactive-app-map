import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { ChevronRight, Target, Zap, TrendingUp } from 'lucide-react';

const ValueCarouselScreen: React.FC = () => {
  const { navigateToScreen } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Target,
      title: "正在根据您的具体情况，为您生成专属计划",
      subtitle: "分析完成",
      stats: "87% 有类似困扰的用户在7天后感觉有提升",
      color: "text-accent"
    },
    {
      icon: Zap,
      title: "正在评估您的认知能力基准水平",
      subtitle: "评估完成",
      stats: "92% 的用户在完成基准测试后获得更精准的训练计划",
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      title: "正在生成个性化训练方案",
      subtitle: "生成完成",
      stats: "95% 的用户认为个性化方案更有效",
      color: "text-success"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigateToScreen('info-collection');
    }
  };

  const currentSlideData = slides[currentSlide];
  const IconComponent = currentSlideData.icon;

  return (
    <div className="mobile-screen bg-gradient-to-b from-blue-500 to-purple-600 flex flex-col h-full text-white">
      {/* Back Button */}
      <div className="pt-8 px-6">
        <button
          onClick={() => navigateToScreen('welcome')}
          className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 animate-fade-in">
        {/* Loading Animation */}
        <div className="w-24 h-24 mb-16">
          <div className="w-full h-full rounded-full border-4 border-white/20 border-t-white animate-spin" />
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-8 leading-relaxed">
          {currentSlideData.title}
        </h2>
        
        <div className="flex items-center space-x-2 text-green-400 mb-12">
          <IconComponent className="w-6 h-6" />
          <span className="text-base">{currentSlideData.subtitle}</span>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 w-full">
          <p className="text-center text-lg">
            {currentSlideData.stats}
          </p>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center space-x-2 pb-8">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-smooth ${
              index === currentSlide ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ValueCarouselScreen;
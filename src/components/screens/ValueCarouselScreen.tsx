import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { ChevronRight, Target, Zap, TrendingUp } from 'lucide-react';

const ValueCarouselScreen: React.FC = () => {
  const { navigateToScreen } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Target,
      title: "Enhanced Focus",
      subtitle: "Boost your concentration and eliminate distractions",
      color: "text-accent"
    },
    {
      icon: Zap,
      title: "Faster Processing",
      subtitle: "Accelerate your mental processing speed",
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      title: "Improved Memory",
      subtitle: "Strengthen your working and long-term memory",
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
    <div className="mobile-screen bg-background flex flex-col h-full">
      {/* Progress Indicators */}
      <div className="flex justify-center space-x-2 pt-8 pb-4 flex-shrink-0">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-smooth ${
              index === currentSlide ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 animate-fade-in">
        <div className={`w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-8 ${currentSlideData.color} animate-scale-in`}>
          <IconComponent className="w-16 h-16" />
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-4 text-foreground">
          {currentSlideData.title}
        </h2>
        
        <p className="text-center text-muted-foreground text-lg px-4">
          {currentSlideData.subtitle}
        </p>
      </div>

      {/* CTA Button */}
      <div className="p-8 pt-4 flex-shrink-0">
        <button 
          onClick={nextSlide}
          className="btn-gradient w-full flex items-center justify-center space-x-2"
        >
          <span>{currentSlide < slides.length - 1 ? 'Continue' : 'Start Journey'}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ValueCarouselScreen;
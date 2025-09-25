import React from 'react';

interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full px-6 py-3 bg-card border-b border-border">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Step Counter */}
      <div className="flex justify-end mt-2">
        <span className="text-xs text-muted-foreground">
          {currentStep} / {totalSteps}
        </span>
      </div>
    </div>
  );
};

export default ProgressSteps;
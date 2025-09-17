import React from 'react';
import { useApp } from '../contexts/AppContext';
import { ArrowLeft } from 'lucide-react';

interface MobileContainerProps {
  children: React.ReactNode;
  showStatusBar?: boolean;
  showBackButton?: boolean;
}

const MobileContainer: React.FC<MobileContainerProps> = ({ 
  children, 
  showStatusBar = true,
  showBackButton = true
}) => {
  const { navigateToScreen } = useApp();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-4 px-4">
      <div className="mobile-container relative">
        {showStatusBar && (
          <div className="flex justify-between items-center px-6 py-3 bg-card text-sm text-muted-foreground border-b border-border flex-shrink-0">
            <span className="font-medium">9:41</span>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-2 bg-foreground rounded-sm opacity-60"></div>
              <div className="w-1 h-1 bg-foreground rounded-full"></div>
              <div className="w-4 h-2 bg-foreground rounded-sm"></div>
            </div>
          </div>
        )}
        {showBackButton && (
          <div className="absolute top-20 left-6 z-20">
            <button
              onClick={() => navigateToScreen('navigation')}
              className="w-10 h-10 bg-card/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-medium hover:bg-card transition-colors border border-border"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
          </div>
        )}
        <div className="mobile-screen relative">
          {children}
        </div>
        {/* Safe Area Bottom Padding */}
        <div className="h-[env(safe-area-inset-bottom,0px)]" />
      </div>
    </div>
  );
};

export default MobileContainer;
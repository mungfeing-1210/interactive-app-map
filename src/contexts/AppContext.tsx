import React, { createContext, useContext, useState, ReactNode } from 'react';

type Screen = 
  | 'navigation'
  | 'welcome'
  | 'value-carousel'
  | 'info-collection'
  | 'goal-selection'
  | 'pain-point-resonance'
  | 'value-confirmation'
  | 'payment-wall'
  | 'task-guidance'
  | 'game-intro'
  | 'game-play'
  | 'game-end'
  | 'game-transition'
  | 'training-progress'
  | 'goal-setting'
  | 'habit-mechanism'
  | 'streak-celebration'
  | 'main-app'
  | 'completed-main-app';

interface UserData {
  age?: string;
  goals?: string[];
  painPoints?: string[];
  isPaidUser?: boolean;
  currentGame?: number;
  gamesCompleted?: number;
  totalGames?: number;
  scores?: number[];
}

interface AppContextType {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  userData: UserData;
  setUserData: (data: Partial<UserData>) => void;
  navigateToScreen: (screen: Screen) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('navigation');
  const [userData, setUserDataState] = useState<UserData>({
    gamesCompleted: 0,
    currentGame: 1,
    totalGames: 3,
    scores: [],
    isPaidUser: false
  });

  const setUserData = (data: Partial<UserData>) => {
    setUserDataState(prev => ({ ...prev, ...data }));
  };

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  return (
    <AppContext.Provider value={{
      currentScreen,
      setCurrentScreen,
      userData,
      setUserData,
      navigateToScreen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
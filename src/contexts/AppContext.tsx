import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

type Screen = 
  | 'navigation'
  | 'welcome'
  | 'value-carousel'
  | 'value-showcase'
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
  hasStartedTraining?: boolean;
  streakDays?: number;
  notifications?: number;
}

interface AppContextType {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  userData: UserData;
  setUserData: (data: Partial<UserData>) => void;
  navigateToScreen: (screen: Screen) => void;
  resetTrainingProgress: () => void;
  currentStep: number;
  totalSteps: number;
  showProgress: boolean;
  // 预设主应用初始态（用于导航页直达不同状态）
  presetActiveTab?: 'today' | 'games' | 'profile';
  presetIsDemoCompleted?: boolean;
  setPresets: (tab?: 'today' | 'games' | 'profile', isCompleted?: boolean) => void;
  clearPresets: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const ONBOARDING_STEPS: Screen[] = [
  'value-showcase',
  'info-collection',
  'goal-selection',
  'pain-point-resonance',
  'value-confirmation',
  'payment-wall'
];

const DEFAULT_USER_DATA: UserData = {
  gamesCompleted: 0,
  currentGame: 1,
  totalGames: 3,
  scores: [],
  isPaidUser: false,
  hasStartedTraining: false,
  streakDays: 1,
  notifications: 3
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('navigation');
  const [userData, setUserDataState] = useState<UserData>(DEFAULT_USER_DATA);
  const [presetActiveTab, setPresetActiveTab] = useState<'today' | 'games' | 'profile' | undefined>(undefined);
  const [presetIsDemoCompleted, setPresetIsDemoCompleted] = useState<boolean | undefined>(undefined);

  const { currentStep, totalSteps, showProgress } = useMemo(() => {
    const stepIndex = ONBOARDING_STEPS.indexOf(currentScreen);
    return {
      currentStep: stepIndex + 1,
      totalSteps: ONBOARDING_STEPS.length,
      showProgress: stepIndex !== -1
    };
  }, [currentScreen]);

  const setUserData = (data: Partial<UserData>) => {
    setUserDataState(prev => {
      const newData = { ...prev, ...data };
      if (newData.gamesCompleted && newData.totalGames) {
        newData.gamesCompleted = Math.min(newData.gamesCompleted, newData.totalGames);
      }
      return newData;
    });
  };

  const resetTrainingProgress = () => {
    setUserDataState(DEFAULT_USER_DATA);
  };

  const navigateToScreen = (screen: Screen) => {
    // 当从导航页面进入完整引导流程时，重置所有状态
    if (currentScreen === 'navigation' && screen === 'welcome') {
      resetTrainingProgress();
    }
    
    // 当进入游戏相关页面时，标记已开始训练
    if (['game-intro', 'game-play', 'game-end'].includes(screen)) {
      setUserData({ hasStartedTraining: true });
    }

    setCurrentScreen(screen);
  };

  const setPresets = (tab?: 'today' | 'games' | 'profile', isCompleted?: boolean) => {
    setPresetActiveTab(tab);
    setPresetIsDemoCompleted(isCompleted);
  };

  const clearPresets = () => {
    setPresetActiveTab(undefined);
    setPresetIsDemoCompleted(undefined);
  };

  return (
    <AppContext.Provider value={{
      currentScreen,
      setCurrentScreen,
      userData,
      setUserData,
      navigateToScreen,
      resetTrainingProgress,
      currentStep,
      totalSteps,
      showProgress,
      presetActiveTab,
      presetIsDemoCompleted,
      setPresets,
      clearPresets
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
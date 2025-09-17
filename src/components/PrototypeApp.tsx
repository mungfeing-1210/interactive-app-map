import React from 'react';
import { AppProvider, useApp } from '../contexts/AppContext';
import MobileContainer from './MobileContainer';
import NavigationScreen from './screens/NavigationScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ValueCarouselScreen from './screens/ValueCarouselScreen';
import InfoCollectionScreen from './screens/InfoCollectionScreen';
import GoalSelectionScreen from './screens/GoalSelectionScreen';
import PainPointResonanceScreen from './screens/PainPointResonanceScreen';
import ValueConfirmationScreen from './screens/ValueConfirmationScreen';
import PaymentWallScreen from './screens/PaymentWallScreen';
import TaskGuidanceScreen from './screens/TaskGuidanceScreen';
import GameIntroScreen from './screens/GameIntroScreen';
import GamePlayScreen from './screens/GamePlayScreen';
import GameEndScreen from './screens/GameEndScreen';
import GameTransitionScreen from './screens/GameTransitionScreen';
import TrainingProgressScreen from './screens/TrainingProgressScreen';
import GoalSettingScreen from './screens/GoalSettingScreen';
import StreakCelebrationScreen from './screens/StreakCelebrationScreen';
import MainAppScreen from './screens/MainAppScreen';

const PrototypeContent: React.FC = () => {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'navigation': return <NavigationScreen />;
      case 'welcome': return <WelcomeScreen />;
      case 'value-carousel': return <ValueCarouselScreen />;
      case 'info-collection': return <InfoCollectionScreen />;
      case 'goal-selection': return <GoalSelectionScreen />;
      case 'pain-point-resonance': return <PainPointResonanceScreen />;
      case 'value-confirmation': return <ValueConfirmationScreen />;
      case 'payment-wall': return <PaymentWallScreen />;
      case 'task-guidance': return <TaskGuidanceScreen />;
      case 'game-intro': return <GameIntroScreen />;
      case 'game-play': return <GamePlayScreen />;
      case 'game-end': return <GameEndScreen />;
      case 'game-transition': return <GameTransitionScreen />;
      case 'training-progress': return <TrainingProgressScreen />;
      case 'goal-setting': return <GoalSettingScreen />;
      case 'streak-celebration': return <StreakCelebrationScreen />;
      case 'main-app': return <MainAppScreen />;
      default: return <NavigationScreen />;
    }
  };

  // For navigation screen, don't use mobile container
  if (currentScreen === 'navigation') {
    return renderScreen();
  }

  return (
    <MobileContainer>
      {renderScreen()}
    </MobileContainer>
  );
};

const PrototypeApp: React.FC = () => {
  return (
    <AppProvider>
      <PrototypeContent />
    </AppProvider>
  );
};

export default PrototypeApp;
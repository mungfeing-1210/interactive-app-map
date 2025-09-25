import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Clock, Bell } from 'lucide-react';

const GoalSettingScreen: React.FC = () => {
  const { navigateToScreen } = useApp();
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const trainingTimes = [
    { value: 5, label: '5 分钟/天' },
    { value: 10, label: '10 分钟/天' },
    { value: 15, label: '15 分钟/天' },
    { value: 20, label: '20 分钟/天' }
  ];

  const [selectedTime, setSelectedTime] = useState(10);

  const handleConfirm = () => {
    setShowNotificationModal(true);
  };

  const handleEnableNotification = () => {
    navigateToScreen('streak-celebration');
  };

  const handleSkipNotification = () => {
    navigateToScreen('streak-celebration');
  };

  return (
    <div className="mobile-screen bg-background flex flex-col h-full">
      {/* Header */}
      <div className="p-4">
        <button
          onClick={() => navigateToScreen('training-progress')}
          className="w-10 h-10 bg-card/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-medium hover:bg-card transition-colors border border-border"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-4 overflow-y-auto">
        {/* Icon and Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Clock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground text-center">设定每日目标</h1>
          <p className="text-sm text-muted-foreground text-center mt-1">选择您的每日训练时间</p>
        </div>

        {/* Time Selection */}
        <div className="space-y-3">
          {trainingTimes.map((time) => (
            <button
              key={time.value}
              onClick={() => setSelectedTime(time.value)}
              className={`w-full py-4 rounded-2xl border-2 transition-smooth text-center ${
                selectedTime === time.value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <span className="text-xl font-bold">{time.value}</span>
              <span className="text-base"> 分钟/天</span>
            </button>
          ))}
        </div>

        {/* Notification Hint */}
        <div className="mt-6 p-3 bg-primary/5 rounded-xl flex items-center space-x-2">
          <Bell className="w-4 h-4 text-primary" />
          <p className="text-xs text-muted-foreground">我们会在合适的时间提醒您训练</p>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="p-4">
        <button 
          onClick={handleConfirm}
          className="btn-gradient w-full py-3 text-base font-medium rounded-xl"
        >
          确认目标
        </button>
      </div>

      {/* Notification Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-2xl p-6 m-4 max-w-sm w-full">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Bell className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground mb-2">开启训练提醒</h2>
              <p className="text-center text-sm text-muted-foreground mb-4">
                我们将在您设定的训练时间发送温馨提醒，帮助您保持训练习惯
              </p>
              <div className="flex flex-col w-full space-y-2">
                <button
                  onClick={handleEnableNotification}
                  className="btn-gradient w-full py-3 rounded-xl"
                >
                  开启提醒
                </button>
                <button
                  onClick={handleSkipNotification}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  稍后再说
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalSettingScreen;
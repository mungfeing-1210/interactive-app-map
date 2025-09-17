import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Clock, Bell } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';

const GoalSettingScreen: React.FC = () => {
  const { navigateToScreen } = useApp();
  const [selectedDuration, setSelectedDuration] = useState('10');
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);

  const durations = ['5', '10', '15', '20'];

  const handleConfirm = () => {
    setShowNotificationDialog(true);
  };

  const handleNotificationPermission = async (allow: boolean) => {
    if (allow && 'Notification' in window) {
      try {
        await Notification.requestPermission();
      } catch (error) {
        console.log('Notification permission request failed:', error);
      }
    }
    setShowNotificationDialog(false);
    navigateToScreen('streak-celebration');
  };

  return (
    <div className="mobile-screen bg-background flex flex-col h-full">
      {/* Header */}
      <div className="text-center p-8 pt-12 pb-6 flex-shrink-0">
        <Clock className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">设定每日目标</h1>
        <p className="text-muted-foreground">选择您的每日训练时间</p>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-8">
        <div className="space-y-3 mb-8">
          {durations.map((duration) => (
            <button
              key={duration}
              onClick={() => setSelectedDuration(duration)}
              className={`w-full p-4 rounded-2xl border-2 transition-smooth text-center flex items-center justify-center ${
                selectedDuration === duration
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-card text-foreground hover:border-primary/50'
              }`}
            >
              <div className="text-xl font-bold mr-2">{duration}</div>
              <div className="text-sm">分钟/天</div>
            </button>
          ))}
        </div>

        <div className="bg-muted rounded-2xl p-4 flex items-center space-x-3">
          <Bell className="w-5 h-5 text-accent" />
          <p className="text-sm text-foreground">我们会在合适的时间提醒您训练</p>
        </div>
      </div>

      {/* CTA Button - Fixed at bottom */}
      <div className="p-8 pt-4 flex-shrink-0">
        <button onClick={handleConfirm} className="btn-gradient w-full">
          确认目标
        </button>
      </div>

      {/* Notification Permission Dialog */}
      <Dialog open={showNotificationDialog} onOpenChange={setShowNotificationDialog}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-primary" />
            </div>
            <DialogTitle className="text-xl font-bold">开启训练提醒</DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              我们将在您设定的训练时间发送温馨提醒，帮助您保持训练习惯
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-6">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => handleNotificationPermission(false)}
            >
              稍后再说
            </Button>
            <Button 
              className="flex-1"
              onClick={() => handleNotificationPermission(true)}
            >
              开启提醒
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GoalSettingScreen;
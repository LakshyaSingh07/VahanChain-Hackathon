import React, { useState } from 'react';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen1 from './src/screens/OnboardingScreen1';
import OnboardingScreen2 from './src/screens/OnboardingScreen2';
import OnboardingScreen3 from './src/screens/OnboardingScreen3';
import PermissionScreen from './src/screens/PermissionScreen';
import MainScreen from './src/screens/MainScreen';
import FadeTransition from './src/components/FadeTransition';

// App flow states
type AppState = 'splash' | 'onboarding1' | 'onboarding2' | 'onboarding3' | 'permissions' | 'main';

// Main App Component with Splash and Onboarding Flow
export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('splash');

  const handleSplashComplete = () => {
    setCurrentState('onboarding1');
  };

  const handleOnboarding1Continue = () => {
    setCurrentState('onboarding2');
  };

  const handleOnboarding2Continue = () => {
    setCurrentState('onboarding3');
  };

  const handleOnboarding3GetStarted = () => {
    setCurrentState('permissions');
  };

  const handlePermissionsGranted = () => {
    setCurrentState('main');
  };

  // Render based on current state
  switch (currentState) {
    case 'splash':
      return <SplashScreen onComplete={handleSplashComplete} />;
    
    case 'onboarding1':
      return (
        <FadeTransition>
          <OnboardingScreen1 onContinue={handleOnboarding1Continue} />
        </FadeTransition>
      );
    
    case 'onboarding2':
      return (
        <FadeTransition>
          <OnboardingScreen2 onContinue={handleOnboarding2Continue} />
        </FadeTransition>
      );
    
    case 'onboarding3':
      return (
        <FadeTransition>
          <OnboardingScreen3 onGetStarted={handleOnboarding3GetStarted} />
        </FadeTransition>
      );
    
    case 'permissions':
      return (
        <FadeTransition>
          <PermissionScreen onPermissionsGranted={handlePermissionsGranted} />
        </FadeTransition>
      );
    
    case 'main':
    default:
      return (
        <FadeTransition duration={800}>
          <MainScreen />
        </FadeTransition>
      );
  }
}
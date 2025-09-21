import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { 
  Defs, 
  G, 
  Path, 
  Rect,
  Line,
  Filter,
  FeGaussianBlur,
  FeMerge,
  FeMergeNode
} from 'react-native-svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface OnboardingScreen3Props {
  onGetStarted: () => void;
}

const OnboardingScreen3: React.FC<OnboardingScreen3Props> = ({ onGetStarted }) => {
  return (
    <View style={styles.container}>
      {/* Center Content */}
      <View style={styles.centerContent}>
        {/* Microphone with Sound Waves */}
        <View style={styles.microphoneContainer}>
          <Svg width="160" height="160" viewBox="0 0 160 160">
            <Defs>
              <Filter id="glow">
                <FeGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <FeMerge> 
                  <FeMergeNode in="coloredBlur"/>
                  <FeMergeNode in="SourceGraphic"/>
                </FeMerge>
              </Filter>
            </Defs>
            
            {/* Sound waves */}
            <G stroke="white" strokeWidth="3" fill="none" opacity="0.6">
              {/* Left side waves */}
              <Path d="M25 60 Q15 80 25 100" strokeLinecap="round" />
              <Path d="M35 65 Q30 80 35 95" strokeLinecap="round" />
              <Path d="M45 70 Q42 80 45 90" strokeLinecap="round" />
              
              {/* Right side waves */}
              <Path d="M135 60 Q145 80 135 100" strokeLinecap="round" />
              <Path d="M125 65 Q130 80 125 95" strokeLinecap="round" />
              <Path d="M115 70 Q118 80 115 90" strokeLinecap="round" />
            </G>
            
            {/* Microphone */}
            <G transform="translate(80, 80)" fill="white">
              {/* Microphone capsule */}
              <Rect x="-12" y="-35" width="24" height="35" rx="12" />
              
              {/* Microphone stand/body */}
              <Rect x="-3" y="0" width="6" height="25" />
              
              {/* Microphone base */}
              <Rect x="-20" y="25" width="40" height="8" rx="4" />
              
              {/* Microphone grille lines */}
              <G stroke="white" strokeWidth="1" opacity="0.3">
                <Line x1="-8" y1="-25" x2="8" y2="-25" />
                <Line x1="-8" y1="-20" x2="8" y2="-20" />
                <Line x1="-8" y1="-15" x2="8" y2="-15" />
                <Line x1="-8" y1="-10" x2="8" y2="-10" />
                <Line x1="-8" y1="-5" x2="8" y2="-5" />
              </G>
            </G>
          </Svg>
        </View>
        
        {/* Voice Assistant Text */}
        <Text style={styles.description}>
          Go completely hands-free with our AI voice assistant for calls, navigation, and more.
        </Text>
        
        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          <View style={[styles.dot, styles.inactiveDot]} />
          <View style={[styles.dot, styles.inactiveDot]} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>
        
        {/* Get Started Button */}
        <TouchableOpacity style={styles.getStartedButton} onPress={onGetStarted}>
          <Text style={styles.getStartedButtonText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom space */}
      <View style={styles.bottomSpace} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // slate-900
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  microphoneContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  description: {
    color: '#d1d5db', // gray-300
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#06b6d4', // cyan-400
  },
  inactiveDot: {
    backgroundColor: '#4b5563', // gray-600
  },
  getStartedButton: {
    backgroundColor: '#06b6d4', // cyan-500 base
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  getStartedButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomSpace: {
    paddingBottom: 32,
  },
});

export default OnboardingScreen3;

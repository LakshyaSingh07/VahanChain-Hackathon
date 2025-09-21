import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { 
  Defs, 
  LinearGradient, 
  RadialGradient,
  Stop, 
  Path, 
  G, 
  Line, 
  Circle, 
  Rect,
  Filter,
  FeGaussianBlur,
  FeMerge,
  FeMergeNode
} from 'react-native-svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface OnboardingScreen1Props {
  onContinue: () => void;
}

const OnboardingScreen1: React.FC<OnboardingScreen1Props> = ({ onContinue }) => {
  return (
    <View style={styles.container}>
      {/* Center Content */}
      <View style={styles.centerContent}>
        {/* Shield with Circuit Pattern and Glowing Center */}
        <View style={styles.shieldContainer}>
          <Svg width="200" height="240" viewBox="0 0 200 240">
            <Defs>
              <LinearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#06b6d4" />
                <Stop offset="100%" stopColor="#0891b2" />
              </LinearGradient>
              <RadialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="#ff1744" />
                <Stop offset="30%" stopColor="#e91e63" />
                <Stop offset="100%" stopColor="#ad1457" />
              </RadialGradient>
              <Filter id="glow">
                <FeGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <FeMerge> 
                  <FeMergeNode in="coloredBlur"/>
                  <FeMergeNode in="SourceGraphic"/>
                </FeMerge>
              </Filter>
              <Filter id="redGlow">
                <FeGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <FeMerge> 
                  <FeMergeNode in="coloredBlur"/>
                  <FeMergeNode in="SourceGraphic"/>
                </FeMerge>
              </Filter>
            </Defs>
            
            {/* Shield Outline */}
            <Path
              d="M100 20 L170 50 L170 140 Q170 180 100 220 Q30 180 30 140 L30 50 L100 20 Z"
              fill="none"
              stroke="url(#shieldGradient)"
              strokeWidth="3"
              filter="url(#glow)"
            />
            
            {/* Circuit Pattern */}
            <G stroke="url(#shieldGradient)" strokeWidth="1.5" fill="none" opacity="0.6">
              {/* Horizontal lines */}
              <Line x1="60" y1="80" x2="140" y2="80" />
              <Line x1="50" y1="100" x2="150" y2="100" />
              <Line x1="60" y1="120" x2="140" y2="120" />
              <Line x1="70" y1="140" x2="130" y2="140" />
              <Line x1="80" y1="160" x2="120" y2="160" />
              
              {/* Vertical lines */}
              <Line x1="80" y1="60" x2="80" y2="180" />
              <Line x1="120" y1="60" x2="120" y2="180" />
              <Line x1="100" y1="50" x2="100" y2="190" />
              
              {/* Circuit nodes */}
              <Circle cx="80" cy="80" r="2" fill="url(#shieldGradient)" />
              <Circle cx="120" cy="80" r="2" fill="url(#shieldGradient)" />
              <Circle cx="100" cy="100" r="2" fill="url(#shieldGradient)" />
              <Circle cx="80" cy="120" r="2" fill="url(#shieldGradient)" />
              <Circle cx="120" cy="120" r="2" fill="url(#shieldGradient)" />
              <Circle cx="100" cy="140" r="2" fill="url(#shieldGradient)" />
              <Circle cx="100" cy="160" r="2" fill="url(#shieldGradient)" />
            </G>
            
            {/* Central Chip/Processor with Red Glow */}
            <G transform="translate(100, 120)">
              {/* Outer glow effect */}
              <Circle cx="0" cy="0" r="25" fill="url(#centerGlow)" opacity="0.3" filter="url(#redGlow)" />
              
              {/* Main processor chip */}
              <Rect 
                x="-12" 
                y="-12" 
                width="24" 
                height="24" 
                rx="3" 
                fill="url(#centerGlow)" 
                stroke="url(#centerGlow)" 
                strokeWidth="1"
                filter="url(#redGlow)" 
              />
              
              {/* Inner chip details */}
              <Rect x="-8" y="-8" width="16" height="16" rx="2" fill="rgba(255, 23, 68, 0.8)" />
              <Rect x="-4" y="-4" width="8" height="8" rx="1" fill="rgba(255, 23, 68, 1)" />
              
              {/* Connection pins */}
              <Rect x="-16" y="-2" width="4" height="4" fill="url(#centerGlow)" />
              <Rect x="12" y="-2" width="4" height="4" fill="url(#centerGlow)" />
              <Rect x="-2" y="-16" width="4" height="4" fill="url(#centerGlow)" />
              <Rect x="-2" y="12" width="4" height="4" fill="url(#centerGlow)" />
            </G>
          </Svg>
        </View>
        
        {/* AI-Powered Safety Title */}
        <Text style={styles.title}>AI-Powered Safety</Text>
        
        {/* Welcome Text */}
        <Text style={styles.description}>
          Welcome to VahanChain. Our AI co-pilot watches for drowsiness, distraction, and more, keeping you safe on every journey.
        </Text>
        
        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={[styles.dot, styles.inactiveDot]} />
          <View style={[styles.dot, styles.inactiveDot]} />
        </View>
        
        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
          <Text style={styles.continueButtonText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Progress Indicator */}
      <View style={styles.bottomProgressContainer}>
        <View style={styles.progressIndicator} />
      </View>
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
  shieldContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  description: {
    color: '#d1d5db', // gray-300
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
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
  continueButton: {
    backgroundColor: '#06b6d4', // cyan-500 base
    paddingVertical: 12,
    paddingHorizontal: 32,
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
  continueButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomProgressContainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 16,
    alignItems: 'center',
  },
  progressIndicator: {
    width: 64,
    height: 4,
    backgroundColor: '#06b6d4', // cyan-400
    borderRadius: 2,
  },
});

export default OnboardingScreen1;

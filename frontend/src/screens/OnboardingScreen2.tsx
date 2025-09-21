import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { 
  Defs, 
  LinearGradient, 
  Stop, 
  Path, 
  G, 
  Line, 
  Circle,
  Filter,
  FeGaussianBlur,
  FeMerge,
  FeMergeNode
} from 'react-native-svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface OnboardingScreen2Props {
  onContinue: () => void;
}

const OnboardingScreen2: React.FC<OnboardingScreen2Props> = ({ onContinue }) => {
  return (
    <View style={styles.container}>
      {/* Center Content */}
      <View style={styles.centerContent}>
        {/* Brain/Head with Neural Network and Orbital Rings */}
        <View style={styles.brainContainer}>
          <Svg width="220" height="220" viewBox="0 0 220 220">
            <Defs>
              <LinearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#06b6d4" />
                <Stop offset="100%" stopColor="#0891b2" />
              </LinearGradient>
              <Filter id="glow">
                <FeGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <FeMerge> 
                  <FeMergeNode in="coloredBlur"/>
                  <FeMergeNode in="SourceGraphic"/>
                </FeMerge>
              </Filter>
            </Defs>
            
            {/* Outer orbital ring */}
            <Circle 
              cx="110" 
              cy="110" 
              r="90" 
              fill="none" 
              stroke="rgba(6, 182, 212, 0.3)" 
              strokeWidth="1" 
              strokeDasharray="2,4" 
            />
            
            {/* Middle orbital ring */}
            <Circle 
              cx="110" 
              cy="110" 
              r="75" 
              fill="none" 
              stroke="rgba(6, 182, 212, 0.4)" 
              strokeWidth="1" 
              strokeDasharray="1,3" 
            />
            
            {/* Inner orbital ring */}
            <Circle 
              cx="110" 
              cy="110" 
              r="60" 
              fill="none" 
              stroke="rgba(6, 182, 212, 0.5)" 
              strokeWidth="1" 
            />
            
            {/* Orbital dots - outer ring */}
            <Circle cx="110" cy="20" r="4" fill="#06b6d4" filter="url(#glow)" />
            <Circle cx="200" cy="110" r="4" fill="#f59e0b" filter="url(#glow)" />
            <Circle cx="110" cy="200" r="4" fill="#06b6d4" filter="url(#glow)" />
            <Circle cx="20" cy="110" r="4" fill="#f59e0b" filter="url(#glow)" />
            
            {/* Orbital dots - middle positions */}
            <Circle cx="187" cy="43" r="3" fill="#f59e0b" filter="url(#glow)" />
            <Circle cx="187" cy="177" r="3" fill="#06b6d4" filter="url(#glow)" />
            <Circle cx="33" cy="177" r="3" fill="#f59e0b" filter="url(#glow)" />
            <Circle cx="33" cy="43" r="3" fill="#06b6d4" filter="url(#glow)" />
            
            {/* Head silhouette */}
            <G transform="translate(110, 110)">
              {/* Head outline */}
              <Path
                d="M-20,-35 Q-30,-35 -30,-20 Q-30,0 -25,15 Q-20,25 -15,30 Q0,35 15,30 Q20,25 25,15 Q30,0 30,-20 Q30,-35 20,-35 Q10,-40 0,-40 Q-10,-40 -20,-35 Z"
                fill="none"
                stroke="url(#brainGradient)"
                strokeWidth="2"
                filter="url(#glow)"
              />
              
              {/* Neural network pattern inside head */}
              <G stroke="url(#brainGradient)" strokeWidth="1" fill="none" opacity="0.8">
                {/* Network connections */}
                <Line x1="-15" y1="-25" x2="-5" y2="-15" />
                <Line x1="-5" y1="-15" x2="5" y2="-20" />
                <Line x1="5" y1="-20" x2="15" y2="-10" />
                <Line x1="-15" y1="-10" x2="0" y2="-5" />
                <Line x1="0" y1="-5" x2="15" y2="-10" />
                <Line x1="-10" y1="0" x2="10" y2="5" />
                <Line x1="-15" y1="10" x2="0" y2="15" />
                <Line x1="0" y1="15" x2="15" y2="10" />
                <Line x1="-5" y1="20" x2="5" y2="25" />
                
                {/* Vertical connections */}
                <Line x1="-10" y1="-20" x2="-10" y2="0" />
                <Line x1="0" y1="-25" x2="0" y2="25" />
                <Line x1="10" y1="-15" x2="10" y2="15" />
                
                {/* Neural nodes */}
                <Circle cx="-15" cy="-25" r="1.5" fill="url(#brainGradient)" />
                <Circle cx="-5" cy="-15" r="1.5" fill="url(#brainGradient)" />
                <Circle cx="5" cy="-20" r="1.5" fill="url(#brainGradient)" />
                <Circle cx="15" cy="-10" r="1.5" fill="url(#brainGradient)" />
                <Circle cx="-15" cy="-10" r="1.5" fill="url(#brainGradient)" />
                <Circle cx="0" cy="-5" r="1.5" fill="url(#brainGradient)" />
                <Circle cx="-10" cy="0" r="1.5" fill="url(#brainGradient)" />
                <Circle cx="10" cy="5" r="1.5" fill="url(#brainGradient)" />
                <Circle cx="-15" cy="10" r="1.5" fill="url(#brainGradient)" />
                <Circle cx="0" cy="15" r="1.5" fill="url(#brainGradient)" />
                <Circle cx="15" cy="10" r="1.5" fill="url(#brainGradient)" />
                <Circle cx="-5" cy="20" r="1.5" fill="url(#brainGradient)" />
                <Circle cx="5" cy="25" r="1.5" fill="url(#brainGradient)" />
              </G>
            </G>
          </Svg>
        </View>
        
        {/* Own Your Reputation Title */}
        <Text style={styles.title}>Own Your Reputation</Text>
        
        {/* Reputation Text */}
        <Text style={styles.description}>
          We use the Avalanche blockchain to build your permanent, on-chain 'Safe Driver' reputation. You own and control your data.
        </Text>
        
        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          <View style={[styles.dot, styles.inactiveDot]} />
          <View style={[styles.dot, styles.activeDot]} />
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
  brainContainer: {
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

export default OnboardingScreen2;

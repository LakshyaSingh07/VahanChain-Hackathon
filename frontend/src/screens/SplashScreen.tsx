import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { 
  Defs, 
  LinearGradient, 
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

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          // Wait a moment before transitioning
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return prev + 2; // Slightly faster progress
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <View style={styles.container}>
      {/* Top Logo Section */}
      <View style={styles.logoSection}>
        {/* VAHANCHAIN Logo */}
        <View style={styles.logoContainer}>
          <Svg width="80" height="80" viewBox="0 0 80 80">
            <Defs>
              <LinearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#06b6d4" />
                <Stop offset="100%" stopColor="#0891b2" />
              </LinearGradient>
            </Defs>
            {/* Hexagonal outline */}
            <Path
              d="M40 8L64 24L64 56L40 72L16 56L16 24L40 8Z"
              fill="url(#logoGradient)"
              stroke="#06b6d4"
              strokeWidth="2"
            />
            {/* Inner hexagon border */}
            <Path
              d="M40 16L56 26L56 54L40 64L24 54L24 26L40 16Z"
              fill="none"
              stroke="rgba(6, 182, 212, 0.3)"
              strokeWidth="1"
            />
            {/* V and C letters */}
            <G fill="white">
              {/* V letter */}
              <Path d="M28 28 L32 28 L36 42 L40 28 L44 28 L38 46 L34 46 Z" />
              {/* C letter - simplified for VahanChain */}
              <Path d="M56 28 Q52 28 52 32 L52 38 Q52 42 56 42 L54 42 Q52 42 52 38 L52 32 Q52 28 54 28 Z" />
            </G>
          </Svg>
        </View>
        
        {/* VAHANCHAIN Text */}
        <Text style={styles.logoText}>VAHANCHAIN</Text>
      </View>

      {/* Center Shield Section */}
      <View style={styles.centerSection}>
        {/* Shield with Circuit Pattern */}
        <View style={styles.shieldContainer}>
          <Svg width="200" height="240" viewBox="0 0 200 240">
            <Defs>
              <LinearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#06b6d4" />
                <Stop offset="100%" stopColor="#0891b2" />
              </LinearGradient>
            </Defs>
            
            {/* Shield Outline */}
            <Path
              d="M100 20 L170 50 L170 140 Q170 180 100 220 Q30 180 30 140 L30 50 L100 20 Z"
              fill="none"
              stroke="url(#shieldGradient)"
              strokeWidth="3"
            />
            
            {/* Circuit Pattern */}
            <G stroke="url(#shieldGradient)" strokeWidth="1.5" fill="none" opacity="0.7">
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
            
            {/* Central Chip/Processor */}
            <G transform="translate(100, 120)">
              <Rect 
                x="-15" 
                y="-15" 
                width="30" 
                height="30" 
                rx="3" 
                fill="url(#shieldGradient)" 
                stroke="#06b6d4" 
                strokeWidth="1"
              />
              
              {/* Chip details */}
              <Rect x="-10" y="-10" width="20" height="20" rx="2" fill="rgba(6, 182, 212, 0.3)" />
              <Rect x="-6" y="-6" width="12" height="12" rx="1" fill="rgba(6, 182, 212, 0.5)" />
              
              {/* Connection pins */}
              <Rect x="-18" y="-2" width="6" height="4" fill="url(#shieldGradient)" />
              <Rect x="12" y="-2" width="6" height="4" fill="url(#shieldGradient)" />
              <Rect x="-2" y="-18" width="4" height="6" fill="url(#shieldGradient)" />
              <Rect x="-2" y="12" width="4" height="6" fill="url(#shieldGradient)" />
            </G>
          </Svg>
        </View>
        
        {/* AI Powered Safety Text */}
        <Text style={styles.taglineText}>AI Powered Safety</Text>
      </View>

      {/* Bottom Progress Bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar,
              { width: `${progress}%` }
            ]}
          />
        </View>
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
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  logoSection: {
    alignItems: 'center',
    paddingTop: 20,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 2,
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  shieldContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  taglineText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 1,
  },
  progressSection: {
    width: '100%',
    paddingBottom: 20,
  },
  progressBarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: '#334155', // slate-700
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#06b6d4', // cyan-500
    borderRadius: 2,
  },
});

export default SplashScreen;

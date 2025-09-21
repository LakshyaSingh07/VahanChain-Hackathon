import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { 
  Defs, 
  LinearGradient, 
  Stop, 
  Path, 
  Circle,
  Line,
  G,
  Filter,
  FeGaussianBlur,
  FeMerge,
  FeMergeNode
} from 'react-native-svg';
import { Animated, Easing } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface WalletLoadingScreenProps {
  onComplete: () => void;
}

const WalletLoadingScreen: React.FC<WalletLoadingScreenProps> = ({ onComplete }) => {
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start rotation animation
    const rotation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    rotation.start();

    // Auto complete after 4-5 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      rotation.stop();
      clearTimeout(timer);
    };
  }, [rotateAnim, onComplete]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Geometric Background Pattern */}
      <View style={styles.backgroundPattern}>
        {/* Dark geometric shapes */}
        <View style={styles.topGradient} />
        <View style={styles.geometricShape1} />
        <View style={styles.geometricShape2} />
        <View style={styles.geometricShape3} />
        
        {/* Subtle grid pattern */}
        <View style={styles.gridPattern}>
          {Array.from({ length: 128 }).map((_, i) => (
            <View key={i} style={styles.gridCell} />
          ))}
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* VahanChain Logo with Loading Ring */}
        <View style={styles.logoContainer}>
          {/* Animated Loading Ring */}
          <Animated.View 
            style={[
              styles.loadingRing,
              { transform: [{ rotate }] }
            ]}
          >
            <Svg width="160" height="160" viewBox="0 0 160 160">
              <Defs>
                <LinearGradient id="loadingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <Stop offset="0%" stopColor="transparent" />
                  <Stop offset="50%" stopColor="#06b6d4" />
                  <Stop offset="100%" stopColor="transparent" />
                </LinearGradient>
              </Defs>
              <Circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="url(#loadingGradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </Svg>
          </Animated.View>

          {/* Static Loading Ring Background */}
          <View style={styles.staticRing}>
            <Svg width="160" height="160" viewBox="0 0 160 160">
              <Circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="rgba(6, 182, 212, 0.2)"
                strokeWidth="2"
              />
            </Svg>
          </View>
          
          {/* VahanChain Hexagonal Shield Logo */}
          <View style={styles.shieldLogo}>
            <Svg width="120" height="120" viewBox="0 0 120 120">
              <Defs>
                <LinearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0%" stopColor="#06b6d4" />
                  <Stop offset="50%" stopColor="#0891b2" />
                  <Stop offset="100%" stopColor="#0e7490" />
                </LinearGradient>
                <Filter id="shieldGlow">
                  <FeGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <FeMerge> 
                    <FeMergeNode in="coloredBlur"/>
                    <FeMergeNode in="SourceGraphic"/>
                  </FeMerge>
                </Filter>
              </Defs>
              
              {/* Hexagonal Shield */}
              <Path
                d="M60 15 L85 30 L85 60 L60 90 L35 60 L35 30 Z"
                fill="none"
                stroke="url(#shieldGradient)"
                strokeWidth="3"
                filter="url(#shieldGlow)"
              />
              
              {/* Inner shield fill */}
              <Path
                d="M60 20 L80 32 L80 58 L60 85 L40 58 L40 32 Z"
                fill="rgba(6, 182, 212, 0.1)"
              />
              
              {/* VC Letters */}
              <G fill="url(#shieldGradient)" filter="url(#shieldGlow)">
                {/* V Letter */}
                <Path
                  d="M45 40 L50 40 L55 55 L60 40 L65 40 L57 65 L53 65 Z"
                  fill="#06b6d4"
                />
                
                {/* C Letter */}
                <Path
                  d="M70 40 Q65 40 65 45 L65 60 Q65 65 70 65 L68 65 Q66 65 66 60 L66 45 Q66 40 68 40 Z"
                  fill="#06b6d4"
                />
              </G>
              
              {/* Circuit pattern inside shield */}
              <G stroke="rgba(6, 182, 212, 0.4)" strokeWidth="1" fill="none" opacity="0.6">
                <Circle cx="45" cy="45" r="3" />
                <Circle cx="75" cy="45" r="3" />
                <Circle cx="60" cy="65" r="3" />
                <Line x1="48" y1="45" x2="72" y2="45" />
                <Line x1="45" y1="48" x2="60" y2="62" />
                <Line x1="75" y1="48" x2="60" y2="62" />
              </G>
            </Svg>
          </View>
        </View>

        {/* Loading Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Initializing your{'\n'}On-Chain Identity...
          </Text>

          <Text style={styles.description}>
            Minting your "Safe Driver" SBT on{'\n'}the Avalanche blockchain.{'\n'}Please wait.
          </Text>
        </View>
      </View>

      {/* Bottom accent line */}
      <View style={styles.bottomAccent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // slate-900
    position: 'relative',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 128,
    backgroundColor: 'rgba(30, 41, 59, 0.5)', // slate-800 gradient effect
  },
  geometricShape1: {
    position: 'absolute',
    top: 64,
    right: -80,
    width: 160,
    height: 160,
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    transform: [{ rotate: '45deg' }],
  },
  geometricShape2: {
    position: 'absolute',
    bottom: 80,
    left: -64,
    width: 128,
    height: 128,
    backgroundColor: 'rgba(30, 41, 59, 0.2)',
    transform: [{ rotate: '12deg' }],
  },
  geometricShape3: {
    position: 'absolute',
    bottom: 160,
    right: 32,
    width: 96,
    height: 96,
    backgroundColor: 'rgba(51, 65, 85, 0.25)',
    transform: [{ rotate: '-12deg' }],
  },
  gridPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.05,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridCell: {
    width: '12.5%', // 1/8 of screen width
    height: 50,
    borderWidth: 0.5,
    borderColor: '#475569', // slate-600
  },
  mainContent: {
    flex: 1,
    position: 'relative',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  logoContainer: {
    marginBottom: 48,
    position: 'relative',
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingRing: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  staticRing: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shieldLogo: {
    position: 'relative',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 128,
    height: 128,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    color: '#06b6d4', // cyan-400
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 32,
  },
  description: {
    color: '#d1d5db', // gray-300
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  bottomAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#06b6d4',
    opacity: 0.3,
  },
});

export default WalletLoadingScreen;

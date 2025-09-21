import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { 
  Defs, 
  LinearGradient, 
  Stop, 
  Path,
  Circle,
  Filter,
  FeGaussianBlur,
  FeMerge,
  FeMergeNode
} from 'react-native-svg';
import { useAccount, useChainId } from 'wagmi';
import { avalancheFuji } from 'wagmi/chains';

interface WalletSuccessScreenProps {
  onGoToDashboard: () => void;
}

const WalletSuccessScreen: React.FC<WalletSuccessScreenProps> = ({ onGoToDashboard }) => {
  const { address } = useAccount();
  const chainId = useChainId();

  return (
    <View style={styles.container}>
      {/* Subtle Grid Background */}
      <View style={styles.gridBackground}>
        {Array.from({ length: 80 }).map((_, i) => (
          <View key={i} style={styles.gridLine} />
        ))}
      </View>

      {/* Grid Overlay for better blending */}
      <View style={styles.gridOverlay} />

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Success Avalanche Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoGlow}>
            <Svg width="120" height="120" viewBox="0 0 120 120">
              <Defs>
                <LinearGradient id="successGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0%" stopColor="#4CAF50" />
                  <Stop offset="50%" stopColor="#45a049" />
                  <Stop offset="100%" stopColor="#388e3c" />
                </LinearGradient>
              </Defs>
              <Path
                d="M60 15 L90 75 L30 75 Z"
                fill="url(#successGlow)"
              />
            </Svg>
          </View>
          
          <Svg width="120" height="120" viewBox="0 0 120 120" style={styles.mainLogo}>
            <Defs>
              <LinearGradient id="avalancheSuccess" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#4CAF50" />
                <Stop offset="30%" stopColor="#45a049" />
                <Stop offset="70%" stopColor="#388e3c" />
                <Stop offset="100%" stopColor="#2e7d32" />
              </LinearGradient>
              <Filter id="logoGlow">
                <FeGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <FeMerge> 
                  <FeMergeNode in="coloredBlur"/>
                  <FeMergeNode in="SourceGraphic"/>
                </FeMerge>
              </Filter>
            </Defs>
            
            <Path
              d="M60 20 L85 70 L35 70 Z"
              fill="url(#avalancheSuccess)"
              filter="url(#logoGlow)"
            />
            
            <Path
              d="M60 35 L72 60 L48 60 Z"
              fill="#1e293b"
              opacity="0.8"
            />
            
            <Path
              d="M60 25 L75 55 L60 55 Z"
              fill="rgba(255,255,255,0.2)"
            />

            {/* Success Checkmark */}
            <Circle cx="60" cy="50" r="15" fill="rgba(76, 175, 80, 0.9)" />
            <Path
              d="M54 50 L58 54 L66 46"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </View>

        <Text style={styles.successTitle}>Wallet Connected!</Text>
        <Text style={styles.successSubtitle}>
          Your VahanChain identity is ready
        </Text>

        {/* Wallet Information */}
        <View style={styles.walletInfo}>
          <Text style={styles.infoLabel}>Wallet Address</Text>
          <Text style={styles.infoValue}>
            {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
          </Text>
          
          <Text style={styles.infoLabel}>Network</Text>
          <Text style={styles.infoValue}>
            Avalanche Fuji Testnet (ID: {chainId})
          </Text>
          
          {chainId !== avalancheFuji.id && (
            <Text style={styles.warningText}>
              ⚠️ Please switch to Avalanche Fuji Testnet
            </Text>
          )}

          <Text style={styles.infoLabel}>SBT Status</Text>
          <Text style={styles.sbtStatus}>
            ✅ Safe Driver SBT Ready
          </Text>
        </View>

        {/* Go to Dashboard Button */}
        <TouchableOpacity style={styles.dashboardButton} onPress={onGoToDashboard}>
          <View style={styles.buttonShine} />
          <Text style={styles.dashboardButtonText}>GO TO DASHBOARD</Text>
          <View style={styles.buttonGlow} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e2a3e',
    position: 'relative',
  },
  gridBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    opacity: 0.1,
  },
  gridLine: {
    width: '12.5%',
    height: 60,
    borderWidth: 0.5,
    borderColor: '#06b6d4',
    shadowColor: '#06b6d4',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(30, 42, 62, 0.8)',
    zIndex: 1,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
    position: 'relative',
    zIndex: 10,
  },
  logoContainer: {
    marginBottom: 32,
    alignItems: 'center',
    position: 'relative',
  },
  logoGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.8,
    transform: [{ scale: 1.3 }],
  },
  mainLogo: {
    position: 'relative',
    zIndex: 10,
  },
  successTitle: {
    color: '#4CAF50',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  successSubtitle: {
    color: '#d1d5db',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  walletInfo: {
    width: '100%',
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  infoLabel: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    marginTop: 12,
  },
  infoValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  sbtStatus: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  warningText: {
    color: '#FFC107',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  dashboardButton: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#06b6d4',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonShine: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: [{ skewX: '-12deg' }],
    width: '200%',
  },
  dashboardButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1,
    position: 'relative',
    zIndex: 10,
  },
  buttonGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export default WalletSuccessScreen;

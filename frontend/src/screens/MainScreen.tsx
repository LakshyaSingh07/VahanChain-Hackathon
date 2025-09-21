import React, { useState, useEffect } from "react";
import { WagmiConfig } from "wagmi";
import { avalancheFuji } from "wagmi/chains";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
  useWeb3Modal,
} from "@web3modal/wagmi-react-native";
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import Svg, { 
  Defs, 
  LinearGradient, 
  Stop, 
  Path,
  Filter,
  FeGaussianBlur,
  FeMerge,
  FeMergeNode
} from 'react-native-svg';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useAccount, useChainId } from 'wagmi';
import { WALLETCONNECT_PROJECT_ID } from "../constants";
import WalletLoadingScreen from './WalletLoadingScreen';
import WalletSuccessScreen from './WalletSuccessScreen';
import DashboardContainer from './DashboardContainer';

// WalletConnect Project ID
const projectId = "41869efe5669daaa67720c056b796e7a";

// Create wagmiConfig
const metadata = {
  name: "VahanChain",
  description: "Decentralized Driver Safety & Identity on Avalanche",
  url: "https://vahanchain.app",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  redirect: {
    native: "vahanchain://",
    universal: "https://vahanchain.app",
  },
};

const chains = [avalancheFuji] as const;
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// Create Web3Modal
createWeb3Modal({
  projectId,
  wagmiConfig,
  defaultChain: avalancheFuji,
  enableAnalytics: true,
});

// Main Screen Component
const MainScreen: React.FC = () => {
  return (
    <SafeAreaProvider>
      <WagmiConfig config={wagmiConfig}>
        <AppContent />
        <Web3Modal />
      </WagmiConfig>
    </SafeAreaProvider>
  );
};

// Wallet flow states
type WalletState = 'initial' | 'connecting' | 'loading' | 'success' | 'dashboard';

// AppContent Component
function AppContent() {
  const { open } = useWeb3Modal();
  const { address, isConnected, isConnecting } = useAccount();
  const chainId = useChainId();
  const [walletState, setWalletState] = useState<WalletState>('initial');

  // Handle wallet connection state changes
  useEffect(() => {
    if (isConnecting && walletState === 'initial') {
      setWalletState('connecting');
    } else if (isConnected && walletState === 'connecting') {
      // When wallet gets connected, show loading screen
      setWalletState('loading');
    } else if (!isConnected && !isConnecting && walletState !== 'initial') {
      // Reset to initial if wallet gets disconnected
      setWalletState('initial');
    }
  }, [isConnected, isConnecting, walletState]);

  const handleLoadingComplete = () => {
    setWalletState('success');
  };

  const handleGoToDashboard = () => {
    setWalletState('dashboard');
  };

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

      {/* Render different screens based on wallet state */}
      {walletState === 'loading' ? (
        <WalletLoadingScreen onComplete={handleLoadingComplete} />
      ) : walletState === 'success' ? (
        <WalletSuccessScreen onGoToDashboard={handleGoToDashboard} />
      ) : walletState === 'dashboard' ? (
        <DashboardContainer />
      ) : (
        <SafeAreaView style={styles.mainContent}>
          {walletState === 'connecting' ? (
            <View style={styles.centerContent}>
              <ActivityIndicator size="large" color="#06b6d4" />
              <Text style={styles.connectingText}>Connecting...</Text>
            </View>
          ) : (
            <View style={styles.centerContent}>
              {/* Avalanche Logo with Glow */}
              <View style={styles.avalancheLogo}>
                <View style={styles.logoGlow}>
                  <Svg width="120" height="120" viewBox="0 0 120 120">
                    <Defs>
                      <LinearGradient id="redGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <Stop offset="0%" stopColor="#ff5555" />
                        <Stop offset="50%" stopColor="#ff3333" />
                        <Stop offset="100%" stopColor="#ff1111" />
                      </LinearGradient>
                    </Defs>
                    <Path
                      d="M60 15 L90 75 L30 75 Z"
                      fill="url(#redGlow)"
                    />
                  </Svg>
                </View>
                
                <Svg width="120" height="120" viewBox="0 0 120 120" style={styles.mainLogo}>
                  <Defs>
                    <LinearGradient id="avalancheGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <Stop offset="0%" stopColor="#ff6b6b" />
                      <Stop offset="30%" stopColor="#ee5a52" />
                      <Stop offset="70%" stopColor="#e53e3e" />
                      <Stop offset="100%" stopColor="#c53030" />
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
                    fill="url(#avalancheGradient)"
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
                </Svg>
              </View>

              <Text style={styles.title}>Connect Your Wallet</Text>
              <Text style={styles.description}>
                VahanChain uses your Avalanche wallet as your secure, digital identity.
              </Text>

              <TouchableOpacity style={styles.connectButton} onPress={() => open()}>
                <View style={styles.buttonShine} />
                <Text style={styles.connectButtonText}>CONNECT WALLET</Text>
                <View style={styles.buttonGlow} />
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e2a3e', // Clean dark blue background like in the image
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
    width: '12.5%', // 8 columns
    height: 60, // Grid cell height
    borderWidth: 0.5,
    borderColor: '#06b6d4', // Cyan color for subtle glow
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
    backgroundColor: 'rgba(30, 42, 62, 0.8)', // Semi-transparent overlay to blend grid
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
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  avalancheLogo: {
    marginBottom: 80,
    alignItems: 'center',
    position: 'relative',
  },
  logoGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.8,
    transform: [{ scale: 1.5 }],
  },
  mainLogo: {
    position: 'relative',
    zIndex: 10,
  },
  title: {
    color: '#06b6d4', // cyan-400
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    color: '#9ca3af', // Lighter gray like in the image
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
    marginBottom: 80,
  },
  connectButton: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#06b6d4', // cyan-500 to match the image
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 30, // More rounded like in the image
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
  connectButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
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
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  connectingText: {
    color: '#06b6d4',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 16,
  },
  connectedTitle: {
    color: '#4CAF50',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  walletDescription: {
    color: '#d1d5db',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  walletInfo: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.2)',
  },
  infoText: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  warningText: {
    color: '#FFC107',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
  },
});

export default MainScreen;

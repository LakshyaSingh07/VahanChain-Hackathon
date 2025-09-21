import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { 
  Defs, 
  LinearGradient, 
  Stop, 
  Polyline,
  Polygon,
  Circle
} from 'react-native-svg';
import { Feather } from '@expo/vector-icons';

interface DashboardScreenProps {
  onTabChange: (tab: 'dashboard' | 'documents' | 'settings') => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ onTabChange }) => {
  return (
    <View style={styles.container}>
      {/* Background Pattern */}
      <View style={styles.backgroundPattern}>
        <View style={styles.topGradient} />
        <View style={styles.geometricShape1} />
        <View style={styles.geometricShape2} />
      </View>

      {/* Main Content */}
      <SafeAreaView style={styles.mainContent}>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Greeting Section */}
          <View style={styles.greetingSection}>
            <Text style={styles.greetingTitle}>Good morning, Alex!</Text>
            <Text style={styles.greetingSubtitle}>Ready for another safe journey</Text>
          </View>

          {/* On-Chain Reputation Card */}
          <View style={styles.reputationCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardTitle}>On-Chain Reputation</Text>
                <Text style={styles.cardSubtitle}>VahanChain Decentralized</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#9ca3af" />
            </View>

            {/* Chart Section */}
            <View style={styles.chartSection}>
              <Text style={styles.scoreText}>850</Text>
              
              {/* Chart Container */}
              <View style={styles.chartContainer}>
                <Svg width="100%" height="64" viewBox="0 0 300 40">
                  <Defs>
                    <LinearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <Stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                      <Stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                    </LinearGradient>
                  </Defs>
                  
                  {/* Chart line */}
                  <Polyline
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    points="0,30 50,25 100,20 150,15 200,18 250,12 300,8"
                  />
                  
                  {/* Fill area under line */}
                  <Polygon
                    fill="url(#chartGradient)"
                    points="0,30 50,25 100,20 150,15 200,18 250,12 300,8 300,40 0,40"
                  />

                  {/* Active point */}
                  <Circle cx="250" cy="12" r="3" fill="#06b6d4" />
                </Svg>

                {/* Chart timeline dots */}
                <View style={styles.timelineDots}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <View key={i} style={styles.dot} />
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* FASTag Wallet Section */}
          <View style={styles.walletSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>FASTag Wallet</Text>
              <Feather name="chevron-right" size={20} color="#9ca3af" />
            </View>

            {/* Balance Card */}
            <View style={styles.balanceCard}>
              <View style={styles.balanceContent}>
                {/* Avalanche Logo */}
                <View style={styles.avalancheLogo}>
                  <Text style={styles.logoText}>A</Text>
                </View>
                
                <View style={styles.balanceInfo}>
                  <Text style={styles.balanceLabel}>Fastag Balance</Text>
                  <Text style={styles.balanceAmount}>₹1,520.00</Text>
                  <Text style={styles.networkLabel}>Avalanche mainnet</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Secure Monitoring Section */}
          <View style={styles.monitoringSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Secure Monitoring</Text>
              <Feather name="rotate-ccw" size={20} color="#9ca3af" />
            </View>

            {/* Progress Section */}
            <View style={styles.progressSection}>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
              <Text style={styles.progressLabel}>Device protection</Text>
            </View>
          </View>

          {/* Extra spacing for scroll */}
          <View style={styles.extraSpacing} />
        </ScrollView>

        {/* Start Drive Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.startButton}>
            <View style={styles.buttonShine} />
            <Text style={styles.startButtonText}>START DRIVE</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Tab Bar */}
        <View style={styles.tabBar}>
          <TouchableOpacity 
            style={styles.tabItem} 
            onPress={() => onTabChange('dashboard')}
          >
            <View style={[styles.tabIconContainer, styles.activeTab]}>
              <Feather name="home" size={20} color="#06b6d4" />
            </View>
            <Text style={[styles.tabLabel, styles.activeTabLabel]}>Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.tabItem}
            onPress={() => onTabChange('documents')}
          >
            <View style={styles.tabIconContainer}>
              <Feather name="file-text" size={20} color="#9ca3af" />
            </View>
            <Text style={styles.tabLabel}>Documents</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.tabItem}
            onPress={() => onTabChange('settings')}
          >
            <View style={styles.tabIconContainer}>
              <Feather name="settings" size={20} color="#9ca3af" />
            </View>
            <Text style={styles.tabLabel}>Settings</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
  },
  geometricShape1: {
    position: 'absolute',
    top: 64,
    right: -80,
    width: 160,
    height: 160,
    backgroundColor: 'rgba(30, 41, 59, 0.2)',
    transform: [{ rotate: '45deg' }],
  },
  geometricShape2: {
    position: 'absolute',
    bottom: 80,
    left: -64,
    width: 128,
    height: 128,
    backgroundColor: 'rgba(30, 41, 59, 0.15)',
    transform: [{ rotate: '12deg' }],
  },
  mainContent: {
    flex: 1,
    position: 'relative',
    zIndex: 10,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  greetingSection: {
    marginTop: 16,
    marginBottom: 24,
  },
  greetingTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  greetingSubtitle: {
    color: '#9ca3af',
    fontSize: 14,
  },
  reputationCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.5)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  cardSubtitle: {
    color: '#9ca3af',
    fontSize: 14,
  },
  chartSection: {
    gap: 12,
  },
  scoreText: {
    color: '#06b6d4',
    fontSize: 32,
    fontWeight: '700',
  },
  chartContainer: {
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderRadius: 8,
    padding: 12,
    height: 80,
  },
  timelineDots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: '#4b5563',
    borderRadius: 2,
  },
  walletSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  balanceCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.5)',
  },
  balanceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avalancheLogo: {
    width: 40,
    height: 40,
    backgroundColor: '#ef4444',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  balanceInfo: {
    flex: 1,
  },
  balanceLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  balanceAmount: {
    color: '#06b6d4',
    fontSize: 20,
    fontWeight: '700',
  },
  networkLabel: {
    color: '#9ca3af',
    fontSize: 12,
  },
  monitoringSection: {
    marginBottom: 24,
  },
  progressSection: {
    gap: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    width: '75%',
    height: '100%',
    backgroundColor: '#06b6d4',
    borderRadius: 4,
  },
  progressLabel: {
    color: '#9ca3af',
    fontSize: 12,
  },
  extraSpacing: {
    height: 120, // Space for button and tabs
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  startButton: {
    backgroundColor: '#06b6d4',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
    elevation: 8,
    shadowColor: 'rgba(6, 182, 212, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
    position: 'relative',
    zIndex: 10,
  },
  tabBar: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(51, 65, 85, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  tabItem: {
    alignItems: 'center',
    gap: 4,
  },
  tabIconContainer: {
    padding: 8,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
  },
  tabLabel: {
    fontSize: 12,
    color: '#9ca3af',
  },
  activeTabLabel: {
    color: '#06b6d4',
  },
});

export default DashboardScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useAccount } from 'wagmi';

interface SettingsScreenProps {
  onTabChange: (tab: 'dashboard' | 'documents' | 'settings') => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onTabChange }) => {
  const { address } = useAccount();
  const [aiMonitoring, setAiMonitoring] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [dataSharing, setDataSharing] = useState(true);

  const settingsSections = [
    {
      title: 'AI & Safety',
      items: [
        {
          icon: 'eye',
          title: 'AI Monitoring',
          subtitle: 'Real-time drowsiness detection',
          type: 'toggle',
          value: aiMonitoring,
          onToggle: setAiMonitoring,
        },
        {
          icon: 'bell',
          title: 'Safety Notifications',
          subtitle: 'Alerts for unsafe driving patterns',
          type: 'toggle',
          value: notifications,
          onToggle: setNotifications,
        },
        {
          icon: 'activity',
          title: 'Driving Analytics',
          subtitle: 'View detailed driving reports',
          type: 'navigation',
        },
      ],
    },
    {
      title: 'Security',
      items: [
        {
          icon: 'fingerprint',
          title: 'Biometric Authentication',
          subtitle: 'Use fingerprint or face unlock',
          type: 'toggle',
          value: biometricAuth,
          onToggle: setBiometricAuth,
        },
        {
          icon: 'lock',
          title: 'Wallet Security',
          subtitle: 'Manage wallet connections',
          type: 'navigation',
        },
        {
          icon: 'shield',
          title: 'Privacy Settings',
          subtitle: 'Control your data privacy',
          type: 'navigation',
        },
      ],
    },
    {
      title: 'Blockchain',
      items: [
        {
          icon: 'link',
          title: 'Connected Wallet',
          subtitle: address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : 'Not connected',
          type: 'navigation',
        },
        {
          icon: 'database',
          title: 'Data Sharing',
          subtitle: 'Share anonymized data for research',
          type: 'toggle',
          value: dataSharing,
          onToggle: setDataSharing,
        },
        {
          icon: 'award',
          title: 'SBT Management',
          subtitle: 'Manage your Safe Driver tokens',
          type: 'navigation',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: 'help-circle',
          title: 'Help & FAQ',
          subtitle: 'Get answers to common questions',
          type: 'navigation',
        },
        {
          icon: 'message-circle',
          title: 'Contact Support',
          subtitle: 'Reach out to our support team',
          type: 'navigation',
        },
        {
          icon: 'info',
          title: 'About VahanChain',
          subtitle: 'App version 1.0.0',
          type: 'navigation',
        },
      ],
    },
  ];

  const renderSettingItem = (item: any) => {
    return (
      <TouchableOpacity key={item.title} style={styles.settingItem}>
        <View style={styles.settingContent}>
          <View style={styles.settingIcon}>
            <Feather name={item.icon} size={20} color="#06b6d4" />
          </View>
          
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>{item.title}</Text>
            <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
          </View>
          
          <View style={styles.settingAction}>
            {item.type === 'toggle' ? (
              <Switch
                value={item.value}
                onValueChange={item.onToggle}
                trackColor={{ false: '#374151', true: '#06b6d4' }}
                thumbColor={item.value ? '#ffffff' : '#f3f4f6'}
              />
            ) : (
              <Feather name="chevron-right" size={20} color="#9ca3af" />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Customize your VahanChain experience</Text>
        </View>

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileCard}>
              <View style={styles.profileAvatar}>
                <Text style={styles.avatarText}>A</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Alex Johnson</Text>
                <Text style={styles.profileEmail}>alex.johnson@email.com</Text>
                <Text style={styles.profileBadge}>Safe Driver Level 3</Text>
              </View>
              <TouchableOpacity style={styles.editButton}>
                <Feather name="edit-2" size={16} color="#06b6d4" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Settings Sections */}
          {settingsSections.map((section) => (
            <View key={section.title} style={styles.settingsSection}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.sectionContent}>
                {section.items.map(renderSettingItem)}
              </View>
            </View>
          ))}

          {/* Sign Out Button */}
          <TouchableOpacity style={styles.signOutButton}>
            <Feather name="log-out" size={20} color="#F44336" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>

          {/* Extra spacing for scroll */}
          <View style={styles.extraSpacing} />
        </ScrollView>

        {/* Bottom Tab Bar */}
        <View style={styles.tabBar}>
          <TouchableOpacity 
            style={styles.tabItem} 
            onPress={() => onTabChange('dashboard')}
          >
            <View style={styles.tabIconContainer}>
              <Feather name="home" size={20} color="#9ca3af" />
            </View>
            <Text style={styles.tabLabel}>Dashboard</Text>
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
            <View style={[styles.tabIconContainer, styles.activeTab]}>
              <Feather name="settings" size={20} color="#06b6d4" />
            </View>
            <Text style={[styles.tabLabel, styles.activeTabLabel]}>Settings</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#9ca3af',
    fontSize: 16,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  profileSection: {
    marginBottom: 32,
  },
  profileCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    backgroundColor: '#06b6d4',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  profileEmail: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 4,
  },
  profileBadge: {
    color: '#06b6d4',
    fontSize: 12,
    fontWeight: '600',
  },
  editButton: {
    padding: 8,
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderRadius: 8,
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.5)',
    overflow: 'hidden',
  },
  settingItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(51, 65, 85, 0.3)',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  settingIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    color: '#9ca3af',
    fontSize: 14,
  },
  settingAction: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(244, 67, 54, 0.3)',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 24,
  },
  signOutText: {
    color: '#F44336',
    fontSize: 16,
    fontWeight: '600',
  },
  extraSpacing: {
    height: 80,
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

export default SettingsScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import Svg, { 
  Path, 
  Circle, 
  Line
} from 'react-native-svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface PermissionScreenProps {
  onPermissionsGranted: () => void;
}

const PermissionScreen: React.FC<PermissionScreenProps> = ({ onPermissionsGranted }) => {
  const [isGranting, setIsGranting] = useState(false);

  const handleGrantAccess = async () => {
    setIsGranting(true);
    
    try {
      // Simulate permission requests
      // In a real app, you would use react-native-permissions here
      
      // For now, we'll simulate the permission flow
      setTimeout(() => {
        Alert.alert(
          'Permissions Required',
          'This app needs camera, microphone, and location permissions to function properly. Please grant these permissions in the next dialogs.',
          [
            {
              text: 'OK',
              onPress: () => {
                // Simulate successful permission grant
                setIsGranting(false);
                onPermissionsGranted();
              }
            }
          ]
        );
      }, 1000);
      
    } catch (error) {
      console.error('Permission error:', error);
      setIsGranting(false);
      Alert.alert('Error', 'Failed to request permissions. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>One-Time Setup</Text>
        <Text style={styles.subtitle}>
          VahanChain needs certain permissions to a minimum to run keeping info safe on the calls.
        </Text>
      </View>

      {/* Permissions List */}
      <View style={styles.permissionsList}>
        {/* Camera Access */}
        <View style={styles.permissionItem}>
          <View style={styles.iconContainer}>
            <View style={styles.iconBackground}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path 
                  d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11z" 
                  stroke="#06b6d4" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <Circle cx="12" cy="13" r="4" stroke="#06b6d4" strokeWidth="2"/>
              </Svg>
            </View>
          </View>
          <View style={styles.permissionContent}>
            <Text style={styles.permissionTitle}>Camera Access</Text>
            <Text style={styles.permissionDescription}>For AI safety monitoring</Text>
          </View>
        </View>

        {/* Microphone Access */}
        <View style={styles.permissionItem}>
          <View style={styles.iconContainer}>
            <View style={styles.iconBackground}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path 
                  d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" 
                  stroke="#06b6d4" 
                  strokeWidth="2"
                />
                <Path 
                  d="M19 10v2a7 7 0 0 1-14 0v-2" 
                  stroke="#06b6d4" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <Line x1="12" y1="19" x2="12" y2="23" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round"/>
                <Line x1="8" y1="23" x2="16" y2="23" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round"/>
              </Svg>
            </View>
          </View>
          <View style={styles.permissionContent}>
            <Text style={styles.permissionTitle}>Microphone Access</Text>
            <Text style={styles.permissionDescription}>For hands-free voice recognition</Text>
          </View>
        </View>

        {/* Location Access */}
        <View style={styles.permissionItem}>
          <View style={styles.iconContainer}>
            <View style={styles.iconBackground}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path 
                  d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" 
                  stroke="#06b6d4" 
                  strokeWidth="2"
                />
                <Circle cx="12" cy="10" r="3" stroke="#06b6d4" strokeWidth="2"/>
              </Svg>
            </View>
          </View>
          <View style={styles.permissionContent}>
            <Text style={styles.permissionTitle}>Location Access</Text>
            <Text style={styles.permissionDescription}>For navigation & emergencies</Text>
          </View>
        </View>
      </View>

      {/* Grant Access Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.grantButton, isGranting && styles.grantButtonDisabled]} 
          onPress={handleGrantAccess}
          disabled={isGranting}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.grantButtonText}>
              {isGranting ? 'REQUESTING...' : 'GRANT ACCESS'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // slate-900
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    width: '100%',
    paddingTop: 32,
    marginBottom: 32,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
  },
  subtitle: {
    color: '#d1d5db', // gray-300
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  permissionsList: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  iconContainer: {
    marginRight: 16,
  },
  iconBackground: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(6, 182, 212, 0.2)', // cyan-500/20
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionContent: {
    flex: 1,
  },
  permissionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  permissionDescription: {
    color: '#9ca3af', // gray-400
    fontSize: 14,
  },
  buttonContainer: {
    width: '100%',
    paddingTop: 32,
  },
  grantButton: {
    width: '100%',
    backgroundColor: '#06b6d4', // cyan-500
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
    elevation: 8,
    shadowColor: 'rgba(6, 182, 212, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  grantButtonDisabled: {
    opacity: 0.7,
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  grantButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 1,
  },
});

export default PermissionScreen;

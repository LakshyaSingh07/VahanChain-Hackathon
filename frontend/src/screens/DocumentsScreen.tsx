import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

interface DocumentsScreenProps {
  onTabChange: (tab: 'dashboard' | 'documents' | 'settings') => void;
}

const DocumentsScreen: React.FC<DocumentsScreenProps> = ({ onTabChange }) => {
  const documents = [
    {
      id: 1,
      name: 'Driving License',
      status: 'verified',
      expiryDate: '2027-03-15',
      icon: 'credit-card',
    },
    {
      id: 2,
      name: 'Vehicle Registration',
      status: 'verified',
      expiryDate: '2025-08-22',
      icon: 'file-text',
    },
    {
      id: 3,
      name: 'Insurance Certificate',
      status: 'pending',
      expiryDate: '2024-12-30',
      icon: 'shield',
    },
    {
      id: 4,
      name: 'Pollution Certificate',
      status: 'expired',
      expiryDate: '2024-01-15',
      icon: 'alert-circle',
    },
    {
      id: 5,
      name: 'FASTag Details',
      status: 'verified',
      expiryDate: 'N/A',
      icon: 'tag',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return '#4CAF50';
      case 'pending':
        return '#FFC107';
      case 'expired':
        return '#F44336';
      default:
        return '#9ca3af';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified':
        return 'Verified';
      case 'pending':
        return 'Pending';
      case 'expired':
        return 'Expired';
      default:
        return 'Unknown';
    }
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
          <Text style={styles.headerTitle}>Documents</Text>
          <Text style={styles.headerSubtitle}>Manage your driving documents</Text>
        </View>

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Documents List */}
          <View style={styles.documentsSection}>
            {documents.map((document) => (
              <TouchableOpacity key={document.id} style={styles.documentCard}>
                <View style={styles.documentContent}>
                  <View style={styles.documentIcon}>
                    <Feather 
                      name={document.icon as any} 
                      size={24} 
                      color="#06b6d4" 
                    />
                  </View>
                  
                  <View style={styles.documentInfo}>
                    <Text style={styles.documentName}>{document.name}</Text>
                    <Text style={styles.documentExpiry}>
                      {document.expiryDate !== 'N/A' ? `Expires: ${document.expiryDate}` : 'No expiry'}
                    </Text>
                  </View>
                  
                  <View style={styles.documentStatus}>
                    <View 
                      style={[
                        styles.statusBadge, 
                        { backgroundColor: `${getStatusColor(document.status)}20` }
                      ]}
                    >
                      <Text 
                        style={[
                          styles.statusText, 
                          { color: getStatusColor(document.status) }
                        ]}
                      >
                        {getStatusText(document.status)}
                      </Text>
                    </View>
                    <Feather name="chevron-right" size={20} color="#9ca3af" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Add Document Section */}
          <TouchableOpacity style={styles.addDocumentCard}>
            <View style={styles.addDocumentContent}>
              <View style={styles.addIcon}>
                <Feather name="plus" size={24} color="#06b6d4" />
              </View>
              <View style={styles.addDocumentInfo}>
                <Text style={styles.addDocumentTitle}>Add New Document</Text>
                <Text style={styles.addDocumentSubtitle}>
                  Upload and verify additional documents
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color="#9ca3af" />
            </View>
          </TouchableOpacity>

          {/* Blockchain Verification Info */}
          <View style={styles.blockchainInfo}>
            <View style={styles.blockchainHeader}>
              <Feather name="shield" size={20} color="#06b6d4" />
              <Text style={styles.blockchainTitle}>Blockchain Verification</Text>
            </View>
            <Text style={styles.blockchainDescription}>
              All your documents are securely stored and verified on the Avalanche blockchain. 
              This ensures immutability and prevents fraud.
            </Text>
          </View>

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
            <View style={[styles.tabIconContainer, styles.activeTab]}>
              <Feather name="file-text" size={20} color="#06b6d4" />
            </View>
            <Text style={[styles.tabLabel, styles.activeTabLabel]}>Documents</Text>
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
  documentsSection: {
    gap: 12,
    marginBottom: 24,
  },
  documentCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.5)',
  },
  documentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  documentIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  documentExpiry: {
    color: '#9ca3af',
    fontSize: 14,
  },
  documentStatus: {
    alignItems: 'flex-end',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  addDocumentCard: {
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
    borderStyle: 'dashed',
    marginBottom: 24,
  },
  addDocumentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  addIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addDocumentInfo: {
    flex: 1,
  },
  addDocumentTitle: {
    color: '#06b6d4',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  addDocumentSubtitle: {
    color: '#9ca3af',
    fontSize: 14,
  },
  blockchainInfo: {
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.2)',
    marginBottom: 24,
  },
  blockchainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  blockchainTitle: {
    color: '#06b6d4',
    fontSize: 16,
    fontWeight: '600',
  },
  blockchainDescription: {
    color: '#d1d5db',
    fontSize: 14,
    lineHeight: 20,
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

export default DocumentsScreen;

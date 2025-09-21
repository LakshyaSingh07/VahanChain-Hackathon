import React, { useState } from 'react';
import DashboardScreen from './DashboardScreen';
import DocumentsScreen from './DocumentsScreen';
import SettingsScreen from './SettingsScreen';

type TabType = 'dashboard' | 'documents' | 'settings';

const DashboardContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  switch (activeTab) {
    case 'dashboard':
      return <DashboardScreen onTabChange={handleTabChange} />;
    case 'documents':
      return <DocumentsScreen onTabChange={handleTabChange} />;
    case 'settings':
      return <SettingsScreen onTabChange={handleTabChange} />;
    default:
      return <DashboardScreen onTabChange={handleTabChange} />;
  }
};

export default DashboardContainer;

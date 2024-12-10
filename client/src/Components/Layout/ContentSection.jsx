import React from 'react';
import Dashboard from '../../Pages/Dashboard'; // Import your components
import Students from '../../Pages/Students';
import Admins from '../../Pages/Admins';
import Settings from '../../Pages/Settings';
import { useSidebar } from '../contexts/SidebarContext';
import QrCodePage from '../../pages/QrPage';
const ContentSection = ({ selectedItem }) => {
  const { isCollapsed } = useSidebar();

  const renderContent = () => {
    switch (selectedItem) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <Students />;
      case 'admins':
        return <Admins />;
      case 'settings':
        return <Settings />;
        case 'qrcode':
      return <QrCodePage />;
      default:
        return null; // Return null for empty static content
    }
  };

  return (
    
    <div
      className={`content-section flex-grow ml-1.5 mr-1.5 sm:ml-0  transition-all duration-300  h-[99%]  overflow-auto rounded-lg no-scrollbar`}
    >
      {renderContent()}
    </div>
  );
};

export default ContentSection;

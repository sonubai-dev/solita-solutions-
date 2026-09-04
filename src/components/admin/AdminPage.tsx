import React, { useState, useEffect } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { checkAdminSession, terminateAdminSession } from '../../lib/adminStorage';

interface AdminPageProps {
  onExit: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onExit, darkMode, setDarkMode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => checkAdminSession());

  useEffect(() => {
    setIsAuthenticated(checkAdminSession());
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    terminateAdminSession();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={handleLoginSuccess}
        onExit={onExit}
        darkMode={darkMode}
      />
    );
  }

  return (
    <AdminDashboard
      onLogout={handleLogout}
      onExitToSite={onExit}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
  );
};

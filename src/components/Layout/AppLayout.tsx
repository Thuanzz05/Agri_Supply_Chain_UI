import React, { useState } from 'react';
import { Layout } from 'antd';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './AppLayout.css';

const { Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
  userRole?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, userRole = 'Admin' }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="app-layout">
      <Header 
        collapsed={collapsed} 
        onToggle={toggleSidebar}
        userRole={userRole}
      />
      
      <Layout className="content-layout">
        <Sidebar 
          collapsed={collapsed}
          userRole={userRole}
        />
        
        <Layout className="main-layout">
          <Content className="main-content">
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
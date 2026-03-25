import React from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  TeamOutlined,
  SettingOutlined,
  HomeOutlined,
  ShopOutlined,
  TruckOutlined,
  SafetyCertificateOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import './Sidebar.css';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  userRole?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, userRole = 'Admin' }) => {
  
  const getMenuItems = (): MenuProps['items'] => {
    const baseItems = [
      {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: 'Tổng quan',
      },
    ];

    switch (userRole) {
      case 'Admin':
        return [
          ...baseItems,
          {
            key: 'users',
            icon: <TeamOutlined />,
            label: 'Quản lý người dùng',
            children: [
              {
                key: 'farmers',
                icon: <UserOutlined />,
                label: 'Nông dân',
              },
              {
                key: 'agents',
                icon: <ShopOutlined />,
                label: 'Đại lý',
              },
              {
                key: 'supermarkets',
                icon: <HomeOutlined />,
                label: 'Siêu thị',
              },
            ],
          },
          {
            key: 'products',
            icon: <ShoppingCartOutlined />,
            label: 'Quản lý sản phẩm',
          },
          {
            key: 'orders',
            icon: <FileTextOutlined />,
            label: 'Quản lý đơn hàng',
          },
          {
            key: 'reports',
            icon: <BarChartOutlined />,
            label: 'Báo cáo thống kê',
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Cài đặt hệ thống',
          },
        ];

      case 'NongDan':
        return [
          ...baseItems,
          {
            key: 'farms',
            icon: <HomeOutlined />,
            label: 'Quản lý trang trại',
          },
          {
            key: 'products',
            icon: <ShoppingCartOutlined />,
            label: 'Sản phẩm',
            children: [
              {
                key: 'product-list',
                label: 'Danh sách sản phẩm',
              },
              {
                key: 'harvest',
                label: 'Thu hoạch',
              },
            ],
          },
          {
            key: 'orders',
            icon: <FileTextOutlined />,
            label: 'Đơn hàng',
          },
          {
            key: 'reports',
            icon: <BarChartOutlined />,
            label: 'Báo cáo',
          },
        ];

      case 'DaiLy':
        return [
          ...baseItems,
          {
            key: 'inventory',
            icon: <ShoppingCartOutlined />,
            label: 'Quản lý kho',
            children: [
              {
                key: 'warehouse',
                label: 'Kho hàng',
              },
              {
                key: 'stock',
                label: 'Tồn kho',
              },
            ],
          },
          {
            key: 'orders',
            icon: <FileTextOutlined />,
            label: 'Đơn hàng',
            children: [
              {
                key: 'purchase-orders',
                label: 'Đơn mua',
              },
              {
                key: 'sale-orders',
                label: 'Đơn bán',
              },
            ],
          },
          {
            key: 'quality',
            icon: <SafetyCertificateOutlined />,
            label: 'Kiểm định chất lượng',
          },
          {
            key: 'transport',
            icon: <TruckOutlined />,
            label: 'Vận chuyển',
          },
          {
            key: 'reports',
            icon: <BarChartOutlined />,
            label: 'Báo cáo',
          },
        ];

      case 'SieuThi':
        return [
          ...baseItems,
          {
            key: 'orders',
            icon: <FileTextOutlined />,
            label: 'Đơn hàng',
          },
          {
            key: 'suppliers',
            icon: <TeamOutlined />,
            label: 'Nhà cung cấp',
          },
          {
            key: 'inventory',
            icon: <ShoppingCartOutlined />,
            label: 'Tồn kho',
          },
          {
            key: 'quality',
            icon: <SafetyCertificateOutlined />,
            label: 'Kiểm tra chất lượng',
          },
          {
            key: 'reports',
            icon: <BarChartOutlined />,
            label: 'Báo cáo',
          },
        ];

      default:
        return baseItems;
    }
  };

  return (
    <Sider 
      trigger={null} 
      collapsible 
      collapsed={collapsed}
      className="app-sidebar"
      width={250}
      collapsedWidth={80}
    >
      <div className="sidebar-content">
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={getMenuItems()}
          className="sidebar-menu"
        />
      </div>
    </Sider>
  );
};

export default Sidebar;
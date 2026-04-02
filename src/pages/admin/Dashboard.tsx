import { Layout } from 'antd';
import Sidebar from '../../components/Sidebar';
import './Dashboard.css';

const { Content } = Layout;

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ 
        marginLeft: '256px', 
        flex: 1, 
        padding: '24px',
        background: '#f5f5f5',
        transition: 'margin-left 0.3s ease'
      }}>
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>Tổng quan hệ thống quản lý chuỗi cung ứng nông sản</p>
        </div>
        
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-number">1,234</div>
            <div className="stat-label">Trang trại</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">5,678</div>
            <div className="stat-label">Sản phẩm</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">890</div>
            <div className="stat-label">Đơn hàng</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">99.5%</div>
            <div className="stat-label">Độ tin cậy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
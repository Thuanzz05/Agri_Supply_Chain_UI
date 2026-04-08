import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { 
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { AdminLayout } from '../../components/Layout';

const DashboardSieuThi: React.FC = () => {
  return (
    <AdminLayout>
      <div className="page-header">
        <h1>Dashboard Siêu Thị</h1>
        <p>Tổng quan hoạt động bán lẻ của siêu thị</p>
      </div>
      
      {/* Stats Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Sản phẩm trong kho"
              value={234}
              prefix={<ShopOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Đơn hàng hôm nay"
              value={89}
              prefix={<ShoppingCartOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Khách hàng"
              value={1250}
              prefix={<UserOutlined style={{ color: '#fa8c16' }} />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Doanh thu hôm nay"
              value={45000000}
              prefix={<DollarOutlined style={{ color: '#f5222d' }} />}
              valueStyle={{ color: '#f5222d' }}
              suffix="VNĐ"
            />
          </Card>
        </Col>
      </Row>

      {/* Thông tin siêu thị */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Thông tin siêu thị">
            <p><strong>Tên siêu thị:</strong> Siêu thị Nông sản Sạch</p>
            <p><strong>Địa chỉ:</strong> 456 Đường Lê Văn Việt, Q.9, TP.HCM</p>
            <p><strong>Số điện thoại:</strong> 0987654321</p>
            <p><strong>Giờ mở cửa:</strong> 7:00 - 22:00 hàng ngày</p>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Hoạt động gần đây">
            <p>• Nhập hàng mới: 500kg rau củ - 2 giờ trước</p>
            <p>• Bán hàng: 150 đơn - 4 giờ trước</p>
            <p>• Thanh toán cho đại lý: 25,000,000 VNĐ - 1 ngày trước</p>
            <p>• Kiểm tra chất lượng hàng hóa - 1 ngày trước</p>
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default DashboardSieuThi;
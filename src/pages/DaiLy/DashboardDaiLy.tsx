import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { 
  ShoppingOutlined,
  InboxOutlined,
  CheckCircleOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { AdminLayout } from '../../components/Layout';

const DashboardDaiLy: React.FC = () => {
  return (
    <AdminLayout>
      <div className="page-header">
        <h1>Dashboard Đại Lý</h1>
        <p>Tổng quan hoạt động kinh doanh của đại lý</p>
      </div>
      
      {/* Stats Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Sản phẩm đang bán"
              value={45}
              prefix={<ShoppingOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Đơn hàng mới"
              value={18}
              prefix={<InboxOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Đơn hàng hoàn thành"
              value={156}
              prefix={<CheckCircleOutlined style={{ color: '#fa8c16' }} />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Doanh thu tháng này"
              value={125000000}
              prefix={<DollarOutlined style={{ color: '#f5222d' }} />}
              valueStyle={{ color: '#f5222d' }}
              suffix="VNĐ"
            />
          </Card>
        </Col>
      </Row>

      {/* Thông tin đại lý */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Thông tin đại lý">
            <p><strong>Tên đại lý:</strong> Đại lý Nông sản Miền Nam</p>
            <p><strong>Địa chỉ:</strong> 123 Đường Nguyễn Văn Linh, Q.7, TP.HCM</p>
            <p><strong>Số điện thoại:</strong> 0901234567</p>
            <p><strong>Email:</strong> dailymiennam@email.com</p>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Hoạt động gần đây">
            <p>• Nhận đơn hàng mới: #ORD456 - 1 giờ trước</p>
            <p>• Giao hàng thành công: #ORD450 - 3 giờ trước</p>
            <p>• Nhập hàng từ trang trại: 200kg rau - 1 ngày trước</p>
            <p>• Thanh toán cho trang trại: 15,000,000 VNĐ - 2 ngày trước</p>
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default DashboardDaiLy;
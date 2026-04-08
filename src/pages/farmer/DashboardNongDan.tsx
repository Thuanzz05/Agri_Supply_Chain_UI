import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { 
  ShopOutlined,
  InboxOutlined,
  CheckCircleOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { AdminLayout } from '../../components/Layout';

const DashboardNongDan: React.FC = () => {
  return (
    <AdminLayout>
      <div className="page-header">
        <h1>Dashboard Nông Dân</h1>
        <p>Tổng quan hoạt động trang trại của bạn</p>
      </div>
      
      {/* Stats Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Sản phẩm đang trồng"
              value={12}
              prefix={<ShopOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Đơn hàng chờ xử lý"
              value={5}
              prefix={<InboxOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Đơn hàng hoàn thành"
              value={28}
              prefix={<CheckCircleOutlined style={{ color: '#fa8c16' }} />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Doanh thu tháng này"
              value={45000000}
              prefix={<DollarOutlined style={{ color: '#f5222d' }} />}
              valueStyle={{ color: '#f5222d' }}
              suffix="VNĐ"
            />
          </Card>
        </Col>
      </Row>

      {/* Thông tin trang trại */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Thông tin trang trại">
            <p><strong>Tên trang trại:</strong> Trang trại Xanh</p>
            <p><strong>Địa chỉ:</strong> Xã Tân Phú, Huyện Đức Hòa, Long An</p>
            <p><strong>Diện tích:</strong> 5 hecta</p>
            <p><strong>Loại hình:</strong> Rau sạch hữu cơ</p>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Hoạt động gần đây">
            <p>• Cập nhật sản phẩm: Rau cải xanh - 2 giờ trước</p>
            <p>• Nhận đơn hàng mới: #ORD123 - 5 giờ trước</p>
            <p>• Hoàn thành đơn hàng: #ORD120 - 1 ngày trước</p>
            <p>• Kiểm định chất lượng: Đạt chuẩn A+ - 2 ngày trước</p>
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default DashboardNongDan;
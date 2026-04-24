import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message, Select } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined, TeamOutlined } from '@ant-design/icons';
import { authService, type LoginRequest } from '../services/authService';
import './Login.css';

const { Title } = Typography;

interface LoginFormData {
  tenDangNhap: string;
  matKhau: string;
  loaiTaiKhoan: string;
}

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: LoginFormData) => {
    setLoading(true);
    try {
      const loginData: LoginRequest = {
        TenDangNhap: values.tenDangNhap,
        MatKhau: values.matKhau
      };

      const response = await authService.login(loginData);
      
      if (response.success && response.data) {
        message.success('Đăng nhập thành công!');
        
        // Lưu loại tài khoản đã chọn vào localStorage
        const selectedRole = values.loaiTaiKhoan;
        const userData = {
          maTaiKhoan: response.data.maTaiKhoan || (response.data as any).MaTaiKhoan,
          tenDangNhap: response.data.tenDangNhap || (response.data as any).TenDangNhap,
          loaiTaiKhoan: selectedRole, // Sử dụng loại tài khoản đã chọn
          maNongDan: response.data.maNongDan || (response.data as any).MaNongDan,
          maDaiLy: response.data.maDaiLy || (response.data as any).MaDaiLy,
          maSieuThi: response.data.maSieuThi || (response.data as any).MaSieuThi
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Redirect dựa trên loại tài khoản được chọn
        if (selectedRole === 'Admin') {
          navigate('/admin/dashboard');
        } else if (selectedRole === 'Farmer') {
          navigate('/farmer/dashboard');
        } else if (selectedRole === 'Agent') {
          navigate('/agent/dashboard');
        } else if (selectedRole === 'Supermarket') {
          navigate('/supermarket/dashboard');
        } else {
          // Mặc định redirect theo role từ API
          if (response.data.loaiTaiKhoan === 'Admin') {
            navigate('/admin/dashboard');
          } else if (response.data.loaiTaiKhoan === 'Farmer') {
            navigate('/farmer/dashboard');
          } else if (response.data.loaiTaiKhoan === 'Agent') {
            navigate('/agent/dashboard');
          } else if (response.data.loaiTaiKhoan === 'Supermarket') {
            navigate('/supermarket/dashboard');
          } else {
            navigate('/admin/dashboard');
          }
        }
      } else {
        message.error(response.message || 'Đăng nhập thất bại!');
      }
    } catch (error: any) {
      message.error(error.message || 'Lỗi kết nối đến server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <Title level={2}>Hệ thống Chuỗi Cung Ứng Nông Sản</Title>
          <Title level={4}>Đăng nhập</Title>
        </div>
        
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="tenDangNhap"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Tên đăng nhập"
            />
          </Form.Item>

          <Form.Item
            name="matKhau"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
            />
          </Form.Item>

          <Form.Item
            name="loaiTaiKhoan"
            rules={[{ required: true, message: 'Vui lòng chọn loại tài khoản!' }]}
          >
            <Select
              placeholder="Chọn loại tài khoản"
              suffixIcon={<TeamOutlined />}
              size="large"
            >
              <Select.Option value="Admin">Quản trị viên</Select.Option>
              <Select.Option value="Farmer">Nông dân</Select.Option>
              <Select.Option value="Agent">Đại lý</Select.Option>
              <Select.Option value="Supermarket">Siêu thị</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<LoginOutlined />}
              block
            >
              Đăng nhập
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', marginTop: 16, color: '#666' }}>
            Chưa có tài khoản? <Link to="/register" style={{ color: '#1890ff', fontWeight: 500 }}>Đăng ký ngay</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
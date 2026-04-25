import React from 'react';
import { Card, Table, message, Modal, Form, Input, Space } from 'antd';
import type { TableProps } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { AdminLayout } from '../../components/Layout';
import { CustomPagination } from '../../components/CustomPagination';
import { apiService } from '../../services/apiService';
import type { DuLieuFormTrangTrai } from '../../types/trangTrai';
import { ModalButton } from '../../components/ModalButton';
import { ActionButton } from '../../components/ActionButton';

// Định nghĩa kiểu dữ liệu cho bảng
interface DataType {
  key: string;
  maTrangTrai: number;
  maNongDan: number;
  tenTrangTrai: string;
  diaChi: string;
  soChungNhan: string;
  tenNongDan: string;
}

const QuanLyTrangTrai: React.FC = () => {
  // State quản lý phân trang
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [data, setData] = React.useState<DataType[]>([]);
  const [loading, setLoading] = React.useState(false);
  
  // State quản lý tìm kiếm
  const [searchText, setSearchText] = React.useState('');
  
  // State quản lý modal thêm/sửa trang trại
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [editingFarm, setEditingFarm] = React.useState<DataType | null>(null);
  const [form] = Form.useForm();

  // Function gọi API lấy danh sách trang trại của nông dân đang đăng nhập
  const fetchFarms = async () => {
    setLoading(true);
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        message.error('Vui lòng đăng nhập lại');
        setData([]);
        return;
      }

      const user = JSON.parse(userStr);
      const maNongDan = user.maNongDan || (user as any).MaNongDan;
      
      if (!maNongDan) {
        message.warning('Không tìm thấy thông tin nông dân');
        setData([]);
        return;
      }

      // Gọi API lấy trang trại theo nông dân
      const response = await apiService.getFarmsByFarmer(maNongDan.toString());
      
      if (response && response.data) {
        const farms = Array.isArray(response.data) ? response.data : [];
        
        const mappedData: DataType[] = farms.map((farm: any) => ({
          key: farm.maTrangTrai?.toString(),
          maTrangTrai: farm.maTrangTrai,
          maNongDan: farm.maNongDan,
          tenTrangTrai: farm.tenTrangTrai,
          diaChi: farm.diaChi,
          soChungNhan: farm.soChungNhan,
          tenNongDan: farm.tenNongDan
        }));
        
        setData(mappedData);
      } else {
        setData([]);
      }
    } catch (error: any) {
      message.error('Không thể tải danh sách trang trại');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi component mount
  React.useEffect(() => {
    fetchFarms();
  }, []);

  // Hàm mở modal thêm mới
  const showModal = () => {
    setIsEditMode(false);
    setEditingFarm(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  // Hàm mở modal sửa
  const showEditModal = (record: DataType) => {
    setIsEditMode(true);
    setEditingFarm(record);
    form.setFieldsValue({
      tenTrangTrai: record.tenTrangTrai,
      diaChi: record.diaChi,
      soChungNhan: record.soChungNhan
    });
    setIsModalOpen(true);
  };

  // Hàm đóng modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingFarm(null);
    form.resetFields();
  };

  // Hàm xử lý submit form thêm/sửa trang trại
  const handleSubmit = async (values: DuLieuFormTrangTrai) => {
    try {
      setLoading(true);
      
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        message.error('Không tìm thấy thông tin người dùng');
        return;
      }
      
      const user = JSON.parse(userStr);
      const maNongDan = user.maNongDan || (user as any).MaNongDan;
      
      if (!maNongDan) {
        message.error('Không tìm thấy thông tin nông dân');
        return;
      }
      
      if (isEditMode && editingFarm) {
        // Sửa trang trại
        const farmData = {
          ...values,
          maNongDan: editingFarm.maNongDan
        };
        await apiService.updateFarm(editingFarm.maTrangTrai, farmData);
        message.success('Cập nhật trang trại thành công!');
      } else {
        // Thêm trang trại mới
        const farmData = {
          ...values,
          maNongDan: maNongDan
        };
        await apiService.addFarm(farmData);
        message.success('Thêm trang trại thành công!');
      }
      
      setIsModalOpen(false);
      setIsEditMode(false);
      setEditingFarm(null);
      form.resetFields();
      fetchFarms();
    } catch (error: any) {
      console.error('Error saving farm:', error);
      message.error(error.response?.data?.message || 'Không thể lưu trang trại');
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý xóa trang trại
  const handleDelete = (record: DataType) => {
    Modal.confirm({
      title: 'Xác nhận xóa trang trại',
      content: `Bạn có chắc chắn muốn xóa trang trại "${record.tenTrangTrai}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          setLoading(true);
          await apiService.deleteFarm(record.maTrangTrai);
          message.success('Xóa trang trại thành công!');
          fetchFarms();
        } catch (error: any) {
          message.error(error.response?.data?.message || 'Không thể xóa trang trại');
        } finally {
          setLoading(false);
        }
      }
    });
  };

  // Lọc dữ liệu theo từ khóa tìm kiếm
  const filteredData = React.useMemo(() => {
    if (!searchText) return data;
    
    return data.filter(item => 
      item.tenTrangTrai.toLowerCase().includes(searchText.toLowerCase()) ||
      item.diaChi.toLowerCase().includes(searchText.toLowerCase()) ||
      item.soChungNhan.toLowerCase().includes(searchText.toLowerCase()) ||
      item.tenNongDan.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  // Reset về trang 1 khi tìm kiếm
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  // Tính toán dữ liệu phân trang (từ filteredData thay vì data)
  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, pageSize]);

  // Định nghĩa các cột của bảng
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Mã TT',
      dataIndex: 'maTrangTrai',
      key: 'maTrangTrai',
      width: 80,
    },
    {
      title: 'Tên trang trại',
      dataIndex: 'tenTrangTrai',
      key: 'tenTrangTrai',
      width: 250,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'diaChi',
      key: 'diaChi',
      width: 300,
    },
    {
      title: 'Số chứng nhận',
      dataIndex: 'soChungNhan',
      key: 'soChungNhan',
      width: 150,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <ActionButton 
            type="default" 
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          >
            Sửa
          </ActionButton>
          <ActionButton 
            type="danger" 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Xóa
          </ActionButton>
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="page-header">
        <h1>Quản lý trang trại</h1>
        <p>Quản lý thông tin các trang trại</p>
      </div>
      
      <Card>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          padding: '16px 0',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <Input
            placeholder="Tìm kiếm trang trại..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
          <ActionButton 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={showModal}
          >
            Thêm trang trại
          </ActionButton>
        </div>
        
        <Table<DataType>
          columns={columns} 
          dataSource={paginatedData}
          pagination={false}
          scroll={{ x: 800 }}
          loading={loading}
        />
        
        <CustomPagination
          current={currentPage}
          total={filteredData.length}
          pageSize={pageSize}
          onChange={(page, size) => {
            setCurrentPage(page);
            setPageSize(size || 10);
          }}
          showTotal={(total, range) => 
            `${range[0]}-${range[1]} của ${total} trang trại`
          }
        />
      </Card>

      {/* Modal thêm/sửa trang trại */}
      <Modal
        title={isEditMode ? "Sửa trang trại" : "Thêm trang trại mới"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: 24 }}
        >
          <Form.Item
            label="Tên trang trại"
            name="tenTrangTrai"
            rules={[
              { required: true, message: 'Vui lòng nhập tên trang trại!' },
              { min: 3, message: 'Tên trang trại phải có ít nhất 3 ký tự!' }
            ]}
          >
            <Input placeholder="Nhập tên trang trại" />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="diaChi"
            rules={[
              { required: true, message: 'Vui lòng nhập địa chỉ!' }
            ]}
          >
            <Input placeholder="Nhập địa chỉ trang trại" />
          </Form.Item>

          <Form.Item
            label="Số chứng nhận"
            name="soChungNhan"
            rules={[
              { required: true, message: 'Vui lòng nhập số chứng nhận!' }
            ]}
          >
            <Input placeholder="Ví dụ: VG001234" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <ModalButton onClick={handleCancel}>
                Hủy
              </ModalButton>
              <ModalButton
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                {isEditMode ? 'Cập nhật' : 'Thêm trang trại'}
              </ModalButton>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default QuanLyTrangTrai;

import React from 'react';
import { Card, Table, Button, Space, Input, message } from 'antd';
import type { TableProps } from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { AdminLayout } from '../../components/Layout';
import { CustomPagination } from '../../components/CustomPagination';
import { apiService } from '../../services/apiService';

interface DataType {
  key: string;
  maKho: number;
  tenKho: string;
  loaiKho: string;
  diaChi: string;
  tenChuSoHuu: string;
}

const QuanLyKho: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  
  // State để lưu dữ liệu từ API
  const [data, setData] = React.useState<DataType[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');

  // Function để gọi API lấy dữ liệu
  const fetchWarehouses = async () => {
    setLoading(true);
    try {
      const response = await apiService.getAllWarehouses();
      
      if (response && response.data) {
        const warehouses = Array.isArray(response.data) ? response.data : [];
        
        // Chuyển đổi dữ liệu từ API sang format của bảng
        const mappedData: DataType[] = warehouses.map((warehouse: any) => ({
          key: warehouse.maKho?.toString(),
          maKho: warehouse.maKho,
          tenKho: warehouse.tenKho,
          loaiKho: warehouse.loaiKho,
          diaChi: warehouse.diaChi,
          tenChuSoHuu: warehouse.tenChuSoHuu
        }));
        
        setData(mappedData);
      } else {
        setData([]);
      }
    } catch (error: any) {
      message.error('Không thể tải danh sách kho hàng');
      setData([]);
    } finally {
      setLoading(false); 
    }
  };

  // Gọi API khi component được mount
  React.useEffect(() => {
    fetchWarehouses();
  }, []);

  // Lọc dữ liệu theo từ khóa tìm kiếm
  const filteredData = React.useMemo(() => {
    if (!searchText) return data;
    
    return data.filter(item => 
      item.tenKho.toLowerCase().includes(searchText.toLowerCase()) ||
      item.loaiKho.toLowerCase().includes(searchText.toLowerCase()) ||
      item.diaChi.toLowerCase().includes(searchText.toLowerCase()) ||
      item.tenChuSoHuu.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  // Reset về trang 1 khi tìm kiếm
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  // Dữ liệu hiển thị theo trang
  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, pageSize]);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Mã kho',
      dataIndex: 'maKho',
      key: 'maKho',
      width: 80,
    },
    {
      title: 'Tên kho',
      dataIndex: 'tenKho',
      key: 'tenKho',
      width: 200,
    },
    {
      title: 'Loại kho',
      dataIndex: 'loaiKho',
      key: 'loaiKho',
      width: 120,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'diaChi',
      key: 'diaChi',
      width: 300,
      ellipsis: true,
    },
    {
      title: 'Chủ sở hữu',
      dataIndex: 'tenChuSoHuu',
      key: 'tenChuSoHuu',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 150,
      render: (_, _record) => (
        <Space size="small">
          <Button 
            type="default" 
            size="small" 
            icon={<EditOutlined />}
            style={{ 
              color: '#1890ff', 
              borderColor: '#1890ff',
              minWidth: '65px'
            }}
          >
            Sửa
          </Button>
          <Button 
            danger 
            size="small" 
            icon={<DeleteOutlined />}
            style={{ minWidth: '65px' }}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="page-header">
        <h1>Quản lý kho hàng</h1>
        <p>Quản lý danh sách kho hàng của đại lý</p>
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
            placeholder="Tìm kiếm kho hàng..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            size="large"
          >
            Thêm kho hàng
          </Button>
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
            `${range[0]}-${range[1]} của ${total} kho hàng`
          }
        />
      </Card>
    </AdminLayout>
  );
};

export default QuanLyKho;
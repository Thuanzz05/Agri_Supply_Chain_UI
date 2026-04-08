import React from 'react';
import { Card, Table, Button, Space, Tag, Input } from 'antd';
import type { TableProps } from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { AdminLayout } from '../../components/Layout';
import { CustomPagination } from '../../components/CustomPagination';

interface DataType {
  key: string;
  id: string;
  name: string;
  category: string;
  quantity: string;
  unit: string;
  price: string;
  status: string;
  harvestDate: string;
}

const QuanLySanPham: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  // Dữ liệu mẫu sản phẩm
  const data: DataType[] = [
    {
      key: '1',
      id: 'SP001',
      name: 'Rau cải xanh',
      category: 'Rau lá',
      quantity: '150',
      unit: 'kg',
      price: '25,000',
      status: 'Còn hàng',
      harvestDate: '2024-01-15'
    },
    {
      key: '2',
      id: 'SP002',
      name: 'Cà chua',
      category: 'Quả',
      quantity: '200',
      unit: 'kg',
      price: '35,000',
      status: 'Còn hàng',
      harvestDate: '2024-01-14'
    },
    {
      key: '3',
      id: 'SP003',
      name: 'Xà lách',
      category: 'Rau lá',
      quantity: '0',
      unit: 'kg',
      price: '30,000',
      status: 'Hết hàng',
      harvestDate: '2024-01-10'
    },
    {
      key: '4',
      id: 'SP004',
      name: 'Dưa chuột',
      category: 'Quả',
      quantity: '180',
      unit: 'kg',
      price: '20,000',
      status: 'Còn hàng',
      harvestDate: '2024-01-16'
    },
    {
      key: '5',
      id: 'SP005',
      name: 'Rau muống',
      category: 'Rau lá',
      quantity: '120',
      unit: 'kg',
      price: '15,000',
      status: 'Còn hàng',
      harvestDate: '2024-01-15'
    }
  ];

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Mã SP',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      width: 100,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 80,
      render: (quantity: string, record: DataType) => (
        <span>{quantity} {record.unit}</span>
      ),
    },
    {
      title: 'Giá (VNĐ/kg)',
      dataIndex: 'price',
      key: 'price',
      width: 100,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (_, { status }) => (
        <Tag color={status === 'Còn hàng' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Ngày thu hoạch',
      dataIndex: 'harvestDate',
      key: 'harvestDate',
      width: 120,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 150,
      render: () => (
        <Space size="small">
          <Button 
            type="primary" 
            size="small" 
            icon={<EditOutlined />}
          >
            Sửa
          </Button>
          <Button 
            danger 
            size="small" 
            icon={<DeleteOutlined />}
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
        <h1>Quản lý sản phẩm</h1>
        <p>Quản lý sản phẩm nông sản của trang trại</p>
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
            placeholder="Tìm kiếm sản phẩm..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
          />
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            size="large"
          >
            Thêm sản phẩm
          </Button>
        </div>
        
        <Table<DataType>
          columns={columns} 
          dataSource={data}
          pagination={false}
          scroll={{ x: 1000 }}
        />
        
        <CustomPagination
          current={currentPage}
          total={data.length}
          pageSize={pageSize}
          onChange={(page, size) => {
            setCurrentPage(page);
            setPageSize(size || 10);
          }}
          showTotal={(total, range) => 
            `${range[0]}-${range[1]} của ${total} sản phẩm`
          }
        />
      </Card>
    </AdminLayout>
  );
};

export default QuanLySanPham;
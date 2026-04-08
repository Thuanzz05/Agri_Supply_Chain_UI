import React from 'react';
import { Card, Table, Button, Input, Empty } from 'antd';
import type { TableProps } from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined 
} from '@ant-design/icons';
import { AdminLayout } from '../../components/Layout';
import { CustomPagination } from '../../components/CustomPagination';

// Interface cho dữ liệu báo cáo
interface DataType {
  key: string;
  name: string;
  description: string;
}

const Reports: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  // Dữ liệu trống
  const data: DataType[] = [];

  // Cấu hình cột cho bảng
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Tên báo cáo',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 300,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      render: () => (
        <Button type="link" size="small">
          Xem
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="page-header">
        <h1>Báo cáo</h1>
        <p>Quản lý và xem các báo cáo thống kê hệ thống</p>
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
            placeholder="Tìm kiếm báo cáo..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
          />
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            size="large"
          >
            Tạo báo cáo
          </Button>
        </div>
        
        <Table<DataType>
          columns={columns} 
          dataSource={data}
          pagination={false}
          locale={{
            emptyText: <Empty description="Chưa có báo cáo nào" />
          }}
        />
        
        <CustomPagination
          current={currentPage}
          total={0}
          pageSize={pageSize}
          onChange={(page, size) => {
            setCurrentPage(page);
            setPageSize(size || 10);
          }}
          showTotal={(total, range) => 
            `${range[0]}-${range[1]} của ${total} báo cáo`
          }
        />
      </Card>
    </AdminLayout>
  );
};

export default Reports;
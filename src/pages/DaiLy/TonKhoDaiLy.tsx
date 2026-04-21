import React from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  message,
} from 'antd';
import type { TableProps } from 'antd';
import { DatabaseOutlined, DeleteOutlined, EditOutlined, QrcodeOutlined, SearchOutlined, ShopOutlined } from '@ant-design/icons';
import { AdminLayout } from '../../components/Layout';
import { CustomPagination } from '../../components/CustomPagination';
import { apiService } from '../../services/apiService';
import type { DuLieuCapNhatTonKho, TonKhoDaiLy } from '../../types/kho';

interface TonKhoTableItem extends TonKhoDaiLy {
  key: string;
}

const formatDate = (value: string) => {
  if (!value) {
    return '--';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString('vi-VN');
};

const getApiErrorMessage = (error: any, fallbackMessage: string) => {
  const responseData = error?.response?.data;

  if (typeof responseData === 'string' && responseData.trim()) {
    return responseData;
  }

  if (typeof responseData?.message === 'string' && responseData.message.trim()) {
    return responseData.message;
  }

  if (typeof responseData?.title === 'string' && responseData.title.trim()) {
    return responseData.title;
  }

  if (Array.isArray(responseData?.errors)) {
    return responseData.errors.join(', ');
  }

  if (responseData?.errors && typeof responseData.errors === 'object') {
    const firstError = Object.values(responseData.errors).flat()[0];
    if (typeof firstError === 'string' && firstError.trim()) {
      return firstError;
    }
  }

  if (typeof error?.message === 'string' && error.message.trim()) {
    return error.message;
  }

  return fallbackMessage;
};

const TonKhoDaiLyPage: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [searchText, setSearchText] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [inventory, setInventory] = React.useState<TonKhoTableItem[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<TonKhoTableItem | null>(null);
  const [form] = Form.useForm<DuLieuCapNhatTonKho>();

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const response = await apiService.getAllAgentInventory();
      const items = Array.isArray(response?.data) ? response.data : [];

      setInventory(
        items.map((item: TonKhoDaiLy) => ({
          ...item,
          key: `${item.maKho}-${item.maLo}-${item.maQR}`,
        })),
      );
    } catch (error: any) {
      setInventory([]);
      message.error(getApiErrorMessage(error, 'Khong the tai danh sach ton kho'));
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchInventory();
  }, []);

  const showUpdateModal = (item: TonKhoTableItem) => {
    setSelectedItem(item);
    form.setFieldsValue({ soLuongMoi: item.soLuong });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    form.resetFields();
  };

  const handleUpdateQuantity = async (values: DuLieuCapNhatTonKho) => {
    if (!selectedItem) {
      return;
    }

    setSubmitting(true);
    try {
      await apiService.updateAgentInventoryQuantity(selectedItem.maKho, selectedItem.maLo, values);
      message.success('Cap nhat so luong ton kho thanh cong');
      handleCloseModal();
      await fetchInventory();
    } catch (error: any) {
      message.error(getApiErrorMessage(error, 'Khong the cap nhat so luong ton kho'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteInventory = (item: TonKhoTableItem) => {
    Modal.confirm({
      title: 'Xac nhan xoa ton kho',
      content: `Ban co chac chan muon xoa ton kho lo ${item.maLo} trong kho ${item.tenKho}?`,
      okText: 'Xoa',
      okType: 'danger',
      cancelText: 'Huy',
      onOk: async () => {
        try {
          await apiService.deleteAgentInventory(item.maKho, item.maLo);
          message.success('Xoa ton kho thanh cong');
          await fetchInventory();
        } catch (error: any) {
          message.error(error?.response?.data?.message || 'Khong the xoa ton kho');
          throw error;
        }
      },
    });
  };

  const filteredInventory = React.useMemo(() => {
    const keyword = searchText.trim().toLowerCase();

    if (!keyword) {
      return inventory;
    }

    return inventory.filter((item) =>
      [item.tenKho, item.tenSanPham, item.maQR, item.donViTinh, String(item.maLo)].some((value) =>
        value.toLowerCase().includes(keyword),
      ),
    );
  }, [inventory, searchText]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  React.useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filteredInventory.length / pageSize));
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, filteredInventory.length, pageSize]);

  const paginatedInventory = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredInventory.slice(startIndex, startIndex + pageSize);
  }, [currentPage, filteredInventory, pageSize]);

  const totalQuantity = React.useMemo(
    () => filteredInventory.reduce((sum, item) => sum + item.soLuong, 0),
    [filteredInventory],
  );

  const totalWarehouses = React.useMemo(
    () => new Set(filteredInventory.map((item) => item.maKho)).size,
    [filteredInventory],
  );

  const totalProducts = React.useMemo(
    () => new Set(filteredInventory.map((item) => item.tenSanPham)).size,
    [filteredInventory],
  );

  const columns: TableProps<TonKhoTableItem>['columns'] = [
    {
      title: 'Ma kho',
      dataIndex: 'maKho',
      key: 'maKho',
      width: 100,
    },
    {
      title: 'Ten kho',
      dataIndex: 'tenKho',
      key: 'tenKho',
      width: 220,
    },
    {
      title: 'Ma lo',
      dataIndex: 'maLo',
      key: 'maLo',
      width: 100,
    },
    {
      title: 'San pham',
      dataIndex: 'tenSanPham',
      key: 'tenSanPham',
      width: 200,
    },
    {
      title: 'So luong',
      key: 'soLuong',
      width: 160,
      render: (_, record) => `${record.soLuong.toLocaleString('vi-VN')} ${record.donViTinh}`,
    },
    {
      title: 'Ma QR',
      dataIndex: 'maQR',
      key: 'maQR',
      width: 120,
      render: (value: string) => <Tag color="green">{value}</Tag>,
    },
    {
      title: 'Ngay cap nhat',
      dataIndex: 'ngayCapNhat',
      key: 'ngayCapNhat',
      width: 140,
      render: (value: string) => formatDate(value),
    },
    {
      title: 'Thao tac',
      key: 'action',
      width: 220,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button type="primary" icon={<EditOutlined />} onClick={() => showUpdateModal(record)}>
            Sua
          </Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDeleteInventory(record)}>
            Xoa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="page-header">
        <h1>Ton kho dai ly</h1>
        <p>Theo doi danh sach ton kho hien co tai cac kho cua dai ly</p>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic title="Tong so luong ton" value={totalQuantity} suffix="don vi" prefix={<DatabaseOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic title="So kho co hang" value={totalWarehouses} prefix={<ShopOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic title="So san pham" value={totalProducts} prefix={<QrcodeOutlined />} />
          </Card>
        </Col>
      </Row>

      <Card>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            marginBottom: 24,
            padding: '16px 0',
            borderBottom: '1px solid #f0f0f0',
            flexWrap: 'wrap',
          }}
        >
          <Input
            placeholder="Tim theo kho, san pham, ma QR, ma lo..."
            prefix={<SearchOutlined />}
            style={{ width: 360, maxWidth: '100%' }}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            allowClear
          />
        </div>

        <Table<TonKhoTableItem>
          columns={columns}
          dataSource={paginatedInventory}
          pagination={false}
          loading={loading}
          scroll={{ x: 1120 }}
        />

        <CustomPagination
          current={currentPage}
          total={filteredInventory.length}
          pageSize={pageSize}
          onChange={(page, size) => {
            setCurrentPage(page);
            setPageSize(size || 10);
          }}
          showTotal={(total, range) => `${range[0]}-${range[1]} cua ${total} dong ton kho`}
        />
      </Card>

      <Modal title="Sua so luong ton kho" open={isModalOpen} onCancel={handleCloseModal} footer={null} destroyOnHidden>
        <Form form={form} layout="vertical" onFinish={handleUpdateQuantity} style={{ marginTop: 20 }}>
          <Form.Item label="Kho">
            <Input value={selectedItem?.tenKho} disabled />
          </Form.Item>

          <Form.Item label="San pham">
            <Input value={selectedItem?.tenSanPham} disabled />
          </Form.Item>

          <Form.Item label="Ma lo">
            <Input value={selectedItem?.maLo} disabled />
          </Form.Item>

          <Form.Item
            label="So luong moi"
            name="soLuongMoi"
            rules={[
              { required: true, message: 'Vui long nhap so luong moi' },
              { type: 'number', min: 0, message: 'So luong moi phai lon hon hoac bang 0' },
            ]}
          >
            <InputNumber style={{ width: '100%' }} min={0} step={0.1} />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <Button onClick={handleCloseModal}>Huy</Button>
            <Button type="primary" htmlType="submit" loading={submitting}>
              Luu so luong
            </Button>
          </div>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default TonKhoDaiLyPage;

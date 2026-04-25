export interface LoHangKiemDinh {
  maLo: number;
  tenSanPham: string;
  maNongDan: number;
  tenNongDan: string;
  soLuong: number;
  donViTinh: string;
  ngayThuHoach: string;
  trangThaiKiemDinh: 'cho_kiem_dinh' | 'dat' | 'khong_dat';
  ketQuaKiemDinh?: string;
  ngayKiemDinh?: string;
}

export interface KiemDinhRequest {
  maLo: number;
  ketQua: 'dat' | 'khong_dat';
  ghiChu: string;
}

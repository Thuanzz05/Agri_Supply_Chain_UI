// Type cho Lô Nông Sản
export interface LoNongSan {
  maLo: number;
  maTrangTrai: number;
  maSanPham: number;
  soLuongBanDau: number;
  soLuongHienTai: number;
  ngayThuHoach: string;
  hanSuDung: string;
  maQR: string;
  trangThai: string;
  ngayTao: string;
  tenTrangTrai: string;
  tenSanPham: string;
  donViTinh: string;
}

// Type cho form data khi thêm lô nông sản
export interface DuLieuFormLoNongSan {
  maTrangTrai: number;
  maSanPham: number;
  soLuongBanDau: number;
  ngayThuHoach: string;
  hanSuDung: string;
  maQR: string;
}

// Type cho form data khi sửa lô nông sản
export interface DuLieuCapNhatLoNongSan {
  soLuongHienTai: number;
  ngayThuHoach: string;
  hanSuDung: string;
  maQR: string;
  trangThai: string;
}

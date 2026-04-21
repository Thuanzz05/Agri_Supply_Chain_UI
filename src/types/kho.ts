export interface Kho {
  maKho: number;
  tenKho: string;
  loaiKho: string;
  maChuSoHuu: number;
  loaiChuSoHuu: string;
  diaChi: string;
  tenChuSoHuu: string;
}

export interface DuLieuFormKhoThem {
  tenKho: string;
  loaiKho: string;
  maChuSoHuu: number;
  loaiChuSoHuu: string;
  diaChi: string;
}

export interface DuLieuFormKhoSua {
  tenKho: string;
  loaiKho: string;
  diaChi: string;
}

export interface TonKhoDaiLy {
  maKho: number;
  maLo: number;
  soLuong: number;
  ngayCapNhat: string;
  tenKho: string;
  tenSanPham: string;
  donViTinh: string;
  maQR: string;
}

export interface DuLieuCapNhatTonKho {
  soLuongMoi: number;
}

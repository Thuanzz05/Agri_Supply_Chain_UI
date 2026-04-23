import axios from 'axios';

const API_BASE_URL = 'https://localhost:7009';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface LoginRequest {
  TenDangNhap: string;
  MatKhau: string;
}

export interface User {
  maTaiKhoan: number;
  tenDangNhap: string;
  loaiTaiKhoan: string;
  maNongDan?: number;
  maDaiLy?: number;
  maSieuThi?: number;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    maTaiKhoan: number;
    tenDangNhap: string;
    loaiTaiKhoan: string;
    maNongDan?: number;
    maDaiLy?: number;
    maSieuThi?: number;
    token: string;
  };
}

export const authService = {
  async login(loginData: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/api/auth/login', loginData);
      
      if (response.data.success && response.data.data) {
        // Chỉ lưu token, user data sẽ được lưu ở Login component
        const token = response.data.data.token;
        localStorage.setItem('token', token);
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw new Error('Lỗi kết nối đến server');
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiClient.get('/api/auth/me');
      if (response.data.success) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      return null;
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }
};
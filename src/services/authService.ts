import axios from 'axios';

const API_BASE_URL = 'https://localhost:7009';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
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
  MaTaiKhoan: number;
  TenDangNhap: string;
  LoaiTaiKhoan: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    MaTaiKhoan: number;
    TenDangNhap: string;
    LoaiTaiKhoan: string;
    Token: string;
  };
}

export const authService = {
  async login(loginData: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/api/auth/login', loginData);
      
      if (response.data.success && response.data.data) {
        localStorage.setItem('token', response.data.data.Token);
        localStorage.setItem('user', JSON.stringify({
          MaTaiKhoan: response.data.data.MaTaiKhoan,
          TenDangNhap: response.data.data.TenDangNhap,
          LoaiTaiKhoan: response.data.data.LoaiTaiKhoan
        }));
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
      const response = await api.get('/api/auth/me');
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
    return !!this.getToken();
  }
};
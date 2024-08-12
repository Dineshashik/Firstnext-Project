import axios, { AxiosInstance, AxiosResponse } from 'axios';

const defaultHeader = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 100000000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface ApiResponse<T> {
  data: T;
  message: string;
  success: number;
}

export const api = {
  // GET request
  get: async <T>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> => {
    const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.get(
      endpoint,
      { params }
    );
    return response.data;
  },
  // // GET request
  // get: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
  //     const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.get(endpoint);
  //     return response.data;
  // },

  // POST request
  post: async <T>(
    endpoint: string,
    data?: any,
    contentType?: string
  ): Promise<ApiResponse<T>> => {
    const headers = contentType
      ? { headers: { 'Content-Type': contentType } }
      : defaultHeader;
    const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.post(
      endpoint,
      data,
      headers
    );
    return response.data;
  },

  // PUT request
  put: async <T>(
    endpoint: string,
    putData: any,
    contentType?: string
  ): Promise<ApiResponse<T>> => {
    const headers = contentType
      ? { headers: { 'Content-Type': contentType } }
      : defaultHeader;
    const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.put(
      endpoint,
      putData,
      headers
    );
    return response.data;
  },

  // PATCH request
  patch: async <T>(
    endpoint: string,
    patchData: any,
    contentType?: string
  ): Promise<ApiResponse<T>> => {
    const headers = contentType
      ? { headers: { 'Content-Type': contentType } }
      : defaultHeader;
    const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.patch(
      endpoint,
      patchData,
      headers
    );
    return response.data;
  },

  // DELETE request
  delete: async (endpoint: string): Promise<void> => {
    const response: any = await axiosInstance.delete(endpoint);
    return response.data;
  },
};

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

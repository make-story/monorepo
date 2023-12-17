import axios from 'axios';

// axios 설정 및 인스턴스 생성
const axiosInterceptorInstance = axios.create({
  baseURL: 'https://test.com/api/',
});

// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
  config => {
    const accessToken = JSON.parse(localStorage.getItem('token') || '{}');
    if (accessToken) {
      if (config.headers) config.headers.token = accessToken;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInterceptorInstance.interceptors.response.use(
  response => {
    // ...
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInterceptorInstance;

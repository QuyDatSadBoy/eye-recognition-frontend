import axios from 'axios';

// Cấu hình base URLs cho các services
export const eyeRecognitionAPI = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const statisticsAPI = axios.create({
  baseURL: 'http://localhost:8081/api/statistics',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const trainingAPI = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor để xử lý lỗi
const setupInterceptors = (api) => {
  api.interceptors.response.use(
    response => response,
    error => {
      console.error('API Error:', error);
      return Promise.reject(error);
    }
  );
};

setupInterceptors(eyeRecognitionAPI);
setupInterceptors(statisticsAPI);
setupInterceptors(trainingAPI);
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Nếu data là FormData thì override Content-Type
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Giả sử API trả về kết quả trong data.data (như bạn đã làm)
    return response.data;
  },
  function (error) {
    console.error('API Error Response:', error.response); // Log chi tiết lỗi

    const { status, data } = error.response;

    if (status === 400) {
      const errorMessage = data.message || 'Có lỗi xảy ra. Vui lòng thử lại sau!';
      throw new Error(errorMessage);
    }

    if (status === 401) {
      const errorMessage = 'Phiên làm việc hết hạn, vui lòng đăng nhập lại.';
      throw new Error(errorMessage);
    }

    if (status === 500) {
      const errorMessage = 'Có sự cố với server. Vui lòng thử lại sau.';
      throw new Error(errorMessage);
    }

    const genericErrorMessage = 'Đã xảy ra lỗi, vui lòng thử lại.';
    throw new Error(genericErrorMessage);
  }
);

export default axiosClient;
import axios from "axios";

const Instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 20000,
  headers: { "X-Custom-Header": "foobar" },
});

Instance.interceptors.request.use(
  (requestConfig) => {
    const token = localStorage.getItem("token");
    if (token && requestConfig?.headers) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    return requestConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Instance;

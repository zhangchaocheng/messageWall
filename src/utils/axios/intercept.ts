import axios from "axios";

// 创建拦截器
const interceptor = axios.create({
  baseURL: "http://localhost:3000", // 设置你的API基础URL
  timeout: 5000, // 设置请求超时时间
})

// 创建请求拦截器
interceptor.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  }
)

// 创建响应拦截器
interceptor.interceptors.response.use(
  (response) => {
    return response;
  }
)
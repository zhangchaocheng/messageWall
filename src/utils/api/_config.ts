import axios from "axios"

const webConfig = {
  url: "http://localhost:3000" //后端请求地址
}

const service = axios.create({
  baseURL: webConfig.url, // api base_url
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data;
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service


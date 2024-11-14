import axios, { AxiosInstance, AxiosResponse } from 'axios'
import qs from 'qs'
// 新建 axios 实例
const service: AxiosInstance = axios.create()
// 设置 baseURL
service.defaults.baseURL = import.meta.env.VITE_APP_BASE_API
// 设置超时时间
service.defaults.timeout = 60 * 1000
// 设置 headers
service.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8'

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  config => {
    showLoadingToast({ duration: 0 })
    if (config.method === 'get') {
      const data = qs.stringify(config.data)
      console.log(data)
      config.params = config.data
      config.data = {}
    }
    return config
  },
  error => {
    closeToast()
    console.log('请求失败', error)
    showDialog({ message: JSON.stringify(error) })
    Promise.reject(error)
  }
)
/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    closeToast()
    const { data } = response
    // 响应数据为二进制流
    if (data instanceof ArrayBuffer) {
      return response
    }
    const { code, msg } = data
    if (code !== 200) {
      showDialog({ message: msg })
      return Promise.reject(response)
    }
    return data
  },
  error => {
    closeToast()
    console.log('请求返回失败', error)
    showDialog({ message: error.message })
    return Promise.reject(error)
  }
)

export default service

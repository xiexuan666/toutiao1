import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
// 添加拦截器
// config相当于请求报文
axios.interceptors.request.use(function(config) {
  let token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function(error) {
  // 对情求错误做些什么
  return Promise.reject(error)
});
// 添加拦截响应器
// 每一次响应都会经过响应拦截器
axios.interceptors.response.use(function(response) {
  if (response.data.message === '用户信息验证失败' || response.data.message === '用户信息验证失败！') {
    window.location.href = '#/login'
  }
  return response;
}, function(error) {
  // 对情求错误做些什么
  return Promise.reject(error)
});
export default axios

// 引入axios配置好的基准路径
import axios from '@/utils/axios.js'
// 登录
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
export const xie = (id) => {
  return axios({
    method: 'get',
    url: `/user/${id}`
  })
}
export const updateUserById = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}

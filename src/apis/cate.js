import axios from '@/utils/axios.js'
// 1.获取所有栏目数据
export const getCateList = () => {
  return axios({
    url: '/category'
  })
}

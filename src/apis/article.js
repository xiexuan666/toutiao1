// 引入的axios已经配置好基准路径
import axios from '@/utils/axios.js'

// 1.获取栏目的新闻数据
export const getPostList = (params) => {
  return axios({
    url: '/post',
    params
  })
}

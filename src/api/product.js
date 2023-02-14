import { request } from '@/utils'

// export const getHello = params => {
//   return request({
//     method: 'GET',
//     url: '/search/getHello',
//     params,
//   })
// }
// (获取产品列表)queryServiceProductList
export const getServiceProductList = params => {
  return request({
    method: 'GET',
    url: '/search/queryServiceProductList',
    params,
  })
}
// (查询密钥接口)queryKeyImpl
export const queryKeyImpl = params => {
  return request({
    method: 'GET',
    url: '/search/queryKeyImpl',
    params,
  })
}

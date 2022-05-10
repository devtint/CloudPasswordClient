import { request } from '@/utils'

// export const getHello = params => {
//   return request({
//     method: 'GET',
//     url: '/search/getHello',
//     params,
//   })
// }

// (创建订单)cloudPasswordCreateOrder
export const createOrder = data => {
  return request({
    method: 'POST',
    url: '/insertReturn/cloudPasswordCreateOrder',
    data,
  })
}

// (查询密钥算法列表)queryCryptographicAlgorithmList
export const getCryptographicAlgorithmList = params => {
  return request({
    method: 'GET',
    url: '/search/queryCryptographicAlgorithmList',
    params,
  })
}

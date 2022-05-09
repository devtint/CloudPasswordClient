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

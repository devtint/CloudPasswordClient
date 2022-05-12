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

// (查询我的全部订单)queryMyAllOrders
export const queryMyAllOrders = params => {
  return request({
    method: 'GET',
    url: '/search/queryMyAllOrders',
    params,
  })
}

// (查询我的待支付订单)queryMyToBePaidOrders
export const queryMyToBePaidOrders = params => {
  return request({
    method: 'GET',
    url: '/search/queryMyToBePaidOrders',
    params,
  })
}

// (查询我的待商户收款确认订单)queryMyCollectionConfirmOrders
export const queryMyCollectionConfirmOrders = params => {
  return request({
    method: 'GET',
    url: '/search/queryMyCollectionConfirmOrders',
    params,
  })
}

// (查询我的待配货订单)queryMyToBeDistributedOrders
export const queryMyToBeDistributedOrders = params => {
  return request({
    method: 'GET',
    url: '/search/queryMyToBeDistributedOrders',
    params,
  })
}

// (查询我的配货完成订单)queryMyDisCompletedOrders
export const queryMyDisCompletedOrders = params => {
  return request({
    method: 'GET',
    url: '/search/queryMyDisCompletedOrders',
    params,
  })
}

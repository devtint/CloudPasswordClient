import { request } from '@/utils'

// export const getHello = params => {
//   return request({
//     method: 'GET',
//     url: '/search/getHello',
//     params,
//   })
// }

// (查询SVM)querySVMDetails
export const querySVMDetails = params => {
  return request({
    method: 'POST',
    url: '/search/querySVMDetails',
    params,
  })
}

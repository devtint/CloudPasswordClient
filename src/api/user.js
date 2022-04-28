import { request } from '@/utils'

// export const getHello = params => {
//   return request({
//     method: 'GET',
//     url: '/search/getHello',
//     params,
//   })
// }
// getPk
export const getPK = () => {
  return request({
    method: 'POST',
    url: '/app/getPK',
  })
}

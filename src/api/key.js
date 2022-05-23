import { request } from '@/utils'

// export const getHello = params => {
//   return request({
//     method: 'GET',
//     url: '/search/getHello',
//     params,
//   })
// }

// (通过用户ID查询SK)querySKById
export const querySKById = params => {
  return request({
    method: 'GET',
    url: '/search/querySKById',
    params,
  })
}

// (通过用户ID查询Key)queryKeyById
export const queryKeyById = params => {
  return request({
    method: 'GET',
    url: '/search/queryKeyById',
    params,
  })
}

// (通过用户ID查询证书)queryCertificateById
export const queryCertificateById = params => {
  return request({
    method: 'GET',
    url: '/search/queryCertificateById',
    params,
  })
}

// （随机生成SK）randomCreateSK
export const randomCreateSK = data => {
  return request({
    method: 'POST',
    url: '/insertReturn/randomCreateSK',
    data,
  })
}

// （随机生成秘钥）randomCreateKey
export const randomCreateKey = data => {
  return request({
    method: 'POST',
    url: '/insertReturn/randomCreateKey',
    data,
  })
}

// (随机生成秘钥对)randomCreateKeyPair
export const randomCreateKeyPair = data => {
  return request({
    method: 'POST',
    url: '/insertReturn/randomCreateKeyPair',
    data,
  })
}

// （证书签发）IssueCertificates
export const IssueCertificates = data => {
  return request({
    method: 'POST',
    url: '/insertReturn/IssueCertificates',
    data,
  })
}

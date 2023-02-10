import { request } from '@/utils'

// (查询服务分类)queryServiceClassify
export const queryServiceClassify = params => {
  return request({
    method: 'GET',
    url: '/search/queryServiceClassify',
    params,
  })
}

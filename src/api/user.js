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

// (注册企业客户账号)btnRegisteredEnterpriseAccount
export const registerAccount = data => {
  return request({
    method: 'POST',
    url: '/insertReturn/btnRegisteredEnterpriseAccount',
    data,
  })
}

// (账号密码登录)loginByAccount
export const loginAccount = data => {
  return request({
    method: 'POST',
    url: '/login/loginByAccount',
    data,
  })
}

// 手机验证码方式登录
export const loginOfPhone = data => {
  return request({
    method: 'POST',
    url: '/app/login',
    data,
  })
}

// 获取短信验证码
export const getSmsCode = data => {
  return request({
    method: 'POST',
    url: '/insertReturn/genAuthCodeForMobile',
    data,
  })
}

// (子账号管理展示)subAccountdisplay
export const getSubAcount = data => {
  return request({
    method: 'POST',
    url: '/search/subAccountdisplay',
    data,
  })
}

// (强制修改子账号密码)btnUpdateSubAccountPassword
export const subAcountUpdate = data => {
  return request({
    method: 'POST',
    url: '/insertReturn/btnUpdateSubAccountPassword',
    data,
  })
}

// (子账号删除)btnDeleteEnterpriseSubAccount
export const subAcountDelete = data => {
  return request({
    method: 'POST',
    url: '/insertReturn/btnDeleteEnterpriseSubAccount',
    data,
  })
}

// (子账号创建)btnRegisteredEnterpriseSubAccount
export const createSubAcount = data => {
  return request({
    method: 'POST',
    url: '/insertReturn/registerAtAuthSvr',
    data,
  })
}

// (通过旧密码修改密码)modifyTellerPasswordAtAuthSvr
export const accountOldPswUpdate = data => {
  return request({
    method: 'POST',
    url: '/insertReturn/modifyTellerPasswordAtAuthSvr',
    data,
  })
}

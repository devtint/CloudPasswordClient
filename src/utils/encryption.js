import JSEncrypt from 'jsencrypt'

// export function encryption(algorithm = 'RSA', pkbase64, data) {
export function encryption(pkbase64, data) {
  // if (algorithm === 'RSA') {
  //密码前面添加4位长度
  let newPassword = PrefixZero(data.length * 2, 4)
  newPassword = newPassword + stringToHex(data)
  console.log('newPassword', newPassword)

  //使用标准RSA算法处理
  let privateKey =
    '-----BEGIN PUBLIC KEY-----' + pkbase64 + '-----END PUBLIC KEY-----'
  newPassword = encryptedData(privateKey, newPassword)
  // console.log('privateKey', privateKey)
  var password_temp = newPassword.replace(/\+/g, '%2B')
  return password_temp
  // }
}

function PrefixZero(num, n) {
  return (Array(n).join(0) + num).slice(-n)
}

function stringToHex(str) {
  var val = ''
  for (var i = 0; i < str.length; i++) {
    var temp = str.charCodeAt(i).toString(16)
    if (temp.length == 1) {
      val += '0' + temp
    } else {
      val += temp
    }
  }
  return val.toUpperCase()
}
//JSEncrypt加密方法
function encryptedData(publicKey, password) {
  //new一个对象
  let encrypt = new JSEncrypt()
  //设置公钥
  encrypt.setPublicKey(publicKey)
  //password是要加密的数据,此处不用注意+号,因为rsa自己本身已经base64转码了,不存在+,全部是二进制数据
  let result = encrypt.encrypt(password)
  return result
}

import request from '@/utils/request'
const API = {
  // 获取验证码
  getCode: (token, phone) => {
    return request({
      url: '/userInfo/getCode',
      method: 'post',
      data: { token, phone }
    })
  },
  // 登录
  handleLogin: (data) => {
    return request({
      url: '/userInfo/login',
      method: 'post',
      data: data
    })
  },
  // 注册
  goRegister: (phone, code, pwd) => {
    return request({
      url: '/userInfo/registerUserInfo',
      method: 'post',
      data: { phone: phone, code: code, pwd: pwd }
    })
  },
  // 提现
  putForward: (data) => {
    return request({
      url: '/rechargeRecord/putForward',
      method: 'post',
      data: data
      //          load:true
    })
  },
  // 充值记录
  selectRechargeRecord: (data) => {
    return request({
      url: '/rechargeRecord/selectRechargeRecord',
      method: 'post',
      data: data
      //          load:true
    })
  },
  // 交易记录
  selectGoodsOrder: (data) => {
    return request({
      url: '/goodsOrder/selectGoodsOrder',
      method: 'post',
      data: data
      //          load:true
    })
  },
  selectUserInfo: (data) => {
    return request({
      url: '/userInfo/selectUserInfo',
      method: 'post',
      data: data
      //          load:true
    })
  },
  // 获取用户信息
  getUserInfo: (data) => {
    return request({
      url: '/userInfo/getUserInfo',
      method: 'post',
      data: data
      //          load:true
    })
  },
  // 修改密码
  modifyPassword: (data) => {
    return request({
      url: '/userInfo/modifyPassword ',
      method: 'post',
      data: data
      //          load:true
    })
  },
  retrievePwd: (data) => {
    return request({
      url: '/userInfo/retrievePwd  ',
      method: 'post',
      data: data
      //          load:true
    })
  }

}

export default API

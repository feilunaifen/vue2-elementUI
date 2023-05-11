import request from '@/utils/request'

// 登录
export function login({ username, password }) {
  return request({
    url: '/admin/acl/index/login',
    method: 'post',
    data: { username, password }
  })
}

// 获取用户信息
export function getInfo() {
  return request({
    url: '/admin/acl/index/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/admin/acl/index/logout',
    method: 'post'
  })
}

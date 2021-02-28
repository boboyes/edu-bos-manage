import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({ // 避免该接口也进入401状态
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

const request = axios.create({
  // 配置选项
  // baseURL,
  // timeout
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
let isRefreshing = false // 控制刷新token的状态 短时间内只能进入一次
let requests: (() => void)[] = [] // 存储刷新 token 期间过来的 401 请求
request.interceptors.response.use(function (response) {
  // 如果是自定义错误状态码，错误处理写到这里
  return response
}, async function (error) {
  // 如果是HTTP状态码，错误处理写到这里
  if (error.response) { // 收到响应，状态码不是2xx
    // 针对不同状态码处理
    const { status } = error.response
    switch (status) {
      case 400:
        Message.error('请求参数错误')
        break
      case 401:
        // 无效的token
        // 1.如果由refresh_token,使用它获取新的token
        if (!store.state.user) {
          redirectLogin()
          return Promise.reject(error)
        }
        if (!isRefreshing) {
          isRefreshing = true // 开启刷新状态
          return refreshToken().then(res => {
            if (!res.data.success) {
              throw new Error('刷新 Token 失败')
            }
            // token获取后执行挂起的请求
            requests.forEach(cb => cb())
            requests = [] // 执行后清空数组
            store.commit('setUser', res.data.content)
            return request(error.config)
          }).catch(() => {
            store.commit('setUser', null)
            redirectLogin()
            return Promise.reject(error)
          }).finally(() => {
            isRefreshing = false // 重置刷新状态
          })
        }
        // 刷新状态下，挂起401请求, 存储到requests中
        return new Promise(resolve => {
          requests.push(() => {
            resolve(request(error.config))
          })
        })
        // 尝试刷新获取新的token
        // 2.没有refresh_token，跳转登录页
        break
      case 403:
        Message.error('没有权限,请联系管理员')
        break
      case 404:
        Message.error('请求资源不存在')
        break
      default:
        Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 未收到响应
    Message.error('请求超时，请刷新重试')
  } else { // 设置请求时发生了错误
    Message.error(`请求失败: ${error.message}`)
  }
  return Promise.reject(error)
})

export default request

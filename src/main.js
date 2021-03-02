import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入css样式
import './assets/css/reset.css'

// 引入element-ui
import './plugins/element'

// 引入全局css
import './assets/css/global.css'

import axios from 'axios'

// 导入Nprogress
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

axios.defaults.baseURL = 'http://42.192.48.175:3000/'

// 请求拦截器
axios.interceptors.request.use(config => {
  // 开启进度条
  Nprogress.start()
  return config
})
// 响应拦截器
axios.interceptors.response.use(config => {
  // 结束进度条
  Nprogress.done()
  return config
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

// 注册全局过滤器(日期)
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  // 年份
  const y = dt.getFullYear()
  // 月份，如果不足两位，补一个0
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  // 日期，如果不足两位，补一个0
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

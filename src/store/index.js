import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 教学团队中选中项的状态
    teamActiveName: '整体结构',
    // 联系我们中选中项的状态
    contactActiveName: '任课教师',
    // 主题讨论中内容区
    discussContent: {}
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

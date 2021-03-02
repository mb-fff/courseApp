import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 前台页面路由
  {
    path: '/',
    redirect: '/welcome',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    children: [
      // 首页
      {
        path: '/welcome',
        component: () => import(/* webpackChunkName: "welcome" */ '../views/Welcome.vue')
      },
      // 课程介绍
      {
        path: '/introduce1',
        component: () => import(/* webpackChunkName: "introduce" */ '../views/introduce/Introduce1.vue')
      },
      {
        path: '/introduce2',
        component: () => import(/* webpackChunkName: "introduce" */ '../views/introduce/Introduce2.vue')
      },
      {
        path: '/introduce3',
        component: () => import(/* webpackChunkName: "introduce" */ '../views/introduce/Introduce3.vue')
      },
      {
        path: '/introduce4',
        component: () => import(/* webpackChunkName: "introduce" */ '../views/introduce/Introduce4.vue')
      },
      // 课程描述
      {
        path: '/description1',
        component: () => import(/* webpackChunkName: "description" */ '../views/description/Description1.vue')
      },
      {
        path: '/description2',
        component: () => import(/* webpackChunkName: "description" */ '../views/description/Description2.vue')
      },
      {
        path: '/description3',
        component: () => import(/* webpackChunkName: "description" */ '../views/description/Description3.vue')
      },
      {
        path: '/description4',
        component: () => import(/* webpackChunkName: "description" */ '../views/description/Description4.vue')
      },
      // 参考教材
      {
        path: '/books1',
        component: () => import(/* webpackChunkName: "books" */ '../views/books/Books1.vue')
      },
      {
        path: '/books2',
        component: () => import(/* webpackChunkName: "books" */ '../views/books/Books2.vue')
      },
      {
        path: '/books3',
        component: () => import(/* webpackChunkName: "books" */ '../views/books/Books3.vue')
      },
      {
        path: '/books4',
        component: () => import(/* webpackChunkName: "books" */ '../views/books/Books4.vue')
      },
      // 课程资源
      {
        path: '/resourse1',
        component: () => import(/* webpackChunkName: "resourse" */ '../views/resourse/Resourse1.vue')
      },
      {
        path: '/resourse2',
        component: () => import(/* webpackChunkName: "resourse" */ '../views/resourse/Resourse2.vue')
      },
      {
        path: '/resourse3',
        component: () => import(/* webpackChunkName: "resourse" */ '../views/resourse/Resourse3.vue')
      },
      {
        path: '/resourse4',
        component: () => import(/* webpackChunkName: "resourse" */ '../views/resourse/Resourse4.vue')
      },
      // 课程视频
      {
        path: '/video1',
        component: () => import(/* webpackChunkName: "video" */ '../views/video/Video1.vue')
      },
      {
        path: '/video2',
        component: () => import(/* webpackChunkName: "video" */ '../views/video/Video2.vue')
      },
      {
        path: '/video3',
        component: () => import(/* webpackChunkName: "video" */ '../views/video/Video3.vue')
      },
      {
        path: '/video4',
        component: () => import(/* webpackChunkName: "video" */ '../views/video/Video4.vue')
      },
      // 教学团队
      {
        path: '/team',
        component: () => import(/* webpackChunkName: "team" */ '../views/team/Team.vue')
      },
      // 教学改革
      {
        path: '/reform1',
        component: () => import(/* webpackChunkName:"reform" */ '../views/reform/Reform1.vue')
      },
      {
        path: '/reform2',
        component: () => import(/* webpackChunkName:"reform" */ '../views/reform/Reform2.vue')
      },
      {
        path: '/reform3',
        component: () => import(/* webpackChunkName:"reform" */ '../views/reform/Reform3.vue')
      },
      {
        path: '/reform4',
        component: () => import(/* webpackChunkName:"reform" */ '../views/reform/Reform4.vue')
      },
      // 课程评价
      {
        path: '/evaluate1',
        component: () => import(/* webpackChunkName:"evaluate" */ '../views/evaluate/Evaluate1.vue')
      },
      {
        path: '/evaluate2',
        component: () => import(/* webpackChunkName:"evaluate" */ '../views/evaluate/Evaluate2.vue')
      },
      {
        path: '/evaluate3',
        component: () => import(/* webpackChunkName:"evaluate" */ '../views/evaluate/Evaluate3.vue')
      },
      {
        path: '/evaluate4',
        component: () => import(/* webpackChunkName:"evaluate" */ '../views/evaluate/Evaluate4.vue')
      },
      // 联系我们
      {
        path: '/contact',
        component: () => import(/* webpackChunkName:"contact" */ '../views/contact/Contact.vue')
      },
      // 推荐网站
      {
        path: '/website',
        component: () => import(/* webpackChunkName:"website" */ '../views/website/Website.vue')
      },
      // 主题讨论
      {
        path: '/discuss',
        component: () => import(/* webpackChunkName:"discuss" */ '../views/discuss/Discuss.vue')
      },
      {
        path: '/discussContent',
        component: () => import(/* webpackChunkName:"discuss" */ '../views/discuss/DisscussContent.vue')
      },
      // 我的文章
      {
        path: '/article',
        component: () => import(/* webpackChunkName:"article" */ '../views/article/Article.vue')
      }, {
        path: '/articleContent',
        component: () => import(/* webpackChunkName:"article" */ '../views/article/ArticleContent.vue')
      },
      // 我的信息
      {
        path: '/myinfo',
        component: () => import(/* webpackChunkName:"info" */ '../views/info/Info.vue')
      }
    ]
  },
  // 登陆
  {
    path: '/login',
    component: () => import(/* webpackChunkName:"login" */ '../views/Login.vue')
  },
  // 后台页面路由
  {
    path: '/back_home',
    redirect: '/back_welcome',
    component: () => import(/* webpackChunkNmae:"back_home" */ '../views_back/Home.vue'),
    children: [
      // 首页
      {
        path: '/back_welcome',
        component: () => import(/* webpackChunkNmae:"back_welcome" */ '../views_back/Welcome.vue')
      },
      // 用户管理
      {
        path: '/back_user',
        component: () => import(/* webpackChunkNmae:"back_user" */ '../views_back/user/User.vue')
      },
      // 课程介绍
      {
        path: '/back_introduce1',
        component: () => import(/* webpackChunkName: "back_introduce" */ '../views_back/introduce/Introduce1.vue')
      },
      {
        path: '/back_introduce2',
        component: () => import(/* webpackChunkName: "back_introduce" */ '../views_back/introduce/Introduce2.vue')
      },
      {
        path: '/back_introduce3',
        component: () => import(/* webpackChunkName: "back_introduce" */ '../views_back/introduce/Introduce3.vue')
      },
      {
        path: '/back_introduce4',
        component: () => import(/* webpackChunkName: "back_introduce" */ '../views_back/introduce/Introduce4.vue')
      },
      // 课程描述
      {
        path: '/back_description1',
        component: () => import(/* webpackChunkName: "back_description" */ '../views_back/description/Description1.vue')
      },
      {
        path: '/back_description2',
        component: () => import(/* webpackChunkName: "back_description" */ '../views_back/description/Description2.vue')
      },
      {
        path: '/back_description3',
        component: () => import(/* webpackChunkName: "back_description" */ '../views_back/description/Description3.vue')
      },
      {
        path: '/back_description4',
        component: () => import(/* webpackChunkName: "back_description" */ '../views_back/description/Description4.vue')
      },
      // 参考教材
      {
        path: '/back_books1',
        component: () => import(/* webpackChunkName: "back_books" */ '../views_back/books/Books1.vue')
      },
      {
        path: '/back_books2',
        component: () => import(/* webpackChunkName: "back_books" */ '../views_back/books/Books2.vue')
      },
      {
        path: '/back_books3',
        component: () => import(/* webpackChunkName: "back_books" */ '../views_back/books/Books3.vue')
      },
      {
        path: '/back_books4',
        component: () => import(/* webpackChunkName: "back_books" */ '../views_back/books/Books4.vue')
      },
      // 课程资源
      {
        path: '/back_resourse1',
        component: () => import(/* webpackChunkName: "back_resourse" */ '../views_back/resourse/Resourse1.vue')
      },
      {
        path: '/back_resourse2',
        component: () => import(/* webpackChunkName: "back_resourse" */ '../views_back/resourse/Resourse2.vue')
      },
      {
        path: '/back_resourse3',
        component: () => import(/* webpackChunkName: "back_resourse" */ '../views_back/resourse/Resourse3.vue')
      },
      {
        path: '/back_resourse4',
        component: () => import(/* webpackChunkName: "back_resourse" */ '../views_back/resourse/Resourse4.vue')
      },
      // 课程视频
      {
        path: '/back_video1',
        component: () => import(/* webpackChunkName: "back_video" */ '../views_back/video/Video1.vue')
      },
      {
        path: '/back_video2',
        component: () => import(/* webpackChunkName: "back_video" */ '../views_back/video/Video2.vue')
      },
      {
        path: '/back_video3',
        component: () => import(/* webpackChunkName: "back_video" */ '../views_back/video/Video3.vue')
      },
      {
        path: '/back_video4',
        component: () => import(/* webpackChunkName: "back_video" */ '../views_back/video/Video4.vue')
      },
      // 教学团队
      {
        path: '/back_team',
        component: () => import(/* webpackChunkName: "back_team" */ '../views_back/team/Team.vue')
      },
      // 教学改革
      {
        path: '/back_reform1',
        component: () => import(/* webpackChunkName:"back_reform" */ '../views_back/reform/Reform1.vue')
      },
      {
        path: '/back_reform2',
        component: () => import(/* webpackChunkName:"back_reform" */ '../views_back/reform/Reform2.vue')
      },
      {
        path: '/back_reform3',
        component: () => import(/* webpackChunkName:"back_reform" */ '../views_back/reform/Reform3.vue')
      },
      {
        path: '/back_reform4',
        component: () => import(/* webpackChunkName:"back_reform" */ '../views_back/reform/Reform4.vue')
      },
      // 课程评价
      {
        path: '/back_evaluate1',
        component: () => import(/* webpackChunkName:"back_evaluate" */ '../views_back/evaluate/Evaluate1.vue')
      },
      {
        path: '/back_evaluate2',
        component: () => import(/* webpackChunkName:"back_evaluate" */ '../views_back/evaluate/Evaluate2.vue')
      },
      {
        path: '/back_evaluate3',
        component: () => import(/* webpackChunkName:"back_evaluate" */ '../views_back/evaluate/Evaluate3.vue')
      },
      {
        path: '/back_evaluate4',
        component: () => import(/* webpackChunkName:"back_evaluate" */ '../views_back/evaluate/Evaluate4.vue')
      },
      // 联系我们
      {
        path: '/back_contact',
        component: () => import(/* webpackChunkName:"back_contact" */ '../views_back/contact/Contact.vue')
      },
      // 推荐网站
      {
        path: '/back_website',
        component: () => import(/* webpackChunkName:"back_website" */ '../views_back/website/Website.vue')
      },
      // 主题讨论
      {
        path: '/back_discuss',
        component: () => import(/* webpackChunkName:"back_discuss" */ '../views_back/discuss/Discuss.vue')
      }
    ]
  },
  // 404
  {
    path: '*',
    component: () => import(/* webpackChunkNmae:"error" */ '../views/Error.vue')
  }
]

const router = new VueRouter({
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router

import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */'@/views/home/index.vue'),
        meta: {
          requireAuth: true // 可以添加更多的自定义数据
        } // 默认是空对象
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/index.vue'),
        meta: {
          requireAuth: true // 可以添加更多的自定义数据
        } // 默认是空对象
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/index.vue'),
        meta: {
          requireAuth: true // 可以添加更多的自定义数据
        } // 默认是空对象
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-create-edit' */'@/views/menu/create.vue'),
        meta: {
          requireAuth: true // 可以添加更多的自定义数据
        } // 默认是空对象
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-create-edit' */'@/views/menu/edit.vue'),
        meta: {
          requireAuth: true // 可以添加更多的自定义数据
        } // 默认是空对象
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/index.vue'),
        meta: {
          requireAuth: true // 可以添加更多的自定义数据
        } // 默认是空对象
      },
      {
        path: '/resource/category',
        name: 'resource-category',
        component: () => import(/* webpackChunkName: 'resource-category' */'@/views/resource/resource-category.vue'),
        meta: {
          requireAuth: true // 可以添加更多的自定义数据
        } // 默认是空对象
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/index.vue'),
        meta: {
          requireAuth: true // 可以添加更多的自定义数据
        } // 默认是空对象
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */'@/views/user/index.vue'),
        meta: {
          requireAuth: true // 可以添加更多的自定义数据
        } // 默认是空对象
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index.vue'),
        meta: {
          requireAuth: true // 可以添加更多的自定义数据
        } // 默认是空对象
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/advert-space/index.vue')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */'@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!store.state.user) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath // 把登录成功需要返回的页面传递到登录页
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router

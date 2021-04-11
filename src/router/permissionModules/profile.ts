import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const ProfileRouter: Array<RouteRecordRaw> = [
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    meta: { hidden: true },
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/profile/Index.vue'),
        name: 'Profile',
        meta: {
          title: 'profile',
          icon: 'user',
          noCache: true
        }
      }
    ]
  }
]

export default ProfileRouter

import { lazy } from 'react'
import { RouterItem } from './'
const login: RouterItem[] = [
  {
    path: '/login',
    protect: false,
    component: lazy(() => import('@/pages/Login')),
    name: '登录',
    strict: true,
  },
]

export default login

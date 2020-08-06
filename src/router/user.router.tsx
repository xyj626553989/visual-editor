import { lazy } from 'react'
import { RouterItem } from './'
const users: RouterItem[] = [
  {
    path: '/user',
    protect: false,
    component: lazy(() => import('@/pages/User')),
    name: '用户中心',
    strict: false,
  },
]

export default users

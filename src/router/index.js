import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import About from '@/views/ShowFolders.vue'
import DashBoard from '@/views/DashBoard.vue'
import Draw from '@/views/DrawCanvas.vue'
import SignIn from '@/views/login/SignIn.vue'
import Registration from '@/views/login/Registration.vue'
import Content from '@/views/ContentView.vue'



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashBoard  
  },
  {
    path: '/draw',
    name: 'draw',
    component: Draw
  },
    {
    path: '/signin',
    name: 'signin',
    component: SignIn
  },
    {
    path: '/registration',
    name: 'registration',
    component: Registration
  },
  {
    path: '/content',
    name: 'content',
    component: Content
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

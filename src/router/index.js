import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ShowFolders from '@/views/ShowFolders.vue'
import CreateNewContent from '@/views/CreateNewContent.vue'
// import Draw from '@/views/DrawCanvas.vue'
import SignIn from '@/views/login/SignIn.vue'
import Registration from '@/views/login/Registration.vue'
import Content from '@/views/ContentView.vue'
import ShowFolder from '@/views/ShowFolder.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/show',
    name: 'show',
    component: ShowFolders
  },
  {
    path: '/create',
    name: 'create',
    component: CreateNewContent
  },
  {
    path: '/show-folder',
    name: 'show-folder',
    component: ShowFolder
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

// Composables
import { createRouter, createWebHistory } from 'vue-router'

// Import Views
import LovePoemCreate from '@/views/LovePoemCreate.vue'
import Search from '@/views/Search.vue'
import LovePoemArchive from '@/views/LovePoemArchive.vue'
import Login from '@/views/Login.vue'
import Testform01 from '@/views/Testform01.vue'

// Routes
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },    
      {
        path: '/search',
        name: 'Search',
        component: Search,
      },  
      {
        path: '/archive',
        name: 'Archive',
        component: LovePoemArchive,
      },             
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  }, 
  {
    path: '/testform01',
    name: 'testform01',
    component: Testform01,
  },   

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

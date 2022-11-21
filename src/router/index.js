import Vue from 'vue'
import VueRouter from 'vue-router'
import UsersView from '@/views/UsersView.vue'
import PublishingView from '@/views/PublishingView.vue'
import BooksView from '@/views/BooksView.vue'
import RentsView from '@/views/RentsView.vue'
import HomeView from '@/views/HomeView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/users',
    name: 'users',
    component: UsersView,
  },
  {
    path: '/publishing',
    name: 'publishing',
    component: PublishingView,
  },
  {
    path: '/books',
    name: 'books',
    component: BooksView,
  },
  {
    path: '/rents',
    name: 'rents',
    component: RentsView,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/views/home/Home')
const Profile = () => import('@/views/profile/Profile')
const Shopcart = () => import('@/views/shopcart/Shopcart')
const Category = () => import('@/views/category/Category')

Vue.use(Router)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/shopcart',
    component:Shopcart
  },
  {
    path:'/profile',
    component:Profile
  },
]
const router = new Router({
  routes,
  mode:'history'
})


export default router
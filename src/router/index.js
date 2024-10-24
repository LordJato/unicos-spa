import { createRouter, createWebHistory } from 'vue-router'
//Layouts
import AuthLayout from '../layouts/AuthLayout.vue'

//Views
import ForgotPassword from '../views/auth/ForgotPasswordView.vue'

const routes = [
  {
    path: '/',
    component: AuthLayout,
    redirect: '/login',
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/auth/LoginView.vue'),
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ '../views/auth/RegisterView.vue'),
      }
      ,
      {
        path: '/forgot-password',
        name: 'forgotPassword',
        component: ForgotPassword,
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router

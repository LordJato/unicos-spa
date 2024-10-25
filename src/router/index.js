import { createRouter, createWebHistory } from 'vue-router'
//Layouts
import AuthLayout from '../layouts/AuthLayout.vue'

//Views
import ForgotPassword from '../views/auth/ForgotPasswordView.vue'
import ResetPassword from '../views/auth/ResetPasswordView.vue'

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
        meta: {
          title: 'Login',
        },
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ '../views/auth/RegisterView.vue'),
        meta: {
          title: 'Register',
        },
      }
      ,
      {
        path: '/forgot-password',
        name: 'forgotPassword',
        component: ForgotPassword,
      },
      {
        path: '/reset-password',
        name: 'resetPassword',
        component: ResetPassword,
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router

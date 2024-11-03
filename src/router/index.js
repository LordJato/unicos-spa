import { createRouter, createWebHistory } from 'vue-router'
import Middlewares from '../middlewares/'

//Layouts
import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

//Views
import ForgotPassword from '@/views/auth/ForgotPasswordView.vue'
import ResetPassword from '@/views/auth/ResetPasswordView.vue'
import Dashboard from '@/views/dashboard/index.vue'
import Home from '@/views/home.vue'



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
          middleware: [Middlewares.guest]
        },
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ '../views/auth/RegisterView.vue'),
        meta: {
          title: 'Register',
          middleware: [Middlewares.guest]
        },
      }
      ,
      {
        path: '/forgot-password',
        name: 'forgotPassword',
        component: ForgotPassword,
        meta: {
          title: 'Forgot Password',
        },
      },
      {
        path: '/reset-password',
        name: 'resetPassword',
        component: ResetPassword,
        meta: {
          title: 'Reset Password',
        },
      },
    ]
  },
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: 'Home',
          middleware: [Middlewares.auth],
        },
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
          title: 'Dashboard',
          middleware: [Middlewares.auth, Middlewares.checkPermissions],
          permissions: ['view-dashboard']
        },
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Middleware runner
const runMiddleware = (ctx, middleware, index = 0) => {
  if (index >= middleware.length) return ctx.next();

  const nextMiddleware = () => runMiddleware(ctx, middleware, index + 1);
  middleware[index]({ ...ctx, next: nextMiddleware });
};

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const ctx = { to, from, next, router };
    runMiddleware(ctx, middleware);
  } else {
    next();
  }
});


export default router

import { createRouter, createWebHistory } from 'vue-router'
import Middlewares from '../middlewares/'

//Layouts
import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

//Views
import ForgotPassword from '@/views/auth/ForgotPasswordView.vue'
import ResetPassword from '@/views/auth/ResetPasswordView.vue'
import Dashboard from '@/views/dashboard/index.vue'




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
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
          title: 'Dashboard',
          middleware: [Middlewares.auth]
        },
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

function nextCheck(context, middleware, index) {
  const nextMiddleware = middleware[index];
  if (!nextMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMidd = nextCheck(context, middleware, index + 1);

    nextMiddleware({ ...context, next: nextMidd });
  }
}

router.beforeEach((to, from, next) => {

  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];

    const ctx = {
      from,
      next,
      router,
      to
    };

    const nextMiddleware = nextCheck(ctx, middleware, 1);

    return middleware[0]({ ...ctx, next: nextMiddleware });
  }

  return next();
});

export default router

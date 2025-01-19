import AuthLayout from '@/layouts/AuthLayout.vue';
import ForgotPassword from '@/views/auth/ForgotPasswordView.vue';
import ResetPassword from '@/views/auth/ResetPasswordView.vue';

export default [
  {
    path: '/',
    component: AuthLayout,
    redirect: '/login',
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/auth/LoginView.vue'),
        meta: { title: 'Login', middleware: ['guest'] },
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ '../views/auth/RegisterView.vue'),
        meta: { title: 'Register', middleware: ['guest'] },
      },
      {
        path: '/forgot-password',
        name: 'forgotPassword',
        component: ForgotPassword,
        meta: { title: 'Forgot Password' },
      },
      {
        path: '/reset-password',
        name: 'resetPassword',
        component: ResetPassword,
        meta: { title: 'Reset Password' },
      },
      {
        path: '/secured/register',
        name: 'securedRegister',
        component: () => import(/* webpackChunkName: "securedRegister" */ '../views/auth/SecuredRegisterView.vue'),
        meta: { title: 'Secured Register', middleware: ['guest'] },
      },
    ],
  },
];

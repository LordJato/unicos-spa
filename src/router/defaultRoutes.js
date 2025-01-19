import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Dashboard from '@/views/dashboard/index.vue';
import Home from '@/views/home.vue';

export default [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: { title: 'Home', middleware: ['auth'] },
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
          title: 'Dashboard',
          middleware: ['auth', 'checkPermissions'],
          permissions: ['view-dashboard'],
        },
      },
    ],
  },
];

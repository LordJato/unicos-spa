import { createRouter, createWebHistory } from 'vue-router';
import authRoutes from './authRoutes';
import defaultRoutes from './defaultRoutes';
import Middlewares from '../middlewares/';

const runMiddleware = (ctx, middleware, index = 0) => {
  if (index >= middleware.length) return ctx.next();
  const nextMiddleware = () => runMiddleware(ctx, middleware, index + 1);
  middleware[index]({ ...ctx, next: nextMiddleware });
};

const routes = [...authRoutes, ...defaultRoutes];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  document.title = `Unicos - ${to.meta.title || 'Untitled'}`;
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];
    const ctx = { to, from, next, router };
    runMiddleware(ctx, middleware.map((m) => Middlewares[m]));
  } else {
    next();
  }
});

export default router;

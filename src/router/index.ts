import { createRouter, createWebHistory, RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import authRoutes from "./authRoutes";
import defaultRoutes from "./defaultRoutes";
import Middlewares from "../middlewares/";

interface MiddlewareContext {
  to: RouteLocationNormalized;
  from: RouteLocationNormalized;
  next: NavigationGuardNext;
  router: typeof router;
}

const runMiddleware = (ctx: MiddlewareContext, middleware: Function[], index: number = 0): void => {
  if (index >= middleware.length) return ctx.next();
  const nextMiddleware = () => runMiddleware(ctx, middleware, index + 1);
  middleware[index]({ ...ctx, next: nextMiddleware });
};

const routes: RouteRecordRaw[] = [...authRoutes, ...defaultRoutes];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL as string),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  document.title = `Unicos - ${to.meta.title || "Untitled"}`;

  if (to.meta.middleware) {
    const middlewareArray = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];
    const ctx: MiddlewareContext = { to, from, next, router };
    runMiddleware(ctx, middlewareArray.map((m) => Middlewares[m]));
  } else {
    next();
  }
});

export default router;

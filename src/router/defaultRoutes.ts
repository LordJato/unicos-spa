import { RouteRecordRaw } from "vue-router";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import DashboardView from "@/views/dashboard/index.vue";
import HomeView from "@/views/home.vue";
import recruitmentRoutes from "@/router/default/recruitmentRoutes";
import setupRoutes from "./default/setupRoutes";

const defaultRoutes : RouteRecordRaw[] = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "home",
        name: "Home",
        component: HomeView,
        meta: { title: "Home", middleware: ["auth"] },
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: DashboardView,
        meta: {
          title: "Dashboard",
          middleware: ["auth", "checkPermissions"],
          permissions: ["view-dashboard"],
        },
      },
      ...recruitmentRoutes,
      ...setupRoutes
    ],
  },
];

export default defaultRoutes

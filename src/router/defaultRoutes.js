import DefaultLayout from "@/layouts/DefaultLayout.vue";
import DashboardView from "@/views/dashboard/index.vue";
import HomeView from "@/views/home.vue";
import DepartmentView from "@/views/setup/DepartmentView.vue";

export default [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/home",
        name: "home",
        component: HomeView,
        meta: { title: "Home", middleware: ["auth"] },
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: DashboardView,
        meta: {
          title: "Dashboard",
          middleware: ["auth", "checkPermissions"],
          permissions: ["view-dashboard"],
        },
      },
      {
        path: "/setup/department",
        name: "department",
        component: DepartmentView,
        meta: {
          title: "Department",
          middleware: ["auth", "checkPermissions"],
          permissions: ["view-all-department"],
        },
      },
    ],
  },
];
